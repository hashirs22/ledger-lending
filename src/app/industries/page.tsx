import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedHeading } from "@/components/animated-heading";

export const metadata: Metadata = {
  title: "Client Industries",
  description:
    "Ledger & Lending Co. works with business owners across New Zealand — trades, farming, hospitality, retail and e-commerce, property investors, landlords, Airbnb hosts, professional and digital firms, health, education, manufacturing, community organisations and more.",
};

const btnPrimary =
  "inline-flex min-h-[3.35rem] items-center justify-center rounded-full bg-primary px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-primary-foreground transition-transform hover:-translate-y-0.5";
const btnGhost =
  "inline-flex min-h-[3.35rem] items-center justify-center rounded-full border border-black/15 bg-white/60 px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-foreground transition-colors hover:border-black/40";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-full"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const industries: { name: string; eg: string; icon: React.ReactNode }[] = [
  {
    name: "Trades & Construction",
    eg: "Builders, contractors & subtrades",
    icon: (
      <Icon>
        <path d="M7 31h30" />
        <path d="M11 31a11 11 0 0 1 22 0" />
        <path d="M18 21v-5h8v5" />
      </Icon>
    ),
  },
  {
    name: "Farming & Rural Business",
    eg: "Dairy, sheep, cropping & rural services",
    icon: (
      <Icon>
        <path d="M22 39V17" />
        <path d="M22 20c-1-4-4-6-8-6 0 4 3 7 8 6Z" />
        <path d="M22 20c1-4 4-6 8-6 0 4-3 7-8 6Z" />
        <path d="M22 28c-1-4-4-6-8-6 0 4 3 7 8 6Z" />
        <path d="M22 28c1-4 4-6 8-6 0 4-3 7-8 6Z" />
        <path d="M22 36c-1-4-4-6-8-6 0 4 3 7 8 6Z" />
        <path d="M22 36c1-4 4-6 8-6 0 4-3 7-8 6Z" />
      </Icon>
    ),
  },
  {
    name: "Hospitality, Tourism & Accommodation",
    eg: "Cafés, restaurants, motels & tour operators",
    icon: (
      <Icon>
        <path d="M11 19h19v7a8 8 0 0 1-8 8h-3a8 8 0 0 1-8-8Z" />
        <path d="M30 21h3a4 4 0 0 1 0 8h-3" />
        <path d="M17 9c-1 2 1 3 0 5" />
        <path d="M23 9c-1 2 1 3 0 5" />
      </Icon>
    ),
  },
  {
    name: "Retail, E-commerce & Franchises",
    eg: "Shops, online sellers & franchisees",
    icon: (
      <Icon>
        <path d="M13 16h18l-2 20H15Z" />
        <path d="M18 16v-2a4 4 0 0 1 8 0v2" />
      </Icon>
    ),
  },
  {
    name: "Property Investment & Real Estate",
    eg: "Landlords, Airbnb hosts, developers & agents",
    icon: (
      <Icon>
        <path d="M8 22 22 10l14 12" />
        <path d="M12 20v15h20V20" />
        <path d="M19 35v-8h6v8" />
      </Icon>
    ),
  },
  {
    name: "Early Childhood & Education",
    eg: "Kindergartens, ECE centres & education providers",
    icon: (
      <Icon>
        <path d="M22 14c-3.5-2.2-8.5-3-13-2.2v19.4c4.5-.8 9.5 0 13 2.2" />
        <path d="M22 14c3.5-2.2 8.5-3 13-2.2v19.4c-4.5-.8-9.5 0-13 2.2" />
        <path d="M22 14v19.4" />
      </Icon>
    ),
  },
  {
    name: "Transport, Logistics & Automotive",
    eg: "Freight, couriers, fleets & workshops",
    icon: (
      <Icon>
        <path d="M6 15h17v15H6Z" />
        <path d="M23 21h7l5 5v4H23Z" />
        <circle cx="14" cy="32" r="3" />
        <circle cx="30" cy="32" r="3" />
      </Icon>
    ),
  },
  {
    name: "Professional, Creative & Digital",
    eg: "Consultants, agencies, IT & media",
    icon: (
      <Icon>
        <path d="M9 17h26v19H9Z" />
        <path d="M18 17v-3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3" />
        <path d="M9 25h26" />
      </Icon>
    ),
  },
  {
    name: "Health, Medical & Wellness",
    eg: "Clinics, practitioners, dentists & gyms",
    icon: (
      <Icon>
        <path d="M22 35S10 27 10 18a6 6 0 0 1 12-1 6 6 0 0 1 12 1c0 9-12 17-12 17Z" />
        <path d="M22 19v7M18 22h8" />
      </Icon>
    ),
  },
  {
    name: "Manufacturing, Engineering & Wholesale",
    eg: "Makers, importers & distributors",
    icon: (
      <Icon>
        <circle cx="22" cy="22" r="6" />
        <path d="M22 7v5M22 32v5M7 22h5M32 22h5M12 12l3 3M29 29l3 3M32 12l-3 3M15 29l-3 3" />
      </Icon>
    ),
  },
  {
    name: "Personal & Community Services",
    eg: "Salons, cleaning, home care & local services",
    icon: (
      <Icon>
        <circle cx="17" cy="15" r="4.5" />
        <path d="M8 34c0-5 4-9 9-9s9 4 9 9" />
        <circle cx="30" cy="17" r="3.6" />
        <path d="M28 25c4 0 8 3 8 9" />
      </Icon>
    ),
  },
  {
    name: "Not-for-Profits & Community Organisations",
    eg: "Charities, trusts, clubs & associations",
    icon: (
      <Icon>
        <path d="M22 19s-5.5-3.5-5.5-7.4a3 3 0 0 1 5.5-1.1 3 3 0 0 1 5.5 1.1C27.5 15.5 22 19 22 19Z" />
        <path d="M10 24c3.5 4.5 20.5 4.5 24 0" />
        <path d="M10 24l-1.5 3" />
        <path d="M34 24l1.5 3" />
      </Icon>
    ),
  },
];

export default function IndustriesPage() {
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
      {/* HERO */}
      <section className="px-6 pb-16 pt-40">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-foreground/70">
            Client industries
          </p>
          <AnimatedHeading
            as="h1"
            text={"Built for the businesses that keep New Zealand moving."}
            className="mt-4 max-w-[20ch] font-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-semibold leading-[0.98]"
          />
          <p className="mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-foreground/80">
            From builders and growers to retailers, landlords, Airbnb hosts and
            professional firms, we work with business owners across New Zealand.
            Our accounting, tax and commercial finance advice is shaped around
            how your business actually operates — so you receive practical
            guidance, not one-size-fits-all answers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#contact" className={btnPrimary}>
              Book a Consultation
            </Link>
            {/* Was "About the Practice" → /about; repointed while About is hidden. */}
            <Link href="/#services" className={btnGhost}>
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-foreground/70">
              Who we work with
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
              Different industries. Advice that fits.
            </h2>
            <p className="mt-4 text-[1.04rem] leading-relaxed text-foreground/80">
              We take the time to understand how your business earns, spends,
              invests and grows.
            </p>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-3 min-[460px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {industries.map((ind) => (
              <article
                key={ind.name}
                className="flex h-full flex-col items-center justify-center gap-2.5 rounded-[1.2rem] border border-black/[0.08] bg-white/85 p-6 text-center shadow-[0_28px_72px_rgba(15,12,10,0.1)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="mb-1 size-11 text-foreground">{ind.icon}</span>
                <h3 className="flex min-h-[2.5em] items-center text-balance font-sans text-[1.02rem] font-bold leading-tight">
                  {ind.name}
                </h3>
                <p className="max-w-[22ch] text-[0.72rem] font-semibold uppercase leading-[1.5] tracking-[0.06em] text-foreground/55">
                  {ind.eg}
                </p>
              </article>
            ))}
          </div>

          {/* Not listed */}
          <div className="mt-6 grid items-center gap-4 rounded-[2rem] border border-black/[0.08] bg-white/70 p-8 shadow-[0_28px_80px_rgba(15,12,10,0.1)] backdrop-blur-xl md:grid-cols-[0.85fr_1.6fr] md:gap-10 md:p-10">
            <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.15rem)] font-semibold leading-tight">
              Not seeing your industry?
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-foreground/80">
              The sectors above are only a snapshot. Whatever your business or
              organisation does, we take the time to understand how it operates
              and provide clear, practical advice for what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-black/[0.08] bg-white/85 p-10 text-center shadow-[0_28px_80px_rgba(15,12,10,0.1)] backdrop-blur-xl sm:p-16">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-foreground/70">
            Next step
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05]">
            Let&rsquo;s talk about your business.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-foreground/80">
            Tell us where things stand, what you need help with and what you are
            working towards. We will come back to you with a clear, practical
            next step.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/#contact" className={btnPrimary}>
              Book a Consultation
            </Link>
            <Link href="/#services" className={btnGhost}>
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
