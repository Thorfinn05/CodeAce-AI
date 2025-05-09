import { db } from './config';
import { doc, setDoc, getDoc, updateDoc, Timestamp, collection, addDoc, query, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { UserData, UserProfileBio, UserProgress, UserSettings, Snippet, Problem, SupportedLanguage, ThemePreference } from '@/types';

// --- User Data ---

export const createUserDocument = async (user: User, additionalData: Partial<UserData> = {}): Promise<void> => {
  if (!user) return;

  const userRef = doc(db, `users/${user.uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, displayName, photoURL, uid } = user;
    const createdAt = Timestamp.now();

    const defaultProfile: UserProfileBio = {
      bio: '',
      preferredLanguages: ['javascript'],
    };

    const defaultProgress: UserProgress = {
      xp: 0,
      streaks: { current: 0, longest: 0, lastActivityDate: null },
      solvedProblems: {},
      topicMastery: {},
      badges: ['WelcomeCoder'],
    };

    const defaultSettings: UserSettings = {
      theme: 'system',
    };
    
    const userData: UserData = {
      uid,
      email,
      displayName: displayName || email?.split('@')[0] || 'CodeAce User',
      photoURL,
      createdAt,
      lastLoginAt: createdAt,
      profile: defaultProfile,
      progress: defaultProgress,
      settings: defaultSettings,
      ...additionalData,
    };

    try {
      await setDoc(userRef, userData);
    } catch (error) {
      console.error("Error creating user document:", error);
      throw error;
    }
  } else {
    // Update last login time for existing user
    try {
      await updateDoc(userRef, {
        lastLoginAt: Timestamp.now(),
        displayName: user.displayName || snapshot.data()?.displayName, // Keep existing if new is null
        photoURL: user.photoURL || snapshot.data()?.photoURL, // Keep existing if new is null
      });
    } catch (error) {
      console.error("Error updating last login time:", error);
    }
  }
};

export const getUserDocument = async (uid: string): Promise<UserData | null> => {
  if (!uid) return null;
  const userRef = doc(db, `users/${uid}`);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? (snapshot.data() as UserData) : null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfileBio>): Promise<void> => {
  if (!uid) return;
  const userRef = doc(db, `users/${uid}`);
  await updateDoc(userRef, { profile: data });
};

export const updateUserProgress = async (uid: string, data: Partial<UserProgress>): Promise<void> => {
  if (!uid) return;
  const userRef = doc(db, `users/${uid}`);
  // For nested objects like topicMastery or solvedProblems, ensure you merge correctly
  // This might require fetching the document first and merging, or using Firestore's FieldValue for atomic operations
  await updateDoc(userRef, { progress: data });
};

export const updateUserSetting = async (uid: string, settingKey: keyof UserSettings, value: ThemePreference /* | other setting types */): Promise<void> => {
  if (!uid) return;
  const userRef = doc(db, `users/${uid}`);
  await updateDoc(userRef, { [`settings.${settingKey}`]: value });
};


// --- Problems ---
// Placeholder: In a real app, problems might be pre-loaded or managed by admins
export const getProblems = async (): Promise<Problem[]> => {
  // For now, this could return mockProblems or fetch from a 'problems' collection
  // const problemsCol = collection(db, 'problems');
  // const snapshot = await getDocs(problemsCol);
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Problem));
  return Promise.resolve([]); // Replace with actual Firestore logic or use mock-data
};

// --- Snippets ---

export const addSnippet = async (userId: string, snippetData: Omit<Snippet, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const snippetsCol = collection(db, `users/${userId}/snippets`);
  const docRef = await addDoc(snippetsCol, {
    ...snippetData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getUserSnippets = async (userId: string): Promise<Snippet[]> => {
  const snippetsCol = collection(db, `users/${userId}/snippets`);
  const q = query(snippetsCol, where("userId", "==", userId)); // Technically redundant if using subcollection path
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Snippet));
};

export const updateSnippet = async (userId: string, snippetId: string, data: Partial<Omit<Snippet, 'id' | 'userId' | 'createdAt'>>): Promise<void> => {
  const snippetRef = doc(db, `users/${userId}/snippets/${snippetId}`);
  await updateDoc(snippetRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteSnippet = async (userId: string, snippetId: string): Promise<void> => {
  const snippetRef = doc(db, `users/${userId}/snippets/${snippetId}`);
  await deleteDoc(snippetRef);
};

// --- Leaderboard ---
// Placeholder: This would involve more complex queries or aggregated data
export const getLeaderboardData = async (filter: 'global' | 'weekly' | 'topic', topic?: string) => {
  // const usersCol = collection(db, 'users');
  // let q;
  // if (filter === 'global') {
  //   q = query(usersCol, orderBy('progress.xp', 'desc'), limit(10));
  // } else { // Add more complex logic for weekly/topic filters
  //   q = query(usersCol, orderBy('progress.xp', 'desc'), limit(10));
  // }
  // const snapshot = await getDocs(q);
  // return snapshot.docs.map(doc => doc.data() as UserData);
  return Promise.resolve([]); // Replace with actual Firestore logic
};
