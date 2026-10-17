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

/** "https://www.github.com/me" -> "github.com/me", "mailto:a@b.c" -> "a@b.c". */
export function displayUrl(href: string) {
  return href.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/**
 * Where an icon-sized contact link should go. Email opens Gmail compose
 * (see below) because a bare mailto: often does nothing on click.
 */
export function contactHref(link: { icon: string; href: string; display: string }, subject?: string) {
  return link.icon === "email" ? gmailComposeUrl(link.display, subject) : link.href;
}

/**
 * Gmail's compose window, pre-filled. Unlike `mailto:`, it works without an
 * email app set up on the visitor's computer.
 */
export function gmailComposeUrl(to: string, subject?: string) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params}`;
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
