import type { JSX } from "react";

type ProgressBarProps = {
  currentIndex: number;
  totalCards: number;
};
export function ProgressBar({
  currentIndex,
  totalCards,
}: ProgressBarProps): JSX.Element {
  const currentCardNumber = totalCards === 0 ? 0 : currentIndex + 1;

  const progress =
    totalCards === 0 ? 0 : Math.round((currentCardNumber / totalCards) * 100);
  return (
    <div className="space-y-2 mb-20 max-w-xl mx-auto p-6">
      <div className="flex items-center justify-between text-sm ">
        <p>
          Card {currentCardNumber} of {totalCards}
        </p>
        <p>{progress}%</p>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
