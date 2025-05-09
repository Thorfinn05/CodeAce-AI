"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressTracker from '@/components/tracking/ProgressTracker'; // Re-using existing component
import { Lightbulb, BookOpen, Users, Code, PlayCircle, BarChart3, UserCircle } from 'lucide-react';
import { mockProblems } from '@/lib/mock-data'; // For suggested problems
import type { Problem } from '@/types';

// Mock data, replace with actual user data later
const userName = "Alex Coder"; 
const motivationalQuotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Code is like humor. When you have to explain it, it’s bad. - Cory House",
  "The best error message is the one that never shows up. - Thomas Fuchs",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it. - Patrick McKenzie"
];

export default function DashboardPage() {
  // In a real app, fetch suggested problems based on user progress/AI
  const suggestedProblems: Problem[] = mockProblems.slice(0, 3); 
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-lg opacity-90 mt-2 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-300" /> 
              <em>{randomQuote}</em>
            </p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0 bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="/practice">
              <PlayCircle className="mr-2 h-5 w-5" /> Start Practicing
            </Link>
          </Button>
        </div>
      </Card>

      <ProgressTracker />

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Browse Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Explore a wide range of coding challenges.</CardDescription>
              <Button variant="link" className="px-0 text-accent" asChild><Link href="/practice">Go to Practice <Code className="ml-1 h-4 w-4"/></Link></Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
            <CardHeader>
              <UserCircle className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View your stats, badges, and achievements.</CardDescription>
              <Button variant="link" className="px-0 text-accent" asChild><Link href="/profile">View Profile <BarChart3 className="ml-1 h-4 w-4"/></Link></Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
            <CardHeader>
              <Users className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>See how you rank among fellow coders. (Coming Soon)</CardDescription>
               <Button variant="link" className="px-0 text-accent" asChild><Link href="/leaderboard">View Leaderboard</Link></Button>
            </CardContent>
          </Card>
           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
            <CardHeader>
              <Code className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Code Review AI</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get AI feedback on your own code snippets.</CardDescription>
               <Button variant="link" className="px-0 text-accent" asChild><Link href="/code-review">Analyze Code</Link></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Suggested Problems</h2>
        {suggestedProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedProblems.map((problem) => (
              <Card key={problem.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-700 border border-green-500/30' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-700 border border-red-500/30'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-muted text-muted-foreground border border-border">
                      {problem.topic}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm line-clamp-3">{problem.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground" asChild>
                    <Link href={`/practice?problem=${problem.id}`}>Attempt Problem</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No suggested problems right now. Explore all problems!</p>
        )}
      </section>
    </div>
  );
}
