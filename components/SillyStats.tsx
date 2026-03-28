"use client";

import { useEffect, useState } from "react";

const EMAIL_START = new Date("2023-08-01").getTime();

export default function SillyStats() {
    const [mounted, setMounted] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [scrollPx, setScrollPx] = useState(0);
    const [lastClick, setLastClick] = useState(0);
    const [rageClicks, setRageClicks] = useState(0);

    // Mount first — THEN start all browser-dependent stuff
    useEffect(() => {
        setMounted(true);

        const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
        const onScroll = () => setScrollPx((p) => p + 1);

        let lastClickTime = 0;
        const onMouseDown = () => {
            const now = Date.now();
            setClicks((c) => c + 1);
            if (now - lastClickTime < 400) setRageClicks((r) => r + 1);
            lastClickTime = now;
            setLastClick(now);
        };

        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            clearInterval(tick);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // All browser-only values computed after mount
    const chaiCount = mounted
        ? `${(Math.floor((Date.now() - EMAIL_START) / 86_400_000) * 3).toLocaleString()}+`
        : "...";

    const estimatedTabs = mounted
        ? `${(navigator.hardwareConcurrency ?? 4) * 7}+`
        : "...";

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    const scrollMetres = (scrollPx / 3779).toFixed(1);

    const stats = [
        {
            value: mounted ? timeStr : "0s",
            label: "time wasted here",
            sub: "could've shipped a feature",
            live: true,
            accent: false,
        },
        {
            value: mounted ? clicks.toString() : "0",
            label: "times you've clicked",
            sub: rageClicks > 3 ? `${rageClicks} were rage clicks 💀` : "looking for bugs?",
            live: true,
            accent: rageClicks > 3,
        },
        {
            value: mounted ? `${scrollMetres}m` : "0.0m",
            label: "scrolled so far",
            sub: "in actual metres",
            live: true,
            accent: false,
        },
        {
            value: chaiCount,
            label: "chai consumed",
            sub: "since college started",
            live: false,
            accent: false,
        },
        {
            value: "100+",
            label: "dsa problems",
            sub: "mostly on leetcode",
            live: false,
            accent: false,
        },
        {
            value: estimatedTabs,
            label: "tabs probably open",
            sub: "on your browser rn",
            live: false,
            accent: false,
        },
        {
            value: "100+",
            label: "git commits",
            sub: `"fix typo" counted`,
            live: false,
            accent: false,
        },
        {
            value: "1",
            label: "sleep schedules",
            sub: "currently: none",
            live: false,
            accent: false,
        },
    ];

    return (
        <section>
            <div className="mb-2 flex items-center gap-3">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] dark:text-d-accent text-l-accent font-semibold">
                    Silly Stats
                </h2>
                <span className="h-px flex-1 dark:bg-d-border bg-l-border" />
            </div>
            <p className="mb-6 font-mono text-[11px] dark:text-zinc-600 text-zinc-400">
                live since page load · no cookies · no tracking · pure chaos
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className={`rounded-xl border px-4 py-3.5 transition-colors
              ${s.accent
                                ? "dark:border-d-accent/30 border-l-accent/30 dark:bg-d-accent/5 bg-l-accent/5"
                                : "dark:border-d-border border-l-border dark:bg-d-bg/60 bg-l-bg/60"
                            }`}
                    >
                        <div className="flex items-center gap-1.5 mb-1">
                            <p className={`font-mono text-base font-semibold tabular-nums
                ${s.accent ? "dark:text-d-accent text-l-accent" : "dark:text-zinc-200 text-zinc-800"}`}>
                                {s.value}
                            </p>
                            {s.live && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_1px_rgba(52,211,153,0.6)]" />
                            )}
                        </div>
                        <p className="font-mono text-[10px] dark:text-zinc-500 text-zinc-500 leading-snug">
                            {s.label}
                        </p>
                        <p className="font-mono text-[9px] dark:text-zinc-700 text-zinc-400 leading-snug mt-0.5">
                            {s.sub}
                        </p>
                    </div>
                ))}
            </div>

            {/* GitHub chart */}
            <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                    <p className="font-mono text-[11px] dark:text-zinc-600 text-zinc-400">commit history</p>
                    <a href="https://github.com/mbbairagii" target="_blank" rel="noopener noreferrer"
                        className="font-mono text-[11px] dark:text-d-accent text-l-accent transition-opacity hover:opacity-70">
                        github ↗
                    </a>
                </div>
                <div className="overflow-hidden rounded-xl dark:border dark:border-d-border border border-l-border dark:bg-d-bg/60 bg-l-bg/60 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://ghchart.rshah.org/818cf8/mbbairagii"
                        alt="GitHub contributions"
                        className="w-full dark:opacity-80 opacity-60"
                    />
                </div>
            </div>
        </section>
    );
}
