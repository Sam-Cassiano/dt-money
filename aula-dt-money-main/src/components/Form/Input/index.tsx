import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(
          "w-full h-16 px-6 py-4 bg-background text-input text-normal border border-input-border rounded-md placeholder-input focus:outline-none focus:border-primary",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";
