"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { createElement, useRef } from "react";

type Props = {
  /** Use "\n" to force line breaks. Each word reveals from behind a mask. */
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

/**
 * Editorial mask reveal: each word slides up from behind its own clip,
 * staggered. Falls back to static text under prefers-reduced-motion.
 *
 * Note: in-view detection watches the heading element itself, not the word
 * spans — those start translated out of their own overflow:hidden masks, so an
 * observer on them would read "not intersecting" and never fire.
 */
export function AnimatedHeading({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.055,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -12% 0px" });
  const lines = text.split("\n");

  if (reduce) {
    return createElement(as, { className, ref }, text);
  }

  let word = 0;
  return createElement(
    as,
    { className, ref, "aria-label": text },
    lines.map((line, li) => (
      <span key={li} aria-hidden className="block">
        {line.split(" ").map((w, wi) => {
          const idx = word++;
          return (
            <span
              key={wi}
              className="inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "115%" }}
                animate={inView ? { y: 0 } : { y: "115%" }}
                transition={{
                  duration: 0.75,
                  delay: delay + idx * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          );
        })}
      </span>
    )),
  );
}
