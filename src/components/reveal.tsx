"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger offset in seconds. */
  delay?: number;
  /** Vertical travel distance in px (default 24). */
  y?: number;
};

/**
 * Fades + lifts its children into view on scroll. Fires once.
 * Honours prefers-reduced-motion by rendering statically.
 */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div {...(props as HTMLMotionProps<"div">)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
