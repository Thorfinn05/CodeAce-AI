"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUserProgress } from "@/lib/mock-data";
import { CheckCircle2, Edit3, Mail, MapPin, BarChart3, Award, Zap } from "lucide-react";
import Image from "next/image";

// Mock user data, replace with actual data from Firebase/context
const userProfile = {
  name: "Alex Coder",
  email: "alex.coder@example.com",
  bio: "Passionate learner exploring the world of algorithms and data structures. Always up for a coding challenge!",
  avatarUrl: "https://picsum.photos/id/1005/200/200", // Placeholder avatar
  dataAiHint: "student person",
  location: "Tech City, Codingland",
  preferredLanguages: ["Python", "JavaScript"],
  joinDate: "January 15, 2023",
};

const progress = mockUserProgress; // Using existing mock progress data

export default function ProfilePage() {
  const totalProblems = 20; // This should be dynamic based on total problems in DB
  const solvedPercentage = (progress.solvedProblems.length / totalProblems) * 100;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-xl rounded-2xl">
        <div className="h-40 bg-gradient-to-r from-primary to-accent" data-ai-hint="abstract banner">
           <Image src="https://picsum.photos/seed/profilebanner/1200/200" alt="Profile banner" width={1200} height={200} className="object-cover w-full h-full opacity-50" data-ai-hint="abstract banner" />
        </div>
        <CardContent className="p-6 -mt-16">
          <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint={userProfile.dataAiHint} />
              <AvatarFallback className="text-4xl">{userProfile.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground">{userProfile.name}</h1>
              <p className="text-muted-foreground">{userProfile.email}</p>
              <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1 mt-1">
                <MapPin className="h-4 w-4" /> {userProfile.location}
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 md:ml-auto md:mt-0 rounded-lg">
              <Edit3 className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">{userProfile.bio}</p>
            <div className="space-y-2 text-sm">
              <p><strong>Joined:</strong> {userProfile.joinDate}</p>
              <p><strong>Preferred Languages:</strong> {userProfile.preferredLanguages.join(', ')}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-sm">Badges Unlocked:</h4>
              <div className="flex flex-wrap gap-2">
                {progress.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    {badge.replace(/([A-Z])/g, ' $1').trim()}
                  </Badge>
                ))}
                 <Badge variant="secondary" className="bg-muted/50 text-muted-foreground border-border text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    Streak: 5 days
                  </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" /> Coding Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{progress.solvedProblems.length}</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{progress.xp}</p>
                <p className="text-sm text-muted-foreground">Total XP Earned</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-foreground mb-2">Topic Mastery:</h4>
              <div className="space-y-3">
                {Object.entries(progress.topicMastery).map(([topic, data]) => (
                  data.solved > 0 && ( // Only show topics with progress
                    <div key={topic} className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-foreground">{topic} ({data.masteryLevel})</span>
                        <span className="text-muted-foreground">{data.solved} solved, {data.xp} XP</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(data.solved / 5) * 100}%` }}></div> {/* Assuming 5 problems per topic for mastery step */}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
