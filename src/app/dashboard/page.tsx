
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import ProgressTracker from '@/components/tracking/ProgressTracker'; 
import { ArrowRight, PlayCircle, BarChart3, UserCircle, Bot, Archive, Award, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { mockProblems } from '@/lib/mock-data';
import type { Problem } from '@/types';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const motivationalQuotes = [
  "The future belongs to those who learn more skills and combine them in creative ways. - Robert Greene",
  "Code is the universal language of the digital age. Master it, and you shape tomorrow. - CodeAce AI",
  "Every line of code is a step towards innovation. Keep building. - Anonymous Futurist",
  "Algorithm by algorithm, you are architecting the future. - Inspired by S. Wolfram"
];

// Placeholder for Code icon if not available in lucide-react, or use a generic one
const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);


export default function DashboardPage() {
  const { user, firebaseUser, loading, refreshUserData } = useAuth();
  const router = useRouter();
  const [randomQuote, setRandomQuote] = useState('');
  const [suggestedProblems, setSuggestedProblems] = useState<Problem[]>([]);
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);

  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.push('/auth/signin');
    }
  }, [loading, firebaseUser, router]);

  useEffect(() => {
    setRandomQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    if (user) { // Check if user (Firestore data) is available
      const shuffled = [...mockProblems].sort(() => 0.5 - Math.random());
      setSuggestedProblems(shuffled.slice(0, 3));
      
      const lastProblemId = user.progress?.lastProblemId;
      const solvedProblemsMap = user.progress?.solvedProblems;

      if (lastProblemId) {
        const lastProblem = mockProblems.find(p => p.id === lastProblemId);
        if (lastProblem) setRecentProblems([lastProblem]);
      } else if (solvedProblemsMap && Object.keys(solvedProblemsMap).length > 0) {
         const solvedIds = Object.keys(solvedProblemsMap);
         const recent = mockProblems.filter(p => solvedIds.includes(p.id))
                          .sort((a,b) => {
                            const dateA = solvedProblemsMap[a.id];
                            const dateB = solvedProblemsMap[b.id];
                            // Ensure dates are actual Date objects or Timestamps
                            const timeA = (dateA instanceof Date ? dateA : (dateA as any)?.toDate?.())?.getTime() || 0;
                            const timeB = (dateB instanceof Date ? dateB : (dateB as any)?.toDate?.())?.getTime() || 0;
                            return timeB - timeA; // Sort by most recent
                          })
                          .slice(0,2);
         setRecentProblems(recent);
      }
    } else {
        // Reset if user data is not available (e.g., after logout)
        setSuggestedProblems([]);
        setRecentProblems([]);
    }
  }, [user]); // Depend on user (Firestore data)
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 text-accent animate-spin mb-4" /> 
        <span className="text-xl font-semibold text-muted-foreground">Loading Dashboard...</span>
      </div>
    );
  }

  if (!firebaseUser) {
    // This state should be brief as useEffect will redirect.
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Zap className="h-16 w-16 text-primary mb-4" />
        <p className="text-xl font-semibold text-muted-foreground">Redirecting to sign-in...</p>
      </div>
    );
  }
  
  if (!user) {
    // Firebase user is authenticated, but Firestore user data is not loaded.
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
        <p className="text-muted-foreground mb-4">We couldn't load your profile data. This might be a temporary issue.</p>
        <Button onClick={async () => { await refreshUserData(); router.refresh(); }} className="bg-accent hover:bg-accent/80">
          <Loader2 className="mr-2 h-4 w-4 animate-spin hidden" /> Try Again
        </Button>
         <p className="text-sm text-muted-foreground mt-6">If the problem persists, please <Link href="/auth/signout" className="underline hover:text-accent">sign out</Link> and sign in again.</p>
      </div>
    );
  }; // Added semicolon here

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-tr from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-2xl rounded-2xl p-6 md:p-8 neon-glow-primary">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins">Welcome, {user.displayName || 'Ace Coder'}!</h1>
            {randomQuote && (
              <p className="text-lg opacity-90 mt-2 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-300" /> 
                <em>{randomQuote}</em>
              </p>
            )}
            <div className="mt-3 text-sm opacity-80">
              <p>XP: <span className="font-bold">{user.progress?.xp || 0}</span> | Current Streak: <span className="font-bold">{user.progress?.streaks?.current || 0} days</span></p>
            </div>
          </div>
          <Button size="lg" className="mt-6 md:mt-0 bg-accent hover:bg-accent/80 text-accent-foreground rounded-xl px-6 py-3 text-base shadow-lg neon-glow-accent" asChild>
            <Link href="/practice">
              <PlayCircle className="mr-2 h-5 w-5" /> Dive into Practice
            </Link>
          </Button>
        </div>
      </Card>

      <ProgressTracker userData={user} />

      {recentProblems.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground font-poppins">Continue Where You Left Off</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProblems.map(problem => (
               <Card key={problem.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl glassmorphic">
                <CardHeader>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                  <CardDescription>{problem.topic} - {problem.difficulty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{problem.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg" asChild>
                    <Link href={`/practice?problem=${problem.id}`}>Resume Problem <ArrowRight className="ml-2 h-4 w-4"/></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-foreground font-poppins">Explore CodeAce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Practice Arena", icon: CodeIcon, href: "/practice", desc: "Hone skills with diverse problems." },
            { title: "AI Code Coach", icon: Bot, href: "/code-review", desc: "Get AI insights on your code." },
            { title: "Learning Roadmap", icon: BarChart3, href: "/roadmap", desc: "Track your mastery journey." },
            { title: "Snippet Library", icon: Archive, href: "/snippets", desc: "Your personal code vault." },
            { title: "Leaderboard", icon: Award, href: "/leaderboard", desc: "See where you stand." },
            { title: "Profile Page", icon: UserCircle, href: "/profile", desc: "Customize and view stats." },
          ].map(item => (
            <Card key={item.title} className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl glassmorphic group hover:border-accent/50">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  {React.createElement(item.icon, { className: "h-8 w-8 text-accent" })}
                </div>
                <CardTitle className="font-poppins text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="outline" className="w-full rounded-lg border-accent/30 hover:bg-accent/10 hover:text-accent" asChild>
                  <Link href={item.href}>Explore <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {suggestedProblems.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground font-poppins">Suggested Next Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedProblems.map((problem) => (
              <Card key={problem.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl glassmorphic">
                <CardHeader>
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                      problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 border-green-500/30' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30' :
                      'bg-red-500/10 text-red-600 border-red-500/30'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-muted text-muted-foreground border">
                      {problem.topic}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm line-clamp-3">{problem.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg" asChild>
                    <Link href={`/practice?problem=${problem.id}`}>Attempt Problem</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
