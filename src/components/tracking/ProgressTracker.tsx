import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle2, Award } from 'lucide-react';
import { mockUserProgress } from '@/lib/mock-data'; // Using mock data

export default function ProgressTracker() {
  const progress = mockUserProgress; // In a real app, this would come from state/props/API

  const totalProblems = 20; // Example total problems
  const solvedPercentage = (progress.solvedProblems.length / totalProblems) * 100;

  return (
    <Card className="shadow-lg rounded-lg mb-6">
      <CardHeader className="bg-card-foreground/5">
        <div className="flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-accent" />
          <CardTitle className="text-xl font-semibold text-foreground">Your Progress</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-foreground">Problems Solved</span>
            <span className="text-accent">{progress.solvedProblems.length} / {totalProblems}</span>
          </div>
          <Progress value={solvedPercentage} aria-label={`${Math.round(solvedPercentage)}% problems solved`} className="h-3 [&>div]:bg-accent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total XP Earned</p>
              <p className="font-semibold text-foreground">{progress.xp} XP</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
            <Award className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Badges Unlocked</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {progress.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{badge.replace(/([A-Z])/g, ' $1').trim()}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-semibold text-foreground mb-2">Topic Mastery:</h4>
          <div className="space-y-3">
            {Object.entries(progress.topicMastery).map(([topic, data]) => (
              <div key={topic} className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-foreground">{topic} ({data.masteryLevel})</span>
                  <span className="text-muted-foreground">{data.solved} solved, {data.xp} XP</span>
                </div>
                 <Progress value={(data.solved / 5) * 100} aria-label={`${topic} progress`} className="h-2 [&>div]:bg-primary/70" /> {/* Assuming 5 problems per topic for mastery step */}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
