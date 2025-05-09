"use client"; 

import Link from 'next/link';
import { Code2, UserCircle, LogIn, UserPlus, LogOut, Archive, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 

export default function AppHeader() {
  const { user, firebaseUser, loading, signOut } = useAuth(); // Use extended 'user' for display, firebaseUser for auth state

  const handleSignOut = async () => {
    await signOut();
  };

  const displayName = user?.displayName || firebaseUser?.displayName || firebaseUser?.email?.split('@')[0] || 'User';
  const photoURL = user?.photoURL || firebaseUser?.photoURL;


  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50 border-b-2 border-accent/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity group">
          {/* <Code2 className="h-10 w-10 text-accent group-hover:animate-pulse" /> */}
          <Zap className="h-10 w-10 text-accent group-hover:text-yellow-300 transition-colors duration-300 group-hover:scale-110" />

          <h1 className="text-3xl font-bold tracking-tight font-poppins">CodeAce</h1>
        </Link>
        
        <nav className="flex items-center gap-1 sm:gap-2">
          {!loading && (
            firebaseUser ? ( // Check firebaseUser for authentication status
              <>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md">
                  <Link href="/practice">Practice</Link>
                </Button>
                 <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md">
                  <Link href="/snippets">Snippets</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md hidden md:inline-flex">
                  <Link href="/code-review">AI Coach</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md hidden lg:inline-flex">
                  <Link href="/roadmap">Roadmap</Link>
                </Button>
                
                <Link href="/profile" passHref>
                  <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-full ml-2">
                    <Avatar className="h-8 w-8 border-2 border-accent/50">
                      <AvatarImage src={photoURL || undefined} alt={displayName} />
                      <AvatarFallback className="bg-accent text-accent-foreground">{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Profile</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut} className="border-accent/50 text-accent-foreground hover:bg-accent/20 hover:text-accent-foreground flex items-center gap-1 rounded-md ml-1">
                  <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground rounded-md">
                  <Link href="/#features">Features</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-accent/70 text-accent-foreground hover:bg-accent/20 hover:text-accent-foreground rounded-md">
                  <Link href="/auth/signin" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" /> Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-accent hover:bg-accent/80 text-accent-foreground rounded-md neon-glow-accent">
                  <Link href="/auth/signup" className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" /> Sign Up
                  </Link>
                </Button>
              </>
            )
          )}
          {loading && <div className="text-sm text-primary-foreground/70 px-3">Authenticating...</div>}
        </nav>
      </div>
    </header>
  );
}
