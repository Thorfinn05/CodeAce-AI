"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, KeyRound, ExternalLink } from 'lucide-react'; // Replaced Lock with KeyRound

export default function SignInPage() {
  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement Firebase email/password sign in
    alert("Sign in functionality to be implemented with Firebase.");
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Firebase Google sign in
    alert("Google Sign in functionality to be implemented with Firebase.");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-180px)] py-12 bg-gradient-to-br from-background to-secondary/30">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
             <LogIn className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Sign in to continue your coding journey with CodeCoach.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-6">
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
              <Input id="password" type="password" placeholder="••••••••" required 
                     className="rounded-lg"/>
            </div>
            <div className="flex items-center justify-between text-sm">
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="font-normal">Remember me</Label>
              </div> */}
              <Link href="#" className="font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 text-base">
              Sign In
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full rounded-lg py-3 text-base flex items-center gap-2" onClick={handleGoogleSignIn}>
            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Google
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-center block">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign up here <ExternalLink className="inline h-3 w-3"/>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
