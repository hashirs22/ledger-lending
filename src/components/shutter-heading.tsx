"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { createElement, useRef } from "react";

type Props = {
  /** Use "\n" to force line breaks. */
  text: string;
  as?: "h1" | "h2";
  className?: string;
  /** Number of horizontal slices per line. */
  slices?: number;
  delay?: number;
};

/**
 * Cinematic shutter reveal: each line is cut into horizontal slices that slide
 * in interlaced (alternating sides) and lock into the finished word. The text
 * layers transparently over whatever is behind it (e.g. the 3D city).
 * Falls back to static text under prefers-reduced-motion.
 */
export function ShutterHeading({
  text,
  as = "h1",
  className,
  slices = 7,
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const lines = text.split("\n");

  if (reduce) {
    return createElement(as, { className, ref }, text);
  }

  return createElement(
    as,
    { className, ref, "aria-label": text },
    lines.map((line, li) => (
      // pb gives the clip box room for deep descenders (Cormorant's g/y tails)
      // so clip-path clips below them rather than through them.
      <span key={li} className="relative block pb-[0.22em]" aria-hidden>
        {/* invisible sizer reserves the line's box */}
        <span className="invisible block">{line}</span>
        {Array.from({ length: slices }).map((_, i) => {
          const top = (i * 100) / slices;
          const bottom = ((slices - 1 - i) * 100) / slices;
          const from = i % 2 ? "9%" : "-9%";
          return (
            <motion.span
              key={i}
              className="absolute inset-0 block will-change-transform"
              style={{ clipPath: `inset(${top}% 0% ${bottom}% 0%)` }}
              initial={{ x: from, opacity: 0 }}
              animate={inView ? { x: "0%", opacity: 1 } : { x: from, opacity: 0 }}
              transition={{
                duration: 0.72,
                delay: delay + li * 0.16 + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          );
        })}
      </span>
    )),
  );
}
