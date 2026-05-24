import type { JSX } from "react";

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
    <div>
      <p>Correct: {correctCount}</p>
      <p>Wrong: {wrongCount}</p>
      <p>Total cards: {totalCards}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
}
