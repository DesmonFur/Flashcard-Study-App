import type { JSX } from "react";
import { Card, CardContent } from "./ui/Card";

type StudyStatsProps = {
  correctCount: number;
  wrongCount: number;
  totalCards: number;
};
export function StudyStats({
  correctCount,
  wrongCount,
  totalCards,
}: StudyStatsProps): JSX.Element {
  const totalAnswered = correctCount + wrongCount;
  const accuracy =
    totalAnswered === 0 ? 0 : Math.round((correctCount / totalAnswered) * 100);
  return (
    <Card className="mx-auto mt-6 mb-6 w-full max-w-2xl">
      {" "}
      <CardContent className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
        <div>
          <p className="text-xs text-muted-foreground">Studied</p>
          <p className="text-lg font-semibold">
            {totalAnswered}/{totalCards}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Correct</p>
          <p className="text-lg font-semibold">{correctCount}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Wrong</p>
          <p className="text-lg font-semibold">{wrongCount}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Accuracy</p>
          <p className="text-lg font-semibold">{accuracy}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
