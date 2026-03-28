"use client";

import { motion } from "framer-motion";

export default function VanGoghQuote() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl dark:border dark:border-d-border border border-l-border dark:bg-d-card bg-l-card px-5 md:px-8 py-5 md:py-6"
        >
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full dark:bg-d-accent2/8 blur-3xl" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                {/* Portrait */}
                <div className="shrink-0 flex flex-col items-center">
                    <div className="h-20 w-16 overflow-hidden rounded-xl dark:border dark:border-d-border border border-l-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/vangogh.jpeg"
                            alt="Vincent van Gogh"
                            className="h-full w-full object-cover object-top dark:opacity-75 opacity-90 grayscale"
                        />
                    </div>
                    <p className="mt-1.5 text-center font-mono text-[8px] dark:text-zinc-700 text-zinc-400 tracking-wider">
                        1887
                    </p>
                </div>

                {/* Quote */}
                <div className="flex flex-col gap-2 min-w-0 text-center sm:text-left">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] dark:text-d-accent text-l-accent">
                        Vincent van Gogh
                    </span>
                    <blockquote className="font-display text-sm md:text-base font-medium dark:text-zinc-200 text-zinc-800 leading-relaxed italic">
                        "I am seeking, I am striving, I am in it with all my heart."
                    </blockquote>
                    <p className="font-mono text-[10px] dark:text-zinc-600 text-zinc-400">
                        letter to Theo · 1880
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
