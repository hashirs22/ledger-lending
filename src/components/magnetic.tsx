"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** How far the element drifts toward the cursor (0–1). */
  strength?: number;
  className?: string;
};

/**
 * Wraps a CTA so it drifts gently toward the cursor and springs back.
 * Inert under prefers-reduced-motion.
 */
export function Magnetic({ children, strength = 0.35, className }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  function handleMove(e: React.MouseEvent<HTMLSpanElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
