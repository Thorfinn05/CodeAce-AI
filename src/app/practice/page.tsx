"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation'; // For reading query params
import ProblemList from '@/components/problems/ProblemList';
import ProblemDetails from '@/components/problems/ProblemDetails';
import CodeEditor from '@/components/editor/CodeEditor';
import AnalysisResult from '@/components/editor/AnalysisResult';
import type { Problem, SupportedLanguage } from '@/types';
import { mockProblems, getGenericDefaultCode, availableLanguages } from '@/lib/mock-data';
import { analyzeCode, type AnalyzeCodeOutput } from '@/ai/flows/code-analysis';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

export default function PracticePage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const [allProblems] = useState<Problem[]>(mockProblems);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(mockProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<SupportedLanguage>(availableLanguages[0].value); // Default to first available language
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCodeOutput['feedback'] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const topics = useMemo(() => Array.from(new Set(allProblems.map(p => p.topic))), [allProblems]);
  const difficulties = useMemo(() => Array.from(new Set(allProblems.map(p => p.difficulty as string))), [allProblems]);

  // Effect to select problem from query parameter on initial load
  useEffect(() => {
    const problemIdFromQuery = searchParams.get('problem');
    if (problemIdFromQuery) {
      const problemToSelect = allProblems.find(p => p.id === problemIdFromQuery);
      if (problemToSelect) {
        handleSelectProblem(problemToSelect);
      }
    } else if (allProblems.length > 0 && !selectedProblem) {
      // Optionally select the first problem if none is selected and no query param
      // handleSelectProblem(allProblems[0]); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProblems, searchParams]); // Removed selectedProblem from deps to avoid re-selecting

  useEffect(() => {
    let currentProblems = allProblems;

    if (difficultyFilter !== 'all') {
      currentProblems = currentProblems.filter(p => p.difficulty === difficultyFilter);
    }
    if (topicFilter !== 'all') {
      currentProblems = currentProblems.filter(p => p.topic === topicFilter);
    }
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
    setAnalysisResult(null); // Clear previous analysis
    const defaultCodeForProblem = problem.defaultCode?.[language] || getGenericDefaultCode(language);
    setCode(defaultCodeForProblem);
     // Update URL without full page reload, if desired (optional)
    // window.history.pushState({}, '', `/practice?problem=${problem.id}`);
  };

  useEffect(() => {
    if (selectedProblem) {
      const defaultCodeForProblem = selectedProblem.defaultCode?.[language] || getGenericDefaultCode(language);
      setCode(defaultCodeForProblem);
    } else {
      setCode(getGenericDefaultCode(language));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, selectedProblem]);


  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      toast({
        title: 'Empty Code',
        description: 'Please write some code to analyze.',
        variant: 'destructive',
      });
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeCode({ code, language });
      setAnalysisResult(result.feedback);
      toast({
        title: 'Analysis Complete',
        description: 'AI feedback has been generated.',
      });
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setAnalysisResult('Error analyzing code. Please try again.');
      toast({
        title: 'Analysis Failed',
        description: 'An error occurred while analyzing your code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Calculate a dynamic min-height for the main content area to push footer down.
  // This might need adjustment based on header/footer actual heights.
  // Header approx 60px, container py-6 (48px), footer can vary.
  // Let's aim for content area to fill remaining viewport.
  const mainContentMinHeight = "calc(100vh - 60px - 48px - 80px)"; // header - padding - estimated footer height

  return (
    <div className="flex flex-col" style={{ minHeight: mainContentMinHeight }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
          {/* Left Pane: Problems & Details */}
          <div className="flex flex-col gap-6 max-h-[calc(100vh-150px)]"> {/* Max height for scroll, adjust as needed */}
            <Card className="flex-shrink-0 h-[calc(50%-0.75rem)] shadow-xl rounded-2xl overflow-hidden"> {/* 0.75rem is half of gap-6 */}
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
            <Card className="flex-grow h-[calc(50%-0.75rem)] shadow-xl rounded-2xl overflow-hidden">
              <ProblemDetails problem={selectedProblem} />
            </Card>
          </div>

          {/* Right Pane: Editor and Analysis */}
          <div className="flex flex-col gap-6 max-h-[calc(100vh-150px)]"> {/* Max height for scroll, adjust as needed */}
            <Card className="flex-grow-[3] basis-0 shadow-xl rounded-2xl overflow-hidden"> {/* Editor takes more space */}
               <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                onAnalyze={handleAnalyzeCode}
                isLoading={isAnalyzing}
                selectedProblemTitle={selectedProblem?.title}
                editorHeight="calc(100% - 70px)" // Adjust based on button height etc.
              />
            </Card>
            <Card className="flex-grow-[1] basis-0 shadow-xl rounded-2xl overflow-hidden"> {/* Analysis Result */}
              <AnalysisResult result={analysisResult} isLoading={isAnalyzing} />
            </Card>
          </div>
        </div>
    </div>
  );
}
