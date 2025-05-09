import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb } from 'lucide-react';

interface AnalysisResultProps {
  result: string | null;
  isLoading: boolean;
}

export default function AnalysisResult({ result, isLoading }: AnalysisResultProps) {
  if (isLoading) {
     return (
      <Card className="shadow-lg rounded-lg mt-6">
        <CardHeader className="bg-card-foreground/5">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-accent animate-pulse" />
            <CardTitle className="text-xl font-semibold text-foreground">AI Feedback</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 min-h-[150px] flex items-center justify-center">
          <p className="text-muted-foreground">Analyzing your code...</p>
        </CardContent>
      </Card>
    );
  }

  if (!result && !isLoading) {
    return (
       <Card className="shadow-lg rounded-lg mt-6">
        <CardHeader className="bg-card-foreground/5">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-accent" />
            <CardTitle className="text-xl font-semibold text-foreground">AI Feedback</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 min-h-[150px] flex items-center justify-center">
          <p className="text-muted-foreground">Submit your code to get AI-powered feedback.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-lg rounded-lg mt-6">
      <CardHeader className="bg-card-foreground/5">
        <div className="flex items-center">
           <Lightbulb className="h-5 w-5 mr-2 text-accent" />
          <CardTitle className="text-xl font-semibold text-foreground">AI Feedback</CardTitle>
        </div>
      </CardHeader>
      <ScrollArea className="h-[200px] md:h-[250px]">
        <CardContent className="p-4">
          <pre className="whitespace-pre-wrap text-sm text-foreground">{result}</pre>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
