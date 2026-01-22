/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";


interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark"); // default for SSR

  // Browser-only effect to read localStorage
  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg hover:text-primary  cursor-pointer transition ${className || ""}`}
      aria-label="Toggle Theme"
    >
      {mounted ? (theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />) : (
        <div style={{ width: 16, height: 16 }} />
      )}
    </button>
  );
};
