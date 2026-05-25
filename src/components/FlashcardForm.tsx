import type { Flashcard, Difficulty } from "../types";
import type { FormEvent, JSX } from "react";
import { useState } from "react";

type FlashcardFormProps = {
  onAdd: (flashcard: Flashcard) => void;
};

export function FlashcardForm({ onAdd }: FlashcardFormProps): JSX.Element {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [errors, setErrors] = useState<string[]>([]);

  function submitForm(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setErrors([]);
    const newErrors: string[] = [];

    if (!question.trim()) {
      newErrors.push("question field cannot be blank");
    }

    if (!answer.trim()) {
      newErrors.push("answer field cannot be blank");
    }

    if (!category.trim()) {
      newErrors.push("category field cannot be blank");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    onAdd({
      id: crypto.randomUUID(),
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
      difficulty,
    });
    setQuestion("");
    setAnswer("");
    setCategory("");
    setDifficulty("easy");
  }

  return (
    <>
      {errors.length > 0 && (
        <ul className="  text-red-600">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      <form
        className="flex w-full max-w-md flex-col gap-1 mx-auto"
        onSubmit={submitForm}
      >
        <h2>Add Flashcard</h2>
        <div className="flex flex-col gap-1">
          {" "}
          <label htmlFor="question">Question:</label>
          <input
            id="question"
            name="question"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          {" "}
          <label htmlFor="answer">Answer:</label>
          <input
            id="answer"
            name="answer"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          {" "}
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            name="category"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          {" "}
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            value={difficulty}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
