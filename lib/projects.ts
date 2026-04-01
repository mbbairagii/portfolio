export interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  tech: string[];
  github?: string;
  live?: string;
  date?: string;
  gradient: string;
  initials: string;
  featured?: boolean;
  screenshot?: string;
}


export const projects: Project[] = [
  {
    id: "drafts",
    title: "Drafts.",
    date: "2026",
    description: "What if a digital diary actually felt private? E2E encrypted journal with rich text, per-entry locks & tag system.",
    bullets: [
      "JWT auth, bcrypt per-diary password locks, CSS page-flip animations, diary pages as structured JSON across 5+ security layers.",
      "Canvas editor with 8+ drawing tools — pen, highlighter, eraser — drag-and-drop stickers with resize/rotate, photo uploads, per-page composite blend modes.",
      "End-to-end handwriting-to-font pipeline: photograph a 62-char template → potrace vectorisation → median glyph scaling → compiled live OpenType font injected across your diary.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "HTML5 Canvas"],
    github: "https://github.com/mbbairagii/drafts.",
    gradient: "from-[#1a2015] via-[#1e2d1a] to-[#12180f]",
    initials: "DR",
    featured: true,
    screenshot: "/screenshots/drafts-2.webp",
  },
  {
    id: "solana-xray",
    title: "Solana X-Ray",
    date: "2026",
    description: "On-chain transaction decoder. Zero-backend, $0 infra, fully live.",
    bullets: [
      "Parses 10+ Solana transaction types into plain language via blockchain APIs.",
      "Real-time risk analysis engine surfaces actionable warnings before users act.",
      "All API calls and state managed client-side — zero server cost.",
    ],
    tech: ["Next.js", "TypeScript", "REST APIs", "Vercel"],
    github: "https://github.com/mbbairagii/solana-xray",
    live: "https://solana-xray.vercel.app",
    gradient: "from-[#1a1030] via-[#2d1f5e] to-[#0f2040]",
    initials: "TX",
    featured: true,
    screenshot: "/screenshots/solana-xray.webp",
  },
  {
    id: "travel-wiz",
    title: "Travel Wiz",
    date: "2025",
    description: "AI travel planner with interactive maps and a photo strip maker.",
    bullets: [
      "JWT auth + MongoDB. Input destination, budget, preferences → 7-day itinerary of real places on an interactive map.",
      "Photo strip maker: upload travel photos, edit with canvas stickers, export as one shareable image.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Maps API", "JWT"],
    github: "https://github.com/mbbairagii/travel-wiz",
    gradient: "from-[#0f1a2a] via-[#1a2d3e] to-[#0a1520]",
    initials: "TW",
  },
  {
    id: "the-wall",
    title: "The Wall",
    date: "2025",
    description: "60 cinematic masterpieces that shaped my soul — an immersive, interactive film archive. Immaculate taste guaranteed.",
    bullets: [
      "Interactive grid of 60 carefully curated films as vintage posters — hover for director, year, and lore.",
      "Full-screen modal with keyboard navigation (← →), classical paintings with philosophical double-click secrets, and a Konami code easter egg on the entry page.",
      "Built with React, TypeScript, Framer Motion — subtle animations that enhance without overwhelming.",
    ],
    tech: ["React", "TypeScript", "Framer Motion", "Tailwind", "Vite"],
    github: "https://github.com/mbbairagii/the-wall",
    gradient: "from-[#1a0f0f] via-[#2a1a1a] to-[#0f0a0a]",
    initials: "TW",
    screenshot: "/screenshots/thewall.webp",
  },
];