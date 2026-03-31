"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

function injectTransitionStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("vt-styles")) return;
  const style = document.createElement("style");
  style.id = "vt-styles";
  style.textContent = `
    ::view-transition-old(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    ::view-transition-new(root) {
      animation: radial-reveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      mix-blend-mode: normal;
    }
    @keyframes radial-reveal {
      from { clip-path: circle(0% at var(--vt-x, 95%) var(--vt-y, 8%)); }
      to   { clip-path: circle(160% at var(--vt-x, 95%) var(--vt-y, 8%)); }
    }
  `;
  document.head.appendChild(style);
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    injectTransitionStyles();
    const initial = getInitialTheme();
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(
    (ropeX?: number, ropeY?: number) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      // same radial wipe for both directions
      if (ropeX !== undefined) {
        document.documentElement.style.setProperty("--vt-x", `${ropeX}px`);
        document.documentElement.style.setProperty("--vt-y", `${ropeY ?? 0}px`);
      }

      if (
        typeof document !== "undefined" &&
        "startViewTransition" in document
      ) {
        (document as Document & { startViewTransition: (cb: () => void) => void })
          .startViewTransition(() => setTheme(next));
      } else {
        setTheme(next);
      }
    },
    [theme, setTheme],
  );

  return { theme, toggleTheme, mounted };
}