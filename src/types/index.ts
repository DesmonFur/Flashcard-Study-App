export type Difficulty = "easy" | "medium" | "hard";

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: Difficulty;
};
