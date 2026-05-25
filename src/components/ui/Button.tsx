import type { ComponentProps, JSX } from "react";

type ButtonProps = ComponentProps<"button">;

export function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
