import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle2, Award, Target } from 'lucide-react';
import { mockUserProgress, mockProblems } from '@/lib/mock-data'; // Using mock data
import type { UserProgress } from '@/types';

export default function ProgressTracker() {
  const progress: UserProgress = mockUserProgress; 
  const totalProblems = mockProblems.length; // Dynamic total problems
  const solvedPercentage = totalProblems > 0 ? (progress.solvedProblems.length / totalProblems) * 100 : 0;

  return (
    <Card className="shadow-xl rounded-2xl">
      <CardHeader className="bg-card-foreground/5 rounded-t-2xl">
        <div className="flex items-center">
          <TrendingUp className="h-7 w-7 mr-3 text-primary" />
          <CardTitle className="text-2xl font-semibold text-foreground">Your Progress Overview</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center font-medium">
            <span className="text-foreground flex items-center"><Target className="h-5 w-5 mr-2 text-primary"/>Problems Solved</span>
            <span className="text-primary text-lg font-bold">{progress.solvedProblems.length} / {totalProblems}</span>
          </div>
          <Progress value={solvedPercentage} aria-label={`${Math.round(solvedPercentage)}% problems solved`} className="h-3 [&>div]:bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl border">
            <CheckCircle2 className="h-7 w-7 text-green-500 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Total XP Earned</p>
              <p className="text-xl font-bold text-foreground">{progress.xp} XP</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-xl border">
            <Award className="h-7 w-7 text-yellow-500 shrink-0 mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Badges Unlocked</p>
              {progress.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {progress.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">
                      {badge.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  ))}
                </div>
              ) : (
                 <p className="text-sm text-foreground mt-1">No badges yet. Keep coding!</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3">Topic Mastery:</h4>
          {Object.keys(progress.topicMastery).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(progress.topicMastery).map(([topic, data]) => (
                <div key={topic} className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="text-foreground font-medium">{topic}</span>
                      <span className="text-xs text-muted-foreground ml-2">({data.masteryLevel})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{data.solved} solved, {data.xp} XP</span>
                  </div>
                   <Progress value={data.solved > 0 ? (data.solved / (mockProblems.filter(p=>p.topic === topic).length || 5) ) * 100 : 0} aria-label={`${topic} progress`} className="h-2 [&>div]:bg-accent" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Start solving problems to see your topic mastery here!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
