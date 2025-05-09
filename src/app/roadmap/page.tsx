
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Zap, ArrowRight, Map, Brain, Star, Sparkles } from 'lucide-react'; // Changed MapChart to Map, Sparkles for recommendations
import { useAuth } from "@/hooks/use-auth";
import { mockProblems } from "@/lib/mock-data"; // For available topics
import Link from "next/link";
import Image from "next/image";

// Define categories for roadmap structure
const topicCategories = {
  "Core Concepts": ["Arrays", "Strings"],
  "Algorithmic Thinking": ["Recursion", "Sorting", "Searching"],
  "Advanced Data Structures": ["Trees", "Graphs", "Heaps"], // Heaps not in mock, add if needed
  "Problem Solving Paradigms": ["Dynamic Programming", "Greedy Algorithms"], // Greedy not in mock
};

const allAvailableTopics = Array.from(new Set(mockProblems.map(p => p.topic)));

export default function RoadmapPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-200px)]"><Zap className="h-12 w-12 text-accent animate-ping" /></div>;
  }

  if (!user) {
    // This should ideally be handled by a ProtectedRoute or in useAuth redirect
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
            <Lock className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">Please log in to view your personalized learning roadmap.</p>
            <Button asChild className="bg-accent hover:bg-accent/80">
                <Link href="/auth/signin">Sign In</Link>
            </Button>
        </div>
    );
  }

  const userProgress = user.progress?.topicMastery || {};

  const getTopicStatus = (topic: string) => {
    const mastery = userProgress[topic];
    if (mastery) {
      if (mastery.masteryLevel === "Expert" || mastery.masteryLevel === "Advanced") return { status: "mastered", icon: <Star className="h-6 w-6 text-yellow-400 filter drop-shadow-[0_0_3px_currentColor]" />, color: "border-yellow-400 bg-yellow-400/10" };
      if (mastery.masteryLevel === "Intermediate" || mastery.solved >= 2) return { status: "in-progress", icon: <Zap className="h-6 w-6 text-blue-400 filter drop-shadow-[0_0_3px_currentColor]" />, color: "border-blue-400 bg-blue-400/10" };
      if (mastery.solved >= 1) return { status: "started", icon: <CheckCircle className="h-6 w-6 text-green-400 filter drop-shadow-[0_0_3px_currentColor]" />, color: "border-green-400 bg-green-400/10" };
    }
    return { status: "locked", icon: <Lock className="h-6 w-6 text-muted-foreground" />, color: "border-muted bg-muted/30" };
  };

  // Placeholder for recommended next steps based on user progress
  const getRecommendations = () => {
    const recommendations = [];
    const masteredTopics = Object.entries(userProgress)
      .filter(([, data]) => data.masteryLevel === "Expert" || data.masteryLevel === "Advanced")
      .map(([topic]) => topic);

    const startedOrInProgressTopics = Object.entries(userProgress)
      .filter(([,data]) => data.solved > 0 && !masteredTopics.includes(data.masteryLevel as string)) // Assuming masteryLevel is a string
      .map(([topic]) => topic);

    if (startedOrInProgressTopics.length > 0) {
        recommendations.push(`Continue honing your skills in: ${startedOrInProgressTopics.slice(0,2).join(', ')}.`);
    }
    
    const unattemptedTopics = allAvailableTopics.filter(topic => !userProgress[topic] || userProgress[topic]?.solved === 0);
    if (unattemptedTopics.length > 0) {
      recommendations.push(`Explore new challenges in: ${unattemptedTopics[0]}.`);
    } else if (startedOrInProgressTopics.length === 0 && masteredTopics.length < allAvailableTopics.length) {
        const nextToMaster = allAvailableTopics.find(topic => !masteredTopics.includes(topic));
        if(nextToMaster) recommendations.push(`Focus on mastering: ${nextToMaster}.`);
    }

    if (recommendations.length === 0 && allAvailableTopics.length > 0) {
      recommendations.push("You're making great progress! Explore advanced topics or try harder problems in mastered areas.");
    } else if (allAvailableTopics.length === 0) {
      recommendations.push("No topics available yet. Check back soon!");
    }
    return recommendations;
  };
  const recommendations = getRecommendations();

  return (
    <div className="space-y-10">
      <Card className="shadow-2xl rounded-2xl glassmorphic border-primary/20 overflow-hidden">
        <CardHeader className="p-0 relative">
           <Image src="https://picsum.photos/seed/roadmap-banner/1200/300" alt="Futuristic Learning Path" width={1200} height={300} className="w-full h-auto object-cover opacity-60" data-ai-hint="abstract tech path" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
            <div className="flex items-center gap-3 mb-2">
                <Map className="h-12 w-12 text-accent filter drop-shadow-[0_0_5px_hsl(var(--accent))]" />
                <CardTitle className="text-4xl font-bold font-poppins text-white">Your Learning Roadmap</CardTitle>
            </div>
            <CardDescription className="text-lg text-slate-300">
                Chart your course to coding mastery. Unlock topics, track progress, and conquer new frontiers.
            </CardDescription>
           </div>
        </CardHeader>
      </Card>

      {Object.entries(topicCategories).map(([category, topicsInCategory]) => {
        const relevantTopics = topicsInCategory.filter(topic => allAvailableTopics.includes(topic));
        if (relevantTopics.length === 0) return null;

        return (
          <Card key={category} className="shadow-xl rounded-2xl glassmorphic border-primary/10">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-2xl font-poppins flex items-center gap-2">
                <Brain className="h-7 w-7 text-primary" /> {category}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantTopics.map((topic) => {
                const { status, icon, color } = getTopicStatus(topic);
                const masteryInfo = userProgress[topic];
                return (
                  <Card key={topic} className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-[1.02] ${color}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground font-poppins">{topic}</h3>
                      {icon}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {masteryInfo ? `${masteryInfo.solved} solved, ${masteryInfo.xp} XP` : "Not started"}
                    </p>
                    <p className={`text-sm font-medium ${
                       status === 'mastered' ? 'text-yellow-500' :
                       status === 'in-progress' ? 'text-blue-500' :
                       status === 'started' ? 'text-green-500' :
                       'text-muted-foreground'
                    }`}>
                      Level: {masteryInfo?.masteryLevel || 'Novice'}
                    </p>
                    <Button variant="link" asChild className="mt-3 px-0 text-accent hover:text-accent/80">
                        <Link href={`/practice?topic=${encodeURIComponent(topic)}`}>Practice {topic} <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      <Card className="shadow-xl rounded-2xl glassmorphic border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-poppins flex items-center gap-2"><Sparkles className="h-7 w-7 text-accent"/>Recommended Next Steps</CardTitle>
          <CardDescription>Based on your current progress, here are some tailored suggestions to guide your learning.</CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
              {recommendations.map((rec, index) => (
                  <li key={index} className="text-md">{rec}</li>
              ))}
            </ul>
          ) : (
            <p className="text-md text-muted-foreground">Your roadmap is wide open! Pick any topic to begin your journey.</p>
          )}
           <Button className="mt-6 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg neon-glow-accent" asChild>
                <Link href="/practice">Explore All Problems</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}

