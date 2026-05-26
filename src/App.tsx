import { useState } from "react";
import { starterFlashcards } from "./data/starterFlashcards";
import type { Flashcard } from "./types";
import { FlashcardViewer } from "./components/FlashcardViewer";
import { StudyStats } from "./components/StudyStats";
import { ProgressBar } from "./components/ProgressBar";
import { FlashcardForm } from "./components/FlashcardForm";
import "./App.css";
import { Button } from "./components/ui/Button";

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    () => starterFlashcards,
  );
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

  function handleAdd(flashcard: Flashcard): void {
    setFlashcards((prev) => [...prev, flashcard]);
  }
  if (isSessionComplete)
    return (
      <>
        <h1 className="text-3xl font-bold mt-6">Study complete!</h1>
        <StudyStats
          correctCount={correctCount}
          wrongCount={wrongCount}
          totalCards={flashcards.length}
        />
        <Button onClick={handleRestart}>Restart Session</Button>
      </>
    );
  const currentCard = flashcards[currentIndex];

  return (
    <>
      <h1 className="text-3xl font-bold mt-6 ">Flashcard Study App</h1>

      <FlashcardViewer
        card={currentCard}
        isAnswerVisible={isAnswerVisible}
        onRevealAnswer={handleRevealAnswer}
        onAnswer={handleAnswer}
      />
      <ProgressBar currentIndex={currentIndex} totalCards={flashcards.length} />
      <FlashcardForm onAdd={handleAdd} />
    </>
  );
}

export default App;
