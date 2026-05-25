import type { ComponentProps, JSX } from "react";

type FormErrorProps = ComponentProps<"p"> & {
  message?: string;
};

export function FormError({
  message,
  className = "",
  ...props
}: FormErrorProps): JSX.Element | null {
  if (!message) return null;

  return (
    <p className={`text-sm text-red-600 ${className}`} {...props}>
      {message}
    </p>
  );
}
