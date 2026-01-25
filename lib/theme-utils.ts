/**
 * Utility functions for working with next-themes
 */

// Theme-aware class names
export const themeClasses = {
  // Background colors
  bg: {
    base: "bg-[var(--bg)]",
    card: "bg-[var(--card-bg)]",
    muted: "bg-[var(--muted)]",
  },
  
  // Text colors
  text: {
    base: "text-[var(--text)]",
    muted: "text-[var(--muted)]",
    primary: "text-[var(--primary)]",
  },
  
  // Border colors
  border: {
    base: "border-[var(--border)]",
    card: "border-[var(--card-border)]",
  },
  
  // Button styles
  button: {
    primary: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white",
  },
} as const;

// Helper function to combine classes
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
