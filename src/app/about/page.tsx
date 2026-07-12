import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AnimatedHeading } from "@/components/animated-heading";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { LinkedInIcon, SOCIAL } from "@/components/social";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ledger & Lending Co. is led by JK Sahi, a Chartered Accountant whose tax career spans close to thirty years across PwC, KPMG, and BDO.",
};

const btnPrimary =
  "inline-flex min-h-[3.35rem] items-center justify-center rounded-full bg-primary px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-primary-foreground transition-transform hover:-translate-y-0.5";
const btnGhost =
  "inline-flex min-h-[3.35rem] items-center justify-center rounded-full border border-black/15 bg-white/60 px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-foreground transition-colors hover:border-black/40";

const creds = [
  "Chartered Accountant",
  "28 years in tax",
  "PwC · KPMG · BDO",
  "Structuring · IRD · Advisory",
];

const stats: { to: number; suffix?: string; label: string }[] = [
  { to: 28, label: "Years in tax" },
  { to: 3, label: "PwC · KPMG · BDO" },
  { to: 12, label: "Client industries" },
  { to: 100, suffix: "%", label: "Confidential" },
];

const letter = [
  "After nearly three decades in tax, I have seen the same issue again and again: business owners are expected to make important decisions with advice that is split across different places.",
  "The accountant looks at the numbers. The tax adviser looks at the tax. The lender looks at the funding. But the owner is left carrying the real decision.",
  "That is why Ledger & Lending Co. exists.",
  "I wanted to create a practice where those conversations are brought together — so owners can get clear, practical advice before they make the next move.",
  "My role is to help owners understand where they stand, what their options are, and what needs attention before it becomes a bigger problem.",
  "Sometimes that means planning for tax early. Sometimes it means dealing with Inland Revenue when the pressure is already there. Sometimes it means preparing better numbers for finance, reviewing the structure of the business, or helping an owner make sense of cash flow before making a major decision.",
  "The point is simple: you should not have to piece together advice from three different places before you know what to do next.",
];

export default function AboutPage() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -4,
          background:
            "linear-gradient(180deg, rgba(244,244,241,0.74) 0%, rgba(244,244,241,0.66) 48%, rgba(244,244,241,0.8) 100%)",
        }}
      />
      {/* JK leads the page */}
      <section className="px-6 pb-24 pt-40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[19rem_1fr] md:items-start md:gap-12">
          {/* Profile card */}
          <aside className="rounded-[2rem] border border-black/[0.08] bg-white/85 p-6 text-center shadow-[0_28px_80px_rgba(15,12,10,0.1)] backdrop-blur-xl md:sticky md:top-28">
            <Image
              src="/assets/jk-sahi-hd.jpg"
              alt="JK Sahi, Director and Chartered Accountant at Ledger &amp; Lending Co."
              width={300}
              height={300}
              sizes="144px"
              className="mx-auto size-36 rounded-full border border-black/[0.08] object-cover shadow-[0_10px_26px_rgba(15,12,10,0.16)] [filter:grayscale(1)_contrast(1.08)_brightness(1.03)]"
            />
            <p className="mt-5 font-display text-[1.85rem] font-semibold leading-none">
              JK Sahi
            </p>
            <p className="mt-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-foreground/60">
              Director
            </p>
            <ul className="mt-5 grid gap-1.5 border-t border-black/[0.1] pt-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-foreground/60">
              {creds.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <Link
              href={SOCIAL.linkedInJK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with JK Sahi on LinkedIn (opens in a new tab)"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-foreground/80 transition-colors hover:border-black/50 hover:bg-foreground hover:text-background"
            >
              <LinkedInIcon className="size-[1.05rem]" />
              Connect on LinkedIn
            </Link>
          </aside>

          {/* Body */}
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-foreground/70">
              About Ledger &amp; Lending Co.
            </p>
            <AnimatedHeading
              as="h1"
              text={"Nearly three decades of tax, distilled into one clear practice."}
              className="mt-4 max-w-[20ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] font-semibold leading-[1]"
            />
            <p className="mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-foreground/85">
              Ledger &amp; Lending Co. is led by JK Sahi, a Chartered Accountant
              whose tax career spans close to thirty years across PwC, KPMG, and
              BDO.
            </p>

            {/* Founder letter panel */}
            <div className="mt-8 rounded-[1.4rem] border border-black/[0.08] bg-white/70 p-6 shadow-[0_22px_56px_rgba(15,12,10,0.09)] backdrop-blur-xl sm:p-8">
              <p className="border-b border-black/[0.1] pb-4 font-display text-[clamp(1.7rem,2.6vw,2.05rem)] font-semibold">
                Why I built this practice
              </p>
              <div className="mt-5 space-y-4 text-[1.04rem] leading-[1.72] text-foreground/90">
                {letter.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 pb-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="rounded-[1.4rem] border border-black/[0.08] bg-white/70 p-7 text-center shadow-[0_18px_50px_rgba(15,12,10,0.08)] backdrop-blur-xl"
            >
              <p className="font-display text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-2.5 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-foreground/60">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-black/[0.08] bg-white/85 p-10 text-center shadow-[0_28px_80px_rgba(15,12,10,0.1)] backdrop-blur-xl sm:p-16">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-foreground/70">
            Next step
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05]">
            Let&rsquo;s talk about where your business is heading.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-foreground/80">
            A confidential, no-obligation conversation is the simplest place to
            start. Tell us what you are working through — tax, cash flow,
            funding, structure, compliance, or growth — and we will come back
            with the most practical next step.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/#contact" className={btnPrimary}>
              Book a Consultation
            </Link>
            <Link href="/#services" className={btnGhost}>
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
