"use client";


import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";


const EMAIL_START = new Date("2023-08-01").getTime();


function getCurrentVibe(): { value: string; sub: string } {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return { value: "caffeinating", sub: "don't talk to me yet" };
    if (hour >= 9 && hour < 13) return { value: "in the zone", sub: "do not disturb" };
    if (hour >= 13 && hour < 15) return { value: "post-lunch lag", sub: "fighting the sleepy" };
    if (hour >= 15 && hour < 19) return { value: "one more feat.", sub: "famous last words" };
    if (hour >= 19 && hour < 22) return { value: "debugging", sub: "it worked yesterday" };
    if (hour >= 22 && hour < 24) return { value: "night owl mode", sub: "peak productivity" };
    return { value: "send help", sub: "it's past midnight bro" };
}


export default function SillyStats() {
    const [mounted, setMounted] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [scrollPx, setScrollPx] = useState(0);
    const [rageClicks, setRageClicks] = useState(0);
    const [isDark, setIsDark] = useState(true);
    const [vibe, setVibe] = useState({ value: "...", sub: "..." });


    useEffect(() => {
        setMounted(true);
        setVibe(getCurrentVibe());

        const updateTheme = () =>
            setIsDark(document.documentElement.classList.contains("dark"));
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const tick = setInterval(() => {
            setSeconds((s) => s + 1);
            setVibe(getCurrentVibe());
        }, 1000);

        const onScroll = () => setScrollPx((p) => p + 1);

        let lastClickTime = 0;
        const onMouseDown = () => {
            const now = Date.now();
            setClicks((c) => c + 1);
            if (now - lastClickTime < 400) setRageClicks((r) => r + 1);
            lastClickTime = now;
        };

        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            observer.disconnect();
            clearInterval(tick);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

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
            live: true, accent: false,
        },
        {
            value: mounted ? clicks.toString() : "0",
            label: "times you've clicked",
            sub: rageClicks > 3 ? `${rageClicks} were rage clicks 💀` : "still looking for bugs?",
            live: true, accent: rageClicks > 3,
        },
        {
            value: mounted ? `${scrollMetres}m` : "0.0m",
            label: "scrolled so far",
            sub: "your thumb needs a raise",
            live: true, accent: false,
        },
        {
            value: mounted ? vibe.value : "...",
            label: "current vibe",
            sub: mounted ? vibe.sub : "...",
            live: true, accent: false,
        },
        {
            value: chaiCount,
            label: "chai consumed",
            sub: "doctor is not aware",
            live: false, accent: false,
        },
        {
            value: "100+",
            label: "dsa problems",
            sub: "ctrl+c, ctrl+v included",
            live: false, accent: false,
        },
        {
            value: estimatedTabs,
            label: "tabs open rn",
            sub: "your ram is crying",
            live: false, accent: false,
        },
        {
            value: "100+",
            label: "git commits",
            sub: `42% say "fix stuff"`,
            live: false, accent: false,
        },
    ];

    const calendarDark = ["#111111", "#2C2118", "#6B4A28", "#A67840", "#C4A882"];
    const calendarLight = ["#E0DCD4", "#D4C4A8", "#C4A882", "#A67840", "#8B6914"];

    return (
        <section>
            <div className="mb-2 flex items-center gap-3">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] dark:text-d-accent text-l-accent font-semibold">
                    {'dev.log'}
                </h2>
                <span className="h-px flex-1 dark:bg-d-border bg-l-border" />
            </div>
            <p className="mb-6 font-mono text-[11px] dark:text-zinc-600 text-zinc-500">
                live since page load · no cookies · no tracking · pure chaos
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-2.5">
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
                                ${s.accent
                                    ? "dark:text-d-accent text-l-accent"
                                    : "dark:text-zinc-200 text-zinc-800"
                                }`}>
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

            <div className="rounded-xl dark:border dark:border-d-border border border-l-border dark:bg-d-bg/60 bg-l-bg/60 px-4 pt-4 pb-3 flex flex-col items-center gap-3 [&_footer]:!hidden">
                {mounted && (
                    <>
                        <div className="w-full overflow-x-auto">
                            <div className="flex justify-center">
                                <GitHubCalendar
                                    username="mbbairagii"
                                    year={2026}
                                    colorScheme={isDark ? "dark" : "light"}
                                    theme={{
                                        dark: calendarDark,
                                        light: calendarLight,
                                    }}
                                    fontSize={11}
                                    blockSize={11}
                                    blockRadius={3}
                                    blockMargin={4}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] dark:text-zinc-600 text-zinc-400">less</span>
                            {calendarDark.map((dark, i) => (
                                <span
                                    key={i}
                                    className="h-[11px] w-[11px] rounded-[3px] inline-block"
                                    style={{ backgroundColor: isDark ? dark : calendarLight[i] }}
                                />
                            ))}
                            <span className="font-mono text-[9px] dark:text-zinc-600 text-zinc-400">more</span>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}