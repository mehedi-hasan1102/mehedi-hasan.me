"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "footer";
  size?: number;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, variant = "icon", size = 18 }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    return (
      <button
        className={`${variant === "icon" ? "p-2 rounded-lg hover:text-primary" : "underline underline-offset-4 text-xs"} cursor-pointer transition ${className || ""}`}
        aria-label="Toggle Theme"
      >
        {variant === "icon" ? <div style={{ width: size, height: size }} /> : <span>Switch Theme</span>}
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (variant === "footer") {
    const label = theme === "dark" ? "Switch to Light" : "Switch to Dark";
    return (
      <button
        onClick={toggleTheme}
        className={`underline underline-offset-4 text-xs text-(--muted) hover:text-(--accent) cursor-pointer transition ${className || ""}`}
        aria-label="Toggle Theme"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg hover:text-primary cursor-pointer transition ${className || ""}`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <FiSun size={size} /> : <FiMoon size={size} />}
    </button>
  );
};
