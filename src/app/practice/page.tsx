"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation'; 
import ProblemList from '@/components/problems/ProblemList';
import ProblemDetails from '@/components/problems/ProblemDetails';
import CodeEditor from '@/components/editor/CodeEditor';
import AnalysisResult from '@/components/editor/AnalysisResult';
import type { Problem, SupportedLanguage, UserData } from '@/types';
import { mockProblems, getGenericDefaultCode, availableLanguages } from '@/lib/mock-data';
import { analyzeCode, type AnalyzeCodeOutput } from '@/ai/flows/code-analysis';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { updateUserProgress } from '@/lib/firebase/firestore'; // For updating user progress
import { Timestamp } from 'firebase/firestore';

export default function PracticePage() {
  const { user, refreshUserData } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Problems could be fetched from Firestore based on user level/preferences in future
  const [allProblems] = useState<Problem[]>(mockProblems);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(mockProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<SupportedLanguage>(availableLanguages[0].value);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCodeOutput['feedback'] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // For actual submission logic

  const topics = useMemo(() => Array.from(new Set(allProblems.map(p => p.topic))), [allProblems]);
  const difficulties = useMemo(() => Array.from(new Set(allProblems.map(p => p.difficulty as string))), [allProblems]);

  useEffect(() => {
    const problemIdFromQuery = searchParams.get('problem');
    if (problemIdFromQuery) {
      const problemToSelect = allProblems.find(p => p.id === problemIdFromQuery);
      if (problemToSelect) {
        handleSelectProblem(problemToSelect);
      }
    } else if (allProblems.length > 0 && !selectedProblem) {
      // handleSelectProblem(allProblems[0]); // Optionally auto-select first
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProblems, searchParams]);

  useEffect(() => {
    let currentProblems = allProblems;
    if (difficultyFilter !== 'all') currentProblems = currentProblems.filter(p => p.difficulty === difficultyFilter);
    if (topicFilter !== 'all') currentProblems = currentProblems.filter(p => p.topic === topicFilter);
    if (searchTerm.trim() !== '') {
      currentProblems = currentProblems.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProblems(currentProblems);
  }, [allProblems, difficultyFilter, topicFilter, searchTerm]);

  const handleSelectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setAnalysisResult(null);
    const defaultCodeForProblem = problem.defaultCode?.[language] || getGenericDefaultCode(language);
    setCode(defaultCodeForProblem);
    // Basic URL update without full reload:
    // window.history.replaceState(null, '', `/practice?problem=${problem.id}`);
  };

  useEffect(() => {
    if (selectedProblem) {
      const defaultCodeForProblem = selectedProblem.defaultCode?.[language] || getGenericDefaultCode(language);
      setCode(defaultCodeForProblem);
    } else {
      setCode(getGenericDefaultCode(language));
    }
  }, [language, selectedProblem]);

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      toast({ title: 'Empty Code', description: 'Please write some code to analyze.', variant: 'destructive' });
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      // Placeholder: In future, this might also trigger a Firestore Function for more complex analysis
      // or use a more sophisticated client-side analysis if available.
      const result = await analyzeCode({ code, language });
      setAnalysisResult(result.feedback); // Assuming `feedback` contains the main analysis string
      toast({ title: 'AI Analysis Complete', description: 'Feedback generated for your code.' });
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setAnalysisResult('Error analyzing code. Please try again.');
      toast({ title: 'Analysis Failed', description: 'An error occurred during AI analysis.', variant: 'destructive' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Placeholder for actual code submission and test case running
  const handleSubmitCode = async () => {
    if (!selectedProblem || !user) {
      toast({ title: 'Submission Error', description: 'No problem selected or user not logged in.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      // --- Placeholder for test case execution ---
      // This would involve sending code to a secure execution environment (e.g., via Firebase Function)
      // and comparing output against problem's test cases.
      // For now, simulate a successful submission and AI feedback.
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const isCorrect = Math.random() > 0.3; // Simulate 70% success rate

      if (isCorrect) {
        toast({ title: 'Submission Successful!', description: `Great job on ${selectedProblem.title}!` });
        
        // Update user progress in Firestore
        const currentProgress = user.progress || { xp: 0, solvedProblems: {}, topicMastery: {}, streaks: { current: 0, longest: 0, lastActivityDate: null }, badges: [] };
        const newXP = (currentProgress.xp || 0) + (selectedProblem.difficulty === 'Easy' ? 10 : selectedProblem.difficulty === 'Medium' ? 25 : 50);
        const newSolvedProblems = { ...currentProgress.solvedProblems, [selectedProblem.id]: Timestamp.now() };
        
        const topicData = currentProgress.topicMastery?.[selectedProblem.topic] || { solved: 0, xp: 0, masteryLevel: 'Novice' };
        topicData.solved += 1;
        topicData.xp += (selectedProblem.difficulty === 'Easy' ? 10 : selectedProblem.difficulty === 'Medium' ? 25 : 50);
        // Basic mastery level update (can be more sophisticated)
        if (topicData.solved >= 5) topicData.masteryLevel = 'Intermediate';
        else if (topicData.solved >= 2) topicData.masteryLevel = 'Beginner';

        const newTopicMastery = { ...currentProgress.topicMastery, [selectedProblem.topic]: topicData };

        await updateUserProgress(user.uid, { 
          xp: newXP, 
          solvedProblems: newSolvedProblems,
          topicMastery: newTopicMastery,
          lastProblemId: selectedProblem.id,
          // Streaks update logic would be more complex, involving checking lastActivityDate
        });
        await refreshUserData(); // Refresh user data in auth context

        // Trigger AI Feedback after successful submission
        await handleAnalyzeCode();
      } else {
        toast({ title: 'Incorrect Solution', description: 'Some test cases failed. Review the AI feedback for hints!', variant: 'destructive' });
        // Still provide AI feedback on incorrect attempt
        await handleAnalyzeCode();
      }

    } catch (error) {
      console.error('Submission Error:', error);
      toast({ title: 'Submission Failed', description: 'An error occurred during submission.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)]"> {/* Adjust min-height based on header/footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
          {/* Left Pane: Problems & Details (Span 4 cols on LG) */}
          <div className="lg:col-span-4 flex flex-col gap-6 max-h-[calc(100vh-150px)]">
            <Card className="flex-shrink-0 h-[calc(50%-0.75rem)] shadow-xl rounded-2xl overflow-hidden glassmorphic">
               <ProblemList
                problems={filteredProblems}
                onSelectProblem={handleSelectProblem}
                selectedProblemId={selectedProblem?.id}
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
                topicFilter={topicFilter}
                setTopicFilter={setTopicFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                topics={topics}
                difficulties={difficulties}
              />
            </Card>
            {/* Problem Details with "floating" glassmorphic effect */}
            <div className="flex-grow h-[calc(50%-0.75rem)] shadow-xl rounded-2xl overflow-hidden glassmorphic p-1 bg-transparent">
              <ProblemDetails problem={selectedProblem} />
            </div>
          </div>

          {/* Right Pane: Editor and Analysis (Span 8 cols on LG) */}
          <div className="lg:col-span-8 flex flex-col gap-6 max-h-[calc(100vh-150px)]">
            <Card className="flex-grow-[3] basis-0 shadow-2xl rounded-2xl overflow-hidden glassmorphic border-primary/30">
               <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                onAnalyze={handleAnalyzeCode}
                onSubmit={handleSubmitCode} // Pass submit handler
                isLoadingAnalysis={isAnalyzing}
                isLoadingSubmission={isSubmitting} // Pass submission loading state
                selectedProblemTitle={selectedProblem?.title}
                // Use a dark theme class for the editor textarea
                editorClassName="bg-slate-900 text-slate-100 border-slate-700 dark" // Example dark theme
                editorHeight="calc(100% - 120px)" // Adjust for two buttons
              />
            </Card>
            <Card className="flex-grow-[2] basis-0 shadow-xl rounded-2xl overflow-hidden glassmorphic">
              <AnalysisResult result={analysisResult} isLoading={isAnalyzing} />
            </Card>
          </div>
        </div>
    </div>
  );
}
