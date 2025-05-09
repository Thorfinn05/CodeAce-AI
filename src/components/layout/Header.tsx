import Link from 'next/link';
import { Code2, UserCircle, LogIn, UserPlus } from 'lucide-react'; // Using Code2 as a placeholder logo
import { Button } from '@/components/ui/button';

// Mock auth state - replace with actual auth context later
const isAuthenticated = false; 

export default function AppHeader() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Code2 className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-bold tracking-tight">CodeCoach</h1>
        </Link>
        
        <nav className="flex items-center gap-2 sm:gap-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/practice">Practice</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/code-review">Code Review</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/roadmap">Roadmap</Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile" aria-label="Profile">
                  <UserCircle className="h-6 w-6" />
                </Link>
              </Button>
              {/* Add Logout Button later */}
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/#features">Features</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
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
          )}
        </nav>
      </div>
    </header>
  );
}
