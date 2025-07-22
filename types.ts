
export enum ViewType {
  Learn = 'learn',
  Practice = 'practice',
}

export interface Problem {
  num1: number;
  num2: number;
}

export type FeedbackStatus = 'idle' | 'correct' | 'incorrect' | 'thinking';
