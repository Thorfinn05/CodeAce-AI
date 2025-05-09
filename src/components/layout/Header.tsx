
"use client"; // Required because we are using a hook (useAuth)

import Link from 'next/link';
import { Code2, UserCircle, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth'; // Import useAuth hook
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // For user avatar

export default function AppHeader() {
  const { user, loading, signOut } = useAuth(); // Get auth state and signOut function

  const handleSignOut = async () => {
    await signOut();
    // signOut function in useAuth already handles toast and navigation
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Code2 className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-bold tracking-tight">CodeCoach</h1>
        </Link>
        
        <nav className="flex items-center gap-2 sm:gap-4">
          {!loading && ( // Only render nav items once loading is complete
            user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/practice">Practice</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/code-review">Code Review</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/roadmap">Roadmap</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/profile" aria-label="Profile" className="flex items-center gap-2">
                    {user.photoURL ? (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />
                        <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <UserCircle className="h-5 w-5" />
                    )}
                    <span className="hidden md:inline">Profile</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground flex items-center gap-1">
                  <LogOut className="h-4 w-4" /> Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/#features">Features</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                  <Link href="/#testimonials">Testimonials</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link href="/auth/signin" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" /> Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/auth/signup" className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" /> Sign Up
                  </Link>
                </Button>
              </>
            )
          )}
          {loading && <div className="text-sm text-primary-foreground/70">Loading...</div>}
        </nav>
      </div>
    </header>
  );
}
