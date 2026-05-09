# Uday Construction — Lead-Gen Website

A fast, mobile-first lead-generation site for a single contracting business in Maharashtra, India.
Six pages (Home, Services, Portfolio, Estimator, About, Contact), one Firebase form,
free hosting on Netlify.

## Quick start

```bash
npm install
cp .env.example .env        # then paste Firebase keys (see below)
npm run dev                 # opens http://localhost:5173
```

To produce a production build:

```bash
npm run build
npm run preview             # local smoke-test of the dist/ output
```

## Stack

| Layer        | Choice                          | Why                                  |
| ------------ | ------------------------------- | ------------------------------------ |
| Framework    | React 18 + Vite                 | Fast dev, tiny prod bundle           |
| Routing      | React Router v6                 | Standard, no surprises               |
| Styling      | Tailwind CSS                    | Mobile-first, no CSS files to chase  |
| SEO          | react-helmet-async              | Per-page `<title>` / meta            |
| Forms        | Firebase Firestore (free tier)  | No server, write-only from client    |
| Hosting / CI | Netlify                         | Free, auto-deploy on `git push`      |

Bundle target: **< 200 KB gzipped**. Firebase is split into its own chunk in `vite.config.js`.

## Project structure

```
src/
  data/business.js        ← single source of truth (name, phone, services, projects, testimonials, ESTIMATOR RATES)
  lib/estimate.js         ← pure cost-calculation logic + WhatsApp message builder
  firebase/config.js      ← Firebase init + submitLead()
  components/
    Navbar.jsx            ← sticky nav, mobile hamburger
    Footer.jsx            ← 4-column footer
    WhatsAppFloat.jsx     ← pulsing WA button (all pages)
    CallFloat.jsx         ← mobile-only call button
    SEO.jsx               ← per-page <title> + meta
    ServiceIcon.jsx       ← shared icon set
  pages/
    Home.jsx              ← hero, services, trust strip, testimonials, CTA
    Services.jsx          ← 6 services with images + per-service WhatsApp
    Portfolio.jsx         ← before/after tap-toggle gallery + filter
    Estimator.jsx         ← interactive cost calculator → WhatsApp quote
    About.jsx             ← story, values, service areas
    Contact.jsx           ← Firestore form + WA/call/email/map
  hooks/useScrollToTop.js ← scroll to top on route change
  App.jsx                 ← routes
  main.jsx                ← bootstrap
public/
  _redirects              ← Netlify SPA fallback
  robots.txt              ← search-engine crawl rules
  sitemap.xml             ← submit to Google Search Console
  favicon.svg             ← inline SVG, no PNG needed
index.html                ← LocalBusiness JSON-LD lives here
netlify.toml              ← build command + headers + redirects
tailwind.config.js        ← brand colours (orange / navy / gold)
```

## Editing common things

| Change                        | Edit this                                          |
| ----------------------------- | -------------------------------------------------- |
| Phone, email, address         | `src/data/business.js`                             |
| Add a service                 | `services` array in `src/data/business.js`         |
| Add a portfolio item          | `projects` array in `src/data/business.js`         |
| Add a testimonial             | `testimonials` array in `src/data/business.js`     |
| **Estimator rates / items**   | `estimator` object in `src/data/business.js`       |
| Brand colours                 | `tailwind.config.js` → `theme.extend.colors`       |
| Site-wide meta tags           | `index.html`                                       |
| Per-page meta                 | `<SEO title=… description=…>` in each page         |
| Google Maps embed             | `business.mapsEmbedSrc` in `src/data/business.js`  |
| Site origin (used in URLs)    | `SITE_ORIGIN` in `src/data/business.js`            |

### Estimator data model

The estimator is fully driven by `src/data/business.js`. Each item declares how its
cost scales:

| `scale`   | What it multiplies by                  | UI shown                       |
| --------- | -------------------------------------- | ------------------------------ |
| `'area'`  | floor area in sqft                     | option chips                   |
| `'wall'`  | floor × `wallAreaMultiplier` (default 3) | option chips                   |
| `'point'` | user-entered count                     | option chips + `−`/`+` counter |
| `'count'` | user-entered count                     | option chips + `−`/`+` counter |

To add a new line item, push another entry into `estimator.items` — it'll show
up automatically on the page. To change rates, just edit the numbers; everything
recalculates on next render.

## Firebase setup (10 minutes)

1. Go to <https://console.firebase.google.com/> → **Add project** → call it
   `uday-leads` (or anything).
2. **Build → Firestore Database → Create database** → start in **production mode**.
3. **Project settings → Your apps → Web app (`</>`)** → register an app, copy the config.
4. Paste the config values into `.env`:

   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

5. Open **Firestore → Rules** and paste the contents of `FIREBASE_RULES.txt`.
   Click **Publish**.
6. Re-run `npm run dev` — submit the Contact form — confirm a row appears in
   Firestore → Data → `leads` collection within ~2 seconds.

## Netlify deployment (15 minutes)

1. Push the project to GitHub.
2. <https://app.netlify.com/start> → **Import from GitHub** → pick the repo.
3. Build settings auto-detect from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Site settings → Environment variables** → add the same six `VITE_FIREBASE_*` keys.
5. Trigger a deploy. First build takes ~2 min.
6. **Domain settings → Add custom domain** → enter your domain (e.g. `udayconstruction.in`).
   Netlify gives you DNS records; SSL is automatic once DNS resolves.

## Post-launch SEO checklist

- [ ] Update `SITE_ORIGIN` in `src/data/business.js` if your real domain differs from `udayconstruction.in`.
- [ ] Drop a real OG image at `public/og-cover.jpg` (1200×630).
- [ ] Submit `sitemap.xml` to <https://search.google.com/search-console>.
- [ ] Create a **Google Business Profile** — biggest local-services lead source.
- [ ] Add the same address + phone on Justdial, IndiaMART, Sulekha for citations.
- [ ] Run a Lighthouse mobile audit: target Performance > 85, SEO > 95, Accessibility > 90.

## What's intentionally NOT included (v1)

- Admin dashboard (view leads in the Firebase console for now)
- User accounts / login
- Online payments
- Blog / CMS
- Marketplace features

## License

Proprietary — all rights reserved by Uday Construction.
