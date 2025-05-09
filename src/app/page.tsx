"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/layout/Header';
import ProblemList from '@/components/problems/ProblemList';
import ProblemDetails from '@/components/problems/ProblemDetails';
import CodeEditor from '@/components/editor/CodeEditor';
import AnalysisResult from '@/components/editor/AnalysisResult';
import ProgressTracker from '@/components/tracking/ProgressTracker';
import type { Problem, SupportedLanguage } from '@/types';
import { mockProblems } from '@/lib/mock-data';
import { analyzeCode, type AnalyzeCodeOutput } from '@/ai/flows/code-analysis';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();

  const [allProblems] = useState<Problem[]>(mockProblems);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(mockProblems);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<SupportedLanguage>('python');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCodeOutput['feedback'] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const topics = useMemo(() => Array.from(new Set(allProblems.map(p => p.topic))), [allProblems]);
  const difficulties = useMemo(() => Array.from(new Set(allProblems.map(p => p.difficulty as string))), [allProblems]);


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
    // Set default code for the selected language or empty string
    const defaultCodeForProblem = problem.defaultCode?.[language] || '';
    setCode(defaultCodeForProblem);
  };

  useEffect(() => {
    if (selectedProblem) {
      const defaultCodeForProblem = selectedProblem.defaultCode?.[language] || '';
      setCode(defaultCodeForProblem);
    }
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 space-y-6">
        <ProgressTracker />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-280px)]"> {/* Adjusted min-height */}
          {/* Left Pane: Problems */}
          <div className="flex flex-col gap-6 max-h-[calc(100vh-280px)]"> {/* Max height for scroll */}
            <div className="flex-shrink-0 h-[60%] lg:h-[50%]"> {/* Problem List takes less space now */}
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
            </div>
            <div className="flex-grow h-[40%] lg:h-[50%]"> {/* Problem Details takes more or equal space */}
              <ProblemDetails problem={selectedProblem} />
            </div>
          </div>

          {/* Right Pane: Editor and Analysis */}
          <div className="flex flex-col gap-6 max-h-[calc(100vh-280px)]"> {/* Max height for scroll */}
            <div className="flex-grow"> {/* Code Editor takes most of the space */}
               <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                onAnalyze={handleAnalyzeCode}
                isLoading={isAnalyzing}
                selectedProblemTitle={selectedProblem?.title}
                editorHeight="calc(100% - 60px)" // Adjust based on button height
              />
            </div>
            <div className="flex-shrink-0"> {/* Analysis Result takes remaining space */}
              <AnalysisResult result={analysisResult} isLoading={isAnalyzing} />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 border-t text-sm text-muted-foreground">
        © {new Date().getFullYear()} CodeAce. All rights reserved.
      </footer>
    </div>
  );
}
