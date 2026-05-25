import type { Flashcard } from "../types";
import type { JSX } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      <div>
        <label htmlFor="question">Question:</label>
        <input
          id="question"
          {...register("question")}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
        />
        {errors.question && (
          <p className="text-red-600">{errors.question.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="answer">Answer:</label>
        <input
          id="answer"
          {...register("answer")}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
        />
        {errors.answer && (
          <p className="text-red-600">{errors.answer.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          {...register("category")}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
        />
        {errors.category && (
          <p className="text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          {...register("difficulty")}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {errors.difficulty && (
          <p className="text-red-600">{errors.difficulty.message}</p>
        )}
      </div>

      <button
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
        type="submit"
      >
        Add Card
      </button>
    </form>
  );
}
