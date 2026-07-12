# Going live — Ledger & Lending Co.

Stack: **Vercel** (hosting) + **Resend** (contact-form email) + **GoDaddy** (domain + Outlook email, already owned).
The repo is already built and committed. Follow these in order. Anything in `ANGLE_BRACKETS` is a value you supply.

---

## 1. Put the code on GitHub

1. Create a new **private** repo at https://github.com/new — name it e.g. `ledger-lending`. Don't add a README/gitignore (we have them).
2. In the project folder, connect and push:
   ```bash
   git remote add origin https://github.com/<your-username>/ledger-lending.git
   git push -u origin main
   ```
   (GitHub will prompt for login / a Personal Access Token the first time.)

## 2. Deploy on Vercel

1. Sign in at https://vercel.com with your GitHub account.
2. **Add New → Project → Import** the `ledger-lending` repo.
3. Framework preset auto-detects **Next.js**. Leave build settings default. Click **Deploy**.
4. In ~1 minute you'll get a live URL like `ledger-lending.vercel.app`. The site is up (contact form will *log* until step 3 adds the email keys).

> Free *Hobby* tier deploys immediately. For a business, upgrade the project to **Pro (~US$20/mo)** when ready.

## 3. Set up Resend (contact-form email)

1. Sign up at https://resend.com (free).
2. **API Keys → Create API Key** → copy it (starts `re_…`). You'll paste it into Vercel next.
3. **Domains → Add Domain** → enter your domain `<your-domain>`. Resend shows a few DNS records (SPF/DKIM). Add them in GoDaddy (step 5). This lets email send *from* your domain with good deliverability.
   - *Fastest start (no DNS):* leave `CONTACT_FROM_EMAIL` as `onboarding@resend.dev`. **But** Resend's test sender only delivers to the exact email you **signed up to Resend with** — so sign up using the same inbox you'll put in `CONTACT_TO_EMAIL`. To send to any address (and from `enquiries@<your-domain>`), verify your domain.

## 4. Add the environment variables on Vercel

Vercel → your project → **Settings → Environment Variables**. Add these (Production + Preview):

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | the `re_…` key from step 3 |
| `CONTACT_TO_EMAIL` | `<your Outlook inbox, e.g. office@your-domain>` |
| `CONTACT_FROM_EMAIL` | `Ledger & Lending Co. <onboarding@resend.dev>` (swap to `enquiries@<your-domain>` after domain verify) |

Then **Deployments → … → Redeploy** so the keys take effect. Submit the contact form once — the enquiry should land in your inbox.

## 5. Point your GoDaddy domain at Vercel

1. Vercel → project → **Settings → Domains → Add** → type `<your-domain>` (and `www.<your-domain>`).
2. Vercel shows the DNS target. In **GoDaddy → your domain → DNS**, add what Vercel specifies — typically:
   - `A` record, host `@` → `76.76.21.21`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
3. Also add the **Resend** SPF/DKIM records from step 3 here.
4. ⚠️ **Do NOT touch the `MX` records** — those keep your GoDaddy/Outlook email working. We only add A/CNAME/TXT.
5. DNS propagates in minutes–1 hour. Vercel auto-issues the SSL certificate. Done — `https://<your-domain>` is live.

---

## Everyday updates
Edit code → `git push` → Vercel auto-deploys. That's the whole loop.

## Notes
- Local dev without keys: the form logs to the terminal instead of emailing (no crash).
- Placeholder still to replace: social URLs in `src/components/social.tsx`.
