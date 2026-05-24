import type { JSX } from "react";
import type { Flashcard } from "../types";

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
            <button onClick={() => onAnswer(true)}>Correct</button>
            <button onClick={() => onAnswer(false)}>Wrong</button>
          </div>
        </div>
      ) : (
        <button onClick={onRevealAnswer}>Reveal Answer</button>
      )}
    </>
  );
}
