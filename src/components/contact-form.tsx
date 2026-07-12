"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Values = {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message: string;
  company_website: string; // honeypot — must stay empty
};

type Errors = Partial<Record<keyof Values, string>>;

const SERVICES = [
  "General enquiry",
  "Accounting & Business Advisory",
  "Tax",
  "Commercial Finance",
];

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  business: "",
  service: SERVICES[0],
  message: "",
  company_website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.email.trim()) e.email = "An email address helps us reply.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right.";
  if (v.message.trim().length < 10)
    e.message = "A sentence or two about your enquiry helps us prepare.";
  return e;
}

const fieldBase =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[0.98rem] text-foreground outline-none transition placeholder:text-foreground/35 focus:border-foreground/60 focus:ring-2 focus:ring-foreground/15 aria-[invalid=true]:border-red-500/70 aria-[invalid=true]:ring-red-500/15";
const labelBase =
  "mb-1.5 block text-[0.74rem] font-bold uppercase tracking-[0.12em] text-foreground/70";

export function ContactForm() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[26rem] flex-col items-center justify-center rounded-[1.6rem] bg-white p-10 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-foreground text-primary-foreground">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-[1.9rem] font-semibold text-foreground">
          Thank you — enquiry received.
        </h3>
        <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-foreground/70">
          We&rsquo;ll review what you&rsquo;ve sent and come back to you with a
          clear, practical next step, usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-foreground/60 underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-[1.6rem] bg-white p-6 text-left shadow-[0_28px_80px_rgba(15,12,10,0.28)] sm:p-8"
    >
      {/* Honeypot — hidden from users, catches bots */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website}
          onChange={(e) => update("company_website", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldBase}
            placeholder="Your name"
            value={values.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(e) => update("name", e.target.value)}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[0.8rem] text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldBase}
            placeholder="you@business.co.nz"
            value={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(e) => update("email", e.target.value)}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-[0.8rem] text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone <span className="font-medium normal-case tracking-normal text-foreground/40">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldBase}
            placeholder="For a quicker reply"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="business" className={labelBase}>
            Business <span className="font-medium normal-case tracking-normal text-foreground/40">(optional)</span>
          </label>
          <input
            id="business"
            name="business"
            autoComplete="organization"
            className={fieldBase}
            placeholder="Company or trading name"
            value={values.business}
            onChange={(e) => update("business", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="service" className={labelBase}>
          I need help with
        </label>
        <select
          id="service"
          name="service"
          className={`${fieldBase} appearance-none bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23121212' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
          value={values.service}
          onChange={(e) => update("service", e.target.value)}
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelBase}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldBase} resize-y`}
          placeholder="Tell us where things stand and what you need help with."
          value={values.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(e) => update("message", e.target.value)}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-[0.8rem] text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-[0.9rem] text-red-700">
          Something went wrong sending your enquiry. Please try again, or email us
          directly at office@ledger-lending.com.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        className="mt-6 inline-flex min-h-[3.35rem] w-full items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </motion.button>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-foreground/50">
        Free and no-obligation. Your details are used only to respond to your
        enquiry.
      </p>
    </form>
  );
}
