"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { updateUserProfile, updateUserSetting } from "@/lib/firebase/firestore";
import { CheckCircle2, Edit3, Mail, MapPin, BarChart3, Award, Zap, LogIn, Settings, Save, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ThemePreference, UserProfileBio } from "@/types";

export default function ProfilePage() {
  const { user, loading, refreshUserData } = useAuth();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileBio>({ bio: '', preferredLanguages: [] });
  const [theme, setTheme] = useState<ThemePreference>('system');

  useEffect(() => {
    if (user) {
      setProfileData({
        bio: user.profile?.bio || '',
        preferredLanguages: user.profile?.preferredLanguages || [],
        // location: user.profile?.location || '', // Add if location is part of UserProfileBio
      });
      setTheme(user.settings?.theme || 'system');
    }
  }, [user]);
  
  useEffect(() => {
    // Apply theme to HTML element for immediate effect
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else { // system
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);


  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateUserProfile(user.uid, profileData);
      await refreshUserData(); // Refresh auth context data
      toast({ title: "Profile Updated", description: "Your profile information has been saved." });
      setIsEditing(false);
    } catch (error) {
      toast({ title: "Update Failed", description: "Could not save profile changes.", variant: "destructive" });
    }
  };

  const handleThemeChange = async (newTheme: ThemePreference) => {
    if (!user) return;
    setTheme(newTheme);
    try {
      await updateUserSetting(user.uid, 'theme', newTheme);
      // No need to call refreshUserData for theme typically, as it's UI only or handled by next-themes
      toast({ title: "Theme Updated", description: `Theme set to ${newTheme}.` });
    } catch (error) {
       toast({ title: "Theme Update Failed", description: "Could not save theme preference.", variant: "destructive" });
    }
  };


  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-200px)]"><Zap className="h-12 w-12 text-accent animate-ping" /></div>;
  }

  if (!user) {
    return (
      <Card className="text-center p-8 max-w-md mx-auto glassmorphic">
        <CardHeader>
          <LogIn className="h-12 w-12 mx-auto text-accent mb-4"/>
          <CardTitle className="text-2xl font-poppins">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Please log in to view your profile and track your coding journey.</CardDescription>
          <Button asChild className="mt-6 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg">
            <a href="/auth/signin">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  const totalProblemsSolved = Object.keys(user.progress?.solvedProblems || {}).length;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-2xl rounded-2xl glassmorphic border-primary/20">
        <div className="h-48 bg-gradient-to-br from-primary via-accent/30 to-primary/50 relative" data-ai-hint="abstract tech banner">
           <Image src={`https://picsum.photos/seed/${user.uid}/1200/250`} alt="Profile banner" layout="fill" objectFit="cover" className="opacity-40" data-ai-hint="futuristic circuit" />
        </div>
        <CardContent className="p-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-6">
            <Avatar className="h-36 w-36 border-4 border-background shadow-lg bg-muted">
              <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.displayName}/200/200`} alt={user.displayName || "User"} data-ai-hint="coder avatar" />
              <AvatarFallback className="text-5xl font-poppins">{(user.displayName || user.email || "U").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
              <h1 className="text-4xl font-bold text-foreground font-poppins">{user.displayName}</h1>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-1 mt-1">
                <Mail className="h-4 w-4" /> {user.email}
              </p>
              {user.profile?.location && <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1 mt-1"><MapPin className="h-4 w-4" /> {user.profile.location}</p>}
            </div>
            <Button variant="outline" size="sm" className="mt-4 md:ml-auto md:mt-0 rounded-lg hover:bg-accent/10 hover:text-accent border-accent/50" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="h-4 w-4 mr-2" /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <Card className="shadow-xl rounded-2xl glassmorphic border-primary/10">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center gap-2"><Settings className="text-accent"/>Edit Your Profile</CardTitle>
          </CardHeader>
          <form onSubmit={handleProfileSave}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio" className="font-semibold">Bio</Label>
                <Textarea id="bio" value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} placeholder="Tell us about your coding journey..." className="mt-1 bg-background/70 rounded-lg"/>
              </div>
              {/* Add more editable fields like preferred languages, location here */}
              {/* Example for preferred languages (could be a multi-select or tags input later) */}
              <div>
                <Label htmlFor="languages" className="font-semibold">Preferred Languages (comma-separated)</Label>
                <Input id="languages" value={profileData.preferredLanguages?.join(', ')} onChange={(e) => setProfileData({...profileData, preferredLanguages: e.target.value.split(',').map(s => s.trim() as any)})} placeholder="e.g., javascript, python" className="mt-1 bg-background/70 rounded-lg"/>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg neon-glow-accent">
                <Save className="mr-2 h-4 w-4"/> Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-xl rounded-2xl glassmorphic border-primary/10">
          <CardHeader>
            <CardTitle className="font-poppins">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">{user.profile?.bio || "No bio yet. Add one by editing your profile!"}</p>
            <div className="space-y-2 text-sm">
              {user.createdAt && <p><strong>Joined:</strong> {new Date(user.createdAt instanceof Timestamp ? user.createdAt.toDate() : user.createdAt).toLocaleDateString()}</p>}
              {user.profile?.preferredLanguages && user.profile.preferredLanguages.length > 0 && (
                <p><strong>Preferred Languages:</strong> {user.profile.preferredLanguages.join(', ')}</p>
              )}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-md font-poppins">Badges Unlocked:</h4>
              <div className="flex flex-wrap gap-2">
                {(user.progress?.badges || []).map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30 text-xs shadow-sm">
                    <Award className="h-3 w-3 mr-1" />
                    {badge.replace(/([A-Z])/g, ' $1').trim()}
                  </Badge>
                ))}
                 <Badge variant="outline" className="border-primary/30 text-xs shadow-sm">
                    <Zap className="h-3 w-3 mr-1" />
                    Streak: {user.progress?.streaks?.current || 0} days
                  </Badge>
                  {user.progress?.badges?.length === 0 && <p className="text-xs text-muted-foreground">No badges yet. Keep coding!</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-xl rounded-2xl glassmorphic border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-poppins">
              <BarChart3 className="h-6 w-6 text-accent" /> Coding Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <div className="p-6 bg-muted/30 rounded-xl border border-primary/10">
                <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto mb-2" />
                <p className="text-3xl font-bold">{totalProblemsSolved}</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-xl border border-primary/10">
                <Zap className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
                <p className="text-3xl font-bold">{user.progress?.xp || 0}</p>
                <p className="text-sm text-muted-foreground">Total XP Earned</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-foreground mb-3 font-poppins">Topic Mastery:</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {user.progress?.topicMastery && Object.keys(user.progress.topicMastery).length > 0 ? (
                  Object.entries(user.progress.topicMastery).map(([topic, data]) => (
                    data.solved > 0 && ( 
                      <div key={topic} className="text-sm p-3 bg-muted/20 rounded-lg border border-primary/5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-foreground font-medium">{topic} ({data.masteryLevel})</span>
                          <span className="text-muted-foreground text-xs">{data.solved} solved, {data.xp} XP</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-teal-400 to-accent h-2.5 rounded-full" style={{ width: `${Math.min(100, (data.solved / 5) * 100)}%` }}></div>
                        </div>
                      </div>
                    )
                  ))
                ) : <p className="text-sm text-muted-foreground">Start solving problems to see topic mastery.</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-xl rounded-2xl glassmorphic border-primary/10">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-poppins"><Settings className="text-accent"/>Settings</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between">
                <Label htmlFor="theme-toggle" className="text-lg">Theme Preference</Label>
                <div className="flex items-center gap-2">
                    <Button variant={theme === 'light' ? 'default' : 'outline'} size="icon" onClick={() => handleThemeChange('light')} aria-label="Light theme"> <Sun className="h-5 w-5"/> </Button>
                    <Button variant={theme === 'dark' ? 'default' : 'outline'} size="icon" onClick={() => handleThemeChange('dark')} aria-label="Dark theme"> <Moon className="h-5 w-5"/> </Button>
                    <Button variant={theme === 'system' ? 'default' : 'outline'} size="sm" onClick={() => handleThemeChange('system')}>System</Button>
                </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
