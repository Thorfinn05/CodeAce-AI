import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb, Loader2, BotMessageSquare, AlertCircle } from 'lucide-react'; // Replaced Bot with BotMessageSquare

interface AnalysisResultProps {
  result: string | null;
  isLoading: boolean;
}

export default function AnalysisResult({ result, isLoading }: AnalysisResultProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
          <Loader2 className="h-10 w-10 text-accent animate-spin mb-4" />
          <p className="font-semibold text-lg text-foreground">AI Coach is Analyzing...</p>
          <p className="text-sm">Generating insights for your code. This might take a moment.</p>
        </div>
      );
    }

    if (!result) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
          <BotMessageSquare className="h-12 w-12 text-accent opacity-70 mb-4" />
          <p className="font-semibold text-lg text-foreground">AI Feedback Panel</p>
          <p className="text-sm">Submit your code for analysis, or if you've solved a problem, feedback will appear here.</p>
        </div>
      );
    }
    
    // Check for common error messages from AI (example)
    if (result.toLowerCase().includes("error analyzing code")) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-destructive p-6 text-center">
                <AlertCircle className="h-12 w-12 mb-4" />
                <p className="font-semibold text-lg">Analysis Error</p>
                <p className="text-sm">{result}</p>
            </div>
        );
    }

    return (
      // Max height can be adjusted based on typical content length or parent container constraints
      <ScrollArea className="h-full max-h-[calc(100%-1rem)] p-1"> {/* Ensure ScrollArea takes available height, p-1 for scrollbar */}
        <pre className="whitespace-pre-wrap text-sm text-foreground p-4 font-sans leading-relaxed">{result}</pre>
      </ScrollArea>
    );
  };
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-card/30 backdrop-blur-sm rounded-2xl border border-primary/10">
      <CardHeader className="bg-primary/5 p-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
           <Lightbulb className="h-6 w-6 text-accent" />
          <CardTitle className="text-xl font-semibold text-foreground font-poppins">AI Coach Feedback</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-2 flex-grow"> {/* Adjust padding as needed for ScrollArea */}
        {renderContent()}
      </CardContent>
    </div>
  );
}
