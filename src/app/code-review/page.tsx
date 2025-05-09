"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { analyzeCode, type AnalyzeCodeOutput } from '@/ai/flows/code-analysis';
import { useToast } from '@/hooks/use-toast';
import { Bot, Lightbulb, Loader2, Upload, FileText, Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { availableLanguages } from '@/lib/mock-data';
import type { SupportedLanguage } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CodeReviewCoachPage() {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<SupportedLanguage>(availableLanguages[0].value);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCodeOutput['feedback'] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [displayAnalysis, setDisplayAnalysis] = useState<string>(''); // For typing effect
  const { toast } = useToast();

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      toast({ title: 'Empty Code', description: 'Please paste or upload some code to review.', variant: 'destructive' });
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setDisplayAnalysis(''); // Clear previous display
    try {
      // Placeholder for actual AI call to a Firestore function or direct Genkit flow
      const result = await analyzeCode({ code, language });
      setAnalysisResult(result.feedback); 
      toast({ title: 'Code Review Complete', description: 'AI Coach feedback has been generated.' });
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setAnalysisResult('Error analyzing code. Please try again.');
      toast({ title: 'Analysis Failed', description: 'An error occurred while analyzing your code.', variant: 'destructive' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Typing effect for AI feedback
  useEffect(() => {
    if (analysisResult && !isAnalyzing) {
      let i = 0;
      setDisplayAnalysis(''); // Ensure it's clear before starting
      const timer = setInterval(() => {
        if (i < analysisResult.length) {
          setDisplayAnalysis(prev => prev + analysisResult.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 20); // Adjust typing speed here
      return () => clearInterval(timer);
    }
  }, [analysisResult, isAnalyzing]);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
        // Simple language detection placeholder
        const ext = file.name.split('.').pop()?.toLowerCase();
        const lang = availableLanguages.find(l => l.value === ext || (ext === 'py' && l.value === 'python') || (ext === 'js' && l.value === 'javascript'));
        if (lang) setLanguage(lang.value);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-2xl rounded-2xl glassmorphic border-primary/20">
        <CardHeader className="border-b border-primary/10">
          <div className="flex items-center gap-3">
            <Bot className="h-10 w-10 text-accent" />
            <div>
              <CardTitle className="text-3xl font-bold font-poppins">AI Code Review Coach</CardTitle>
              <CardDescription className="text-lg">
                Submit your code. The AI Coach will explain its logic, detect bugs, analyze complexity, and suggest improvements.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor="language-select" className="block text-sm font-medium text-muted-foreground mb-1">Select Language</label>
              <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
                <SelectTrigger id="language-select" className="w-full md:w-[220px] rounded-lg bg-background/70">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full md:w-auto rounded-lg border-accent/50 hover:bg-accent/10 hover:text-accent" onClick={() => document.getElementById('file-upload')?.click()}>
                <Upload className="h-4 w-4 mr-2" /> Upload File
              </Button>
              <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept=".txt,.py,.js,.java,.cpp,.c,.ts,.go,.rs" />
            </div>
          </div>
          
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code here... (e.g., a function, a class, or a script snippet)"
            className="min-h-[350px] rounded-lg text-sm font-mono code-editor-textarea bg-slate-900 text-slate-100 border-slate-700 dark"
            aria-label="Code Input Area for Review"
          />
          <Button onClick={handleAnalyzeCode} disabled={isAnalyzing || !code.trim()} className="w-full md:w-auto bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg py-3 text-base neon-glow-accent">
            {isAnalyzing ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            Get AI Coach Review
          </Button>
        </CardContent>
      </Card>

      {(isAnalyzing || analysisResult) && (
        <Card className="shadow-2xl rounded-2xl glassmorphic border-primary/20">
          <CardHeader className="border-b border-primary/10">
            <div className="flex items-center gap-2">
               <FileText className="h-6 w-6 text-accent" />
              <CardTitle className="text-2xl font-semibold font-poppins">AI Coach Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 min-h-[200px]">
            {isAnalyzing && !analysisResult ? ( // Show loading only if no result yet
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-accent mb-3" />
                <p className="text-lg">Your AI Coach is meticulously reviewing the code...</p>
              </div>
            ) : displayAnalysis ? (
              <ScrollArea className="h-auto max-h-[400px] md:max-h-[500px] p-1 rounded-md bg-muted/20">
                <pre className="whitespace-pre-wrap text-sm p-4 font-sans leading-relaxed">{displayAnalysis}</pre>
                {/* Placeholder for "typing" cursor if AI is "still typing" */}
                {isAnalyzing && analysisResult && displayAnalysis.length < analysisResult.length && (
                  <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-1"></span>
                )}
              </ScrollArea>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
