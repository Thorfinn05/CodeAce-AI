"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressTracker from '@/components/tracking/ProgressTracker'; 
import { ArrowRight, BookOpen, Code, PlayCircle, BarChart3, UserCircle, Bot, Archive, Award, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { mockProblems } from '@/lib/mock-data'; // For suggested problems, will be dynamic later
import type { Problem } from '@/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const motivationalQuotes = [
  "The future belongs to those who learn more skills and combine them in creative ways. - Robert Greene",
  "Code is the universal language of the digital age. Master it, and you shape tomorrow. - CodeAce AI",
  "Every line of code is a step towards innovation. Keep building. - Anonymous Futurist",
  "Algorithm by algorithm, you are architecting the future. - Inspired by S. Wolfram"
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [randomQuote, setRandomQuote] = useState('');
  const [suggestedProblems, setSuggestedProblems] = useState<Problem[]>([]);
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]); // Placeholder

  useEffect(() => {
    setRandomQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    // Placeholder for fetching suggested and recent problems based on user.progress
    if (user) {
      // Example: Fetch 3 random problems as suggestions
      const shuffled = [...mockProblems].sort(() => 0.5 - Math.random());
      setSuggestedProblems(shuffled.slice(0, 3));
      // Example: Fetch last 2 solved problems (if IDs stored in user.progress.solvedProblems)
      // For now, just mock it if user.progress.lastProblemId or solvedProblems array is available
      if (user.progress?.lastProblemId) {
        const lastProblem = mockProblems.find(p => p.id === user.progress.lastProblemId);
        if (lastProblem) setRecentProblems([lastProblem]);
      } else if(user.progress?.solvedProblems && Object.keys(user.progress.solvedProblems).length > 0) {
         const solvedIds = Object.keys(user.progress.solvedProblems);
         const recent = mockProblems.filter(p => solvedIds.includes(p.id)).slice(0,2);
         setRecentProblems(recent);
      }
    }
  }, [user]);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-200px)]"><Zap className="h-16 w-16 text-accent animate-pulse" /> <span className="ml-4 text-xl font-semibold">Loading Dashboard...</span></div>;
  }

  if (!user) {
     // This should ideally be handled by a protected route wrapper
    return <div className="text-center p-8">Redirecting to login...</div>;
  }

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

      {/* Real-time user data component - This should fetch from Firestore via useAuth or a dedicated hook */}
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
            { title: "Practice Arena", icon: Code, href: "/practice", desc: "Hone skills with diverse problems." },
            { title: "AI Code Coach", icon: Bot, href: "/code-review", desc: "Get AI insights on your code." },
            { title: "Learning Roadmap", icon: BarChart3, href: "/roadmap", desc: "Track your mastery journey." },
            { title: "Snippet Library", icon: Archive, href: "/snippets", desc: "Your personal code vault." },
            { title: "Leaderboard", icon: Award, href: "/leaderboard", desc: "See where you stand." },
            { title: "Profile Page", icon: UserCircle, href: "/profile", desc: "Customize and view stats." },
          ].map(item => (
            <Card key={item.title} className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl glassmorphic group hover:border-accent/50">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/10 rounded-full mb-3 group-hover:scale-110 transition-transform">{React.createElement(item.icon, { className: "h-8 w-8 text-accent" })}</div>
                <CardTitle className="font-poppins text-xl">{item.title}</CardHeader>
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
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-muted text-muted-foreground border-border">
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
