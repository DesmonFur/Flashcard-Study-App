import { useState } from "react";
import { starterFlashcards } from "./data/starterFlashcards";
import type { Flashcard } from "./types";
import { FlashcardViewer } from "./components/FlashcardViewer";
import { StudyStats } from "./components/StudyStats";
import { ProgressBar } from "./components/ProgressBar";
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
        <StudyStats
          correctCount={correctCount}
          wrongCount={wrongCount}
          totalCards={flashcards.length}
        />
        <button onClick={handleRestart}>Restart Session</button>
      </>
    );
  const currentCard = flashcards[currentIndex];

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500">Flashcard Study App</h1>

      <ProgressBar currentIndex={currentIndex} totalCards={flashcards.length} />

      <FlashcardViewer
        card={currentCard}
        isAnswerVisible={isAnswerVisible}
        onRevealAnswer={handleRevealAnswer}
        onAnswer={handleAnswer}
      />
    </>
  );
}

export default App;
