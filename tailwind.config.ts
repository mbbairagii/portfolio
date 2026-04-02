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
        "d-bg": "#000000",
        "d-card": "#111111",
        "d-border": "#2A2A2A",
        "d-accent": "#C4A882",
        "d-accent2": "#D4BC9A",
        "l-bg": "#E8E4DC",
        "l-card": "#E0DCD4",
        "l-border": "#C8C4BC",
        "l-accent": "#8B6914",
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