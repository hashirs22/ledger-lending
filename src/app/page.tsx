import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { AnimatedHeading } from "@/components/animated-heading";
import { ShutterHeading } from "@/components/shutter-heading";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";
import { Marquee } from "@/components/marquee";
import { ContactForm } from "@/components/contact-form";

const industryTicker = [
  "Trades & Construction",
  "Farming & Rural",
  "Hospitality & Tourism",
  "Retail & E-commerce",
  "Property & Real Estate",
  "Health & Medical",
  "Professional & Digital",
  "Manufacturing",
  "Transport & Logistics",
  "Education",
  "Not-for-Profits",
];

const btnPrimary =
  "inline-flex min-h-[3.35rem] items-center justify-center rounded-full bg-primary px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-primary-foreground transition-transform hover:-translate-y-0.5";
const btnGhost =
  "inline-flex min-h-[3.35rem] items-center justify-center rounded-full border border-black/15 bg-white/60 px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-foreground transition-colors hover:border-black/40";

const services = [
  {
    title: "Accounting & Business Advisory",
    lead: "From annual accounts and day-to-day finance support through to forecasting, restructuring, and business sale preparation, we help keep the numbers clear, commercial, and ready to support better decisions.",
    items: [
      "Annual accounts",
      "Tax returns",
      "GST returns",
      "Bookkeeping support",
      "Xero setup and cleanup",
      "Payroll support",
      "Management reporting",
      "3-way forecasts",
      "Business plans",
      "Company formation",
      "Business restructuring",
      "Company wind-ups",
      "Business valuations",
      "Trust accounting",
      "Business sale preparation and support",
    ],
  },
  {
    title: "Tax",
    lead: "Tax is not just about filing returns. We help businesses plan ahead, manage risk, and deal with IRD matters before they become bigger problems — from tax planning and provisional tax to tax debt negotiations, payment arrangements, tax financing options, and support through complex IRD correspondence.",
    items: [
      "Tax planning",
      "Provisional tax support",
      "IRD correspondence and negotiations",
      "IRD mediation support",
      "Tax debt management",
      "Payment arrangement support",
      "Tax financing options",
      "Business and group tax structuring",
      "Shareholder salary and dividend advice",
    ],
  },
  {
    title: "Commercial Finance",
    lead: "Accessing capital is easier when the numbers, story, and structure are presented clearly. We help businesses prepare, package, and navigate funding options for growth, assets, working capital, and business purchases.",
    items: [
      "Asset and equipment finance",
      "Working capital funding",
      "Business purchase finance",
      "Mortgages",
      "Growth funding",
      "Loan packaging and lender support",
      "Refinance support",
      "Insurance and risk cover support",
    ],
  },
];

const whyUs = [
  {
    title: "Know where you stand",
    body: "Clear accounts, clean systems, and practical reporting so you can see what is really happening in the business.",
  },
  {
    title: "Stay ahead of tax and IRD issues",
    body: "Support with tax planning, provisional tax, IRD correspondence, tax debt, and payment arrangements before pressure builds.",
  },
  {
    title: "Prepare for funding properly",
    body: "Forecasts, business plans, and loan packaging that help lenders understand the numbers, the story, and the purpose of the funding.",
  },
  {
    title: "Make the next move with confidence",
    body: "Support for growth, restructuring, business purchases, valuations, and sale preparation when the business is ready to move.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        id="hero"
        className="relative flex min-h-[100svh] items-center px-6 pb-24 pt-40"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <ShutterHeading
              as="h1"
              text={"Financial Strategy\nReimagined."}
              className="font-display text-[clamp(3.5rem,9vw,7rem)] font-semibold leading-[1.0]"
            />
            <Reveal y={22} delay={0.55}>
              <p className="mt-5 max-w-xl font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium leading-tight">
                Clearer numbers, less tax pressure, and the capital to grow.
              </p>
              <p className="mt-4 max-w-2xl text-[1.06rem] leading-relaxed text-foreground/80">
                Ledger &amp; Lending Co. brings accounting, tax, and commercial
                finance into one disciplined advisory practice — helping
                businesses understand their numbers, strengthen cash flow, plan
                for growth, and access the capital they need to move forward.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Magnetic>
                  <Link href="#contact" className={btnPrimary}>
                    Book a Consultation
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="#services" className={btnGhost}>
                    View Services
                  </Link>
                </Magnetic>
              </div>
              <p className="mt-4 text-[0.82rem] font-medium text-foreground/60">
                Free, no-obligation — we reply with the next practical step.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section id="services" className="scroll-mt-28 px-6 py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <Reveal>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-foreground/70">
              Services
            </p>
            <AnimatedHeading
              as="h2"
              text={"One advisory practice. Three disciplines that move together."}
              className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[0.98]"
            />
          </Reveal>
          <Reveal delay={0.1} className="rounded-[1.6rem] bg-[#111]/95 p-8 text-[1.02rem] leading-relaxed text-white/85">
            We do not treat accounting, tax, and finance as separate
            conversations. Each one shapes the other — from how a business is
            structured, to how cash is managed, to how growth is funded. Our
            role is to bring those decisions into one clear commercial view.
          </Reveal>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="px-6 pb-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <SpotlightCard className="rounded-[2rem] border border-black/[0.08] bg-white/85 p-8 shadow-[0_28px_80px_rgba(15,12,10,0.1)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:p-10">
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">
                {s.title}
              </h2>
              <p className="mt-4 max-w-3xl text-[1.02rem] leading-relaxed text-foreground/80">
                {s.lead}
              </p>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-3 border-b border-black/[0.08] py-3 text-[0.98rem]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                    {it}
                  </li>
                ))}
              </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INDUSTRIES TICKER */}
      <section className="py-16" aria-label="Industries we work with">
        <p className="mb-6 text-center text-[0.72rem] font-bold uppercase tracking-[0.24em] text-foreground/40">
          Trusted by business owners across New Zealand
        </p>
        <Marquee items={industryTicker} />
      </section>

      {/* WHY US */}
      <section className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-foreground/70">
              Why work with us
            </p>
            <AnimatedHeading
              as="h2"
              text={"Built for the moments when business owners need clarity."}
              className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,4.6vw,3.6rem)] font-semibold leading-[0.98]"
            />
            <p className="mt-5 max-w-2xl text-[1.04rem] leading-relaxed text-foreground/80">
              A business does not only need advice at year-end. It needs the
              right support when cash gets tight, tax becomes complex, funding is
              required, systems fall behind, or the next move needs to be planned
              properly.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whyUs.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.06}
                className="rounded-[1.6rem] border border-white/10 bg-[#141414] p-7 text-white transition-transform duration-300 hover:-translate-y-1"
              >
                <strong className="text-[1.1rem] font-semibold">
                  {c.title}
                </strong>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-white/70">
                  {c.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-28 px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0e0e0e] to-[#201d19] p-8 text-white sm:p-12">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-white/55">
                  Contact
                </p>
                <AnimatedHeading
                  as="h2"
                  text={"Start with a confidential consultation."}
                  className="mt-4 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-[1.02]"
                />
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/75">
                  Tell us what you need help with — accounting, tax, IRD matters,
                  funding, or a wider business decision. We&rsquo;ll review your
                  enquiry and respond with the next practical step.
                </p>
                <dl className="mt-8 space-y-4 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/45">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <Link
                        href="mailto:office@ledger-lending.com"
                        className="text-[1.02rem] text-white/90 underline-offset-4 hover:underline"
                      >
                        office@ledger-lending.com
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/45">
                      Response time
                    </dt>
                    <dd className="mt-1 text-[1.02rem] text-white/90">
                      Usually within one business day.
                    </dd>
                  </div>
                </dl>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
