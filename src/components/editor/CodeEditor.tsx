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
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Removed Card
import { Bot, Edit3, Loader2 } from 'lucide-react';
import type { SupportedLanguage } from '@/types';
import { availableLanguages } from '@/lib/mock-data';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  selectedProblemTitle?: string | null;
  editorHeight?: string;
}

export default function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  onAnalyze,
  isLoading,
  selectedProblemTitle,
  editorHeight = "calc(100% - 70px)" 
}: CodeEditorProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.currentTarget;
      // Basic tab insertion, might need more sophisticated handling for multi-line or existing selections
      const tab = '  '; // two spaces for tab
      const newCode = value.substring(0, selectionStart) + tab + value.substring(selectionEnd);
      setCode(newCode);
      
      setTimeout(() => {
        if(event.currentTarget) { // Check if currentTarget is still available
             event.currentTarget.selectionStart = event.currentTarget.selectionEnd = selectionStart + tab.length;
        }
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden"> {/* Removed Card component for full height */}
      <CardHeader className="bg-card-foreground/5 p-4 border-b rounded-t-2xl"> {/* Apply rounding here if this is the top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center">
            <Edit3 className="h-5 w-5 mr-2 text-primary shrink-0" />
            <CardTitle className="text-lg sm:text-xl font-semibold text-foreground truncate">
              Code Editor {selectedProblemTitle ? `- ${selectedProblemTitle}` : ''}
            </CardTitle>
          </div>
          <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-lg">
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
          placeholder={`// Start coding in ${language}...\n// ${selectedProblemTitle ? `Solution for ${selectedProblemTitle}` : 'Your awesome code here!'}`}
          className="code-editor-textarea flex-grow resize-none text-sm leading-relaxed rounded-lg" // Added rounded-lg
          style={{ height: editorHeight }}
          aria-label="Code Input Area"
        />
        <Button 
          onClick={onAnalyze} 
          disabled={isLoading || !code.trim()} 
          className="mt-4 w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-3 text-base" // Added rounded-lg
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Bot className="mr-2 h-5 w-5" />
          )}
          Analyze with AI
        </Button>
      </CardContent>
    </div>
  );
}
