import type { JSX } from "react";

type ProgressBarProps = {
  currentIndex: number;
  totalCards: number;
};
export function ProgressBar({
  currentIndex,
  totalCards,
}: ProgressBarProps): JSX.Element {
  const progress =
    totalCards === 0 ? 0 : Math.round((currentIndex / totalCards) * 100);
  return (
    <>
      <p>
        Card {currentIndex + 1} of {totalCards}
      </p>
      <p>Progress: {progress}%</p>
    </>
  );
}
