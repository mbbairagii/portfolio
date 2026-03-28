"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
}

const EMAIL = "mbbairagii@gmail.com";

export default function ContactModal({ open, onClose }: Props) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    function copyEmail() {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.96, y: 14 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 6 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[70] flex items-center justify-center px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full max-w-sm rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card p-7 shadow-[0_0_80px_0px_rgba(129,140,248,0.08)]">

                            {/* Subtle glow top */}
                            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-32 w-48 rounded-full dark:bg-d-accent/8 bg-l-accent/8 blur-3xl" />

                            {/* Header */}
                            <div className="mb-7 flex items-start justify-between">
                                <div>
                                    <h2 className="font-display text-xl font-semibold dark:text-zinc-100 text-zinc-900">
                                        Say hello.
                                    </h2>
                                    <p className="mt-1 text-sm dark:text-zinc-500 text-zinc-500">
                                        pick your preferred channel
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg dark:border dark:border-d-border border border-l-border dark:text-zinc-500 text-zinc-400 font-mono text-xs transition-all dark:hover:border-d-accent dark:hover:text-d-accent hover:border-l-accent hover:text-l-accent"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* X row */}
                            <a
                                href="https://x.com/mohinitwt"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="group mb-3 flex items-center justify-between rounded-xl dark:border dark:border-d-border border border-l-border dark:bg-d-bg/70 bg-l-bg/70 px-5 py-4 transition-all dark:hover:border-d-accent/50 dark:hover:bg-d-accent/5 hover:border-l-accent/50 hover:bg-l-accent/5"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-mono text-[10px] uppercase tracking-widest dark:text-d-accent text-l-accent">
                                        X / Twitter
                                    </span>
                                    <span className="font-display text-[15px] font-semibold dark:text-zinc-100 text-zinc-900">
                                        @mohinitwt
                                    </span>
                                    <span className="font-mono text-[10px] dark:text-zinc-600 text-zinc-400">
                                        dm me here anytime
                                    </span>
                                </div>
                                <span className="text-base dark:text-d-accent/40 text-l-accent/40 transition-all group-hover:dark:text-d-accent group-hover:text-l-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    ↗
                                </span>
                            </a>

                            {/* Email row */}
                            <a
                                href={`mailto:${EMAIL}`}
                                onClick={onClose}
                                className="group mb-3 flex items-center justify-between rounded-xl dark:border dark:border-d-border border border-l-border dark:bg-d-bg/70 bg-l-bg/70 px-5 py-4 transition-all dark:hover:border-d-accent/50 dark:hover:bg-d-accent/5 hover:border-l-accent/50 hover:bg-l-accent/5"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-mono text-[10px] uppercase tracking-widest dark:text-d-accent text-l-accent">
                                        Email
                                    </span>
                                    <span className="font-display text-[15px] font-semibold dark:text-zinc-100 text-zinc-900">
                                        {EMAIL}
                                    </span>
                                    <span className="font-mono text-[10px] dark:text-zinc-600 text-zinc-400">
                                        best for serious stuff
                                    </span>
                                </div>
                                <span className="text-base dark:text-d-accent/40 text-l-accent/40 transition-all group-hover:dark:text-d-accent group-hover:text-l-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    ↗
                                </span>
                            </a>

                            {/* Copy button */}
                            <motion.button
                                onClick={copyEmail}
                                whileTap={{ scale: 0.97 }}
                                className={`w-full rounded-xl border px-5 py-3 font-mono text-xs tracking-widest transition-all
                  ${copied
                                        ? "dark:border-emerald-500/40 border-emerald-500/40 dark:bg-emerald-500/8 bg-emerald-500/8 dark:text-emerald-400 text-emerald-600"
                                        : "dark:border-d-border border-l-border dark:bg-d-bg/70 bg-l-bg/70 dark:text-zinc-400 text-zinc-500 dark:hover:border-d-accent/40 hover:border-l-accent/40 dark:hover:text-d-accent hover:text-l-accent"
                                    }`}
                            >
                                {copied ? "✓ copied to clipboard" : "copy email address"}
                            </motion.button>

                            <p className="mt-5 text-center font-mono text-[10px] dark:text-zinc-700 text-zinc-400">
                                esc to close
                            </p>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
