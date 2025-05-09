"use client";

import { Award, BarChart2, Users, Filter, Trophy, ShieldCheck, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth"; // To identify current user
import { useState, useEffect } from "react";
import type { UserData } from "@/types"; // Assuming UserData has progress.xp and displayName

// Mock data, will be replaced by Firestore fetch
interface LeaderboardUser extends Partial<UserData> {
  rank: number;
  avatarPlaceholder?: string; // For picsum
  dataAiHint?: string;
}

const mockLeaderboardData: LeaderboardUser[] = [
  { rank: 1, displayName: "SyntaxSorcerer", progress: { xp: 10250 } as any, avatarPlaceholder: "id/237", dataAiHint: "wizard coder" },
  { rank: 2, displayName: "AlgoQueen", progress: { xp: 9870 } as any, avatarPlaceholder: "id/1025", dataAiHint: "queen chess" },
  { rank: 3, displayName: "CodeNinjaX", progress: { xp: 9500 } as any, avatarPlaceholder: "id/1012", dataAiHint: "ninja warrior" },
  { rank: 4, displayName: "RecursiveRaccoon", progress: { xp: 8800 } as any, avatarPlaceholder: "id/1020", dataAiHint: "smart raccoon" },
  { rank: 5, displayName: "Alex Coder", uid: "currentUserPlaceholder", progress: { xp: 8500 } as any, avatarPlaceholder: "id/1005", dataAiHint: "focused student" }, // Mark current user
  { rank: 6, displayName: "DebugDiva", progress: { xp: 7900 } as any, avatarPlaceholder: "id/1011", dataAiHint: "elegant programmer" },
  { rank: 7, displayName: "PythonProdigy", progress: { xp: 7500 } as any, avatarPlaceholder: "id/1013", dataAiHint: "genius developer" },
];


export default function LeaderboardPage() {
  const { user } = useAuth(); // Get current logged-in user
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [timeFilter, setTimeFilter] = useState("global"); // global, weekly
  const [categoryFilter, setCategoryFilter] = useState("xp"); // xp, topic (topic for future)

  useEffect(() => {
    // Placeholder for fetching leaderboard data from Firestore
    // This would query users collection, order by progress.xp, etc.
    // And apply time/category filters.
    const dataWithCurrentUser = mockLeaderboardData.map(u => ({
      ...u,
      isCurrentUser: user ? (u.uid === user.uid || (u.uid === "currentUserPlaceholder" && user.displayName === u.displayName)) : false // Basic current user check
    })).sort((a,b) => (b.progress?.xp || 0) - (a.progress?.xp || 0))
       .map((u, index) => ({...u, rank: index + 1})); // Re-rank after sort
    
    setLeaderboard(dataWithCurrentUser);
  }, [user, timeFilter, categoryFilter]);

  // Animated rank-up effect (placeholder logic)
  // In a real app, this would compare old rank with new rank after data fetch.

  return (
    <div className="space-y-8">
      <Card className="shadow-2xl rounded-2xl overflow-hidden glassmorphic border-primary/20">
        <CardHeader className="p-0 relative">
           <Image src="https://picsum.photos/seed/leaderboard-arena/1200/300" alt="Leaderboard Arena Banner" width={1200} height={300} className="object-cover w-full h-full opacity-50" data-ai-hint="digital competition arena" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-center text-center p-6">
            <Trophy className="h-20 w-20 text-yellow-300 mb-4 filter drop-shadow-[0_0_8px_#fde047]" />
            <CardTitle className="text-5xl font-bold text-white font-poppins filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">Leaderboard</CardTitle>
            <CardDescription className="text-xl text-slate-200 mt-2">
              Ascend the ranks. Showcase your coding prowess.
            </CardDescription>
          </div>
        </CardHeader>
         <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 pb-6 border-b border-primary/10">
            <div className="flex gap-2 items-center">
              <BarChart2 className="h-6 w-6 text-accent" />
              <p className="text-md text-muted-foreground">Top coders by {categoryFilter === 'xp' ? 'Experience Points' : 'Category Mastery'}. Filter by period.</p>
            </div>
            <div className="flex gap-3">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[160px] rounded-lg bg-background/70">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global (All Time)</SelectItem>
                  <SelectItem value="weekly">Weekly (Soon)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] rounded-lg bg-background/70">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xp">XP Earned</SelectItem>
                  <SelectItem value="topic" disabled>Topic Mastery (Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table className="mt-4">
            <TableHeader>
              <TableRow className="border-b-primary/20">
                <TableHead className="w-[80px] text-lg font-poppins">Rank</TableHead>
                <TableHead className="text-lg font-poppins">User</TableHead>
                <TableHead className="text-right text-lg font-poppins">XP</TableHead>
                <TableHead className="text-right hidden sm:table-cell text-lg font-poppins">Badges (Soon)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((u) => (
                <TableRow key={u.rank} className={`transition-all duration-300 hover:bg-primary/5 ${u.isCurrentUser ? "bg-accent/10 scale-[1.01] shadow-lg border-l-4 border-accent" : "border-b-primary/5"}`}>
                  <TableCell className="font-bold text-2xl text-primary">
                    {u.rank <= 3 ? (
                      <Award className={`inline-block h-8 w-8 filter drop-shadow-[0_0_3px_currentColor] ${
                        u.rank === 1 ? 'text-yellow-400' : 
                        u.rank === 2 ? 'text-slate-400' : 
                        'text-orange-400'
                      }`} />
                    ) : u.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/30">
                        <AvatarImage src={u.photoURL || `https://picsum.photos/seed/${u.displayName}/${u.avatarPlaceholder || 'generic'}/48/48`} alt={u.displayName || 'User'} data-ai-hint={u.dataAiHint || "coding user"}/>
                        <AvatarFallback className="font-poppins">{(u.displayName || "U").charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className={`font-semibold text-lg ${u.isCurrentUser ? 'text-accent font-bold' : 'text-foreground'}`}>{u.displayName} {u.isCurrentUser && "(You)"}</p>
                        {/* Placeholder for streak or top badge */}
                         {u.rank === 1 && <Badge variant="outline" className="border-yellow-400 text-yellow-500 text-xs mt-1"><Star className="h-3 w-3 mr-1"/>Top Coder</Badge>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-xl text-accent">{u.progress?.xp?.toLocaleString() || 0}</TableCell>
                  <TableCell className="text-right text-muted-foreground hidden sm:table-cell">
                    {/* Placeholder for badges count or icons */}
                    <ShieldCheck className="h-5 w-5 inline-block text-green-400 opacity-70"/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {leaderboard.length === 0 && <p className="text-center py-8 text-muted-foreground">Leaderboard is currently empty or data is loading.</p>}
        </CardContent>
      </Card>
       <p className="text-center text-sm text-muted-foreground">
        Leaderboard data is illustrative. Real-time updates and filters coming soon!
      </p>
    </div>
  );
}
