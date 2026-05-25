import type { ComponentProps, JSX } from "react";

type LabelProps = ComponentProps<"label">;

export function Label({
  children,
  className = "",
  ...props
}: LabelProps): JSX.Element {
  return (
    <label
      className={` text-sm font-medium text-slate-200 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
