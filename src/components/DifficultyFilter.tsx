import type { JSX } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Label } from "./ui/Label";
import type { DifficultyFilterValue } from "@/types";
type DifficultyFilterProps = {
  difficulty: DifficultyFilterValue;
  onDiffChange: (difficulty: DifficultyFilterValue) => void;
};

export function DifficultyFilter({
  difficulty,
  onDiffChange,
}: DifficultyFilterProps): JSX.Element {
  return (
    <div className="mx-auto flex w-full max-w-md items-center gap-4 px-5">
      <Label htmlFor="difficulty-filter">Difficulty:</Label>

      <Select value={difficulty} onValueChange={onDiffChange}>
        <SelectTrigger className="w-full" id="difficulty">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All difficulties</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
