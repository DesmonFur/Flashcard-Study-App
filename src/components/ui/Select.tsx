import type { ComponentProps, JSX } from "react";

type SelectProps = ComponentProps<"select">;

export function Select({
  children,
  className = "",
  ...props
}: SelectProps): JSX.Element {
  return (
    <select
      className={`w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
