"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { analyzeCode, type AnalyzeCodeOutput } from '@/ai/flows/code-analysis';
import { useToast } from '@/hooks/use-toast';
import { Bot, Lightbulb, Loader2, Upload, FileText } from 'lucide-react';
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

export default function CodeReviewPage() {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<SupportedLanguage>(availableLanguages[0].value);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCodeOutput['feedback'] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      toast({
        title: 'Empty Code',
        description: 'Please paste or upload some code to analyze.',
        variant: 'destructive',
      });
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeCode({ code, language });
      // For Code Review, AI response might be more structured. For now, using existing feedback field.
      // e.g. { explanation: "...", bug_detection: "...", complexity: "...", suggestions: "..." }
      // For MVP, we can display the raw feedback string.
      setAnalysisResult(result.feedback); 
      toast({
        title: 'Code Analysis Complete',
        description: 'AI feedback has been generated for your code.',
      });
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setAnalysisResult('Error analyzing code. Please try again.');
      toast({
        title: 'Analysis Failed',
        description: 'An error occurred while analyzing your code.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
        // Optionally try to detect language from file extension
        // const fileName = file.name.toLowerCase();
        // if (fileName.endsWith(".py")) setLanguage("python");
        // else if (fileName.endsWith(".js")) setLanguage("javascript");
        // ... etc.
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">AI Code Review</CardTitle>
          </div>
          <CardDescription>
            Paste your code or upload a file. Our AI will provide an explanation of the logic,
            detect potential bugs, analyze time/space complexity, and offer suggestions for improvement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor="language-select" className="block text-sm font-medium text-muted-foreground mb-1">Select Language</label>
              <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
                <SelectTrigger id="language-select" className="w-full md:w-[200px] rounded-lg">
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
              <Button variant="outline" className="w-full md:w-auto rounded-lg" onClick={() => document.getElementById('file-upload')?.click()}>
                <Upload className="h-4 w-4 mr-2" /> Upload File
              </Button>
              <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept=".txt,.py,.js,.java,.cpp,.c" />
            </div>
          </div>
          
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here... (e.g., a function, a class, or a small script)"
            className="min-h-[300px] rounded-lg text-sm font-mono"
            aria-label="Code Input Area for Review"
          />
          <Button onClick={handleAnalyzeCode} disabled={isAnalyzing || !code.trim()} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-3 text-base">
            {isAnalyzing ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-5 w-5" />
            )}
            Get AI Review
          </Button>
        </CardContent>
      </Card>

      {(isAnalyzing || analysisResult) && (
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
               <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-semibold">AI Analysis Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="min-h-[150px]">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>Our AI is meticulously reviewing your code...</p>
              </div>
            ) : analysisResult ? (
              <ScrollArea className="h-[300px] md:h-[400px] p-1 rounded-md bg-muted/30">
                <pre className="whitespace-pre-wrap text-sm p-4 font-sans">{analysisResult}</pre>
              </ScrollArea>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
