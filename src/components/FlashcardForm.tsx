import type { Flashcard } from "../types";
import type { JSX } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

import { Label } from "./ui/Label";
import { FormError } from "./ui/FormError";
import { Textarea } from "./ui/Textarea";
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
    control,
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
    const newFlashCard: Flashcard = {
      id: crypto.randomUUID(),

      question: data.question,
      answer: data.answer,
      category: data.category,
      difficulty: data.difficulty,
    };
    onAdd(newFlashCard);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">Add Flashcard</h2>
      <div className="flex flex-col gap-1">
        <Label htmlFor="question">Question:</Label>
        <Input id="question" {...register("question")} />

        <FormError message={errors.question?.message}></FormError>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="answer">Answer:</Label>
        <Textarea id="answer" {...register("answer")}></Textarea>

        <FormError message={errors.answer?.message}></FormError>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="category">Category:</Label>
        <Input id="category" {...register("category")} />

        <FormError message={errors.category?.message}></FormError>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="difficulty">Difficulty:</Label>

        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="difficulty" className="w-full">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <FormError message={errors.difficulty?.message} />
      </div>

      <Button type="submit">Add Card</Button>
    </form>
  );
}
