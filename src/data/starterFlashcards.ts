import type { Flashcard } from "../types";

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
    question: "What does .filter() return?",
    answer: "A new array containing only the items that pass the condition.",
    category: "JavaScript",
    difficulty: "easy",
  },
  {
    id: "3",
    question: "What does .reduce() commonly help with?",
    answer:
      "Turning an array into a single value, such as a total, object, grouped result, or transformed structure.",
    category: "JavaScript",
    difficulty: "medium",
  },
  {
    id: "4",
    question: "What does useState return?",
    answer:
      "An array containing the current state value and a setter function.",
    category: "React",
    difficulty: "easy",
  },
  {
    id: "5",
    question: "What is derived state?",
    answer:
      "A value calculated from existing state instead of being stored separately.",
    category: "React",
    difficulty: "medium",
  },
  {
    id: "6",
    question: "When should you lift state up?",
    answer: "When multiple components need to read or update the same state.",
    category: "React",
    difficulty: "medium",
  },
  {
    id: "7",
    question: "What does ComponentProps<'button'> do?",
    answer:
      "It gives your component all the normal prop types that a native button element can accept.",
    category: "TypeScript",
    difficulty: "medium",
  },
  {
    id: "8",
    question: "What does a union type allow?",
    answer:
      "It allows a value to be one of several possible types or literal values.",
    category: "TypeScript",
    difficulty: "easy",
  },
  {
    id: "9",
    question: "What does z.infer do?",
    answer:
      "It creates a TypeScript type from a Zod schema so your validation and form values stay in sync.",
    category: "TypeScript",
    difficulty: "medium",
  },
  {
    id: "10",
    question: "What is the Set pattern useful for?",
    answer:
      "Tracking seen values, checking duplicates, and enforcing uniqueness.",
    category: "Data Structures",
    difficulty: "easy",
  },
  {
    id: "11",
    question: "What is a hash map/object counting pattern useful for?",
    answer:
      "Counting frequency, grouping values, and quickly looking up whether something exists.",
    category: "Data Structures",
    difficulty: "medium",
  },
  {
    id: "12",
    question: "What does minmax() help with in CSS Grid?",
    answer:
      "It sets a flexible size range, such as a minimum column width with a flexible maximum.",
    category: "CSS",
    difficulty: "medium",
  },
  {
    id: "13",
    question: "When should you use Grid instead of Flexbox?",
    answer:
      "Use Grid when you need two-dimensional layout control across rows and columns.",
    category: "CSS",
    difficulty: "medium",
  },
  {
    id: "14",
    question: "What does a guard clause do?",
    answer:
      "It handles an invalid or early-exit condition first so the main logic stays flatter and easier to read.",
    category: "Clean Code",
    difficulty: "easy",
  },
  {
    id: "15",
    question: "What is Command Query Separation?",
    answer:
      "A function should either change state or return data, but ideally not both.",
    category: "Clean Code",
    difficulty: "hard",
  },
];
