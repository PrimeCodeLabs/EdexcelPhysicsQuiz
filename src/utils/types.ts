export interface Question {
  text: string;
  choices: string;
  correctAnswer: number;
  subject: string;
  level: string;
  examBoard: string;
  subtopic: string;
}

export interface UserProgress {
  [subtopic: string]: {
    correct: number;
    total: number;
  };
}
