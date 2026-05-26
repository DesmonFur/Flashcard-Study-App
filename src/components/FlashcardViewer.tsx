import type { JSX } from "react";
import type { Flashcard } from "../types";
import { FlashcardCard } from "./FlashcardCard";
type FlashcardViewerProps = {
  card: Flashcard;
  isAnswerVisible: boolean;
  onRevealAnswer: () => void;
  onAnswer: (isCorrect: boolean) => void;
  onDelete: (id: string) => void;
};

export function FlashcardViewer({
  card,
  isAnswerVisible,
  onRevealAnswer,
  onAnswer,
  onDelete,
}: FlashcardViewerProps): JSX.Element {
  return (
    <div className="px-5">
      <FlashcardCard
        flashcard={card}
        onAnswer={onAnswer}
        isAnswerVisible={isAnswerVisible}
        onRevealAnswer={onRevealAnswer}
        onDelete={onDelete}
      />
    </div>
  );
}
