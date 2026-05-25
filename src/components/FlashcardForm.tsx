import type { Flashcard } from "../types";
import type { JSX } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Label } from "./ui/Label";
import { FormError } from "./ui/FormError";
type FlashcardFormProps = {
  onAdd: (flashcard: Flashcard) => void;
};
const flashcardSchema = z.object({
  question: z.string().trim().min(1, "question field cannot be empty"),
  answer: z.string().trim().min(1, "answer field cannot be empty"),
  category: z.string().trim().min(1, "category field cannot be empty"),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

type FlashcardFormValues = z.infer<typeof flashcardSchema>;

export function FlashcardForm({ onAdd }: FlashcardFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlashcardFormValues>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
      difficulty: "easy",
    },
  });

  function onSubmit(data: FlashcardFormValues): void {
    onAdd({
      id: crypto.randomUUID(),
      ...data,
    });

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-1 mx-auto "
    >
      <h2 className="text-xl font-semibold">Add Flashcard</h2>
      <div className="flex flex-col gap-1">
        <Label htmlFor="question">Question:</Label>
        <Input id="question" {...register("question")} />
        {errors.question && (
          <FormError message={errors.question.message}></FormError>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="answer">Answer:</Label>
        <Input id="answer" {...register("answer")} />
        {errors.answer && (
          <FormError message={errors.answer.message}></FormError>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="category">Category:</Label>
        <Input id="category" {...register("category")} />
        {errors.category && (
          <FormError message={errors.category.message}></FormError>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="difficulty">Difficulty:</Label>
        <Select id="difficulty" {...register("difficulty")}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
        {errors.difficulty && (
          <FormError message={errors.difficulty.message}></FormError>
        )}
      </div>

      <Button type="submit">Add Card</Button>
    </form>
  );
}
