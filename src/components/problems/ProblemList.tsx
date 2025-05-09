"use client";

import type { Problem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardDescription
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListFilter, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProblemListProps {
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  selectedProblemId?: string | null;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
  topicFilter: string;
  setTopicFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  topics: string[];
  difficulties: string[];
}

export default function ProblemList({
  problems,
  onSelectProblem,
  selectedProblemId,
  difficultyFilter,
  setDifficultyFilter,
  topicFilter,
  setTopicFilter,
  searchTerm,
  setSearchTerm,
  topics,
  difficulties,
}: ProblemListProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden"> {/* Removed Card component from here to use full height of parent Card */}
      <CardHeader className="bg-card-foreground/5 p-4 border-b rounded-t-2xl"> {/* Apply rounding here if this is the top */}
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">Coding Problems</CardTitle>
          <ListFilter className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search problems by title or keyword..." 
              className="pl-10 w-full rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full rounded-lg">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficulties.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-full rounded-lg">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow"> {/* ScrollArea for the list items */}
        <CardContent className="p-0">
          {problems.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <p>No problems match your filters.</p>
              <p className="text-sm">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
          <ul className="divide-y divide-border">
            {problems.map((problem) => (
              <li key={problem.id}>
                <Button
                  variant="ghost"
                  className={`w-full h-auto justify-start text-left p-4 rounded-none hover:bg-accent/10 ${selectedProblemId === problem.id ? 'bg-accent/20 text-accent-foreground' : ''}`}
                  onClick={() => onSelectProblem(problem)}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-medium ${selectedProblemId === problem.id ? 'text-accent-foreground': 'text-foreground'}`}>{problem.title}</h3>
                      <Badge 
                        variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                        className={`text-xs ${
                          problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-700 border-green-500/30 dark:bg-green-700/30 dark:text-green-200 dark:border-green-700/40' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:bg-yellow-700/30 dark:text-yellow-200 dark:border-yellow-700/40' :
                          'bg-red-500/20 text-red-700 border-red-500/30 dark:bg-red-700/30 dark:text-red-200 dark:border-red-700/40'
                        }`}
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>
                    <p className={`text-xs ${selectedProblemId === problem.id ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>{problem.topic}</p>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
          )}
        </CardContent>
      </ScrollArea>
    </div>
  );
}
