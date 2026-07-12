import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/social";

const explore = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/industries", label: "Industries" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-[#0d0d0d] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/ledger-lending-ll-mark.png"
                alt=""
                width={368}
                height={257}
                className="h-9 w-auto invert"
              />
              <span className="text-[0.95rem] font-bold uppercase leading-none tracking-[0.16em]">
                Ledger &amp; Lending Co.
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/55">
              Accounting, tax and commercial finance brought into one
              disciplined advisory practice for business owners across New
              Zealand.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/40">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.98rem] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/40">
              Get in touch
            </h2>
            <Link
              href="mailto:office@ledger-lending.com"
              className="mt-4 block text-[0.98rem] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              office@ledger-lending.com
            </Link>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-white/50">
              Free, no-obligation. We usually reply within one business day.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex min-h-[2.9rem] items-center justify-center rounded-full bg-white px-6 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#0d0d0d] transition-transform hover:-translate-y-0.5"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.78rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} Ledger & Lending Co. All rights reserved.`}</p>
          <p className="tracking-[0.04em]">
            Accounting &middot; Tax &middot; Commercial Finance &mdash; New
            Zealand
          </p>
        </div>
      </div>
    </footer>
  );
}
