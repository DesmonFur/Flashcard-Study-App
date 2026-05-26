import { useState } from "react";
import { starterFlashcards } from "./data/starterFlashcards";
import type { Flashcard, DifficultyFilterValue } from "./types";
import { FlashcardViewer } from "./components/FlashcardViewer";
import { StudyStats } from "./components/StudyStats";
import { ProgressBar } from "./components/ProgressBar";
import { FlashcardForm } from "./components/FlashcardForm";
import "./App.css";
import { Button } from "./components/ui/Button";
import { EmptyState } from "./components/EmptyState";
import { CategoryFilter } from "./components/CategoryFilter";
import { DifficultyFilter } from "./components/DifficultyFilter";
import { useLocalStorage } from "./hooks/useLocalStorage";
function App() {
  const [flashcards, setFlashcards] = useLocalStorage<Flashcard[]>(
    "flashcards",
    starterFlashcards,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyFilterValue>("all");
  const categories = [
    "All Categories",
    ...new Set(flashcards.map((card) => card.category)),
  ];
  const filteredFlashcards = flashcards.filter((card) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      card.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === "all" || card.difficulty === selectedDifficulty;

    return matchesCategory && matchesDifficulty;
  });
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

  function resetSession(): void {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setCorrectCount(0);
    setWrongCount(0);
  }

  function handleCategoryFilter(category: string): void {
    setSelectedCategory(category);
    resetSession();
  }
  function handleDifficultyFilter(difficulty: DifficultyFilterValue): void {
    setSelectedDifficulty(difficulty);
    resetSession();
  }

  function handleDelete(id: string): void {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
    resetSession();
  }

  if (flashcards.length === 0 || filteredFlashcards.length === 0) {
    return (
      <div className="p-4">
        {flashcards.length === 0 ? (
          <EmptyState
            title="No flashcards yet"
            description="Add your first flashcard to start studying."
          />
        ) : (
          <EmptyState
            title="Nothing found"
            description="Change your filters to find more cards."
          />
        )}

        <div className="mx-auto mt-10 mb-10 flex max-w-2xl flex-col items-center justify-center gap-5 sm:flex-row">
          <CategoryFilter
            categories={categories}
            category={selectedCategory}
            onCatChange={handleCategoryFilter}
          />
          <DifficultyFilter
            difficulty={selectedDifficulty}
            onDiffChange={handleDifficultyFilter}
          />
        </div>
        <FlashcardForm onAdd={handleAdd} />
      </div>
    );
  }
  if (isSessionComplete)
    return (
      <div className="p-4">
        <h1 className="mt-6 text-3xl font-bold">Study complete!</h1>
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
    <div className="p-4">
      <h1 className="mt-6 text-3xl font-bold">Flashcard Study App</h1>

      <ProgressBar
        currentIndex={currentIndex}
        totalCards={filteredFlashcards.length}
      />
      <div className="mx-auto mt-10 mb-10 flex max-w-2xl flex-col items-center justify-center gap-5 sm:flex-row">
        <CategoryFilter
          categories={categories}
          category={selectedCategory}
          onCatChange={handleCategoryFilter}
        />
        <DifficultyFilter
          difficulty={selectedDifficulty}
          onDiffChange={handleDifficultyFilter}
        />
      </div>
      <FlashcardViewer
        card={currentCard}
        isAnswerVisible={isAnswerVisible}
        onRevealAnswer={handleRevealAnswer}
        onAnswer={handleAnswer}
        onDelete={handleDelete}
      />
      <StudyStats
        correctCount={correctCount}
        wrongCount={wrongCount}
        totalCards={filteredFlashcards.length}
      />
      <FlashcardForm onAdd={handleAdd} />
    </div>
  );
}

export default App;
