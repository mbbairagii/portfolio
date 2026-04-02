"use client";


import { useEffect, useRef, useState } from "react";
import { animate, motion, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/lib/theme";


const KNOT_COUNT = 11;
const ROPE_HEIGHT = 300;
const SPACING = ROPE_HEIGHT / (KNOT_COUNT + 1);


export default function RopePull() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  const pullY = useSpring(0, { stiffness: 260, damping: 22, mass: 1.1 });
  const swayRotate = useSpring(0, { stiffness: 110, damping: 11 });
  const opacity = useSpring(0.35, { stiffness: 200, damping: 20 });


  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) opacity.set(1);
  }, [opacity]);


  const k0 = useTransform(pullY, (v) => v * 0.04);
  const k1 = useTransform(pullY, (v) => v * 0.09);
  const k2 = useTransform(pullY, (v) => v * 0.14);
  const k3 = useTransform(pullY, (v) => v * 0.18);
  const k4 = useTransform(pullY, (v) => v * 0.22);
  const k5 = useTransform(pullY, (v) => v * 0.26);
  const k6 = useTransform(pullY, (v) => v * 0.30);
  const k7 = useTransform(pullY, (v) => v * 0.33);
  const k8 = useTransform(pullY, (v) => v * 0.36);
  const k9 = useTransform(pullY, (v) => v * 0.39);
  const k10 = useTransform(pullY, (v) => v * 0.42);
  const knotYs = [k0, k1, k2, k3, k4, k5, k6, k7, k8, k9, k10];
  const ringY = useTransform(pullY, (v) => v);


  useEffect(() => {
    if (isPulling || isHovered) return;
    const ctrl = animate(swayRotate, [0, 0.7, 0, -0.7, 0], {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => ctrl.stop();
  }, [isPulling, isHovered, swayRotate]);


  if (!mounted) return null;


  const isDark = theme === "dark";
  const accent = isDark ? "#C4A882" : "#8B6914";


  function onEnter() {
    if (isTouchDevice) return;
    setIsHovered(true);
    opacity.set(1);
    swayRotate.set(2.5);
  }


  function onLeave() {
    if (isTouchDevice) return;
    setIsHovered(false);
    opacity.set(0.35);
    swayRotate.set(0);
  }


  async function onClick() {
    if (isPulling) return;
    setIsPulling(true);
    pullY.set(55);
    await new Promise((r) => setTimeout(r, 170));
    toggleTheme();
    pullY.set(-10);
    await new Promise((r) => setTimeout(r, 90));
    pullY.set(0);
    await new Promise((r) => setTimeout(r, 400));
    setIsPulling(false);
  }


  function onTouchStart(e: React.TouchEvent) {
    e.preventDefault();
    onClick();
  }


  return (
    <motion.div
      ref={ref}
      style={{ opacity, rotate: swayRotate, originX: "50%", originY: "0%" }}
      className="relative flex cursor-pointer select-none flex-col items-center"
      onClick={onClick}
      onTouchStart={onTouchStart}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      tabIndex={0}
      role="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Mount */}
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <rect x="4" y="0" width="12" height="4" rx="2" fill={accent} opacity="0.5" />
        <line
          x1="10" y1="4" x2="10" y2="14"
          stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.35"
        />
      </svg>


      {/* Rope */}
      <svg
        width="20"
        height={ROPE_HEIGHT}
        viewBox={`0 0 20 ${ROPE_HEIGHT}`}
        fill="none"
        overflow="visible"
      >
        <line
          x1="10" y1="0" x2="10" y2={ROPE_HEIGHT}
          stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.25"
        />
        {Array.from({ length: KNOT_COUNT }).map((_, i) => {
          const y = (i + 1) * SPACING;
          return (
            <motion.g key={i} style={{ y: knotYs[i] }}>
              <line
                x1="6" y1={y} x2="14" y2={y}
                stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
              />
              <circle cx="10" cy={y} r="1.8" fill={accent} opacity="0.25" />
            </motion.g>
          );
        })}
      </svg>


      {/* Ring */}
      <motion.div style={{ y: ringY }} className="flex flex-col items-center">
        <div style={{ width: 1, height: 8, backgroundColor: accent, opacity: 0.3 }} />
        <motion.div
          whileHover={{ scale: 1.22 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="1.5" opacity="0.7" />
            <circle cx="12" cy="12" r="7" fill={accent} opacity="0.07" />
            {isDark ? (
              <path
                d="M14 8 A6 6 0 1 0 14 16 A4 4 0 1 1 14 8"
                fill={accent} opacity="0.85"
              />
            ) : (
              <>
                <circle cx="12" cy="12" r="2.8" fill={accent} opacity="0.85" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const r = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={deg}
                      x1={12 + Math.cos(r) * 4.5} y1={12 + Math.sin(r) * 4.5}
                      x2={12 + Math.cos(r) * 6.5} y2={12 + Math.sin(r) * 6.5}
                      stroke={accent} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"
                    />
                  );
                })}
              </>
            )}
          </svg>
        </motion.div>
      </motion.div>


      {/* Tooltip */}
      {!isTouchDevice && (
        <motion.div
          initial={{ opacity: 0, x: 8, scale: 0.92 }}
          animate={{
            opacity: isHovered && !isPulling ? 1 : 0,
            x: isHovered && !isPulling ? 0 : 8,
            scale: isHovered && !isPulling ? 1 : 0.92,
          }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute bottom-12 right-8 whitespace-nowrap rounded-lg border border-l-border dark:border dark:border-d-border dark:bg-d-card bg-l-card px-3 py-1.5 shadow-lg"
        >
          <span className="font-mono text-[10px] text-l-accent dark:text-d-accent">
            pull me bro
          </span>
          <span
            className="absolute right-[-5px] top-1/2 -translate-y-1/2"
            style={{
              width: 0, height: 0,
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: `5px solid ${accent}`,
              opacity: 0.5,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}