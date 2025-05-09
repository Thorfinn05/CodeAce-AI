"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock, Zap, ArrowRight, Map } from 'lucide-react';
import { mockUserProgress, mockProblems } from "@/lib/mock-data";
import Image from "next/image";

// Helper to categorize topics for roadmap
const topicCategories = {
  "Fundamentals": ["Arrays", "Strings"],
  "Algorithms": ["Recursion", "Sorting", "Searching"],
  "Data Structures": ["Trees", "Graphs", "Heaps"],
  "Advanced": ["Dynamic Programming", "Greedy Algorithms"],
};

const allTopics = Array.from(new Set(mockProblems.map(p => p.topic)));

export default function RoadmapPage() {
  const userProgress = mockUserProgress;

  const getTopicStatus = (topic: string) => {
    const mastery = userProgress.topicMastery[topic];
    if (mastery && mastery.solved > 0) {
      if (mastery.masteryLevel === "Expert" || mastery.masteryLevel === "Advanced") return "mastered";
      if (mastery.solved >= 2) return "in-progress"; // Example: 2+ problems solved
      return "started";
    }
    return "locked";
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Map className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Your Learning Roadmap</CardTitle>
          </div>
          <CardDescription>
            Visualize your progress, discover new topics, and unlock your coding potential step by step.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Image src="https://picsum.photos/seed/roadmap/1000/300" alt="Abstract learning path" width={1000} height={300} className="w-full h-auto rounded-lg mb-6 object-cover" data-ai-hint="learning path" />
          <p className="text-muted-foreground mb-6">
            This roadmap helps you track topics you've engaged with and suggests areas to explore next. 
            Master concepts by solving problems and earning XP!
          </p>
        </CardContent>
      </Card>

      {Object.entries(topicCategories).map(([category, topicsInCategory]) => (
        <Card key={category} className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">{category}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicsInCategory.filter(topic => allTopics.includes(topic)).map((topic) => {
              const status = getTopicStatus(topic);
              const masteryInfo = userProgress.topicMastery[topic];
              return (
                <Card key={topic} className={`p-4 rounded-lg border-2 ${
                  status === 'mastered' ? 'border-green-500 bg-green-500/10' :
                  status === 'in-progress' ? 'border-blue-500 bg-blue-500/10' :
                  status === 'started' ? 'border-yellow-500 bg-yellow-500/10' :
                  'border-muted bg-muted/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{topic}</h3>
                    {status === 'mastered' && <CheckCircle className="h-6 w-6 text-green-500" />}
                    {status === 'in-progress' && <Zap className="h-6 w-6 text-blue-500" />}
                    {status === 'started' && <ArrowRight className="h-6 w-6 text-yellow-500" />}
                    {status === 'locked' && <Lock className="h-6 w-6 text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {masteryInfo ? `${masteryInfo.solved} solved, ${masteryInfo.xp} XP` : "Not started"}
                  </p>
                  <p className={`text-xs font-medium ${
                     status === 'mastered' ? 'text-green-600' :
                     status === 'in-progress' ? 'text-blue-600' :
                     status === 'started' ? 'text-yellow-600' :
                     'text-muted-foreground'
                  }`}>
                    Level: {masteryInfo?.masteryLevel || 'Novice'}
                  </p>
                  {/* Could add a button to go to problems of this topic */}
                </Card>
              );
            })}
          </CardContent>
        </Card>
      ))}

      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
          <CardDescription>Based on your progress, here are some suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Challenge yourself with a 'Medium' difficulty problem in Arrays.</li>
            <li>Start exploring the 'Recursion' topic.</li>
            <li>Review solutions for problems you found difficult.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
