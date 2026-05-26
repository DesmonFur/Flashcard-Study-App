# Flashcard Study App

A small React practice app for studying flashcards. The goal of this project was to rebuild comfort with modern React patterns, TypeScript, form validation, local persistence, and shadcn-style UI components.

## Features

- Study flashcards one at a time
- Reveal answers before marking a card correct or wrong
- Track correct answers, wrong answers, and accuracy
- Add new flashcards with validated form fields
- Delete existing flashcards
- Filter cards by category and difficulty
- Show empty states for no cards and no matching filters
- Persist flashcards in `localStorage`

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/Radix UI components
- React Hook Form
- Zod
- localStorage via a custom `useLocalStorage` hook

## What This Project Practiced

- Parent-owned state and prop-driven child components
- Derived state for filtering flashcards
- Immutable add/delete updates
- Reusable UI primitives
- Zod schemas with React Hook Form
- Radix/shadcn Select usage with custom components
- TypeScript union types for difficulty values
- Basic persistence with a reusable local storage hook

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

This is a practice app, not a large reference architecture. The code intentionally stays small and direct while still using real React patterns that can scale into larger projects when needed.
