export interface QuizOption {
  id: string;
  text: string;
}

/**
 * Full Question shape used at runtime (quiz player, quiz builder).
 */
export interface Question {
  id: string;
  text: string;
  type: string;
  points: number;
  options: QuizOption[];
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface Quiz {
  id: string;
  title: string;
  timeLimit: number;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  timeSpent: number;
  percentage: number;
}
