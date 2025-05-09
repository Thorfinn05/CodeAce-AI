import { db } from './config';
import { doc, setDoc, getDoc, updateDoc, Timestamp, collection, addDoc, query, where, getDocs, deleteDoc, serverTimestamp, FieldValue } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { UserData, UserProfileBio, UserProgress, UserSettings, Snippet, Problem, SupportedLanguage, ThemePreference } from '@/types';

// --- User Data ---

export const createUserDocument = async (user: User, additionalData: Partial<UserData> = {}): Promise<void> => {
  if (!user) return;

  const userRef = doc(db, `users/${user.uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, photoURL, uid } = user;
    // Use displayName from additionalData first, then from user, then generate from email
    const initialDisplayName = additionalData.displayName || user.displayName || email?.split('@')[0] || 'CodeAce User';


    const defaultProfile: UserProfileBio = {
      bio: '',
      preferredLanguages: ['javascript'],
      location: '',
      ...additionalData.profile,
    };

    const defaultProgress: UserProgress = {
      xp: 0,
      streaks: { current: 0, longest: 0, lastActivityDate: null },
      solvedProblems: {},
      topicMastery: {},
      badges: ['WelcomeCoder'],
      ...additionalData.progress,
    };

    const defaultSettings: UserSettings = {
      theme: 'system',
      ...additionalData.settings,
    };
    
    const userData: UserData = {
      uid,
      email,
      displayName: initialDisplayName,
      photoURL,
      createdAt: serverTimestamp() as Timestamp, // Use serverTimestamp for new users
      lastLoginAt: serverTimestamp() as Timestamp, // Use serverTimestamp for new users
      profile: defaultProfile,
      progress: defaultProgress,
      settings: defaultSettings,
      // Spread other top-level additionalData fields if any, ensuring not to overwrite core fields like uid, email
      ...additionalData,
      // Explicitly set fields that should come from auth user or defaults if not in additionalData
      displayName: initialDisplayName, 
      photoURL: photoURL || additionalData.photoURL,
    };

    try {
      await setDoc(userRef, userData);
    } catch (error) {
      console.error("Error creating user document:", error);
      throw error;
    }
  } else {
    // Update last login time and potentially displayName/photoURL if changed in auth provider
    const updateData: { lastLoginAt: FieldValue; displayName?: string; photoURL?: string | null } = {
      lastLoginAt: serverTimestamp(),
    };
    if (user.displayName && user.displayName !== snapshot.data()?.displayName) {
        updateData.displayName = user.displayName;
    }
    if (user.photoURL && user.photoURL !== snapshot.data()?.photoURL) {
        updateData.photoURL = user.photoURL;
    }

    try {
      await updateDoc(userRef, updateData);
    } catch (error) {
      console.error("Error updating last login time:", error);
    }
  }
};

export const getUserDocument = async (uid: string): Promise<UserData | null> => {
  if (!uid) return null;
  const userRef = doc(db, `users/${uid}`);
  try {
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      // Ensure Timestamps are correctly handled if they are not automatically converted
      const data = snapshot.data() as UserData;
      if (data.createdAt && !(data.createdAt instanceof Timestamp) && (data.createdAt as any).toDate) {
        data.createdAt = (data.createdAt as any).toDate();
      }
      if (data.lastLoginAt && !(data.lastLoginAt instanceof Timestamp) && (data.lastLoginAt as any).toDate) {
        data.lastLoginAt = (data.lastLoginAt as any).toDate();
      }
      // Similar checks for user.progress.streaks.lastActivityDate and user.progress.solvedProblems values if they store Timestamps
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user document for UID:", uid, error);
    return null; // Return null on error to prevent app crash
  }
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfileBio & { displayName?: string }>): Promise<void> => {
  if (!uid) return;
  const userRef = doc(db, `users/${uid}`);
  const { displayName, ...profileBioData } = data;
  
  const updateData: any = {};
  if (Object.keys(profileBioData).length > 0) {
    // Need to merge profile fields carefully to avoid overwriting entire object with only partial data
    // Firestore update with dot notation for nested fields is safer if only updating specific profile fields
    // For simplicity here, if profileBioData contains fields, we update them.
    // A more robust approach would fetch current profile and merge.
    // This assumes `profileBioData` contains the fields intended for the `profile` sub-object.
    for (const key in profileBioData) {
        updateData[`profile.${key}`] = (profileBioData as any)[key];
    }
  }

  if (displayName !== undefined) {
    updateData.displayName = displayName;
  }
  
  if (Object.keys(updateData).length > 0) {
    await updateDoc(userRef, updateData);
  }
};


export const updateUserProgress = async (uid: string, data: Partial<UserProgress>): Promise<void> => {
  if (!uid) return;
  const userRef = doc(db, `users/${uid}`);
  
  const updatePayload: { [key: string]: any } = {};
  for (const key in data) {
    updatePayload[`progress.${key}`] = (data as any)[key];
  }

  if (Object.keys(updatePayload).length > 0) {
     await updateDoc(userRef, updatePayload);
  }
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
  // const q = query(snippetsCol, where("userId", "==", userId)); // Redundant if using subcollection path users/${userId}/snippets
  const snapshot = await getDocs(snippetsCol);
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