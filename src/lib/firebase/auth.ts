
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User,
  onAuthStateChanged as onFirebaseAuthStateChanged, // Renamed to avoid conflict
} from "firebase/auth";
import { app } from "./config"; // Ensure your firebase app config is correctly imported

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    // The signed-in user info.
    return result.user;
  } catch (error: any) {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData?.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    console.error("Google Sign-In Error:", error);
    throw error; // Re-throw the error to be caught by the caller
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
