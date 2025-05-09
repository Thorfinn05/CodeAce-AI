
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

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const signUpWithEmailAndPassword = async (email: string, password: string, displayName?: string): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user && displayName) {
      await updateProfile(userCredential.user, { displayName });
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
