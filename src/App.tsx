import { useState } from "react";
import { starterFlashcards } from "./data/starterFlashcards";
import type { Flashcard } from "./types";
import "./App.css";

function App() {
  const [flashcards] = useState<Flashcard[]>(() => starterFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const isSessionComplete = currentIndex >= flashcards.length;

  const handleAnswer = (isCorrect: boolean): void => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
    setIsAnswerVisible(false);
    setCurrentIndex((prev) => prev + 1);
  };

  function handleRevealAnswer(): void {
    setIsAnswerVisible(true);
  }

  function handleRestart(): void {
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsAnswerVisible(false);
  }
  if (isSessionComplete)
    return (
      <>
        <h1 className="text-3xl font-bold text-blue-500">Study complete!</h1>
        <p>Correct: {correctCount}</p>
        <p>Wrong: {wrongCount}</p>
        <p>Total cards studied: {flashcards.length}</p>
        <button onClick={handleRestart}>Restart Session</button>
      </>
    );
  const currentCard = flashcards[currentIndex];

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500">Flashcard Study App</h1>
      <ul>
        <li>Category: {currentCard.category}</li>
        <li>Q: {currentCard.question}</li>
        <li>Difficulty: {currentCard.difficulty}</li>
      </ul>
      <p>
        Card {currentIndex + 1} of {flashcards.length}
      </p>
      <p>Correct Count: {correctCount}</p>
      <p>Wrong Count: {wrongCount}</p>

      {isAnswerVisible ? (
        <div>
          <p>{currentCard.answer}</p>
          <div>
            <button onClick={() => handleAnswer(true)}>Correct</button>
            <button onClick={() => handleAnswer(false)}>Wrong</button>
          </div>
        </div>
      ) : (
        <button onClick={handleRevealAnswer}>Reveal Answer</button>
      )}
    </>
  );
}

export default App;
