# Krysalis Media

**UK tactical media and production studio — website and CMS.**

Live site: [krysalismedia.co.uk](https://krysalismedia.co.uk) · [krysalismedia.com](https://krysalismedia.com)

A full production Next.js application built end-to-end: information architecture, custom animation work, a headless CMS integration, a tested contact pipeline, and full production email infrastructure.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS** — custom site-wide responsive type and spacing system
- **Sanity** — headless CMS with server-side revalidation, so content editors publish new work without a redeploy
- **Resend** — transactional email for the contact form, with server-side validation
- **Jest** — test suite covering core validation and navigation logic
- **Vercel** — hosting and deployment

## Highlights

- Custom-built animated case-study pages for portfolio projects, with a typewriter-style reveal
- A content-managed Work section — non-technical users can add, edit, and remove projects through a Sanity Studio instance embedded directly in the app (`/studio`), including video uploads
- Server-side and client-side email validation with honest, specific error messages instead of a single generic failure state
- Full custom domain email setup (SPF, DKIM, MX) for the associated business domain

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm test
```
