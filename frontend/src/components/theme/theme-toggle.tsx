"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="inline-flex size-10 items-center justify-center rounded-full border-2 border-coral/20 bg-white text-coral shadow-sm transition hover:-translate-y-0.5 hover:border-coral dark:border-white/15 dark:bg-white/10 dark:text-white"
    >
      {isDark ? <Sun aria-hidden size={18} /> : <Moon aria-hidden size={18} />}
    </button>
  );
}
