
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User,
  onAuthStateChanged as onFirebaseAuthStateChanged, // Renamed to avoid conflict
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./config"; // Ensure your firebase app config is correctly imported
import { createUserDocument } from "./firestore"; // Import Firestore user creation

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      await createUserDocument(result.user); // Create/update user doc
    }
    return result.user;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    // Handle specific errors like popup closed by user
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      // Optionally re-throw a more specific error or handle silently
      console.warn("Google Sign-In popup closed by user.");
    }
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const signUpWithEmailAndPassword = async (email: string, password: string, displayName?: string): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      const nameToSet = displayName || email.split('@')[0]; // Default display name from email prefix
      await updateProfile(userCredential.user, { displayName: nameToSet });
       // Pass displayName to createUserDocument if it should override the one from auth user object initially
      await createUserDocument(userCredential.user, { displayName: nameToSet });
    }
    return userCredential.user;
  } catch (error: any) {
    console.error("Email/Password Sign-Up Error:", error);
    throw error;
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await createUserDocument(userCredential.user); // Ensure user doc exists and update last login
    }
    return userCredential.user;
  } catch (error: any) {
    console.error("Email/Password Sign-In Error:", error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw error;
  }
};

// Wrapper around onAuthStateChanged to provide a simpler interface
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return onFirebaseAuthStateChanged(auth, callback);
};
