import type { Problem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface ProblemDetailsProps {
  problem: Problem | null;
}

export default function ProblemDetails({ problem }: ProblemDetailsProps) {
  if (!problem) {
    return (
      <Card className="h-full flex items-center justify-center shadow-lg rounded-lg">
        <CardContent className="text-center">
          <p className="text-muted-foreground">Select a problem to view its details.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-card-foreground/5 p-4 border-b">
        <CardTitle className="text-xl font-semibold text-foreground">{problem.title}</CardTitle>
        <div className="flex items-center space-x-2 mt-1">
          <Badge 
            variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}
            className={
              problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-700 border-green-500/30 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20' :
              'bg-red-500/20 text-red-700 border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
            }
          >
            {problem.difficulty}
          </Badge>
          <Badge variant="outline" className="border-accent/50 text-accent">{problem.topic}</Badge>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-4 space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-foreground mb-1">Description:</h4>
            <pre className="whitespace-pre-wrap font-sans text-muted-foreground bg-muted/50 p-3 rounded-md">{problem.description}</pre>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-foreground mb-1">Input Format:</h4>
            <p className="text-muted-foreground">{problem.input_format}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Output Format:</h4>
            <p className="text-muted-foreground">{problem.output_format}</p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-foreground mb-1">Constraints:</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {problem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-foreground mb-1">Sample Input:</h4>
            <pre className="bg-muted/80 dark:bg-muted/50 p-3 rounded-md text-muted-foreground font-mono text-xs">{problem.sample_input}</pre>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Sample Output:</h4>
            <pre className="bg-muted/80 dark:bg-muted/50 p-3 rounded-md text-muted-foreground font-mono text-xs">{problem.sample_output}</pre>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
