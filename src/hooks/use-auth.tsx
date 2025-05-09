
"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signOutUser as firebaseSignOut } from '@/lib/firebase/auth';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut();
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      router.push('/'); // Redirect to home or login page after sign out
    } catch (error: any) {
      console.error("Sign Out Error:", error);
      toast({
        title: "Sign Out Failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    }
  };

  const authProviderValue: AuthContextType = { user, loading, signOut };

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
