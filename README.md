# Colour Craft Studio

Premium Next.js website for Colour Craft Studio, a specialist paint retailer and colour consultancy serving Hermanus, Walker Bay, and the wider Western Cape luxury residential market.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS 4
- JSON-backed catalogue/content with lightweight cPanel-friendly runtime storage

## Features included

- Premium multi-page marketing site:
  - Home
  - Brands
  - Products
  - Services
  - Portfolio
  - About
  - FAQ
  - Contact
  - Resources
- Local SEO metadata, `robots.txt`, `sitemap.xml`, and LocalBusiness schema
- Supplier/product catalogue data structure via `/data/*.json`
- Filterable brands, products, and portfolio views
- Contact, consultation booking, and newsletter API routes
- Lightweight admin dashboard at `/admin`
- Runtime JSON inbox for bookings and enquiries at `data/runtime/`
- cPanel deployment guidance and optional GitHub Actions workflow

## Local development

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run dev
```

## Runtime environment variables

These are optional but enable email/webhook automation without changing code:

- `CONTACT_WEBHOOK_URL`
- `BOOKING_WEBHOOK_URL`
- `BOOKING_REMINDER_WEBHOOK_URL`
- `NEWSLETTER_WEBHOOK_URL`

If set, the API routes will POST the submitted JSON payloads to those endpoints.

## Product and content management

Seed data lives in:

- `/home/runner/work/ColourCraftStudio/ColourCraftStudio/data/brands.json`
- `/home/runner/work/ColourCraftStudio/ColourCraftStudio/data/products.json`
- `/home/runner/work/ColourCraftStudio/ColourCraftStudio/data/portfolio.json`
- `/home/runner/work/ColourCraftStudio/ColourCraftStudio/data/faqs.json`
- `/home/runner/work/ColourCraftStudio/ColourCraftStudio/data/resources.json`

The admin page can add or update runtime catalogue and portfolio entries. Runtime edits are stored under `data/runtime/` and are intentionally git-ignored.

## Booking confirmations and reminders

- Booking requests are stored by `POST /api/bookings`
- Configure `BOOKING_WEBHOOK_URL` to deliver confirmations through your preferred email or automation service
- Run `GET /api/bookings/reminders` from a daily cPanel cron job to collect bookings that are 24 hours away
- If `BOOKING_REMINDER_WEBHOOK_URL` is set, that endpoint also forwards reminder payloads automatically

## cPanel deployment

### Manual deploy

1. Build locally or on the server with `npm run build`
2. Copy the repository to your cPanel Node.js application directory
3. Set environment variables in cPanel
4. Point the startup file to the Next.js server entry as required by your host
5. Restart the Node.js application

### GitHub Actions deploy

Add these repository secrets:

- `CPANEL_FTP_SERVER`
- `CPANEL_FTP_USERNAME`
- `CPANEL_FTP_PASSWORD`
- `CPANEL_FTP_PATH`

The included workflow builds the site and syncs the repository contents to the target cPanel path on pushes to `main`.
