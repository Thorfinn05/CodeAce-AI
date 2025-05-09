"use client";

import type { Problem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListFilter, Search, CodeXml } from 'lucide-react';
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
    <div className="h-full flex flex-col overflow-hidden bg-card/30 backdrop-blur-sm rounded-2xl border border-primary/10">
      <CardHeader className="bg-primary/5 p-4 border-b border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl font-semibold text-foreground font-poppins flex items-center gap-2">
            <CodeXml className="h-7 w-7 text-accent"/> Problem Arena
          </CardTitle>
          <ListFilter className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search problems by title or keyword..." 
              className="pl-12 w-full rounded-lg bg-background/70 h-11 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full rounded-lg bg-background/70 h-11 text-base">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficulties.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-full rounded-lg bg-background/70 h-11 text-base">
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
      <ScrollArea className="flex-grow">
        <CardContent className="p-0">
          {problems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-lg mb-1">No problems match your criteria.</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
          <ul className="divide-y divide-primary/10">
            {problems.map((problem) => (
              <li key={problem.id}>
                <Button
                  variant="ghost"
                  className={`w-full h-auto justify-start text-left p-4 rounded-none transition-all duration-200 ease-in-out
                              hover:bg-accent/10 
                              ${selectedProblemId === problem.id ? 'bg-accent/20 text-accent-foreground border-l-4 border-accent' : 'hover:text-accent-foreground'}`}
                  onClick={() => onSelectProblem(problem)}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-medium text-lg ${selectedProblemId === problem.id ? 'text-accent-foreground': 'text-foreground'}`}>{problem.title}</h3>
                      <Badge 
                        className={`text-xs font-medium border ${
                          problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 border-green-500/30' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30' :
                          'bg-red-500/10 text-red-600 border-red-500/30'
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
