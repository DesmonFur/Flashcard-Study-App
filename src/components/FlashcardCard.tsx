import type { Flashcard } from "@/types";
import type { JSX } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

type FlashcardCardProps = {
  flashcard: Flashcard;
  isAnswerVisible: boolean;
  onAnswer: (isCorrect: boolean) => void;
  onRevealAnswer: () => void;
  onDelete: (id: string) => void;
};
export function FlashcardCard({
  flashcard,
  onAnswer,
  onRevealAnswer,
  isAnswerVisible,
  onDelete,
}: FlashcardCardProps): JSX.Element {
  return (
    <Card className="mx-auto mt-6 mb-6 w-full max-w-2xl">
      <CardHeader>
        <Badge className="ml-auto">{flashcard.difficulty}</Badge>
        <CardTitle className="wrap-break-word text-2xl sm:text-4xl">
          {flashcard.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAnswerVisible && (
          <p className="text-2xl font-semibold mb-2.5">{flashcard.answer}</p>
        )}
        <Badge>{flashcard.category}</Badge>
      </CardContent>

      <CardFooter className="grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onDelete(flashcard.id)}
          >
            Delete
          </Button>
        </div>

        <div className="justify-self-center">
          {isAnswerVisible ? (
            <div className="flex gap-2">
              <Button onClick={() => onAnswer(true)}>Correct</Button>
              <Button onClick={() => onAnswer(false)} variant="secondary">
                Wrong
              </Button>
            </div>
          ) : (
            <Button type="button" size="sm" onClick={onRevealAnswer}>
              Reveal
            </Button>
          )}
        </div>

        <div />
      </CardFooter>
    </Card>
  );
}
