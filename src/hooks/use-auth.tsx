"use client";

import { useState, useEffect, createContext, useContext, type ReactNode, useCallback } from 'react';
import type { User as FirebaseAuthUser } from 'firebase/auth';
import { onAuthStateChanged, signOutUser as firebaseSignOut } from '@/lib/firebase/auth';
import { getUserDocument, type UserData } from '@/lib/firebase/firestore';
import { useToast } from './use-toast';
import { useRouter } from 'next/navigation';


interface AuthContextType {
  firebaseUser: FirebaseAuthUser | null; // Original Firebase Auth user
  user: UserData | null; // Extended user data from Firestore
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>; // Function to manually refresh user data
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthUser | null>(null);
  const [user, setUser] = useState<UserData | null>(null); // For Firestore UserData
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const fetchAndSetUserDocument = useCallback(async (fbUser: FirebaseAuthUser | null) => {
    if (fbUser) {
      setLoading(true);
      try {
        const userDoc = await getUserDocument(fbUser.uid);
        setUser(userDoc);
      } catch (error) {
        console.error("Error fetching user document:", error);
        setUser(null); // Or handle error appropriately
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((fbUser) => {
      setFirebaseUser(fbUser);
      fetchAndSetUserDocument(fbUser);
    });
    return () => unsubscribe();
  }, [fetchAndSetUserDocument]);

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut();
      setFirebaseUser(null);
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      router.push('/'); 
    } catch (error: any) {
      console.error("Sign Out Error:", error);
      toast({
        title: "Sign Out Failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = useCallback(async () => {
    if (firebaseUser) {
      await fetchAndSetUserDocument(firebaseUser);
    }
  }, [firebaseUser, fetchAndSetUserDocument]);

  const authProviderValue: AuthContextType = { firebaseUser, user, loading, signOut, refreshUserData };

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
