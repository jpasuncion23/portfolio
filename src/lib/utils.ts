/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** "Juan dela Cruz" -> "JD". */
export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Theme colors for places CSS variables can't reach (generated images,
 * browser theme color). Keep in sync with the tokens in globals.css.
 */
export const themeColors = {
  background: "#0a0c10",
  surface: "#12151c",
  border: "#262b36",
  foreground: "#e8eaef",
  muted: "#9097a6",
  accent: "#2dd4bf",
};
