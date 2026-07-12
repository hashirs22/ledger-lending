"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Glow colour tone for the surface underneath. */
  tone?: "light" | "dark";
};

/**
 * A card whose surface carries a soft spotlight that follows the cursor.
 * Purely visual; disabled under prefers-reduced-motion.
 */
export function SpotlightCard({ children, className, tone = "light" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  const glow =
    tone === "dark"
      ? "rgba(255,255,255,0.10)"
      : "rgba(15,12,10,0.07)";

  return (
    <div
      ref={ref}
      onMouseMove={reduce ? undefined : onMove}
      className={`group/spot relative ${className ?? ""}`}
    >
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
          style={{
            background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 62%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
