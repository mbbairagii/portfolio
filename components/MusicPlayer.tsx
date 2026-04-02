"use client";


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const VIDEO_ID = "ue2G0dC-TZI";


export default function MusicPlayer() {
    const [expanded, setExpanded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [isDark, setIsDark] = useState(true);


    useEffect(() => {
        const update = () =>
            setIsDark(document.documentElement.classList.contains("dark"));
        update();
        const observer = new MutationObserver(update);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);


    const card = isDark ? "#111111" : "#E0DCD4";
    const border = isDark ? "#2A2A2A" : "#C8C4BC";
    const accent = isDark ? "#C4A882" : "#8B6914";
    const text = isDark ? "#F0EDE8" : "#1A1714";
    const sub = isDark ? "#525252" : "#7A7670";
    const bg = isDark ? "#000000" : "#E8E4DC";


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-4 z-[80]"
        >
            <AnimatePresence mode="wait">
                {expanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.88, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 8 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{ backgroundColor: card, borderColor: border }}
                        className="w-[260px] md:w-72 rounded-2xl border p-3 md:p-4 shadow-2xl shadow-black/20"
                    >
                        <div className="mb-3 flex items-start justify-between">
                            <div>
                                <p style={{ color: accent }}
                                    className="font-mono text-[9px] uppercase tracking-widest mb-0.5">
                                    now playing
                                </p>
                                <p style={{ color: text }}
                                    className="font-display text-[12px] md:text-[13px] font-semibold">
                                    Du bist nicht allein
                                </p>
                                <p style={{ color: sub }}
                                    className="font-mono text-[10px] mt-0.5">
                                    Roy Black · 1965
                                </p>
                            </div>
                            <button
                                onClick={() => setExpanded(false)}
                                style={{ color: sub }}
                                className="font-mono text-[10px] transition-opacity hover:opacity-70"
                            >
                                ✕
                            </button>
                        </div>


                        <div
                            style={{ borderColor: border, backgroundColor: bg }}
                            className="relative overflow-hidden rounded-xl border"
                        >
                            {!loaded && (
                                <div
                                    style={{ backgroundColor: bg }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <p style={{ color: sub }} className="font-mono text-[10px]">
                                        loading...
                                    </p>
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
                            style={{ color: sub }}
                            className="mt-2 block text-center font-mono text-[9px] transition-opacity hover:opacity-70"
                        >
                            open on youtube ↗
                        </a>
                    </motion.div>
                ) : (
                    <div
                        className="relative"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -4 }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        backgroundColor: card,
                                        borderColor: `${accent}4D`,
                                    }}
                                    className="absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-lg border px-2.5 py-1.5 shadow-lg"
                                >
                                    <p style={{ color: accent }} className="font-mono text-[9px]">
                                        ▶ play music
                                    </p>
                                    <p style={{ color: sub }} className="font-mono text-[8px] mt-0.5">
                                        du bist nicht allein
                                    </p>
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
                            style={{
                                backgroundColor: card,
                                borderColor: `${accent}99`,
                                boxShadow: `0 8px 30px ${accent}33`,
                                minHeight: "4rem",
                                minWidth: "4rem",
                            }}
                            className="relative flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-2xl border overflow-hidden"
                        >
                            <div
                                style={{ backgroundColor: `${accent}14` }}
                                className="pointer-events-none absolute inset-0 rounded-2xl"
                            />
                            <motion.div
                                style={{ borderColor: `${accent}66` }}
                                className="pointer-events-none absolute inset-0 rounded-2xl border"
                                animate={{ scale: [1, 1.14, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div
                                style={{
                                    backgroundColor: `${accent}33`,
                                    borderColor: `${accent}80`,
                                }}
                                className="relative flex h-6 w-6 items-center justify-center rounded-full border"
                            >
                                <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                                    <path d="M1.5 1.5L6.5 4.5L1.5 7.5V1.5Z" fill={accent} />
                                </svg>
                            </div>
                            <div className="relative flex items-end gap-[2px] h-3">
                                {[2, 6, 4, 8, 3, 6, 2].map((h, i) => (
                                    <motion.span
                                        key={i}
                                        style={{ backgroundColor: `${accent}B3` }}
                                        className="w-[2px] rounded-full"
                                        animate={{ height: [`${h}px`, `${h + 5}px`, `${h}px`] }}
                                        transition={{
                                            duration: 1.1,
                                            repeat: Infinity,
                                            delay: i * 0.14,
                                            ease: "easeInOut",
                                        }}
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