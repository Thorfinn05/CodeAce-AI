"use client";

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Edit3, Loader2, CheckCircle, Send } from 'lucide-react';
import type { SupportedLanguage } from '@/types';
import { availableLanguages } from '@/lib/mock-data';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  onAnalyze: () => void;
  onSubmit: () => void; // New prop for submitting code
  isLoadingAnalysis: boolean;
  isLoadingSubmission: boolean; // New prop for submission loading state
  selectedProblemTitle?: string | null;
  editorHeight?: string;
  editorClassName?: string; // For specific editor styling e.g. dark theme
}

export default function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  onAnalyze,
  onSubmit,
  isLoadingAnalysis,
  isLoadingSubmission,
  selectedProblemTitle,
  editorHeight = "calc(100% - 120px)", // Adjusted for two buttons
  editorClassName = ""
}: CodeEditorProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.currentTarget;
      const tab = '  '; 
      const newCode = value.substring(0, selectionStart) + tab + value.substring(selectionEnd);
      setCode(newCode);
      
      setTimeout(() => {
        if(event.currentTarget) {
             event.currentTarget.selectionStart = event.currentTarget.selectionEnd = selectionStart + tab.length;
        }
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <CardHeader className="bg-card-foreground/5 p-4 border-b rounded-t-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center">
            <Edit3 className="h-6 w-6 mr-2 text-accent shrink-0" />
            <CardTitle className="text-xl font-semibold text-foreground truncate font-poppins">
              Code Editor {selectedProblemTitle ? `- ${selectedProblemTitle}` : ''}
              {/* <span className="ml-2 text-sm text-muted-foreground">(Monaco Editor Placeholder)</span> */}
            </CardTitle>
          </div>
          <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-lg bg-background/70">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map(lang => (
                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`// Your futuristic code for ${selectedProblemTitle || 'a new challenge'} in ${language} goes here...`}
          className={`code-editor-textarea flex-grow resize-none text-sm leading-relaxed rounded-lg shadow-inner ${editorClassName}`}
          style={{ height: editorHeight }}
          aria-label="Code Input Area"
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            onClick={onAnalyze} 
            disabled={isLoadingAnalysis || isLoadingSubmission || !code.trim()} 
            className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg py-3 text-base"
          >
            {isLoadingAnalysis ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Bot className="mr-2 h-5 w-5" />
            )}
            AI Coach Review
          </Button>
          <Button 
            onClick={onSubmit} 
            disabled={isLoadingAnalysis || isLoadingSubmission || !code.trim() || !selectedProblemTitle} 
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg py-3 text-base neon-glow-accent"
          >
            {isLoadingSubmission ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Send className="mr-2 h-5 w-5" /> // Or CheckCircle
            )}
            Submit Solution
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
