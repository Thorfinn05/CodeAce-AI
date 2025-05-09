"use client";

import { Award, BarChart2, CalendarDays, Filter, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

// Mock data for leaderboard - replace with actual data
const mockLeaderboardData = [
  { rank: 1, name: "SyntaxSorcerer", xp: 10250, problemsSolved: 150, avatar: "https://picsum.photos/id/237/40/40", dataAiHint: "dog puppy" },
  { rank: 2, name: "AlgoQueen", xp: 9870, problemsSolved: 145, avatar: "https://picsum.photos/id/1025/40/40", dataAiHint: "woman developer" },
  { rank: 3, name: "CodeNinjaX", xp: 9500, problemsSolved: 130, avatar: "https://picsum.photos/id/1012/40/40", dataAiHint: "man coder" },
  { rank: 4, name: "RecursiveRaccoon", xp: 8800, problemsSolved: 120, avatar: "https://picsum.photos/id/1020/40/40", dataAiHint: "animal raccoon" },
  { rank: 5, name: "Alex Coder", xp: 8500, problemsSolved: 115, avatar: "https://picsum.photos/id/1005/40/40", dataAiHint: "student person", isCurrentUser: true },
  { rank: 6, name: "DebugDiva", xp: 7900, problemsSolved: 110, avatar: "https://picsum.photos/id/1011/40/40", dataAiHint: "woman portrait" },
  { rank: 7, name: "PythonProdigy", xp: 7500, problemsSolved: 105, avatar: "https://picsum.photos/id/1013/40/40", dataAiHint: "man glasses" },
  { rank: 8, name: "JavaJuggernaut", xp: 7200, problemsSolved: 100, avatar: "https://picsum.photos/id/1014/40/40", dataAiHint: "person thinking" },
  { rank: 9, name: "ScriptKiddo", xp: 6800, problemsSolved: 95, avatar: "https://picsum.photos/id/1015/40/40", dataAiHint: "young person" },
  { rank: 10, name: "LogicLlama", xp: 6500, problemsSolved: 90, avatar: "https://picsum.photos/id/1022/40/40", dataAiHint: "animal llama" },
];


export default function LeaderboardPage() {
  // State for filters - to be implemented
  // const [timeFilter, setTimeFilter] = useState("all-time");
  // const [categoryFilter, setCategoryFilter] = useState("xp");

  return (
    <div className="space-y-8">
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent p-0">
           <Image src="https://picsum.photos/seed/leaderboard/1200/250" alt="Leaderboard banner" width={1200} height={250} className="object-cover w-full h-full opacity-70" data-ai-hint="abstract competition" />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/30">
            <Trophy className="h-16 w-16 text-yellow-300 mb-4" />
            <CardTitle className="text-4xl font-bold text-white">Leaderboard</CardTitle>
            <CardDescription className="text-lg text-gray-200 mt-2">
              See who's topping the charts in coding mastery!
            </CardDescription>
          </div>
        </CardHeader>
         <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex gap-2 items-center">
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Showing top coders based on XP.</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all-time" onValueChange={(value) => console.log("Time filter:", value)}>
                <SelectTrigger className="w-[150px] rounded-lg">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="xp" onValueChange={(value) => console.log("Category filter:", value)}>
                <SelectTrigger className="w-[150px] rounded-lg">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xp">XP Earned</SelectItem>
                  <SelectItem value="mastery">Topic Mastery</SelectItem>
                  <SelectItem value="solved">Problems Solved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">XP</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Problems Solved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboardData.map((user) => (
                <TableRow key={user.rank} className={user.isCurrentUser ? "bg-accent/10" : ""}>
                  <TableCell className="font-medium text-lg">
                    {user.rank <= 3 ? (
                      <Award className={`inline-block h-6 w-6 ${
                        user.rank === 1 ? 'text-yellow-500' : 
                        user.rank === 2 ? 'text-gray-400' : 
                        'text-orange-400'
                      }`} />
                    ) : user.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.dataAiHint} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name} {user.isCurrentUser && "(You)"}</p>
                        {/* Could add a small badge for streak or something */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">{user.xp.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground hidden sm:table-cell">{user.problemsSolved}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <p className="text-center text-sm text-muted-foreground">
        Leaderboard is for illustrative purposes. Keep practicing to climb the ranks!
      </p>
    </div>
  );
}
