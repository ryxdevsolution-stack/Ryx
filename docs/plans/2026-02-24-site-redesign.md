# RYX Full Site Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify the entire RYX website under the Ignitex design system — clean home page (landing teaser only, no duplication), all inner pages rebuilt with `ig-*` tokens + Navbar + Footer, Popsy SVG illustrations replacing missing images, full scroll animations, shared Footer component, Terms & Privacy page, and real content throughout.

**Architecture:** Single shared `Navbar` + `Footer` from `src/components/ignitex/` used on every page. Inner pages become standalone Next.js pages importing ignitex components. Home page is trimmed to a sharp landing page that teases each section and links to the full inner page. No content is duplicated between home and inner pages.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS (`ig-*` design tokens), Framer Motion 11 (`whileInView`, `AnimatePresence`), Popsy SVG illustrations (inline or `next/image` from `/public/illustrations/`), `SITE_CONFIG` from `src/lib/site-config.ts`

---

## Phase 0 — Shared Infrastructure

### Task 0.1: Extend SITE_CONFIG with team + social + legal

**Files:**
- Modify: `src/lib/site-config.ts`

**Step 1: Replace the file with extended config**

```typescript
export const SITE_CONFIG = {
  company: {
    name: "RYX Dev Solutions",
    shortName: "RYX",
    email: "ryxdevsolutions@gmail.com",
    phone: "+91 6374853277",
    whatsapp: "https://wa.me/916374853277",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    location: "Coimbatore, India",
    founded: "2023",
    tagline: "Build & Scale",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  social: {
    facebook: "https://facebook.com/ryxdev",
    linkedin: "https://linkedin.com/company/ryxdev",
    twitter: "https://x.com/ryxdev",
    instagram: "https://instagram.com/ryxdev",
    github: "https://github.com/ryxdev",
  },
  team: [
    {
      name: "Sowmiya",
      role: "Founder & CEO",
      image: "/images/team-1.jpg",
      bio: "Visionary behind RYX. Drives strategy, client relationships, and product direction.",
    },
    {
      name: "Ramesh",
      role: "Lead Developer",
      image: "/images/team-2.jpg",
      bio: "Full-stack architect. Builds scalable systems and leads technical delivery.",
    },
    {
      name: "Logesh",
      role: "Co-Founder & Developer",
      image: "/images/team-3.jpg",
      bio: "Product co-founder. Shapes UX and drives frontend excellence across all projects.",
    },
  ],
  stats: [
    { value: "15+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "3", label: "Core Team Members" },
    { value: "2023", label: "Founded" },
  ],
  technologies: [
    "Next.js", "React", "TypeScript", "Supabase",
    "React Native", "Figma", "Tailwind CSS", "Node.js",
  ],
} as const;
```

**Step 2: Verify TypeScript compiles**
Run: `npx tsc --noEmit`
Expected: no errors

**Step 3: Commit**
```bash
git add src/lib/site-config.ts
git commit -m "feat: extend SITE_CONFIG with team, social, stats, technologies"
```

---

### Task 0.2: Download & save Popsy SVG illustrations

**Files:**
- Create directory: `public/illustrations/`
- Add 6 SVG files (fetched from Popsy or crafted inline)

**Step 1: Create the illustrations directory**
```bash
mkdir -p /home/development1/Desktop/Ryx/public/illustrations
```

**Step 2: Create placeholder SVGs for each usage**

Create these files (use inline SVGs from https://popsy.co/illustrations — pick ones that fit the theme, save as `.svg`):

| File | Used in | Theme |
|------|---------|-------|
| `public/illustrations/hero.svg` | Home hero | Person building/coding |
| `public/illustrations/about.svg` | About page hero | Team collaborating |
| `public/illustrations/services.svg` | Services page | Software/devices |
| `public/illustrations/portfolio.svg` | Portfolio page | Work showcase |
| `public/illustrations/contact.svg` | Contact CTA | Person with laptop |
| `public/illustrations/empty.svg` | No results states | Empty state |

**Step 3: For each SVG, wrap in Next.js Image or inline in component**

Pattern for inline SVG:
```tsx
<div className="w-full max-w-md mx-auto">
  <Image src="/illustrations/hero.svg" alt="" width={480} height={360} className="w-full h-auto" aria-hidden />
</div>
```

**Note:** If SVGs are not available at plan execution time, use a `IllustrationPlaceholder` component:
```tsx
// src/components/ignitex/illustration-placeholder.tsx
export function IllustrationPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`bg-ig-white-5 rounded-2xl flex items-center justify-center ${className}`}>
      <span className="text-ig-text-light-muted text-sm">[ Illustration ]</span>
    </div>
  );
}
```

**Step 4: Commit**
```bash
git add public/illustrations/ src/components/ignitex/illustration-placeholder.tsx
git commit -m "feat: add illustration placeholders and directory structure"
```

---

### Task 0.3: Make Footer a proper shared component + add missing nav links

**Files:**
- Modify: `src/components/ignitex/sections/footer.tsx`
- Modify: `src/lib/site-config.ts` (already done in 0.1)

**Step 1: Update footer to pull ALL data from SITE_CONFIG**

The footer currently has `SOCIAL_LINKS` and `MAIN_LINKS` hardcoded. Replace them:
- `SOCIAL_LINKS` → derived from `SITE_CONFIG.social`
- `MAIN_LINKS` → `SITE_CONFIG.nav` + add `{ label: "Terms & Privacy", href: "/terms" }`
- Contact info → `SITE_CONFIG.company.*`
- Copyright year → `{new Date().getFullYear()}`

**Step 2: Add Terms & Privacy link to footer bottom bar**

In the bottom bar, alongside "Privacy Policy" link, add:
```tsx
<Link href="/terms" className="hover:text-white transition-colors">Terms & Privacy</Link>
```

**Step 3: Add `aria-label` to footer landmark**
```tsx
<footer aria-label="Site footer" className="relative bg-ig-dark text-white overflow-hidden">
```

**Step 4: Verify build passes**
Run: `npm run build`
Expected: ✓ 0 errors

**Step 5: Commit**
```bash
git add src/components/ignitex/sections/footer.tsx
git commit -m "feat: footer pulls all data from SITE_CONFIG, add Terms link"
```

---

## Phase 1 — Home Page Redesign (Landing Page Format)

**Principle:** Home page is a teaser. Each section shows a preview and links to the full inner page. NO duplication of full content.

**Sections to KEEP (trimmed):**
1. Navbar
2. Hero — tagline + CTA + illustration
3. AboutTeaser — 2-sentence company blurb + team names + link to /about
4. Services teaser — 4 service cards (icon + title + 1 line), link to /services
5. Portfolio teaser — 2 project cards, link to /portfolio
6. Metrics — 4 stats (animated counters, from SITE_CONFIG.stats)
7. Technologies — horizontal pill row (from SITE_CONFIG.technologies) — replaces fake client logos
8. Testimonials — keep (real social proof)
9. ContactCTA — keep (drives conversion)
10. Footer

**Sections to REMOVE from home:**
- AboutDetail (redundant)
- Full ServicesAccordion (belongs on /services)
- PortfolioGallery (belongs on /portfolio)
- ProjectShowcase (belongs on /portfolio)
- Process section (belongs on /services or /about)
- WhyUs bento (belongs on /about)
- Pricing section (move to /contact or /pricing)
- Team section (belongs on /about)
- Case studies (belongs on /portfolio)
- Blog preview (no blog page exists yet)

### Task 1.1: Create TechBadges section (replaces client logos)

**Files:**
- Create: `src/components/ignitex/sections/tech-badges.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../section-label";
import { SITE_CONFIG } from "@/lib/site-config";
import { EASE_STANDARD } from "../motion";

export function TechBadgesSection() {
  const techs = SITE_CONFIG.technologies;

  return (
    <section className="ig-section-white relative py-14 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 ig-texture opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE_STANDARD }}
        >
          <SectionLabel text="Technologies we build with" variant="light" />

          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-5 py-2.5 rounded-full border border-ig-border-light bg-white text-sm font-medium text-ig-text-muted hover:border-black hover:text-black transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: EASE_STANDARD }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <p className="text-sm text-ig-text-muted text-center max-w-xs">
            Production-grade tools trusted by teams worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add src/components/ignitex/sections/tech-badges.tsx
git commit -m "feat: TechBadgesSection replaces fake client logos with real tech stack"
```

---

### Task 1.2: Create ServicesTeaser section (home-only, 4 cards)

**Files:**
- Create: `src/components/ignitex/sections/services-teaser.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, Receipt } from "lucide-react";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";
import { EASE_STANDARD } from "../motion";

const SERVICES = [
  {
    icon: Receipt,
    title: "Billing & CRM Software",
    desc: "GST-compliant Valoryx billing — works offline, syncs to cloud.",
  },
  {
    icon: Code2,
    title: "Web Applications",
    desc: "Next.js & React apps. Fast, SEO-optimized, production-ready.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "React Native for Android & iOS. One codebase, two platforms.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Figma-first design. Clean interfaces that convert visitors.",
  },
];

export function ServicesTeaserSection() {
  return (
    <section className="ig-section-white relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 ig-texture opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel text="What we do" variant="light" />
            <motion.h2
              className="mt-5 ig-heading-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE_STANDARD }}
            >
              Services that <ScriptText>Scale</ScriptText>
            </motion.h2>
          </div>
          <PillButton label="See all services" href="/services" variant="dark" size="md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="ig-card-light p-6 flex flex-col gap-4 group hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_STANDARD }}
            >
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-white" />
              </div>
              <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
              <p className="text-sm text-ig-text-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add src/components/ignitex/sections/services-teaser.tsx
git commit -m "feat: ServicesTeaserSection - 4-card teaser linking to /services"
```

---

### Task 1.3: Create PortfolioTeaser section (home-only, 2 cards)

**Files:**
- Create: `src/components/ignitex/sections/portfolio-teaser.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "../section-label";
import { ScriptText } from "../script-text";
import { PillButton } from "../pill-button";
import { EASE_STANDARD } from "../motion";

const PROJECTS = [
  {
    title: "Valoryx",
    category: "Billing SaaS",
    description: "GST-compliant billing software for Indian retailers. Offline + cloud sync. Thermal printer support.",
    tags: ["Next.js", "Supabase", "SQLite"],
    href: "https://mj-billing.vercel.app/landing",
    external: true,
    accent: "bg-ig-dark",
  },
  {
    title: "RYX Website",
    category: "Web Development",
    description: "Company landing page with 3D particles, AI chatbot, scroll animations, and full SEO setup.",
    tags: ["Next.js", "Framer Motion", "Three.js"],
    href: "/portfolio",
    external: false,
    accent: "bg-ig-light",
  },
];

export function PortfolioTeaserSection() {
  return (
    <section className="ig-section-dark relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 ig-texture-dark" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel text="Selected work" variant="dark" />
            <motion.h2
              className="mt-5 ig-heading-1 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE_STANDARD }}
            >
              Work that <ScriptText>Speaks</ScriptText>
            </motion.h2>
          </div>
          <PillButton label="View all projects" href="/portfolio" variant="dark" size="md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              className="ig-card-dark overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_STANDARD }}
            >
              {/* Accent bar */}
              <div className={`h-1 w-full bg-ig-green`} />
              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-ig-text-light-muted mb-1">{p.category}</p>
                    <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
                  </div>
                  <Link
                    href={p.href}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-full bg-ig-white-10 hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors duration-300 flex-shrink-0"
                    aria-label={`Open ${p.title}`}
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <p className="text-sm text-ig-text-light-muted leading-relaxed mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full border border-ig-white-10 text-ig-text-light-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add src/components/ignitex/sections/portfolio-teaser.tsx
git commit -m "feat: PortfolioTeaserSection - 2 real projects, links to /portfolio"
```

---

### Task 1.4: Rewrite home page.tsx — clean landing structure

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace page.tsx with trimmed landing page**

Sections in order (all lazy-loaded except Hero):
1. `<Navbar />`
2. `<HeroSection />` — eager
3. `<ServicesTeaserSection />` — lazy
4. `<PortfolioTeaserSection />` — lazy
5. `<MetricsSection />` — lazy
6. `<TechBadgesSection />` — lazy
7. `<TestimonialsSection />` — lazy
8. `<ContactCTASection />` — lazy
9. `<Footer />` — lazy

**Step 2: Update HeroSection to include illustration**

In `src/components/ignitex/sections/hero.tsx`, add illustration to right side on desktop:
```tsx
{/* Right side — illustration (desktop only) */}
<div className="hidden lg:block lg:w-1/3 flex-shrink-0">
  <Image
    src="/illustrations/hero.svg"
    alt=""
    width={400}
    height={320}
    className="w-full h-auto opacity-80"
    aria-hidden
  />
</div>
```
Adjust the layout to `flex-row` on desktop for this.

**Step 3: Update MetricsSection to use SITE_CONFIG.stats**

In `src/components/ignitex/sections/metrics.tsx`, replace the hardcoded `METRICS` array with data from `SITE_CONFIG.stats` (importing `SITE_CONFIG`).

**Step 4: Verify build**
Run: `npm run build`
Expected: ✓ static generation passes

**Step 5: Commit**
```bash
git add src/app/page.tsx src/components/ignitex/sections/hero.tsx src/components/ignitex/sections/metrics.tsx
git commit -m "feat: home page redesigned as clean landing page, 8 sections, no duplication"
```

---

## Phase 2 — Inner Pages in Ignitex Design System

**Pattern for every inner page:**
- No `AnimatedCursor`, no `NavbarMinimal`, no `FooterMinimal`
- Import `Navbar` from `@/components/ignitex/navbar`
- Import `Footer` from `@/components/ignitex/sections/footer`
- Use `ig-section-dark`, `ig-section-white`, `ig-section-light`, `ig-card-dark`, `ig-card-light`
- All animations: `whileInView`, `viewport={{ once: true }}`, `EASE_STANDARD` easing
- All content extracted from `SITE_CONFIG` where possible

---

### Task 2.1: Rebuild /about page

**Files:**
- Modify: `src/app/about/page.tsx`

**Content to preserve from old about page:**
- Mission text: "To build software that actually solves real business problems..."
- Vision text: "To become the go-to software partner for small and medium businesses..."
- Values: Innovation First, Client Success, Agile Delivery
- Why us: Direct Developer Access, We Use Our Own Software, WhatsApp Support
- Stats from SITE_CONFIG.stats

**Content to ADD:**
- Team section with Sowmiya, Ramesh, Logesh (from SITE_CONFIG.team)
- Illustration in hero area

**Page structure:**
```
<Navbar />
<main>
  {/* Hero — dark */}
  <section ig-section-dark>
    <SectionLabel "Our story" />
    <h1>We build digital products that <ScriptText>Matter</ScriptText></h1>
    <p>Founded 2023, Coimbatore...</p>
    + Illustration right side (desktop)
  </section>

  {/* Stats row — white */}
  <section ig-section-white>
    4 stat cards from SITE_CONFIG.stats
  </section>

  {/* Mission & Vision — light */}
  <section ig-section-light>
    2-column cards: Mission | Vision
  </section>

  {/* Team — dark */}
  <section ig-section-dark>
    3 team member cards from SITE_CONFIG.team (portrait cards with name/role/bio)
  </section>

  {/* Values — white */}
  <section ig-section-white>
    3 value cards: Innovation First, Client Success, Agile Delivery
  </section>

  {/* Why us — light */}
  <section ig-section-light>
    3 cards: Direct Access, Own Software, WhatsApp Support
  </section>

  {/* CTA — dark */}
  <ContactCTASection />
</main>
<Footer />
```

**Animations:** Every `section` heading uses `whileInView + fadeInUp`. Every card uses staggered delay.

**Step 1: Remove old imports** (NavbarMinimal, FooterMinimal, AnimatedCursor)

**Step 2: Add new imports** (Navbar, Footer, SectionLabel, ScriptText, PillButton, SITE_CONFIG, EASE_STANDARD)

**Step 3: Write all sections following the structure above**

**Step 4: Verify `npm run build`**

**Step 5: Commit**
```bash
git add src/app/about/page.tsx
git commit -m "feat: /about page rebuilt in Ignitex design system with real team data"
```

---

### Task 2.2: Rebuild /services page

**Files:**
- Modify: `src/app/services/page.tsx`

**Content to preserve from old services page:**
- All 6 service definitions: Billing, Websites, Mobile, UI/UX, CRM, SEO (keep descriptions and feature lists)
- Process steps 1-6
- Stats section

**Content to REMOVE:**
- ParticleMorph Three.js background (performance killer, replace with subtle gradient)
- AnimatedCursor, NavbarMinimal, FooterMinimal
- react-parallax-tilt (replace with Framer Motion whileHover)
- Sticky particle canvas (remove entirely)

**Page structure:**
```
<Navbar />
<main>
  {/* Hero — dark */}
  <section ig-section-dark>
    <SectionLabel "What we build" />
    <h1>Solutions that <ScriptText>Transform</ScriptText> Business</h1>
    <p>From billing software to custom CRMs...</p>
  </section>

  {/* Services grid — white, 2 columns */}
  <section ig-section-white>
    6 service cards (ig-card-light, icon + title + description + feature list)
    Each card: whileInView staggered, whileHover y:-4
  </section>

  {/* Process — light, numbered steps */}
  <section ig-section-light>
    <SectionLabel "How we work" />
    <h2>Our <ScriptText>Process</ScriptText></h2>
    6 steps in 2-row grid: icon + step number + title + description
  </section>

  {/* Stats — dark */}
  <section ig-section-dark>
    4 stats from SITE_CONFIG.stats
  </section>

  {/* CTA — white */}
  <ContactCTASection />
</main>
<Footer />
```

**Step 1: Remove ParticleMorph import + all blob divs + AnimatedCursor + NavbarMinimal + FooterMinimal + Tilt**

**Step 2: Add Navbar + Footer imports**

**Step 3: Rewrite sections using ig-* classes + Framer Motion whileInView**

**Step 4: Replace `whileHover={{ y: -10 }}` on cards (keep it but use -4 for subtlety)**

**Step 5: Verify `npm run build`**

**Step 6: Commit**
```bash
git add src/app/services/page.tsx
git commit -m "feat: /services page rebuilt in Ignitex system, remove Three.js, add scroll animations"
```

---

### Task 2.3: Rebuild /portfolio page

**Files:**
- Modify: `src/app/portfolio/page.tsx`

**Content to preserve:**
- Valoryx project (real, with live link)
- RYX Landing Page project (real)
- Project descriptions and tech tags

**Content to REMOVE:**
- AnimatedCursor, NavbarMinimal, FooterMinimal, Tilt, useSpring, useMotionValue
- Floating particle dots (randomly placed `motion.div` elements — remove entirely)
- mouseX/mouseY effect (remove)
- Play button overlay (nothing to play)

**Content to ADD:**
- "More projects coming soon" card with muted styling

**Page structure:**
```
<Navbar />
<main>
  {/* Hero — dark */}
  <section ig-section-dark>
    <SectionLabel "Our work" />
    <h1>Real Projects, <ScriptText>Real Results</ScriptText></h1>
    <p>Projects we've actually built and shipped — no stock images, no fake metrics</p>
    Stats row: 5+ projects | 1 Live SaaS | 10+ Technologies
  </section>

  {/* Projects — white, 2-column */}
  <section ig-section-white>
    Project cards: large, with tech tags, description, live link button
    "More projects coming soon" muted card
  </section>

  {/* CTA — dark */}
  <ContactCTASection />
</main>
<Footer />
```

**Step 1: Strip all old imports, add Navbar + Footer**

**Step 2: Write hero + project cards using ig-card-light with whileInView**

**Step 3: Each project card structure:**
```tsx
<motion.div key={p.id} className="ig-card-light overflow-hidden group" whileHover={{ y: -4 }}>
  {/* Colored accent top bar */}
  <div className={`h-1.5 w-full`} style={{ background: "linear-gradient(90deg, #16DD47, #05080C)" }} />
  <div className="p-8">
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs text-ig-text-muted">{p.category}</span>
      <a href={p.link} className="..." aria-label="Open project">
        <ArrowUpRight size={16} />
      </a>
    </div>
    <h3 className="ig-heading-3 mb-3">{p.title}</h3>
    <p className="ig-body mb-6">{p.description}</p>
    <div className="flex flex-wrap gap-2">
      {p.technologies.map(tag => <span className="tech-pill">{tag}</span>)}
    </div>
  </div>
</motion.div>
```

**Step 4: Verify `npm run build`**

**Step 5: Commit**
```bash
git add src/app/portfolio/page.tsx
git commit -m "feat: /portfolio rebuilt in Ignitex system, real projects, clean cards"
```

---

### Task 2.4: Update /contact page to use Ignitex navbar/footer

**Files:**
- Modify: `src/app/contact/page.tsx`

**IMPORTANT:** The contact page has excellent content and a fully wired form. Do NOT rewrite it. Only:
1. Remove `AnimatedCursor`, `NavbarMinimal`, `FooterMinimal`
2. Add `Navbar` + `Footer`
3. Replace the gradient blobs with `ig-section-dark` / `ig-section-white` background classes
4. Re-style form inputs from `bg-gray-50 border-gray-200 focus:border-violet-400` → `bg-ig-white-5 border border-ig-white-10 text-white focus:border-white/30` (since contact page can be dark-themed)
5. Keep ALL form logic, RAVEN integration, and submit handler unchanged
6. Keep WhatsApp/email/phone links in the bottom CTA

**Step 1: Swap navbar/footer only**

**Step 2: Restyle the hero section using ig-section-dark**

**Step 3: Restyle the form section using ig-section-white or ig-section-dark**

**Step 4: Verify form still submits correctly to /api/contact**
Test: Open browser, fill form, submit, check network tab for POST /api/contact

**Step 5: Commit**
```bash
git add src/app/contact/page.tsx
git commit -m "feat: /contact page uses Ignitex navbar/footer, form logic preserved"
```

---

## Phase 3 — New Pages

### Task 3.1: Create /terms page

**Files:**
- Create: `src/app/terms/page.tsx`

**Content:** Standard Terms of Service + Privacy Policy for a software development agency in India.

**Page structure:**
```
<Navbar />
<main>
  {/* Hero — dark */}
  <section ig-section-dark>
    <SectionLabel "Legal" />
    <h1>Terms & <ScriptText>Privacy</ScriptText></h1>
    <p>Last updated: {CURRENT_DATE}</p>
  </section>

  {/* Content — white, prose */}
  <section ig-section-white>
    <div className="max-w-3xl mx-auto prose">
      <h2>Terms of Service</h2>
      [7 standard sections]

      <h2>Privacy Policy</h2>
      [6 standard sections]
    </div>
  </section>
</main>
<Footer />
```

**Terms of Service sections:**
1. Agreement to Terms
2. Services Provided
3. Payment Terms
4. Intellectual Property
5. Limitation of Liability
6. Governing Law (India, Tamil Nadu courts)
7. Contact

**Privacy Policy sections:**
1. Information We Collect
2. How We Use Your Data
3. Data Storage & Security
4. Third-Party Services
5. Your Rights
6. Contact

**Step 1: Write the page**

**Step 2: Add to sitemap.ts**

In `src/app/sitemap.ts`, add:
```ts
{ url: `${baseUrl}/terms`, lastModified: new Date() },
```

**Step 3: Verify build**

**Step 4: Commit**
```bash
git add src/app/terms/page.tsx src/app/sitemap.ts
git commit -m "feat: /terms page with Terms of Service and Privacy Policy"
```

---

## Phase 4 — Scroll Animation Polish

### Task 4.1: Add page-entry animations to all inner pages

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/portfolio/page.tsx`
- Modify: `src/app/contact/page.tsx`

**Pattern:** Every page hero section gets `animate` (not `whileInView`) for the initial entry:
```tsx
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: EASE_STANDARD }}
>
```

Every below-fold section gets `whileInView`:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: EASE_STANDARD }}
>
```

**Stagger pattern for cards:**
```tsx
{items.map((item, i) => (
  <motion.div
    key={item.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_STANDARD }}
  >
```

**Step 1: Audit each rebuilt page and add missing entry animations to hero headings**

**Step 2: Ensure every card grid has staggered delay**

**Step 3: Verify Lenis smooth scroll still works** (it's in `SmoothScrollProvider` if present, or Lenis is initialized in layout — check `src/app/layout.tsx`)

**Step 4: Commit**
```bash
git commit -m "feat: page-entry and whileInView scroll animations on all inner pages"
```

---

### Task 4.2: Add scroll progress indicator to long pages

**Files:**
- Create: `src/components/ignitex/scroll-progress.tsx`

**Step 1: Write the component**
```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-ig-green origin-left z-[200]"
      style={{ scaleX }}
    />
  );
}
```

**Step 2: Add to about, services, portfolio pages only** (not home — it already has navbar)

**Step 3: Commit**
```bash
git add src/components/ignitex/scroll-progress.tsx
git commit -m "feat: ScrollProgress bar on long inner pages"
```

---

## Phase 5 — Final Polish & Verification

### Task 5.1: Update Navbar to highlight active page

**Files:**
- Modify: `src/components/ignitex/navbar.tsx`

**Step 1: Add `usePathname` from `next/navigation`**

```tsx
import { usePathname } from "next/navigation";
// ...
const pathname = usePathname();
// In the nav links:
className={`... ${pathname === link.href ? "text-white" : "text-white/40"} hover:text-white`}
```

**Step 2: Commit**
```bash
git add src/components/ignitex/navbar.tsx
git commit -m "feat: navbar highlights active page based on route"
```

---

### Task 5.2: Wire ContactCTA form to /api/contact

**Files:**
- Modify: `src/components/ignitex/sections/contact-cta.tsx`

**Step 1: Replace the TODO in handleSubmit with a real fetch call**
```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    if (result.success) {
      setSubmitStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setSubmitStatus("error");
    }
  } catch {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus("idle"), 5000);
  }
};
```

**Step 2: Add `isSubmitting` and `submitStatus` state**

**Step 3: Add success/error feedback UI below the submit button**

**Step 4: Commit**
```bash
git add src/components/ignitex/sections/contact-cta.tsx
git commit -m "feat: ContactCTA form wired to /api/contact with success/error feedback"
```

---

### Task 5.3: Final build verification

**Step 1: Run full build**
```bash
npm run build
```
Expected: All 15+ routes generate successfully, 0 TypeScript errors

**Step 2: Run dev server and manually check**
```bash
npm run dev
```
Check:
- [ ] Home page: 8 sections, no duplication, Lenis scroll smooth
- [ ] /about: Ignitex navbar + footer, team section, animations
- [ ] /services: 6 service cards, 6 process steps, no Three.js
- [ ] /portfolio: 2 real projects, "coming soon" card
- [ ] /contact: form works, RAVEN fills, submits to /api/contact
- [ ] /terms: renders with proper typography
- [ ] Footer: Terms link present, copyright year dynamic
- [ ] Navbar: active page highlighted

**Step 3: Final commit**
```bash
git add -A
git commit -m "chore: final site redesign complete — Ignitex UI, real content, scroll animations"
```

---

## Summary of Files Changed

| File | Action |
|------|--------|
| `src/lib/site-config.ts` | Extend with team, social, stats, technologies |
| `src/app/page.tsx` | Rewrite — 8-section landing page |
| `src/app/about/page.tsx` | Rewrite — Ignitex design |
| `src/app/services/page.tsx` | Rewrite — Ignitex design, remove Three.js |
| `src/app/portfolio/page.tsx` | Rewrite — Ignitex design, remove Tilt |
| `src/app/contact/page.tsx` | Update navbar/footer only, preserve form |
| `src/app/terms/page.tsx` | Create — new page |
| `src/app/sitemap.ts` | Add /terms |
| `src/components/ignitex/sections/tech-badges.tsx` | Create |
| `src/components/ignitex/sections/services-teaser.tsx` | Create |
| `src/components/ignitex/sections/portfolio-teaser.tsx` | Create |
| `src/components/ignitex/sections/footer.tsx` | Update — SITE_CONFIG, Terms link |
| `src/components/ignitex/sections/contact-cta.tsx` | Wire form to /api/contact |
| `src/components/ignitex/sections/metrics.tsx` | Use SITE_CONFIG.stats |
| `src/components/ignitex/sections/hero.tsx` | Add illustration slot |
| `src/components/ignitex/navbar.tsx` | Active page highlighting |
| `src/components/ignitex/scroll-progress.tsx` | Create |
| `src/components/ignitex/illustration-placeholder.tsx` | Create |
| `public/illustrations/` | Create directory + SVGs |
| `docs/plans/2026-02-24-site-redesign.md` | This plan |
