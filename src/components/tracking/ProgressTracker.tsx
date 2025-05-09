import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle2, Award, Target, Activity, ShieldCheck } from 'lucide-react';
import { mockProblems } from '@/lib/mock-data'; // Using mock data for total problem count
import type { UserData } from '@/types';

interface ProgressTrackerProps {
  userData: UserData | null;
}

export default function ProgressTracker({ userData }: ProgressTrackerProps) {
  if (!userData || !userData.progress) {
    return (
      <Card className="shadow-xl rounded-2xl glassmorphic">
        <CardHeader>
          <CardTitle className="text-xl font-poppins">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading user progress...</p>
        </CardContent>
      </Card>
    );
  }
  
  const { progress } = userData;
  const totalProblems = mockProblems.length; // This should ideally come from a dynamic source
  const solvedProblemCount = Object.keys(progress.solvedProblems || {}).length;
  const solvedPercentage = totalProblems > 0 ? (solvedProblemCount / totalProblems) * 100 : 0;

  return (
    <Card className="shadow-2xl rounded-2xl glassmorphic border-primary/20">
      <CardHeader className="bg-card-foreground/5 rounded-t-2xl border-b border-primary/10">
        <div className="flex items-center">
          <TrendingUp className="h-7 w-7 mr-3 text-accent" />
          <CardTitle className="text-2xl font-semibold text-foreground font-poppins">Your Progress Matrix</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center font-medium">
            <span className="text-foreground flex items-center text-lg"><Target className="h-5 w-5 mr-2 text-accent"/>Problems Solved</span>
            <span className="text-accent text-2xl font-bold">{solvedProblemCount} / {totalProblems}</span>
          </div>
          <Progress value={solvedPercentage} aria-label={`${Math.round(solvedPercentage)}% problems solved`} className="h-4 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-teal-400 [&>div]:to-accent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl border border-primary/10">
            <CheckCircle2 className="h-8 w-8 text-green-400 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Total XP Earned</p>
              <p className="text-2xl font-bold text-foreground">{progress.xp || 0} XP</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl border border-primary/10">
            <Activity className="h-8 w-8 text-red-400 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-foreground">{progress.streaks?.current || 0} Days</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl border border-primary/10">
            <Award className="h-8 w-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Badges</p>
              {progress.badges && progress.badges.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {progress.badges.slice(0,3).map((badge, index) => ( // Show max 3 badges for brevity
                    <Badge key={index} variant="secondary" className="text-xs bg-accent/20 text-accent-foreground border-accent/30">
                      {badge.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  ))}
                  {progress.badges.length > 3 && <Badge variant="outline" className="text-xs">+{progress.badges.length - 3} more</Badge>}
                </div>
              ) : (
                 <p className="text-sm text-foreground mt-1">No badges yet.</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3 font-poppins">Topic Mastery</h4>
          {Object.keys(progress.topicMastery || {}).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(progress.topicMastery).map(([topic, data]) => (
                <div key={topic} className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="text-foreground font-medium">{topic}</span>
                      <Badge variant="outline" className="text-xs ml-2 border-primary/30">{data.masteryLevel}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{data.solved} solved, {data.xp} XP</span>
                  </div>
                   <Progress value={data.solved > 0 ? (data.solved / (mockProblems.filter(p=>p.topic === topic).length || 5) ) * 100 : 0} aria-label={`${topic} progress`} className="h-2.5 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-sky-400 [&>div]:to-primary" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Start solving problems to build your Topic Mastery Matrix!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
