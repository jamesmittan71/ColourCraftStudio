# Colour Craft Studio

Premium paint supply & colour consultation website — built with Next.js 14, TypeScript and Tailwind CSS.

**Location:** Hermanus / Walkerbay, Western Cape, South Africa  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Nodemailer

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+

### 1. Clone & install

```bash
cd colour-craft-studio
npm install
```

### 2. Configure environment

Copy `.env.local` (already in project) and fill in your SMTP values:

```env
SMTP_HOST=smtp.yourdomain.co.za
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@colourcraftstudio.co.za
SMTP_PASS=your_smtp_password
NOTIFY_EMAIL=owner@colourcraftstudio.co.za
```

> The app uses typed in-memory mock catalogue data. Configure SMTP in production so contact enquiries are delivered to the studio.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
colour-craft-studio/
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Home page
│   ├── brands/page.tsx     # Brands showcase
│   ├── products/page.tsx   # Products with filter
│   ├── services/page.tsx   # Services
│   ├── portfolio/page.tsx  # Project gallery
│   ├── about/page.tsx      # About us
│   ├── contact/page.tsx    # Contact form + info
│   ├── api/
│   │   ├── contact/route.ts   # POST — saves enquiry + email
│   │   └── products/route.ts  # GET — product JSON
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── BrandCard.tsx
│   ├── CTA.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── db.ts         # Typed in-memory catalogue and enquiry mock API
│   ├── brands.ts     # Brand type
│   └── products.ts   # Product type
└── public/
    ├── logos/
    └── images/
```

---

## Data

The catalogue is supplied by a typed in-memory data layer with all 6 brands (MIDAS, Plascon, Dulux, Dekster, Earthcote and Envirolite) and 12 sample products. The API preserves database-style functions for a future production data-store migration.

Contact enquiries are retained only for the active server process. Configure SMTP for durable production delivery.

---

## cPanel Deployment Guide

### Option A — GitHub Actions (recommended)

1. Add these secrets in your GitHub repo → **Settings → Secrets → Actions**:

   | Secret | Description |
   |---|---|
   | `CPANEL_HOST` | Your server hostname |
   | `CPANEL_USER` | cPanel/SSH username |
   | `CPANEL_PASS` | cPanel/SSH password |
   | `CPANEL_PORT` | SSH port (usually 22) |
   | `CPANEL_REMOTE_PATH` | Remote path e.g. `/home/user/public_html` |
   | `SMTP_HOST` | SMTP server hostname |
   | `SMTP_PORT` | SMTP port |
   | `SMTP_USER` | SMTP username |
   | `SMTP_PASS` | SMTP password |
   | `NOTIFY_EMAIL` | Owner email for notifications |

2. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

### Option B — Manual rsync

```bash
# Build locally
cd colour-craft-studio && npm run build

# Sync to cPanel via rsync over SSH
rsync -avz --delete \
  .next/ public/ package.json next.config.mjs \
  user@yourdomain.co.za:/home/user/public_html/
```

### Option C — cPanel File Manager

1. Run `npm run build` locally.
2. Zip the `colour-craft-studio/` folder.
3. Upload and extract via cPanel File Manager to `public_html/`.
4. In cPanel → **Node.js** App, point to `public_html/colour-craft-studio` with startup file `server.js` (or use `npm start`).

### Node.js setup on cPanel

In cPanel → **Setup Node.js App**:
- Application root: `public_html/colour-craft-studio`
- Application URL: your domain
- Application startup file: `node_modules/.bin/next` with `start`
- Environment variables: copy from `.env.local`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SMTP_HOST` | No | SMTP server for contact notifications |
| `SMTP_PORT` | No | SMTP port (default: 587) |
| `SMTP_SECURE` | No | `true` for SSL/TLS |
| `SMTP_USER` | No | SMTP username/email |
| `SMTP_PASS` | No | SMTP password |
| `NOTIFY_EMAIL` | No | Owner email to receive enquiries |

---

## Testing Checklist

### Mobile (iOS & Android)
- [ ] Home page renders at 375px without horizontal scroll
- [ ] Hamburger menu opens/closes correctly
- [ ] Contact form is usable on touch devices
- [ ] All CTA buttons are ≥44px tap targets

### Forms
- [ ] Contact form validates required fields client-side
- [ ] Empty submission shows appropriate errors
- [ ] Valid submission shows success message
- [ ] Valid enquiry arrives at `NOTIFY_EMAIL` when SMTP is configured

### Page Load
- [ ] Home page loads in <2s on 3G (use Lighthouse)
- [ ] Images use lazy loading
- [ ] Lighthouse Performance score ≥90

### Accessibility
- [ ] All images have descriptive `alt` text
- [ ] Heading hierarchy is correct (h1 → h2 → h3)
- [ ] Focus rings visible on all interactive elements
- [ ] Colour contrast meets WCAG 2.1 AA (4.5:1)
- [ ] Form inputs have associated labels

### Cross-browser
- [ ] Chrome (latest)
- [ ] Safari (latest, macOS + iOS)
- [ ] Firefox (latest)

---

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Start production server
npm run lint       # ESLint
```

---

## Licence

© Colour Craft Studio. All rights reserved.
