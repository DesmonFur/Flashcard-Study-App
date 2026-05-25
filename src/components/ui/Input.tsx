import type { ComponentProps, JSX } from "react";

type InputProps = ComponentProps<"input">;

export function Input({
  type = "text",
  className = "",
  ...props
}: InputProps): JSX.Element {
  return (
    <input
      className={`w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none ${className}`}
      type={type}
      {...props}
    />
  );
}
