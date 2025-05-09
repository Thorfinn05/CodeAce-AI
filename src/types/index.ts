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

export interface UserProgress {
  solvedProblems: string[]; // Array of problem IDs
  xp: number;
  badges: string[]; // Array of badge names/IDs
  topicMastery: {
    [topic: string]: {
      solved: number;
      xp: number;
      masteryLevel: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    };
  };
  // Could add preferredLanguages, dailyStreak, etc.
}

// Add other types as the application grows
// export interface UserProfile {
//   uid: string;
//   displayName?: string | null;
//   email?: string | null;
//   photoURL?: string | null;
//   bio?: string;
//   preferredLanguages?: SupportedLanguage[];
//   // ... other profile fields
// }
