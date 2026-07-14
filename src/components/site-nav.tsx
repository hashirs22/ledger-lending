"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const links = [
  { href: "/#services", label: "Services" },
  // About temporarily hidden (JK still at BDO). To reinstate: restore this line
  // `{ href: "/about", label: "About" },` and rename src/app/_about → about.
  { href: "/industries", label: "Industries" },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href;
}

export function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Close the menu on route change and on Escape.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[min(1080px,calc(100vw-2rem))] -translate-x-1/2">
      <div className="flex items-center justify-between gap-5 rounded-[1.7rem] border border-black/[0.08] bg-white/80 px-5 py-3.5 shadow-[0_20px_50px_rgba(15,12,10,0.1)] backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Ledger and Lending home"
        >
          <Image
            src="/assets/ledger-lending-ll-mark.png"
            alt="Ledger &amp; Lending Co. monogram"
            width={368}
            height={257}
            className="h-9 w-auto sm:h-10"
            priority
          />
          <span className="hidden text-[0.95rem] font-bold uppercase leading-none tracking-[0.16em] sm:block">
            Ledger &amp; Lending Co.
          </span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-6" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={`hidden text-[0.78rem] font-semibold uppercase tracking-[0.13em] transition-colors hover:text-foreground sm:inline ${
                isActive(pathname, l.href)
                  ? "text-foreground"
                  : "text-foreground/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full border border-current px-3.5 py-2 text-[0.74rem] font-bold uppercase tracking-[0.11em] transition-colors hover:bg-foreground hover:text-background"
          >
            <span className="hidden sm:inline">Book a Consultation</span>
            <span className="sm:hidden">Book</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-black/10 text-foreground transition-colors hover:bg-foreground hover:text-background sm:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 overflow-hidden rounded-[1.4rem] border border-black/[0.08] bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,12,10,0.16)] backdrop-blur-xl sm:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={`block rounded-[1rem] px-4 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.13em] transition-colors hover:bg-foreground/5 ${
                  isActive(pathname, l.href)
                    ? "text-foreground"
                    : "text-foreground/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
