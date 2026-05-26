import type { JSX } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Label } from "./ui/Label";

type CategoryFilterProps = {
  category: string;
  categories: string[];
  onCatChange: (category: string) => void;
};

export function CategoryFilter({
  category,
  onCatChange,
  categories,
}: CategoryFilterProps): JSX.Element {
  return (
    <div className="mx-auto flex w-full max-w-md items-center gap-4 px-5">
      <Label htmlFor="category">Category:</Label>

      <Select value={category} onValueChange={onCatChange}>
        <SelectTrigger className="w-full" id="category">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
