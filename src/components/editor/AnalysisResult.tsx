import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Removed Card
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb, Loader2 } from 'lucide-react';

interface AnalysisResultProps {
  result: string | null;
  isLoading: boolean;
}

export default function AnalysisResult({ result, isLoading }: AnalysisResultProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
          <Loader2 className="h-8 w-8 mr-2 text-primary animate-spin mb-2" />
          <p className="font-semibold">AI Mentor is thinking...</p>
          <p className="text-sm">Analyzing your code for feedback.</p>
        </div>
      );
    }

    if (!result) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
          <Lightbulb className="h-8 w-8 mr-2 text-muted-foreground mb-2" />
          <p className="font-semibold">Awaiting Your Code</p>
          <p className="text-sm text-center">Submit your code to get AI-powered feedback on efficiency, style, and potential errors.</p>
        </div>
      );
    }
    
    return (
      <ScrollArea className="h-full max-h-[200px] md:max-h-[250px]"> {/* Ensure ScrollArea takes available height */}
        <pre className="whitespace-pre-wrap text-sm text-foreground p-4 font-sans">{result}</pre>
      </ScrollArea>
    );
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden"> {/* Removed Card component for full height */}
      <CardHeader className="bg-card-foreground/5 p-4 border-b rounded-t-2xl"> {/* Apply rounding here if this is the top */}
        <div className="flex items-center">
           <Lightbulb className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-xl font-semibold text-foreground">AI Feedback</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow"> {/* Remove padding and allow content to fill */}
        {renderContent()}
      </CardContent>
    </div>
  );
}
