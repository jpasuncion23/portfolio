import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_0_28px_-8px_var(--color-accent)] hover:bg-accent/90",
  outline: "border border-border bg-surface/60 text-foreground hover:border-accent/50 hover:bg-surface",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
};

type ButtonProps = ComponentProps<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** A link styled as a button. Every button on this site navigates somewhere. */
export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
