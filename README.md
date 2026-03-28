# Mohini — Portfolio

Personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Tech Stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Framework | Next.js 14 (App Router)             |
| Language  | TypeScript                          |
| Styling   | Tailwind CSS + custom design tokens |
| Animation | Framer Motion                       |
| Icons     | react-icons                         |
| Fonts     | Clash Display, Satoshi              |

---

## Features

- **Dark / Light mode** — rope-pull toggle with flicker animation
- **Music player** — floating widget with ambient background music
- **Responsive** — mobile-first, hamburger nav on small screens
- **Projects** — card grid with tech tags and descriptions
- **Skills** — animated marquee tech stack with brand icons
- **Writing** — Medium blog posts with lazy reveal
- **Stats** — silly developer stats section
- **Contact** — modal with email contact form

---

## Getting Started

```bash
# 1. clone
git clone https://github.com/your-username/portfolio.git
cd portfolio

# 2. install
npm install

# 3. run locally
npm run dev
```

---

## Project Structure

```
PORTFOLIO/
├── .next/
├── app/
│   ├── favicon.ico
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ContactModal.tsx
│   ├── MusicPlayer.tsx
│   ├── RopePull.tsx
│   ├── SillyStats.tsx
│   ├── SmoothScroll.tsx
│   ├── TechStack.tsx
│   └── VanGoghQuote.tsx
├── lib/
│   ├── projects.ts
│   └── theme.ts
├── node_modules/
├── public/
│   ├── apple-icon.png
│   ├── avatar.png
│   ├── favicon-16.png
│   ├── favicon-32.png
│   ├── og-image.png
│   ├── resume_latest.pdf
│   └── vangogh.jpeg
├── styles/
│   └── globals.css
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Customisation

**Colors** — all tokens live in `tailwind.config.ts`:
```ts
"d-bg":     "#09090F"   // dark background
"d-card":   "#0F0F1A"   // dark card
"d-accent": "#818CF8"   // indigo accent
"l-bg":     "#CCCAD8"   // light background
"l-accent": "#4F46E5"   // light accent
```

**Projects** — edit `lib/projects.ts`

**Blogs** — edit the `blogs` array in `app/page.tsx`

---

## License

MIT — free to use as inspiration. Please don't copy it whole.

---

*Built by Mohini · 2026*
