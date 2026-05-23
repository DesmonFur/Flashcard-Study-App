import { useState } from "react";
import { starterFlashcards } from "./data/starterFlashcards";
import type { Flashcard } from "./types";
import "./App.css";

function App() {
  const [flashcards, setFlashCards] = useState<Flashcard[]>(
    () => starterFlashcards,
  );
  const currentCard = flashcards[0];

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500">Flashcard Study App</h1>
      <ul>
        <li>Category: {currentCard.category}</li>
        <li>Q: {currentCard.question}</li>
        <li>Difficulty: {currentCard.difficulty}</li>
      </ul>
    </>
  );
}

export default App;
