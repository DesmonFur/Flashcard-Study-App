import type { JSX } from "react";
import type { Flashcard } from "../types";
import { Button } from "./ui/Button";
type FlashcardViewerProps = {
  card: Flashcard;
  isAnswerVisible: boolean;
  onRevealAnswer: () => void;
  onAnswer: (isCorrect: boolean) => void;
};

export function FlashcardViewer({
  card,
  isAnswerVisible,
  onRevealAnswer,
  onAnswer,
}: FlashcardViewerProps): JSX.Element {
  return (
    <>
      <ul>
        <li>Category: {card.category}</li>
        <li>Q: {card.question}</li>
        <li>Difficulty: {card.difficulty}</li>
      </ul>

      {isAnswerVisible ? (
        <div>
          <p>{card.answer}</p>
          <div>
            <Button onClick={() => onAnswer(true)}>Correct</Button>
            <Button onClick={() => onAnswer(false)}>Wrong</Button>
          </div>
        </div>
      ) : (
        <Button onClick={onRevealAnswer}>Reveal Answer</Button>
      )}
    </>
  );
}
