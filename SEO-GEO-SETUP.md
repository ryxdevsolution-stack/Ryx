# RYX Tech — SEO, GEO & Analytics Setup Guide

> Reference for all SEO/GEO optimizations on ryxtech.in (Next.js App Router).
> Last updated: 2026-03-11

---

## Table of Contents

1. [Meta Tags — All Pages](#1-meta-tags--all-pages)
2. [Keywords Strategy](#2-keywords-strategy)
3. [Canonical Tags](#3-canonical-tags)
4. [Robots Meta](#4-robots-meta)
5. [Open Graph & Twitter Cards](#5-open-graph--twitter-cards)
6. [JSON-LD Structured Data](#6-json-ld-structured-data)
7. [GEO — Generative Engine Optimization](#7-geo--generative-engine-optimization)
8. [robots.txt](#8-robotstxt)
9. [sitemap.xml](#9-sitemapxml)
10. [Analytics](#10-analytics)
11. [Google Search Console (GSC)](#11-google-search-console-gsc)
12. [Performance Optimizations](#12-performance-optimizations)
13. [Action Items — Still Needed](#13-action-items--still-needed)

---

## 1. Meta Tags — All Pages

In Next.js App Router, meta tags are defined via the `metadata` export in each `page.tsx`.

### Page-by-Page Meta Summary

| Page | File | Title | Canonical | Robots |
|------|------|-------|-----------|--------|
| Homepage | `src/app/page.tsx` | RYX Tech — Software Company in Coimbatore | ✅ | index, follow |
| Services | `src/app/services/page.tsx` | Services — Web Apps, Billing Software & Websites | ✅ | index, follow |
| Portfolio | `src/app/portfolio/page.tsx` | Portfolio — Projects by RYX Tech | ✅ | index, follow |
| Blog | `src/app/blog/page.tsx` | Blog — Web Development & Business Insights | ✅ | index, follow |
| About | `src/app/about/page.tsx` | About Us — Software Team in Coimbatore | ✅ | index, follow |
| Contact | `src/app/contact/page.tsx` | Contact RYX Tech | ✅ | index, follow |
| Terms | `src/app/terms/page.tsx` | Terms & Conditions | ✅ | index, follow |
| Blog posts | `src/app/blog/[slug]/page.tsx` | Dynamic — `{post.title} \| RYX Tech Blog` | ✅ (dynamic) | index, follow |

Global defaults are in `src/app/layout.tsx` via the root `metadata` export.

---

## 2. Keywords Strategy

### Homepage (layout.tsx + page.tsx) — Primary Keywords

```
Product:
- billing software india, GST billing software, GST invoicing app
- offline billing software, Valoryx billing, invoice software coimbatore

Services:
- web development coimbatore, website design coimbatore
- custom software development india, full-stack web applications
- flask python web development, react developer coimbatore
- next.js development company india, supabase developer india
- UI UX design coimbatore

Geo:
- software company coimbatore, IT company coimbatore
- web developer coimbatore, app developer tamil nadu
- software development tamil nadu, tech startup coimbatore
```

---

## 3. Canonical Tags

Handled via `alternates.canonical` in each page's `metadata` export.

| Page | Canonical URL |
|------|--------------|
| Homepage | `https://ryxtech.in` |
| Services | `https://ryxtech.in/services` |
| Portfolio | `https://ryxtech.in/portfolio` |
| Blog | `https://ryxtech.in/blog` |
| About | `https://ryxtech.in/about` |
| Contact | `https://ryxtech.in/contact` |
| Terms | `https://ryxtech.in/terms` |
| Blog posts | `https://ryxtech.in/blog/{slug}` (dynamic) |

---

## 4. Robots Meta

Set globally in `layout.tsx`:

```ts
robots: {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
}
```

---

## 5. Open Graph & Twitter Cards

Set in `layout.tsx` (global) and overridden per page:

- OG image: `/og-image.jpg` (1200×630px) — ✅ exists at `public/og-image.jpg`
- Twitter card: `summary_large_image`
- Twitter handle: `@ryxdev`
- OG locale: `en_IN`

---

## 6. JSON-LD Structured Data

### layout.tsx — Global Schemas (all pages)

| Schema | Purpose |
|--------|---------|
| `LocalBusiness` + `ProfessionalService` | Local search — address, geo, contact, services |
| `Organization` | Brand identity — name, logo, sameAs social links |
| `WebSite` | Enables Google Sitelinks search box |

### Homepage (page.tsx)

| Schema | Purpose |
|--------|---------|
| `WebPage` + `speakable` | Marks h1, hero subtitle, service cards for AI Overviews |
| `about` + `mentions` | Entity linking — Valoryx, Coimbatore |

### Services page (services/page.tsx)

| Schema | Purpose |
|--------|---------|
| `FAQPage` | FAQ answers in Google search results |

### Blog post pages (blog/[slug]/page.tsx)

| Schema | Purpose |
|--------|---------|
| `Article` | Full article schema with author, publisher, wordCount |

### Key Organization sameAs URLs

```json
"sameAs": [
  "https://github.com/ryxdevsolution-stack",
  "https://instagram.com/ryxdev",
  "https://linkedin.com/company/ryxdev",
  "https://x.com/ryxdev"
]
```

> **ACTION NEEDED**: Confirm these social URLs are correct.

---

## 7. GEO — Generative Engine Optimization

GEO = Optimizing for AI search: **Google AI Overviews, ChatGPT Search, Perplexity AI, Microsoft Copilot**.

### What's Done

#### A. `llms.txt` ✅

File at `public/llms.txt` → served at `https://ryxtech.in/llms.txt`

Tells GPTBot, ClaudeBot, PerplexityBot:
- Who RYX Tech is and what we build
- Which pages to index
- Key facts: team size, pricing, location, contact

#### B. `speakable` JSON-LD ✅

Added to homepage (`src/app/page.tsx`):

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-subtitle", ".service-card h3", ".faq-question"]
  }
}
```

Google uses this to choose which sections to quote in AI Overviews and read in voice search.

#### C. `FAQPage` Schema ✅

On services page — directly answers common questions; pulled verbatim by AI Overviews.

#### D. `Article` Schema ✅

On all blog posts — one of the most-cited content types by AI engines.

#### E. `about` + `mentions` in WebPage ✅

Entity linking on homepage — helps AI understand what the page is about.

### GEO Checklist

- [x] `llms.txt` created
- [x] `speakable` JSON-LD added (homepage)
- [x] `FAQPage` schema (services page)
- [x] `Article` schema (all blog posts)
- [x] `Organization sameAs` social links
- [x] `LocalBusiness` with `hasOfferCatalog`
- [x] `about` + `mentions` in WebPage schema
- [ ] Submit to Google AI via GSC after verification

---

## 8. robots.txt

Auto-generated by Next.js from `src/app/robots.ts`.
Served at `https://ryxtech.in/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Sitemap: https://ryxtech.in/sitemap.xml
```

---

## 9. sitemap.xml

Auto-generated by Next.js from `src/app/sitemap.ts`.
Served at `https://ryxtech.in/sitemap.xml`

Includes all static pages + dynamically all blog post slugs from `getAllPostSlugs()`.

### Priority Structure

| Priority | Pages |
|----------|-------|
| 1.0 | `/` (homepage) |
| 0.8 | `/services`, `/blog` |
| 0.7 | `/portfolio`, `/contact` |
| 0.6 | `/about`, `/blog/{slug}` |
| 0.3 | `/terms` |

> Blog posts are auto-added — no manual update needed when new posts are published.

---

## 10. Analytics

### Vercel Analytics ✅

`<Analytics />` from `@vercel/analytics/react` — added in `layout.tsx`.
Tracks page views, Web Vitals, geographic data.
Dashboard: vercel.com/[your-team]/[project]/analytics

### GA4

Not set up. Vercel Analytics may be sufficient.

> **OPTIONAL**: If GA4 is needed, add `G-XXXXXXXXXX` snippet to `layout.tsx`
> and replace with real Measurement ID from analytics.google.com.

---

## 11. Google Search Console (GSC)

### Current Status

Placeholder token added to `layout.tsx`:

```ts
verification: {
  google: "REPLACE_WITH_GSC_VERIFICATION_TOKEN",
}
```

Next.js automatically renders this as:
```html
<meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_TOKEN" />
```

### ACTION NEEDED — Complete GSC Setup

**Step 1**: Go to [search.google.com/search-console](https://search.google.com/search-console)

**Step 2**: Add Property → URL prefix → `https://ryxtech.in`

**Step 3**: Choose **HTML tag** verification method

**Step 4**: Copy the `content="..."` value

**Step 5**: In `src/app/layout.tsx`, replace `REPLACE_WITH_GSC_VERIFICATION_TOKEN` with your real token

**Step 6**: Deploy → click **Verify** in GSC

**Step 7**: Sitemaps section → submit `sitemap.xml`

### After Verification
1. Request indexing for homepage, services, blog, portfolio
2. Check Coverage report after 48h
3. Monitor Performance report weekly for keyword opportunities

---

## 12. Performance Optimizations

### Next.js Built-in
- Image optimization via `next/image` (WebP, lazy loading, srcset)
- Font optimization via `next/font` (Geist — `display: swap`, preloaded)
- Route-based code splitting (automatic)
- Dynamic imports for below-fold sections (`dynamic()` with loading fallbacks)

### Specific Optimizations in Codebase
- All below-fold sections lazy-loaded with skeleton placeholders
- Vercel Edge Network CDN
- `revalidate = 3600` on portfolio page (ISR — hourly GitHub data refresh)

---

## 13. Action Items — Still Needed

| Priority | Task | Where |
|----------|------|--------|
| 🔴 HIGH | Replace `REPLACE_WITH_GSC_VERIFICATION_TOKEN` with real GSC token | `src/app/layout.tsx` |
| 🔴 HIGH | Submit sitemap in GSC after verification | GSC dashboard |
| 🟡 MEDIUM | Verify social media `sameAs` URLs are correct (2 different sets in layout.tsx) | `src/app/layout.tsx` lines ~178 and ~215 |
| 🟡 MEDIUM | Update `.cssSelector` in speakable schema to match actual class names used in hero | `src/app/page.tsx` |
| 🟢 LOW | Set up GA4 if Vercel Analytics is insufficient | `src/app/layout.tsx` |
| 🟢 LOW | Add `HowTo` schema to services page (step-by-step process) | `src/app/services/page.tsx` |
| 🟢 LOW | Add `FAQPage` schema to homepage | `src/app/page.tsx` |

---

## Quick Reference — SEO Files

| File | Type | Purpose |
|------|------|---------|
| `src/app/layout.tsx` | Modified | Global metadata, OG, GSC verification, JSON-LD (LocalBusiness + Org + WebSite) |
| `src/app/page.tsx` | Modified | Homepage metadata + speakable JSON-LD |
| `src/app/services/page.tsx` | Exists | Services metadata + FAQPage JSON-LD |
| `src/app/blog/[slug]/page.tsx` | Exists | Dynamic metadata + Article JSON-LD |
| `src/app/robots.ts` | Exists | Auto-generates robots.txt |
| `src/app/sitemap.ts` | Exists | Auto-generates sitemap.xml with all blog slugs |
| `public/llms.txt` | Created | AI crawler guide (GEO) |
| `public/og-image.jpg` | Exists | Social share image (1200×630px) |

---

*Document maintained by: Claude Code*
*Project: RYX Tech Website (ryxtech.in)*
*Location: /home/development1/Desktop/Ryx/*
