export interface Exercise {
  num1: number;
  num2: number;
  operation: '+' | '-';
  answer: number;
}

export interface GameState {
  currentExercise: number;
  exercises: Exercise[];
  score: number;
  showCelebration: boolean;
}