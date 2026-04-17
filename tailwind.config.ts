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
        display: ['Bebas Neue', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        'd-bg': '#080808',
        'd-card': '#111111',
        'd-border': '#222222',
        'd-accent': '#ffffff',
        'd-accent2': '#555555',
        'l-bg': '#d4d0c8',   // noticeably darker warm gray — matches photo bg
        'l-card': '#d9d5cd',   // card sits just above bg
        'l-border': '#b8b4ac',   // stronger border, still warm
        'l-accent': '#0a0a0a',
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