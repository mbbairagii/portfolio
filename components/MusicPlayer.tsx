"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEO_ID = "ue2G0dC-TZI";

export default function MusicPlayer() {
    const [expanded, setExpanded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-4 z-[80]"
        >
            <AnimatePresence mode="wait">

                {/* ── Expanded card ── */}
                {expanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.88, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 8 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[260px] md:w-72 rounded-2xl border border-d-border bg-d-card p-3 md:p-4 shadow-2xl shadow-black/60"
                    >
                        <div className="mb-3 flex items-start justify-between">
                            <div>
                                <p className="font-mono text-[9px] uppercase tracking-widest text-d-accent mb-0.5">
                                    now playing
                                </p>
                                <p className="font-display text-[12px] md:text-[13px] font-semibold text-zinc-100">
                                    Du bist nicht allein
                                </p>
                                <p className="font-mono text-[10px] text-zinc-600 mt-0.5">
                                    Roy Black · 1965
                                </p>
                            </div>
                            <button
                                onClick={() => setExpanded(false)}
                                className="font-mono text-[10px] text-zinc-600 hover:text-zinc-300 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="relative overflow-hidden rounded-xl border border-d-border bg-black">
                            {!loaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-d-bg">
                                    <p className="font-mono text-[10px] text-zinc-600">loading...</p>
                                </div>
                            )}
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                onLoad={() => setLoaded(true)}
                                className="h-36 md:h-40 w-full"
                                title="Du bist nicht allein - Roy Black"
                            />
                        </div>

                        <a
                            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 block text-center font-mono text-[9px] text-zinc-700 transition-colors hover:text-zinc-500"
                        >
                            open on youtube ↗
                        </a>
                    </motion.div>

                ) : (

                    /* ── Square widget ── */
                    <div
                        className="relative"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {/* Tooltip */}
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-lg border border-d-accent/30 bg-d-card px-2.5 py-1.5 shadow-lg"
                                >
                                    <p className="font-mono text-[9px] text-d-accent">▶ play music</p>
                                    <p className="font-mono text-[8px] text-zinc-600 mt-0.5">du bist nicht allein</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            key="square"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setExpanded(true)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.93 }}
                            className="relative flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-2xl border border-d-accent/60 bg-d-card shadow-xl shadow-d-accent/20 overflow-hidden"
                            style={{ minHeight: "4rem", minWidth: "4rem" }}
                        >
                            {/* Glow bg */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-d-accent/8" />

                            {/* Pulse ring */}
                            <motion.div
                                className="pointer-events-none absolute inset-0 rounded-2xl border border-d-accent/40"
                                animate={{ scale: [1, 1.14, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Play circle */}
                            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-d-accent/20 border border-d-accent/50">
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                                    <path d="M1.5 1.5L6.5 4.5L1.5 7.5V1.5Z" fill="#818CF8" />
                                </svg>
                            </div>

                            {/* Waveform */}
                            <div className="relative flex items-end gap-[2px] h-3">
                                {[2, 6, 4, 8, 3, 6, 2].map((h, i) => (
                                    <motion.span
                                        key={i}
                                        className="w-[2px] rounded-full bg-d-accent/70"
                                        animate={{ height: [`${h}px`, `${h + 5}px`, `${h}px`] }}
                                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
                                    />
                                ))}
                            </div>
                        </motion.button>
                    </div>
                )}

            </AnimatePresence>
        </motion.div>
    );
}
