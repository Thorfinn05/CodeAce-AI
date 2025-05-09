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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  editorHeight = "calc(100% - 150px)" // Default height, adjust as needed
}: CodeEditorProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.currentTarget;
      const newCode = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);
      setCode(newCode);
      // Move cursor after inserted tabs
      // This needs to be deferred to allow React to update the textarea's value
      setTimeout(() => {
        event.currentTarget.selectionStart = event.currentTarget.selectionEnd = selectionStart + 2;
      }, 0);
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-card-foreground/5 p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Edit3 className="h-5 w-5 mr-2 text-accent" />
            <CardTitle className="text-xl font-semibold text-foreground">
              Code Editor {selectedProblemTitle ? `- ${selectedProblemTitle}` : ''}
            </CardTitle>
          </div>
          <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLanguage)}>
            <SelectTrigger className="w-[180px]">
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
          placeholder="Write your code here..."
          className="code-editor-textarea flex-grow resize-none text-sm leading-relaxed"
          style={{ height: editorHeight }}
          aria-label="Code Input Area"
        />
        <Button onClick={onAnalyze} disabled={isLoading || !code.trim()} className="mt-4 w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          Analyze Code
        </Button>
      </CardContent>
    </Card>
  );
}
