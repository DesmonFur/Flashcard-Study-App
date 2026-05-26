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
    const newFlashCard: Flashcard = {
      id: crypto.randomUUID(),
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category,
      difficulty: flashcard.difficulty,
    };
    setFlashcards((prev) => [...prev, newFlashCard]);
  }

  function handleCategoryFilter(category: string): void {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setCorrectCount(0);
    setWrongCount(0);
  }
  function handleDifficultyFilter(difficulty: DifficultyFilterValue): void {
    setSelectedDifficulty(difficulty);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setCorrectCount(0);
    setWrongCount(0);
  }

  if (flashcards.length === 0 || filteredFlashcards.length === 0) {
    return (
      <div className="p-4">
        <EmptyState
          title="No flashcards yet"
          description="Add your first flashcard to start studying."
        />
        <div className="flex flex-col justify-center items-center sm:flex-row gap-5  mt-10 mb-10 max-w-2xl mx-auto">
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
    <div className="p-4">
      <h1 className="text-3xl font-bold mt-6 ">Flashcard Study App</h1>

      <ProgressBar
        currentIndex={currentIndex}
        totalCards={filteredFlashcards.length}
      />
      <div className="flex flex-col justify-center items-center sm:flex-row gap-5  mt-10 mb-10 max-w-2xl mx-auto">
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
