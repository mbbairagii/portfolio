"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import RopePull from "@/components/RopePull";
import TechStack from "@/components/TechStack";
import SillyStats from "@/components/SillyStats";
import ContactModal from "@/components/ContactModal";
import MusicPlayer from "@/components/MusicPlayer";
import VanGoghQuote from "@/components/VanGoghQuote";
import { projects, type Project } from "@/lib/projects";

const skills = {
  languages: ["JavaScript (ES6+)", "TypeScript", "SQL"],
  frontend: ["React.js", "Next.js", "Tailwind CSS", "HTML5 Canvas API"],
  backend: ["Node.js", "Express.js", "RESTful APIs"],
  databases: ["PostgreSQL", "MongoDB", "Supabase"],
  tools: ["Git", "Docker", "CI/CD", "Vercel", "Postman"],
};

const blogs = [
  {
    title: "that scene nobody wants to watch with their parents",
    url: "https://medium.com/@mbbairagii/that-scene-nobody-wants-to-watch-with-their-parents-5f9225b44e79",
    tags: ["Film", "Culture"],
    desc: "There's a scene in almost every film where the room gets uncomfortable. You know the one. Nobody says anything. Someone coughs.",
    date: "Mar 5",
  },
  {
    title: "empathy is a curse",
    url: "https://medium.com/@mbbairagii/empathy-is-a-curse-bcc790c7ef89",
    tags: ["Essay", "Philosophy"],
    desc: "Sometimes I wonder if empathy is as beautiful as we are told it is.",
    date: "Feb 21",
  },
  {
    title: "Where is everybody? Understanding the Fermi Paradox",
    url: "https://medium.com/@mbbairagii/where-is-everybody-understanding-the-fermi-paradox-566e7f2ab252",
    tags: ["Science", "Space"],
    desc: "I recently stumbled upon this question, and the more I read about it, the more unsettling it became.",
    date: "Feb 13",
  },
  {
    title: "How did we end up here? A Question about Women and Power",
    url: "https://medium.com/@mbbairagii/how-did-we-end-up-here-a-question-about-women-and-power-66f2c709c6d5",
    tags: ["Essay", "History"],
    desc: "So, lately I have been sitting with an uncomfortable question about women, power, and how we got here.",
    date: "Feb",
  },
];

const socials = [
  { l: "github", h: "https://github.com/mbbairagii" },
  { l: "x", h: "https://x.com/mohinitwt" },
  { l: "medium", h: "https://medium.com/@mbbairagii" },
  { l: "email", h: "mailto:mbbairagii@gmail.com" },
];

const navLinks = ["projects", "skills", "stats"];

export default function Home() {
  const [showBlogs, setShowBlogs] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const blogsRef = useRef<HTMLDivElement>(null);

  function handleWritingClick() {
    setShowBlogs(true);
    setMobileMenu(false);
    setTimeout(() => blogsRef.current?.scrollIntoView({ block: "start" }), 80);
  }

  function scrollTo(id: string) {
    setMobileMenu(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: "start" });
  }

  return (
    <div className="relative min-h-screen dark:bg-d-bg bg-l-bg font-sans">

      {/* ── Navbar ──────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 dark:bg-d-bg/90 bg-l-bg/90 backdrop-blur-md dark:border-b dark:border-d-border border-b border-l-border">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 md:px-6 py-3.5">

          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg dark:border dark:border-d-border border border-l-border">
              <Image src="/avatar.png" alt="Mohini" fill className="object-cover object-top" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] dark:text-zinc-200 text-zinc-800">
              Mohini
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <button key={l} onClick={() => scrollTo(l)}
                className="font-sans text-sm dark:text-zinc-400 text-zinc-500 transition-colors dark:hover:text-zinc-200 hover:text-zinc-900">
                {l}
              </button>
            ))}
            <button onClick={handleWritingClick}
              className="font-sans text-sm dark:text-zinc-400 text-zinc-500 transition-colors dark:hover:text-zinc-200 hover:text-zinc-900">
              writing
            </button>
            <button onClick={() => setShowContact(true)}
              className="rounded-full dark:bg-d-accent/10 bg-l-accent/10 dark:border dark:border-d-accent/30 border border-l-accent/30 px-4 py-1.5 font-mono text-xs dark:text-d-accent text-l-accent transition-colors dark:hover:bg-d-accent/20 hover:bg-l-accent/20">
              contact
            </button>
          </div>

          {/* Mobile: contact + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setShowContact(true)}
              className="rounded-full dark:bg-d-accent/10 bg-l-accent/10 dark:border dark:border-d-accent/30 border border-l-accent/30 px-3 py-1.5 font-mono text-[11px] dark:text-d-accent text-l-accent">
              contact
            </button>
            <button onClick={() => setMobileMenu((p) => !p)}
              className="flex flex-col gap-1 p-1.5 dark:text-zinc-400 text-zinc-600">
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${mobileMenu ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${mobileMenu ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${mobileMenu ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden dark:bg-d-bg/95 bg-l-bg/95 backdrop-blur-md dark:border-b dark:border-d-border border-b border-l-border"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((l) => (
                  <button key={l} onClick={() => scrollTo(l)}
                    className="text-left font-sans text-sm dark:text-zinc-400 text-zinc-600 capitalize">
                    {l}
                  </button>
                ))}
                <button onClick={handleWritingClick}
                  className="text-left font-sans text-sm dark:text-zinc-400 text-zinc-600">
                  writing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Rope ─────────────────────────────────────────────── */}
      <div className="fixed right-4 top-16 md:right-7 md:top-6 z-50">
        <RopePull />
      </div>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 md:px-6 pb-0 pt-16 md:pt-20 space-y-4">

        {/* ── HERO ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card p-6 md:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-d-accent2/10 blur-3xl" />

          <div className="flex items-start justify-between gap-6 md:gap-8">
            <div className="flex flex-col gap-4 flex-1 min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.22em] dark:text-d-accent text-l-accent font-semibold">
                Portfolio / 2026
              </p>

              <div>
                <h1 className="font-display text-[clamp(2.4rem,8vw,5rem)] font-semibold leading-none tracking-tight dark:text-zinc-100 text-zinc-900">
                  Mohini
                </h1>
                <p className="mt-2 md:mt-3 font-display text-lg md:text-2xl font-medium dark:text-zinc-400 text-zinc-600 leading-snug">
                  Full-stack developer.
                </p>
              </div>

              <p className="font-mono text-xs md:text-sm dark:text-zinc-500 text-zinc-500">
                cs @ gl bajaj · i obsess over details most people skip.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
                  <span className="text-xs md:text-sm dark:text-zinc-400 text-zinc-600">Available for opportunities</span>
                </div>
                <span className="rounded-full dark:border dark:border-d-border border border-l-border px-3 py-1 font-mono text-xs dark:text-zinc-400 text-zinc-600">
                  Remote
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {socials.map((s) => (
                  <a key={s.l} href={s.h}
                    target={s.h.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full dark:border dark:border-d-border border border-l-border px-3 md:px-4 py-1.5 font-mono text-[11px] md:text-xs dark:text-zinc-400 text-zinc-600 transition-colors dark:hover:border-d-accent dark:hover:text-d-accent hover:border-l-accent hover:text-l-accent">
                    {s.l} ↗
                  </a>
                ))}
                <a href="/resume_latest.pdf" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full dark:bg-d-accent/10 bg-l-accent/10 dark:border dark:border-d-accent/30 border border-l-accent/30 px-3 md:px-4 py-1.5 font-mono text-[11px] md:text-xs dark:text-d-accent text-l-accent transition-colors dark:hover:bg-d-accent/20 hover:bg-l-accent/20">
                  resume ↗
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="shrink-0">
              <div className="relative h-[160px] w-[125px] md:h-[260px] md:w-[200px] overflow-hidden rounded-2xl dark:border dark:border-d-border border border-l-border shadow-lg">
                <Image src="/avatar.png" alt="Mohini" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-d-accent/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── TECH STACK ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card px-5 md:px-8 py-5 md:py-6"
        >
          <TechStack />
        </motion.div>

        {/* ── PROJECTS ──────────────────────────────────────── */}
        <motion.div
          id="projects"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card p-5 md:p-8"
        >
          <div className="mb-6 md:mb-8 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] dark:text-d-accent text-l-accent font-semibold">
              My Projects
            </h2>
            <a href="https://github.com/mbbairagii" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs dark:text-d-accent text-l-accent transition-opacity hover:opacity-70">
              view more ↗
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p: Project) => (
              <motion.div key={p.id}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex flex-col rounded-xl dark:border dark:border-d-border border border-l-border dark:bg-d-bg/60 bg-l-bg/60 overflow-hidden"
              >
                {/* Screenshot */}
                {p.screenshot && (
                  <div className="relative w-full h-36 overflow-hidden">
                    <img
                      src={p.screenshot}
                      alt={`${p.title} preview`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b dark:from-transparent dark:to-d-bg/80 from-transparent to-l-bg/80" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-3 p-4 md:p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <a href={p.live ?? p.github ?? "#"} target="_blank" rel="noopener noreferrer"
                      className="font-display text-[14px] md:text-[15px] font-semibold dark:text-zinc-100 text-zinc-900 transition-colors dark:hover:text-d-accent hover:text-l-accent">
                      {p.title} ↗
                    </a>
                    {p.date && (
                      <span className="font-mono text-[10px] shrink-0 dark:text-zinc-600 text-zinc-400">{p.date}</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t: string) => (
                      <span key={t}
                        className="rounded-full dark:border dark:border-d-accent/25 border border-l-accent/25 px-2.5 py-0.5 font-mono text-[10px] dark:text-d-accent text-l-accent">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm font-medium dark:text-zinc-300 text-zinc-700 leading-snug">
                    {p.description}
                  </p>

                  <ul className="flex flex-col gap-1.5">
                    {p.bullets.map((b: string, i: number) => (
                      <li key={i} className="flex gap-2 text-[12px] md:text-[13px] dark:text-zinc-500 text-zinc-500 leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full dark:bg-d-accent/40 bg-l-accent/40" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SKILLS ────────────────────────────────────────── */}
        <div id="skills"
          className="rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card p-5 md:p-8"
        >
          <h2 className="mb-6 md:mb-7 font-mono text-xs uppercase tracking-[0.2em] dark:text-d-accent text-l-accent font-semibold">
            Skills
          </h2>
          <div className="flex flex-col gap-4 md:gap-5">
            {Object.entries(skills).map(([group, items]) => (
              <motion.div key={group}
                className="flex flex-col gap-1 sm:flex-row sm:gap-10"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="w-24 md:w-28 shrink-0 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] dark:text-zinc-600 text-zinc-400">
                  {group}
                </p>
                <p className="text-[12px] md:text-[13px] dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {items.join(" · ")}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── currently obsessing over ── */}
          <div className="mt-6 pt-5 border-t dark:border-d-border border-l-border flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] shrink-0 dark:text-zinc-600 text-zinc-400">
              currently obsessing over
            </span>
            <span className="hidden md:inline dark:text-zinc-600 text-zinc-300 text-xs">·</span>
            <span className="font-mono text-xs dark:text-zinc-300 text-zinc-700">
              <span className="dark:text-d-accent text-l-accent mr-2">→</span>
              Rust · Web3 ecosystem
            </span>
          </div>
        </div>

        {/* ── VAN GOGH QUOTE ────────────────────────────────── */}
        <VanGoghQuote />

        {/* ── SILLY STATS ───────────────────────────────────── */}
        <div id="stats"
          className="rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card p-5 md:p-8"
        >
          <SillyStats />
        </div>

        {/* ── WRITING ───────────────────────────────────────── */}
        <div ref={blogsRef}>
          <AnimatePresence>
            {showBlogs && (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card p-5 md:p-8"
              >
                <div className="mb-6 md:mb-8 flex items-center justify-between">
                  <h2 className="font-mono text-xs uppercase tracking-[0.2em] dark:text-d-accent text-l-accent font-semibold">
                    My Writing
                  </h2>
                  <a href="https://medium.com/@mbbairagii" target="_blank" rel="noopener noreferrer"
                    className="font-mono text-xs dark:text-d-accent text-l-accent transition-opacity hover:opacity-70">
                    all posts ↗
                  </a>
                </div>
                <p className="mb-5 md:mb-7 text-xs md:text-sm dark:text-zinc-500 text-zinc-500">
                  i write about things i think about — film, philosophy, science, the uncomfortable questions.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {blogs.map((b) => (
                    <a key={b.title} href={b.url} target="_blank" rel="noopener noreferrer"
                      className="group rounded-xl dark:border dark:border-d-border border border-l-border dark:bg-d-bg/60 bg-l-bg/60 p-4 md:p-5 flex flex-col gap-3 transition-all dark:hover:border-d-accent/40 hover:border-l-accent/40"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-display text-[13px] md:text-[14px] font-semibold dark:text-zinc-100 text-zinc-900 transition-colors dark:group-hover:text-d-accent group-hover:text-l-accent leading-snug">
                          {b.title} ↗
                        </p>
                        <span className="font-mono text-[10px] shrink-0 dark:text-zinc-600 text-zinc-400">{b.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {b.tags.map((t) => (
                          <span key={t}
                            className="rounded-full dark:border dark:border-d-accent/25 border border-l-accent/25 px-2.5 py-0.5 font-mono text-[10px] dark:text-d-accent text-l-accent">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-[12px] md:text-[13px] leading-relaxed dark:text-zinc-500 text-zinc-500">{b.desc}</p>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showBlogs && (
            <div className="flex items-center gap-3 px-2 py-4">
              <span className="font-mono text-xs dark:text-zinc-600 text-zinc-400">i also write —</span>
              <button onClick={handleWritingClick}
                className="font-mono text-xs dark:text-d-accent text-l-accent underline underline-offset-4">
                read my writing ↗
              </button>
            </div>
          )}
        </div>

        {/* ── CTA ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          <p className="font-display text-lg md:text-2xl font-medium dark:text-zinc-200 text-zinc-800 leading-snug">
            liked what you saw?{" "}
            <span className="dark:text-zinc-500 text-zinc-400">let's build something.</span>
          </p>
          <button
            onClick={() => setShowContact(true)}
            className="shrink-0 rounded-full dark:bg-d-accent/10 bg-l-accent/10 dark:border dark:border-d-accent/40 border border-l-accent/40 px-6 py-2.5 font-mono text-xs dark:text-d-accent text-l-accent transition-all dark:hover:bg-d-accent/20 hover:bg-l-accent/20 dark:hover:border-d-accent hover:border-l-accent"
          >
            get in touch ↗
          </button>
        </motion.div>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <footer className="pt-2 pb-0">
          <div className="flex items-center justify-between border-t dark:border-d-border border-l-border py-5 px-1">
            <p className="font-mono text-xs dark:text-zinc-700 text-zinc-400">
              mohini · 2026
            </p>
            <div className="flex items-center gap-4 md:gap-5 flex-wrap justify-end">
              {socials.map((s) => (
                <a key={s.l} href={s.h}
                  target={s.h.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] md:text-[11px] dark:text-zinc-700 text-zinc-400 transition-colors dark:hover:text-zinc-400 hover:text-zinc-600">
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden -mx-4 md:-mx-6 pb-0">
            <p
              className="font-display font-bold leading-none tracking-tighter whitespace-nowrap text-center select-none dark:text-white/[0.035] text-black/[0.055]"
              style={{ fontSize: "clamp(4rem, 22vw, 17rem)", lineHeight: 0.88 }}
            >
              MOHINI
            </p>
          </div>
        </footer>

      </main>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
      <MusicPlayer />
    </div>
  );
}