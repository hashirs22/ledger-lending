import Link from "next/link";

/**
 * Social profile URLs. TODO: replace the placeholders below with the real
 * profile links — JK's personal LinkedIn, and the firm's Facebook / Instagram.
 */
export const SOCIAL = {
  linkedInJK: "https://www.linkedin.com/", // JK Sahi — personal LinkedIn
  linkedInCompany: "https://www.linkedin.com/", // Ledger & Lending Co. page (optional)
  facebook: "https://www.facebook.com/", // Ledger & Lending Co. page
  instagram: "https://www.instagram.com/", // Ledger & Lending Co. page
};

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H10z" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const items = [
  { href: SOCIAL.linkedInCompany, label: "LinkedIn", Icon: LinkedInIcon },
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
];

/** Row of social icon links, styled for the dark footer. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:bg-white hover:text-[#0d0d0d]"
          >
            <Icon className="size-[1.15rem]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
