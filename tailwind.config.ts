import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        sans: ["Satoshi", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        "d-bg": "#09090F",
        "d-card": "#0F0F1A",
        "d-border": "#1C1C30",
        "d-accent": "#818CF8",
        "d-accent2": "#A78BFA",
        "l-bg": "#CCCAD8",
        "l-card": "#D8D6E4",
        "l-border": "#7B78A0",   // ← was #B0AEBF, now much darker/more visible
        "l-accent": "#4F46E5",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
