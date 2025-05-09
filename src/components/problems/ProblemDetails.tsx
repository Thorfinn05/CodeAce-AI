import type { Problem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Info, FileText, AlertTriangle, CheckSquare, ListChecks } from 'lucide-react';

interface ProblemDetailsProps {
  problem: Problem | null;
}

export default function ProblemDetails({ problem }: ProblemDetailsProps) {
  if (!problem) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-card/30 backdrop-blur-sm rounded-2xl">
        <Info className="h-16 w-16 text-accent mb-6 opacity-70" />
        <p className="text-2xl font-semibold text-foreground mb-2 font-poppins">No Problem Selected</p>
        <p className="text-md text-muted-foreground">Choose a challenge from the list to view its details and start coding your solution.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-card/30 backdrop-blur-sm rounded-2xl border border-primary/10">
      <CardHeader className="bg-primary/5 p-4 border-b border-primary/10">
        <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-foreground font-poppins">{problem.title}</CardTitle>
            <FileText className="h-6 w-6 text-accent"/>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Badge 
            className={`text-xs font-medium border ${
              problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 border-green-500/30' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30' :
              'bg-red-500/10 text-red-600 border-red-500/30'
            }`}
          >
            {problem.difficulty}
          </Badge>
          <Badge variant="outline" className="border-accent/50 text-accent bg-accent/10 text-xs">{problem.topic}</Badge>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-6 space-y-5 text-sm">
          {problem.description && (
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-md flex items-center gap-2"><Info className="h-5 w-5 text-primary"/>Description:</h4>
              <div className="whitespace-pre-wrap font-sans text-muted-foreground bg-muted/20 p-4 rounded-lg border border-primary/5 text-sm leading-relaxed">{problem.description}</div>
            </div>
          )}
          
          {[
            { title: 'Input Format', value: problem.input_format, icon: <ListChecks className="h-5 w-5 text-primary"/> },
            { title: 'Output Format', value: problem.output_format, icon: <CheckSquare className="h-5 w-5 text-primary"/> },
          ].map(section => section.value && (
            <div key={section.title}>
              <Separator className="my-3 bg-primary/10"/>
              <h4 className="font-semibold text-foreground mb-2 text-md flex items-center gap-2">{section.icon}{section.title}:</h4>
              <p className="text-muted-foreground ml-7">{section.value}</p>
            </div>
          ))}
          
          {problem.constraints && problem.constraints.length > 0 && (
            <div>
              <Separator className="my-3 bg-primary/10"/>
              <h4 className="font-semibold text-foreground mb-2 text-md flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary"/>Constraints:</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-9 text-xs">
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          )}
          
          {problem.sample_input && (
            <div>
              <Separator className="my-3 bg-primary/10"/>
              <h4 className="font-semibold text-foreground mb-2 text-md">Sample Input:</h4>
              <pre className="bg-slate-800 text-slate-200 dark p-3 rounded-lg text-muted-foreground font-mono text-xs overflow-x-auto">{problem.sample_input}</pre>
            </div>
          )}

          {problem.sample_output && (
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-md">Sample Output:</h4>
              <pre className="bg-slate-800 text-slate-200 dark p-3 rounded-lg text-muted-foreground font-mono text-xs overflow-x-auto">{problem.sample_output}</pre>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </div>
  );
}
