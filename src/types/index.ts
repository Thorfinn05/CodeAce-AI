import type { Timestamp } from 'firebase/firestore';

export type SupportedLanguage = 'python' | 'javascript' | 'java' | 'c++';

export interface Problem {
  id: string;
  title: string;
  description: string;
  input_format: string;
  output_format: string;
  constraints: string[];
  sample_input: string;
  sample_output: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  defaultCode?: {
    [language in SupportedLanguage]?: string;
  };
  // Test cases could be added here later if needed for a simulator
  // test_cases?: { input: string; expected_output: string; is_public?: boolean }[];
}

export interface UserProfileBio {
  bio?: string;
  preferredLanguages?: SupportedLanguage[];
  location?: string; // if needed
}

export interface UserStreak {
  current: number;
  longest: number;
  lastActivityDate: Timestamp | null | Date; // Store as Timestamp, convert to Date on client
}

export interface UserTopicMastery {
  [topic: string]: {
    solved: number;
    xp: number;
    masteryLevel: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  };
}

export interface UserProgress {
  xp: number;
  streaks: UserStreak;
  solvedProblems: { // problemId: timestamp or true (or object with solve details)
    [problemId: string]: Timestamp | Date | boolean; // Store as Timestamp
  };
  topicMastery: UserTopicMastery;
  badges: string[]; // Array of badge names/IDs
  lastProblemId?: string; // For "Continue where you left off"
}

export type ThemePreference = "light" | "dark" | "system";

export interface UserSettings {
  theme: ThemePreference;
  // other settings like notifications, editor preferences, etc.
}

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp | Date; // Store as Timestamp
  lastLoginAt: Timestamp | Date; // Store as Timestamp
  profile: UserProfileBio;
  progress: UserProgress;
  settings: UserSettings;
  // roles?: string[]; // For admin/moderator
}

export interface Snippet {
  id: string;
  userId: string;
  title: string;
  code: string;
  language: SupportedLanguage;
  description?: string;
  tags?: string[];
  problemId?: string; // Optional: if snippet is from a solved problem
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}
