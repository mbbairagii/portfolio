"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const s = localStorage.getItem(KEY) as Theme | null;
  if (s === "dark" || s === "light") return s;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = getInitialTheme();
    setThemeState(t);
    applyTheme(t);
    setMounted(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(KEY, next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    if (next === "dark") {
      document.body.classList.add("flickering");
      setTimeout(() => document.body.classList.remove("flickering"), 240);
      setTheme(next);
    } else if ("startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  }, [theme, setTheme]);

  return { theme, toggleTheme, mounted };
}
