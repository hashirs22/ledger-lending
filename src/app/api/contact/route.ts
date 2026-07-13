import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  business?: string;
  service?: string;
  message?: string;
  company_website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Configured on Vercel (Project → Settings → Environment Variables).
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL; // where enquiries land (your Outlook inbox)
// Send from the verified domain. Honour CONTACT_FROM_EMAIL only if it's a real
// domain address — never the Resend test sender, which can't deliver to others.
const RAW_FROM = process.env.CONTACT_FROM_EMAIL;
const FROM_EMAIL =
  RAW_FROM && !RAW_FROM.includes("resend.dev")
    ? RAW_FROM
    : "Ledger & Lending Co. <noreply@ledger-lending.com>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot — accept silently, do nothing.
  if (data.company_website && data.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const business = (data.business ?? "").trim();
  const service = (data.service ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields." },
      { status: 422 },
    );
  }

  // No key configured (e.g. local dev) — log so the flow still works end-to-end.
  if (!RESEND_API_KEY || !TO_EMAIL) {
    console.log("[contact] (no Resend config — logging only)", {
      name,
      email,
      phone,
      business,
      service,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Business", business || "—"],
    ["Service", service || "—"],
  ];
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#121212;max-width:560px">
      <h2 style="font-size:18px;margin:0 0 12px">New website enquiry</h2>
      <table style="border-collapse:collapse;font-size:14px;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="font-size:12px;color:#888;margin:12px 0 4px">Message</p>
      <div style="font-size:14px;line-height:1.6;white-space:pre-wrap;border-left:3px solid #eee;padding-left:12px">${escapeHtml(message)}</div>
    </div>`;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email, // reply goes straight back to the enquirer
      subject: `New enquiry from ${name}${business ? ` · ${business}` : ""}`,
      html,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json({ ok: false, error: "Send failed." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] send threw", err);
    return NextResponse.json({ ok: false, error: "Send failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
