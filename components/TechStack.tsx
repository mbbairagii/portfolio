"use client";

import { motion } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiPostgresql, SiSupabase, SiDocker, SiGit,
  SiVercel, SiPostman, SiHtml5,
} from "react-icons/si";

const stack = [
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "#ffffff" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
];

// duplicate for seamless loop
const items = [...stack, ...stack];

export default function TechStack() {
  return (
    <div>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] dark:text-d-accent text-l-accent font-semibold">
        Tech Stack
      </p>

      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r dark:from-d-card from-l-card to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l dark:from-d-card from-l-card to-transparent" />

        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 flex-col items-center gap-2 rounded-xl dark:border dark:border-d-border border border-l-border dark:bg-d-bg/60 bg-l-bg/60 px-4 py-3 w-[88px]"
            >
              <item.Icon
                size={28}
                style={{ color: item.color }}
                className="shrink-0"
              />
              <span className="font-mono text-[9px] dark:text-zinc-500 text-zinc-500 text-center leading-tight">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
