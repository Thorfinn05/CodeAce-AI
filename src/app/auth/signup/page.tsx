
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Mail, KeyRound, User, ExternalLink } from 'lucide-react';
import { signInWithGoogle } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement Firebase email/password sign up
     toast({
      title: "Sign Up (Email/Password)",
      description: "Email/Password sign up is not yet implemented.",
      variant: "default"
    });
  };

  const handleGoogleSignUp = async () => {
    try {
      const user = await signInWithGoogle(); // Google sign-in can also be used for sign-up
      if (user) {
        toast({
          title: "Sign Up Successful",
          description: `Welcome, ${user.displayName || user.email}! Your account has been created.`,
        });
        router.push('/dashboard'); // Redirect to dashboard or desired page
      }
    } catch (error: any) {
      console.error("Google Sign-Up Error:", error);
      toast({
        title: "Sign Up Failed",
        description: error.message || "An unexpected error occurred during Google Sign-Up.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)] py-12 bg-gradient-to-br from-background to-secondary/30">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="text-center">
           <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
             <UserPlus className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join CodeCoach and start your coding adventure today!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-6">
             <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Full Name (Optional)
              </Label>
              <Input id="name" type="text" placeholder="Ada Lovelace" 
                     className="rounded-lg"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" /> Email
              </Label>
              <Input id="email" type="email" placeholder="you@example.com" required 
                     className="rounded-lg"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-muted-foreground" /> Password
              </Label>
              <Input id="password" type="password" placeholder="•••••••• (min. 6 characters)" required 
                     className="rounded-lg"/>
            </div>
             {/* Optional: Confirm Password
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div> */}
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-3 text-base">
              Sign Up
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full rounded-lg py-3 text-base flex items-center gap-2" onClick={handleGoogleSignUp}>
             <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Google
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-center block">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-primary hover:underline">
              Sign in here <ExternalLink className="inline h-3 w-3"/>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
