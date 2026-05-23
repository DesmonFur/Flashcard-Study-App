import type { Flashcard } from "../types/index";

export const starterFlashcards: Flashcard[] = [
  {
    id: "1",
    question: "What does .map() return?",
    answer: "A new array with each item transformed.",
    category: "JavaScript",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "What does useState return?",
    answer:
      "An array containing the current state value and a setter function.",
    category: "React",
    difficulty: "easy",
  },
  {
    id: "3",
    question: "What is derived state?",
    answer:
      "A value calculated from existing state instead of being stored separately.",
    category: "React",
    difficulty: "medium",
  },
];
