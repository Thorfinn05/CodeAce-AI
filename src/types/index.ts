export interface Problem {
  id: string;
  title: String;
  description: string;
  input_format: string;
  output_format: string;
  constraints: string[];
  sample_input: string;
  sample_output: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  defaultCode?: {
    [language: string]: string;
  };
}

export type SupportedLanguage = 'python' | 'javascript' | 'java' | 'c++';
