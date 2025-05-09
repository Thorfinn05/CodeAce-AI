"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { updateUserProfile, updateUserSetting } from "@/lib/firebase/firestore";
import { CheckCircle2, Edit3, Mail, MapPin, BarChart3, Award, Zap, LogIn, Settings, Save, Moon, Sun, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ThemePreference, UserProfileBio, UserData } from "@/types";
import { Timestamp } from 'firebase/firestore';


export default function ProfilePage() {
  const { user, firebaseUser, loading, refreshUserData, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileBio>({ bio: '', preferredLanguages: [] });
  const [theme, setTheme] = useState<ThemePreference>('system');
  const [displayNameInput, setDisplayNameInput] = useState('');


  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.push('/auth/signin');
    }
  }, [loading, firebaseUser, router]);

  useEffect(() => {
    if (user) {
      setProfileData({
        bio: user.profile?.bio || '',
        preferredLanguages: user.profile?.preferredLanguages || [],
        location: user.profile?.location || '',
      });
      setDisplayNameInput(user.displayName || '');
      setTheme(user.settings?.theme || 'system');
    } else if (firebaseUser && !user && !loading) {
      // If firebaseUser exists but user (Firestore data) does not,
      // displayNameInput can be pre-filled from firebaseUser as a fallback
      setDisplayNameInput(firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '');
    }
  }, [user, firebaseUser, loading]);
  
  useEffect(() => {
    // Apply theme to HTML element for immediate effect
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else { // system
        document.documentElement.classList.remove('light');
        document.documentElement.classList.remove('dark');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.add('light');
        }
      }
    }
  }, [theme]);


  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Should ideally not happen if UI prevents editing
    try {
      // Only update displayName if it has changed and is not empty
      const dataToUpdate: Partial<UserProfileBio & { displayName?: string }> = { ...profileData };
      if (displayNameInput.trim() && displayNameInput !== user.displayName) {
        dataToUpdate.displayName = displayNameInput.trim();
      }

      await updateUserProfile(user.uid, dataToUpdate); // updateUserProfile now accepts displayName
      await refreshUserData(); 
      toast({ title: "Profile Updated", description: "Your profile information has been saved." });
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast({ title: "Update Failed", description: "Could not save profile changes.", variant: "destructive" });
    }
  };

  const handleThemeChange = async (newTheme: ThemePreference) => {
    setTheme(newTheme); // Optimistically update UI
    if (!user && !firebaseUser) return; // No user to save settings for
    
    // If Firestore user object (user) is not yet loaded but firebaseUser is,
    // this means the user document might not exist yet or is still loading.
    // Theme change can still be applied visually but saving might need to wait or be queued.
    // For simplicity here, we'll try to save if firebaseUser.uid is available.
    const uidToUse = user?.uid || firebaseUser?.uid;

    if (uidToUse) {
      try {
        await updateUserSetting(uidToUse, 'theme', newTheme);
        toast({ title: "Theme Updated", description: `Theme set to ${newTheme}.` });
        // Optionally, call refreshUserData if settings are critical for other components
        // await refreshUserData(); 
      } catch (error) {
         toast({ title: "Theme Update Failed", description: "Could not save theme preference.", variant: "destructive" });
      }
    } else {
       toast({ title: "Theme preference changed locally", description: "Sign in to save your theme preference.", variant: "default" });
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 text-accent animate-spin mb-4" />
        <p className="text-xl font-semibold text-muted-foreground">Loading Profile...</p>
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
    // Firebase user is authenticated, but Firestore user data (user) is not loaded.
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Your Profile Data</h2>
        <p className="text-muted-foreground mb-4 max-w-md">
          We couldn't fetch your detailed profile information from our database.
          This might be a temporary issue, or your profile setup might be incomplete.
        </p>
        <div className="flex gap-4">
            <Button onClick={async () => { await refreshUserData(); router.refresh(); }} className="bg-accent hover:bg-accent/80">
             Try Again
            </Button>
            <Button onClick={signOut} variant="outline">
                Sign Out
            </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">If the problem persists, please contact support or try signing in again later.</p>
      </div>
    );
  }
  
  const totalProblemsSolved = Object.keys(user.progress?.solvedProblems || {}).length;
  const userDisplayName = user.displayName || firebaseUser.displayName || user.email?.split('@')[0] || "Ace Coder";
  const userPhotoURL = user.photoURL || firebaseUser.photoURL;


  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-2xl rounded-2xl glassmorphic border-primary/20">
        <div className="h-48 bg-gradient-to-br from-primary via-accent/30 to-primary/50 relative">
           <Image src={userPhotoURL || `https://picsum.photos/seed/${user.uid}/1200/250`} alt="Profile banner" layout="fill" objectFit="cover" className="opacity-40" data-ai-hint="futuristic circuit" />
        </div>
        <CardContent className="p-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-6">
            <Avatar className="h-36 w-36 border-4 border-background shadow-lg bg-muted">
              <AvatarImage src={userPhotoURL || `https://picsum.photos/seed/${userDisplayName}/200/200`} alt={userDisplayName} data-ai-hint="coder avatar" />
              <AvatarFallback className="text-5xl font-poppins">{(userDisplayName).charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
              <h1 className="text-4xl font-bold text-foreground font-poppins">{userDisplayName}</h1>
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
                <Label htmlFor="displayName" className="font-semibold">Display Name</Label>
                <Input id="displayName" value={displayNameInput} onChange={(e) => setDisplayNameInput(e.target.value)} placeholder="Your awesome coder name" className="mt-1 bg-background/70 rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="bio" className="font-semibold">Bio</Label>
                <Textarea id="bio" value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} placeholder="Tell us about your coding journey..." className="mt-1 bg-background/70 rounded-lg"/>
              </div>
              <div>
                <Label htmlFor="languages" className="font-semibold">Preferred Languages (comma-separated)</Label>
                <Input id="languages" value={profileData.preferredLanguages?.join(', ')} onChange={(e) => setProfileData({...profileData, preferredLanguages: e.target.value.split(',').map(s => s.trim().toLowerCase() as SupportedLanguage).filter(Boolean)})} placeholder="e.g., javascript, python" className="mt-1 bg-background/70 rounded-lg"/>
              </div>
               <div>
                <Label htmlFor="location" className="font-semibold">Location (Optional)</Label>
                <Input id="location" value={profileData.location} onChange={(e) => setProfileData({...profileData, location: e.target.value})} placeholder="e.g., San Francisco, CA" className="mt-1 bg-background/70 rounded-lg"/>
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
            <p className="text-muted-foreground text-sm mb-4 min-h-[40px]">{user.profile?.bio || "No bio yet. Add one by editing your profile!"}</p>
            <div className="space-y-2 text-sm">
              {user.createdAt && <p><strong>Joined:</strong> {new Date(user.createdAt instanceof Timestamp ? user.createdAt.toDate() : user.createdAt).toLocaleDateString()}</p>}
              {user.profile?.preferredLanguages && user.profile.preferredLanguages.length > 0 && (
                <p><strong>Preferred Languages:</strong> {user.profile.preferredLanguages.join(', ')}</p>
              )}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-md font-poppins">Badges Unlocked:</h4>
              <div className="flex flex-wrap gap-2 min-h-[24px]">
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
                  {(!user.progress?.badges || user.progress?.badges.length === 0) && <p className="text-xs text-muted-foreground">No badges yet. Keep coding!</p>}
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
                {user.progress?.topicMastery && Object.keys(user.progress.topicMastery).length > 0 && Object.values(user.progress.topicMastery).some(data => data.solved > 0) ? (
                  Object.entries(user.progress.topicMastery).map(([topic, data]) => (
                    data.solved > 0 && ( 
                      <div key={topic} className="text-sm p-3 bg-muted/20 rounded-lg border border-primary/5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-foreground font-medium">{topic} ({data.masteryLevel})</span>
                          <span className="text-muted-foreground text-xs">{data.solved} solved, {data.xp} XP</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-teal-400 to-accent h-2.5 rounded-full" style={{ width: `${Math.min(100, (data.solved / 5) * 100)}%` }}></div> {/* Assuming 5 problems for full mastery visualization */}
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
                    <Button variant={theme === 'light' ? 'secondary' : 'outline'} size="icon" onClick={() => handleThemeChange('light')} aria-label="Light theme" className="rounded-full"> <Sun className="h-5 w-5"/> </Button>
                    <Button variant={theme === 'dark' ? 'secondary' : 'outline'} size="icon" onClick={() => handleThemeChange('dark')} aria-label="Dark theme" className="rounded-full"> <Moon className="h-5 w-5"/> </Button>
                    <Button variant={theme === 'system' ? 'secondary' : 'outline'} size="sm" onClick={() => handleThemeChange('system')} className="rounded-lg">System</Button>
                </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );