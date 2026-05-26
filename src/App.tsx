import { useState } from "react";
import { starterFlashcards } from "./data/starterFlashcards";
import type { Flashcard } from "./types";
import { FlashcardViewer } from "./components/FlashcardViewer";
import { StudyStats } from "./components/StudyStats";
import { ProgressBar } from "./components/ProgressBar";
import { FlashcardForm } from "./components/FlashcardForm";
import "./App.css";
import { Button } from "./components/ui/Button";
import { EmptyState } from "./components/EmptyState";
import { CategoryFilter } from "./components/CategoryFilter";

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    () => starterFlashcards,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "All Categories",
    ...new Set(flashcards.map((card) => card.category)),
  ];
  const filteredFlashcards =
    selectedCategory === "All Categories"
      ? flashcards
      : flashcards.filter((card) => card.category === selectedCategory);

  const isSessionComplete = currentIndex >= filteredFlashcards.length;
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

  function handleCategoryFilter(category: string): void {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setCorrectCount(0);
    setWrongCount(0);
  }

  if (flashcards.length === 0 || filteredFlashcards.length === 0) {
    return (
      <>
        <EmptyState
          title="No flashcards yet"
          description="Add your first flashcard to start studying."
        />
        <FlashcardForm onAdd={handleAdd} />
      </>
    );
  }
  if (isSessionComplete)
    return (
      <div>
        <h1 className="text-3xl font-bold mt-6">Study complete!</h1>
        <StudyStats
          correctCount={correctCount}
          wrongCount={wrongCount}
          totalCards={filteredFlashcards.length}
        />
        <ProgressBar
          currentIndex={currentIndex - 1}
          totalCards={filteredFlashcards.length}
        />

        <Button onClick={handleRestart}>Restart Session</Button>
      </div>
    );
  const currentCard = filteredFlashcards[currentIndex];

  return (
    <>
      <h1 className="text-3xl font-bold mt-6 ">Flashcard Study App</h1>

      <ProgressBar
        currentIndex={currentIndex}
        totalCards={filteredFlashcards.length}
      />
      <CategoryFilter
        categories={categories}
        category={selectedCategory}
        onCatChange={handleCategoryFilter}
      />
      <FlashcardViewer
        card={currentCard}
        isAnswerVisible={isAnswerVisible}
        onRevealAnswer={handleRevealAnswer}
        onAnswer={handleAnswer}
      />
      <StudyStats
        correctCount={correctCount}
        wrongCount={wrongCount}
        totalCards={filteredFlashcards.length}
      />
      <FlashcardForm onAdd={handleAdd} />
    </>
  );
}

export default App;
