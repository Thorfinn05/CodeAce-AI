import type { Problem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';

interface ProblemDetailsProps {
  problem: Problem | null;
}

export default function ProblemDetails({ problem }: ProblemDetailsProps) {
  if (!problem) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6"> {/* Removed Card component from here for full height */}
        <Info className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">Select a problem to view its details.</p>
        <p className="text-sm text-muted-foreground">Choose a challenge from the list to get started!</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden"> {/* Removed Card component for full height */}
      <CardHeader className="bg-card-foreground/5 p-4 border-b rounded-t-2xl"> {/* Apply rounding here if this is the top */}
        <CardTitle className="text-xl font-semibold text-foreground">{problem.title}</CardTitle>
        <div className="flex items-center space-x-2 mt-1">
          <Badge 
            className={`text-xs ${
              problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-700 border-green-500/30 dark:bg-green-700/30 dark:text-green-200 dark:border-green-700/40' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:bg-yellow-700/30 dark:text-yellow-200 dark:border-yellow-700/40' :
              'bg-red-500/20 text-red-700 border-red-500/30 dark:bg-red-700/30 dark:text-red-200 dark:border-red-700/40'
            }`}
          >
            {problem.difficulty}
          </Badge>
          <Badge variant="outline" className="border-accent/50 text-accent bg-accent/10 text-xs">{problem.topic}</Badge>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-4 space-y-4 text-sm">
          {problem.description && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">Description:</h4>
              <pre className="whitespace-pre-wrap font-sans text-muted-foreground bg-muted/30 p-3 rounded-md text-sm">{problem.description}</pre>
            </div>
          )}
          
          {problem.input_format && <Separator />}
          
          {problem.input_format && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">Input Format:</h4>
              <p className="text-muted-foreground">{problem.input_format}</p>
            </div>
          )}

          {problem.output_format && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">Output Format:</h4>
              <p className="text-muted-foreground">{problem.output_format}</p>
            </div>
          )}
          
          {problem.constraints && problem.constraints.length > 0 && <Separator />}
          
          {problem.constraints && problem.constraints.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">Constraints:</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="text-xs">{constraint}</li>
                ))}
              </ul>
            </div>
          )}
          
          {problem.sample_input && <Separator />}
          
          {problem.sample_input && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">Sample Input:</h4>
              <pre className="bg-muted/50 p-3 rounded-md text-muted-foreground font-mono text-xs">{problem.sample_input}</pre>
            </div>
          )}

          {problem.sample_output && (
            <div>
              <h4 className="font-semibold text-foreground mb-1">Sample Output:</h4>
              <pre className="bg-muted/50 p-3 rounded-md text-muted-foreground font-mono text-xs">{problem.sample_output}</pre>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </div>
  );
}
