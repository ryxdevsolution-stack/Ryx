# RYX Content Cleanup — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all fake/placeholder content across the RYX website with real business data from Landing_Page_Action_Plan.md

**Architecture:** Content-only changes — no structural or design changes. Each task modifies one file's content data (arrays, objects, strings). Existing animations, layouts, and components remain untouched.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS

---

### Task 1: Update SEO Metadata & Structured Data

**Files:**
- Modify: `src/app/layout.tsx:18-113`

**Step 1: Replace metadata object (lines 18-67)**

Replace the entire `metadata` export with:

```typescript
export const metadata: Metadata = {
  title: {
    default: "RYX — Billing Software, Web Development & Custom CRM Solutions | Coimbatore",
    template: "%s | RYX"
  },
  description: "RYX builds Valoryx — a GST-compliant billing software that works offline and online. We also develop websites, mobile apps, and custom CRMs for businesses in India and worldwide. Based in Coimbatore.",
  keywords: ["billing software india", "GST billing software", "offline billing app", "invoice software", "web development coimbatore", "custom CRM development", "react native app development", "supabase developer", "next.js development company"],
  authors: [{ name: "RYX" }],
  creator: "RYX",
  metadataBase: new URL("https://ryx.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryx.dev",
    siteName: "RYX",
    title: "RYX — Billing Software, Websites & Custom CRM Solutions",
    description: "We build Valoryx — GST-compliant billing that works offline. Plus websites, apps, and CRMs for businesses in India and globally.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RYX — Billing Software, Websites & Custom CRM Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RYX — Billing Software & Web Development",
    description: "GST-compliant billing software + custom web & app development. Based in Coimbatore, serving globally.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

Key changes:
- Removed `verification.google` (was fake)
- Updated all titles, descriptions, keywords to real RYX content
- Changed author from "RYX Team" to "RYX"

**Step 2: Replace structuredData object (lines 75-113)**

Replace the entire `structuredData` const with:

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RYX",
  "url": "https://ryx.dev",
  "logo": "https://ryx.dev/RYX_Logo.png",
  "description": "RYX builds Valoryx — a GST-compliant billing software — and develops websites, mobile apps, and custom CRM solutions for businesses in India and worldwide.",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Coimbatore",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-6374853277",
    "contactType": "Customer Service",
    "email": "ryxdevsolutions@gmail.com"
  },
  "areaServed": ["India", "Worldwide"],
  "serviceType": [
    "Billing Software Development",
    "Web Application Development",
    "Mobile App Development",
    "Custom CRM Development",
    "UI/UX Design",
    "SEO Services"
  ]
};
```

Key changes:
- Removed `sameAs` (fake social links)
- Removed `aggregateRating` (no real reviews)
- Updated address to Coimbatore, Tamil Nadu, India
- Updated contact info to real email/phone
- Updated serviceType to real services

**Step 3: Verify build compiles**

Run: `cd /home/development1/Desktop/Ryx && npx next build 2>&1 | head -30`
Expected: No TypeScript errors in layout.tsx

**Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix: replace fake SEO metadata and structured data with real RYX content"
```

---

### Task 2: Update Hero Section

**Files:**
- Modify: `src/components/sections/hero-3d.tsx:49-107`

**Step 1: Replace badge text (line 57)**

Change:
```
<span className="text-sm sm:text-base font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Welcome to RYX</span>
```
To:
```
<span className="text-sm sm:text-base font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Built in Coimbatore, Serving Globally</span>
```

**Step 2: Replace H1 heading (lines 67-71)**

Change:
```tsx
<span className="inline-block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
  Transform Ideas
</span>
<br />
<span className="text-gray-900 drop-shadow-sm">Into Reality</span>
```
To:
```tsx
<span className="inline-block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
  We Build Software
</span>
<br />
<span className="text-gray-900 drop-shadow-sm">That Actually Solves Your Business Problems</span>
```

**Step 3: Replace description (lines 80-83)**

Change:
```tsx
Build production-ready SaaS, manage databases, and deploy AI solutions
<span className="block mt-2 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-semibold">Deploy in days, not months</span>
```
To:
```tsx
From GST-compliant billing software to custom CRMs and web apps — we don&apos;t just write code, we build tools that run your business smoother.
<span className="block mt-2 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-semibold">Offline or online, your workflow never stops.</span>
```

**Step 4: Replace CTA buttons (lines 92-106)**

Replace the primary CTA Link:
```tsx
<a
  href="https://wa.me/916374853277"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-base sm:text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-300/50 transition-all duration-300 hover:scale-105 overflow-hidden"
>
  <span className="relative z-10">Talk to Us on WhatsApp</span>
  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</a>
```

Replace the secondary CTA Link:
```tsx
<a
  href="https://mj-billing.vercel.app/landing"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-white backdrop-blur-xl border-2 border-violet-200 text-gray-900 text-base sm:text-lg font-bold rounded-2xl hover:bg-violet-50 hover:border-violet-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
>
  Try Valoryx Free
  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 group-hover:text-pink-600 transition-colors" />
</a>
```

**Step 5: Add trust line after CTA buttons**

After the CTA motion.div closing tag (after line 107), add:
```tsx
{/* Trust Line */}
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.7 }}
  className="mt-6 text-sm text-gray-500 font-medium"
>
  No credit card needed &bull; 14-day free trial &bull; Made in India
</motion.p>
```

**Step 6: Remove unused Link import**

The `Link` import from `next/link` is no longer used (CTAs are now `<a>` tags). Remove the import line.

**Step 7: Commit**

```bash
git add src/components/sections/hero-3d.tsx
git commit -m "fix: update hero section with real RYX content, WhatsApp CTA, and trust line"
```

---

### Task 3: Update Services Cards (Home Page)

**Files:**
- Modify: `src/components/sections/services-simple.tsx:22-65`

**Step 1: Replace the services array**

Replace lines 22-65 with:
```typescript
const services = [
  {
    icon: Code,
    title: "Billing & Invoicing Software",
    description: "Valoryx — our GST-compliant billing software that works offline with SQLite and syncs to cloud via Supabase.",
    features: ["GST billing with CGST, SGST, IGST", "Real-time inventory with low-stock alerts", "Offline mode with auto-sync"],
    gradient: "from-violet-600 to-purple-600"
  },
  {
    icon: Globe,
    title: "Websites & Web Applications",
    description: "Fast, SEO-optimized websites and web apps built with Next.js and React. Production-ready from day one.",
    features: ["Next.js / React development", "Mobile-responsive design", "SEO-optimized structure"],
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform Android and iOS apps built with React Native. One codebase, two platforms.",
    features: ["React Native for Android & iOS", "Push notifications & real-time updates", "App Store & Play Store deployment"],
    gradient: "from-pink-600 to-rose-600"
  },
  {
    icon: Database,
    title: "CRM & Custom Business Software",
    description: "Custom CRMs, ERPs, and internal tools tailored to how your business actually works.",
    features: ["Role-based access with audit logging", "Custom dashboards and analytics", "Multi-tenant SaaS architecture"],
    gradient: "from-orange-600 to-amber-600"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean, functional designs that your users can navigate without a manual.",
    features: ["Figma-based design workflow", "Mobile-first responsive layouts", "Conversion-focused UI patterns"],
    gradient: "from-green-600 to-teal-600"
  },
  {
    icon: Cpu,
    title: "SEO & Digital Presence",
    description: "We structure every website for Google from the ground up — proper meta tags, structured data, and fast loading.",
    features: ["On-page SEO setup", "Core Web Vitals optimization", "Structured data / Schema markup"],
    gradient: "from-indigo-600 to-purple-600"
  }
]
```

Note: Icon for "SEO & Digital Presence" uses `Cpu` (closest available icon). The icon for "CRM" uses `Database`. The `Globe` icon is used for "Websites".

**Step 2: Update section subtitle (line 188)**

Change:
```
Transform your business with cutting-edge digital solutions
```
To:
```
From billing software to custom CRMs — solutions built for real businesses
```

**Step 3: Commit**

```bash
git add src/components/sections/services-simple.tsx
git commit -m "fix: replace generic service cards with real RYX service offerings"
```

---

### Task 4: Update Portfolio Cards (Home Page)

**Files:**
- Modify: `src/components/sections/portfolio-simple.tsx:1-162`

**Step 1: Replace the projects array (lines 8-57)**

Replace with:
```typescript
const projects = [
  {
    title: "Valoryx — GST Billing Software",
    category: "Full Stack Product",
    description: "A complete billing and inventory management system for Indian retail businesses. Works offline with SQLite, syncs to cloud via Supabase.",
    gradient: "from-violet-600 to-purple-600",
    tech: ["Next.js", "Supabase", "SQLite", "Tailwind CSS"],
    link: "https://mj-billing.vercel.app/landing"
  },
  {
    title: "RYX — Company Landing Page",
    category: "Web Development",
    description: "A modern, animated landing page built with Next.js showcasing services, portfolio, and contact information.",
    gradient: "from-pink-600 to-rose-600",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
    link: "/"
  }
]
```

**Step 2: Remove unused imports**

Remove `Image` from 'next/image' import and `Eye`, `Heart` from lucide-react (no longer needed since we're removing stats and Unsplash images).

**Step 3: Rewrite the project card JSX**

Replace the card rendering section. Remove the Image component and fake stats. Use a gradient background instead of an image:

```tsx
{projects.map((project, index) => (
  <motion.div
    key={project.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-200/50 transition-all border border-violet-100"
  >
    {/* Gradient Header */}
    <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
      <span className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-black/30 backdrop-blur text-white text-[10px] sm:text-xs font-semibold rounded-full">
        {project.category}
      </span>
      <span className="text-white/90 text-3xl sm:text-4xl font-bold">
        {project.title.split("—")[0].trim()}
      </span>
    </div>

    {/* Content */}
    <div className="p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm mb-3">{project.description}</p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-violet-50 text-violet-700 text-[10px] sm:text-xs font-medium rounded-full border border-violet-100">
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        target={project.link.startsWith("http") ? "_blank" : undefined}
        rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-1 text-violet-600 hover:text-pink-600 transition-colors text-sm font-semibold"
      >
        View Project
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
))}
```

**Step 4: Update grid to 2 columns max (only 2 projects)**

Change:
```
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
```
To:
```
className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto"
```

**Step 5: Update section header subtitle**

Change "Showcasing our best work across various industries" to "Real projects we've built and shipped"

**Step 6: Commit**

```bash
git add src/components/sections/portfolio-simple.tsx
git commit -m "fix: replace fake portfolio projects with real Valoryx and RYX website"
```

---

### Task 5: Update About Page

**Files:**
- Modify: `src/app/about/page.tsx:1-268`

**Step 1: Remove unused imports (lines 6-8)**

Remove these imports (we're removing TeamAnimated, TestimonialsAnimated, JourneyTimeline):
```typescript
import { TeamAnimated } from "@/components/sections/team-animated"
import { TestimonialsAnimated } from "@/components/sections/testimonials-animated"
import { JourneyTimeline } from "@/components/sections/journey-timeline"
```

Add `MessageSquare` to lucide-react imports (for WhatsApp icon in stats):
```typescript
import { Target, Heart, Rocket, Award, Users, TrendingUp, ArrowRight, Sparkles, MessageSquare, Code, Shield } from "lucide-react"
```

**Step 2: Replace stats array (lines 12-17)**

```typescript
const stats = [
  { icon: Rocket, value: "5+", label: "Projects Delivered", gradient: "from-violet-500 to-purple-600" },
  { icon: Code, value: "1", label: "Live SaaS Product", gradient: "from-blue-500 to-cyan-500" },
  { icon: TrendingUp, value: "10+", label: "Technologies We Use", gradient: "from-pink-500 to-rose-500" },
  { icon: MessageSquare, value: "WhatsApp", label: "Direct Founder Support", gradient: "from-emerald-500 to-teal-500" },
]
```

**Step 3: Update hero description (line 77-79)**

Change:
```
Founded in 2023, RYX is a passionate team of innovators dedicated to delivering exceptional digital solutions that drive business growth.
```
To:
```
Founded in 2023, RYX is a software development company based in Coimbatore, India. We build billing software, websites, mobile apps, and custom CRMs for businesses locally and globally.
```

**Step 4: Update Mission text (lines 144-148)**

Change to:
```
To build software that actually solves real business problems — not just flashy demos, but tools that business owners use every day. We started with Valoryx because we needed better billing software ourselves.
```

**Step 5: Update Vision text (lines 162-165)**

Change to:
```
To become the go-to software partner for small and medium businesses in India and worldwide. We want every business owner to have access to the same quality tools that large enterprises use, at a price they can afford.
```

**Step 6: Remove TeamAnimated, JourneyTimeline, TestimonialsAnimated sections (lines 216-223)**

Replace:
```tsx
{/* ━━━━ JOURNEY TIMELINE ━━━━ */}
<JourneyTimeline />

{/* ━━━━ TEAM ━━━━ */}
<TeamAnimated />

{/* ━━━━ TESTIMONIALS ━━━━ */}
<TestimonialsAnimated />
```

With the "Why Choose Us" section:
```tsx
{/* ━━━━ WHY CHOOSE US ━━━━ */}
<section className="py-24 md:py-32 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6 md:px-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 mb-4">
        Why Us
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Businesses Choose Us
      </h2>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          icon: Users,
          title: "Direct Developer Access",
          description: "We're not a 500-person agency. When you work with us, you work directly with the developers who build your product.",
          gradient: "from-violet-500 to-purple-600",
        },
        {
          icon: Shield,
          title: "We Use Our Own Software",
          description: "We use our own software daily — Valoryx is built because we needed it first. That's how you know it works.",
          gradient: "from-pink-500 to-rose-500",
        },
        {
          icon: MessageSquare,
          title: "WhatsApp Support",
          description: "Based in Coimbatore, available on WhatsApp. No ticket systems, no waiting 48 hours for a reply.",
          gradient: "from-blue-500 to-cyan-500",
        },
      ].map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <div className="bg-white rounded-2xl border border-gray-200/60 p-8 md:p-10 h-full hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/80 transition-all duration-300">
            <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-900/10`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed text-[15px]">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**Step 7: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "fix: update about page with real stats, remove fake team/timeline, add Why Choose Us"
```

---

### Task 6: Update Services Page (Remove Pricing, Update Content)

**Files:**
- Modify: `src/app/services/page.tsx`

**Step 1: Update mainServices array (lines 22-76)**

Replace with real services matching Action Plan (same 6 services as home page but with more details):
```typescript
const mainServices = [
  {
    icon: Code,
    title: "Billing & Invoicing Software",
    description: "Valoryx — our GST-compliant billing software that works offline with SQLite and syncs to cloud via Supabase. Generate invoices, track payments, manage inventory, and file GST returns.",
    features: ["GST billing with CGST, SGST, IGST & HSN codes", "Real-time inventory with low-stock alerts", "Offline mode with auto-sync when back online", "Thermal printer support — no driver needed"],
    gradient: "from-violet-600 to-purple-600",
  },
  {
    icon: Database,
    title: "Websites & Web Applications",
    description: "Fast, SEO-optimized websites using Next.js and React. Landing pages, dashboards, and full web applications with user management — all production-ready.",
    features: ["Next.js / React based development", "Mobile-responsive from day one", "SEO-optimized structure and performance", "Supabase / MySQL backend integration"],
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform Android and iOS apps built with React Native. One codebase, two platforms — your app reaches every customer without doubling the cost.",
    features: ["React Native for Android & iOS", "Push notifications & real-time updates", "App Store & Play Store deployment", "Offline-capable architecture"],
    gradient: "from-pink-600 to-rose-600",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean, functional designs that your users can navigate without a manual. Interfaces that look professional and convert visitors into customers.",
    features: ["Figma-based design workflow", "Mobile-first responsive layouts", "Conversion-focused UI patterns", "Consistent design systems"],
    gradient: "from-orange-600 to-amber-600",
  },
  {
    icon: Cpu,
    title: "CRM & Custom Business Software",
    description: "Custom CRMs, ERPs, and internal tools tailored to how your business actually works. Role-based access, audit logs, dashboards, and bulk operations.",
    features: ["Role-based access with audit logging", "Custom dashboards and analytics", "Bulk import/export with Excel support", "Multi-tenant SaaS architecture"],
    gradient: "from-green-600 to-teal-600",
  },
  {
    icon: Globe,
    title: "SEO & Digital Presence",
    description: "We structure every website for Google from the ground up — proper meta tags, structured data, fast loading, and mobile optimization.",
    features: ["On-page SEO setup", "Google Search Console integration", "Core Web Vitals optimization", "Structured data / Schema markup"],
    gradient: "from-indigo-600 to-purple-600",
  }
];
```

Note: Remove the `image` and `price` properties — they are no longer needed.

**Step 2: Remove pricing array (lines 123-168)**

Delete the entire `pricing` array.

**Step 3: Remove BLOCK_DEFAULT_SHAPES and block3Ref**

- Change `BLOCK_DEFAULT_SHAPES` to only 2 blocks: `const BLOCK_DEFAULT_SHAPES: (number | null)[] = [null, 4];`
- Remove `block3Ref` declaration
- Remove `block3Ref` from the observer refs array

**Step 4: Remove "Starting at" price from service card header**

In the service card JSX (around line 374), remove:
```tsx
<span className="text-white/80 text-xs">Starting at {service.price}</span>
```

**Step 5: Remove entire Block 3 (Pricing Plans) — lines 478-570**

Delete the entire pricing block (the motion.div with `ref={block3Ref}`).

**Step 6: Update stats section (lines 592-620)**

Replace the stats with real numbers:
```typescript
{[
  { icon: Rocket, value: "5+", label: "Projects Delivered" },
  { icon: Users, value: "1", label: "Live SaaS Product" },
  { icon: Clock, value: "10+", label: "Technologies We Use" },
  { icon: Award, value: "WhatsApp", label: "Direct Founder Support" }
]}
```

**Step 7: Update hero subtitle (line 294)**

Change "From concept to launch, we deliver exceptional digital solutions that drive growth and innovation" to "From billing software to custom CRMs — we build tools that run your business smoother"

**Step 8: Clean up unused imports**

Remove `Tilt` import (if no longer used after removing pricing).
Actually, Tilt is still used in service cards. Keep it. But remove any unused lucide icons.

**Step 9: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "fix: update services page with real content, remove fake pricing section"
```

---

### Task 7: Update Portfolio Page

**Files:**
- Modify: `src/app/portfolio/page.tsx`

**Step 1: Replace featuredProjects array (lines 18-133)**

```typescript
const featuredProjects = [
  {
    id: 1,
    title: "Valoryx — GST Billing Software",
    category: "Full Stack Product",
    description: "A complete billing and inventory management system for Indian retail businesses. Works offline with SQLite, syncs to cloud via Supabase. Features GST-compliant invoicing, real-time inventory tracking, payment management, audit logs, and thermal printer support.",
    technologies: ["Next.js", "Supabase", "SQLite", "Tailwind CSS"],
    results: {
      feature1: "Offline + Online",
      feature2: "GST Compliant",
      feature3: "Thermal Print"
    },
    gradient: "from-violet-600 to-purple-600",
    link: "https://mj-billing.vercel.app/landing",
    live: "https://mj-billing.vercel.app/landing"
  },
  {
    id: 2,
    title: "RYX — Company Landing Page",
    category: "Web Development",
    description: "A modern, animated landing page built with Next.js showcasing our services, portfolio, and contact information. Features smooth animations, responsive design, and SEO optimization.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
    results: {
      feature1: "3D Particles",
      feature2: "AI Chatbot",
      feature3: "SEO Optimized"
    },
    gradient: "from-pink-600 to-rose-600",
    link: "/",
    live: "/"
  }
]
```

Note: Removed `image`, `video`, `client`, `github` fields. Results now show features instead of fake metrics.

**Step 2: Replace categories array (lines 136-142)**

```typescript
const categories = [
  { name: "All", count: 2, icon: Layers },
  { name: "Full Stack", count: 1, icon: Code },
  { name: "Web Development", count: 1, icon: Globe },
]
```

**Step 3: Update hero stats (lines 283-302)**

Replace with real numbers:
```typescript
{[
  { value: "5+", label: "Projects Delivered" },
  { value: "1", label: "Live SaaS Product" },
  { value: "10+", label: "Technologies We Use" }
]}
```

**Step 4: Update hero title and description**

Change "Creative Works" to "Our Work" and "That Inspire Innovation" to "Real Projects, Real Results"

Change description to "Projects we've actually built and shipped — no stock images, no fake metrics"

**Step 5: Remove Image import and replace image rendering in cards**

Since we no longer have Unsplash images, replace the image container in project cards with a gradient background:

In the image container section, replace:
```tsx
<Image
  src={currentImageIndex[project.id] === 1 ? project.video : project.image}
  alt={project.title}
  fill
  className="object-cover"
/>
```
With:
```tsx
<div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
  <span className="text-white/80 text-4xl font-bold">{project.title.split("—")[0].trim()}</span>
</div>
```

**Step 6: Remove Image import from next/image**

Remove `import Image from "next/image"` since we're no longer using stock images.

**Step 7: Remove github button from project actions**

Remove the Github link button since we don't have public repos. Keep "View Case Study" (renamed to "View Project") and "Live Site" buttons.

**Step 8: Remove "Load More Projects" button (lines 599-612)**

Delete the entire Load More button section. Only 2 projects, no need for pagination.

**Step 9: Remove unused state and effects**

Remove `currentImageIndex` state and the auto-play image carousel `useEffect` (lines 148, 174-187) — no longer needed without stock images.

Remove unused imports: `Image`, `Pause`, `ChevronLeft`, `ChevronRight`, `Star`, `Eye`, `Heart`, `Share2`.

**Step 10: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "fix: replace fake portfolio with real Valoryx and RYX website projects"
```

---

### Task 8: Update Contact Page

**Files:**
- Modify: `src/app/contact/page.tsx`

**Step 1: Update services array (lines 11-20)**

```typescript
const services = [
  "Billing Software",
  "Website",
  "Mobile App",
  "CRM",
  "UI/UX Design",
  "SEO",
  "Other",
]
```

**Step 2: Update budget ranges to INR (lines 22-28)**

```typescript
const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 - ₹2,00,000",
  "₹2,00,000 - ₹5,00,000",
  "₹5,00,000 - ₹10,00,000",
  "₹10,00,000+",
]
```

**Step 3: Update contact info cards (lines 148-153)**

```typescript
{ icon: Mail, label: "Email", value: "ryxdevsolutions@gmail.com", gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/20" },
{ icon: Phone, label: "Phone", value: "+91 6374853277", gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
{ icon: Clock, label: "Hours", value: "Mon-Sat, 9am-6pm IST", gradient: "from-pink-500 to-rose-500", shadow: "shadow-pink-500/20" },
{ icon: MapPin, label: "Location", value: "Coimbatore, Tamil Nadu, India", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
```

**Step 4: Update hero subtitle (line 137-138)**

Change:
```
Tell us about your project and we'll get back to you within 24 hours with a detailed proposal.
```
To:
```
Whether you need a billing solution, a website, or a custom CRM — reach out and we&apos;ll get back to you within 2 hours.
```

**Step 5: Update hero heading (line 131-132)**

Change "Let's build something incredible" to "Let&apos;s Build Something Together"

**Step 6: Update bottom CTA section (lines 413-431)**

Add WhatsApp button and update email/phone:
```tsx
<section className="sticky bottom-0 z-0 py-20 md:py-28 bg-gray-950 overflow-hidden">
  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />

  <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Prefer a quick chat?
    </h2>
    <p className="text-gray-400 mb-6">
      Reach us directly on WhatsApp or email. No ticket systems, no waiting.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="https://wa.me/916374853277" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors text-sm">
        <MessageCircle className="w-4 h-4" />
        Chat on WhatsApp
      </a>
      <a href="mailto:ryxdevsolutions@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm">
        <Mail className="w-4 h-4" />
        Email Us
      </a>
      <a href="tel:+916374853277" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-gray-500 hover:text-white transition-colors text-sm">
        <Phone className="w-4 h-4" />
        Call Us
      </a>
    </div>
  </div>
</section>
```

**Step 7: Update success message**

Change "We'll get back to you within 24 hours" to "We'll get back to you within 2 hours."

**Step 8: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "fix: update contact page with real info, WhatsApp CTA, INR pricing"
```

---

### Task 9: Update Contact Form (Home Page)

**Files:**
- Modify: `src/components/sections/contact-minimal.tsx:120-143`

**Step 1: Update contact info displayed (lines 120-143)**

Replace the contact details section:
```tsx
<div className="space-y-4 sm:space-y-6">
  <div>
    <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Email</h4>
    <p className="text-sm sm:text-base text-gray-600 break-all">ryxdevsolutions@gmail.com</p>
  </div>

  <div>
    <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Phone / WhatsApp</h4>
    <p className="text-sm sm:text-base text-gray-600">+91 6374853277</p>
    <p className="text-sm sm:text-base text-gray-600">+91 8667258008</p>
    <p className="text-sm sm:text-base text-gray-600">+91 9003523067</p>
  </div>

  <div>
    <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Location</h4>
    <p className="text-sm sm:text-base text-gray-600">Coimbatore, Tamil Nadu, India</p>
  </div>

  <div>
    <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-900">Working Hours</h4>
    <p className="text-sm sm:text-base text-gray-600">
      Monday - Saturday: 9:00 AM - 6:00 PM IST
    </p>
  </div>
</div>
```

**Step 2: Commit**

```bash
git add src/components/sections/contact-minimal.tsx
git commit -m "fix: update home page contact section with real RYX contact info"
```

---

### Task 10: Update Footer

**Files:**
- Modify: `src/components/layout/footer-minimal.tsx`

**Step 1: Update footerLinks (lines 16-27)**

Add a "Products" section:
```typescript
const footerLinks = {
  services: [
    { name: "Billing Software", href: "/services" },
    { name: "Web Development", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "CRM Solutions", href: "/services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ],
  products: [
    { name: "Valoryx Billing", href: "https://mj-billing.vercel.app/landing" },
  ],
}
```

**Step 2: Remove fake social links (lines 29-34)**

Since there are no real social media links yet, remove the socialLinks array entirely or leave empty. Remove the social links section from the JSX (lines 133-159), or replace with just WhatsApp:

```typescript
const socialLinks = [
  { Icon: Phone, href: "https://wa.me/916374853277", label: "WhatsApp" },
]
```

But `Phone` is already imported. Actually let's use `MessageCircle` instead — but we need to add it to imports. Better to just use `Phone` since it's imported already. Or we can replace the entire social section with a WhatsApp CTA and product link.

**Step 3: Update brand description (line 66)**

Change "Transforming ideas into digital reality." to:
```
RYX is a software development company based in Coimbatore, India. We build billing software, websites, mobile apps, and custom CRMs.
```

**Step 4: Update email (line 70-73)**

Change `ryxdevsolution@gmail.com` to `ryxdevsolutions@gmail.com` (note the "s" — per Action Plan).

**Step 5: Add third phone number (after line 81)**

Add:
```tsx
<a href="tel:+919003523067" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors text-sm">
  <Phone className="w-4 h-4" />
  <span>+91 90035 23067</span>
</a>
```

**Step 6: Update copyright to include "Built in Coimbatore"**

Change line 168:
```
© {new Date().getFullYear()} RYX. All rights reserved.
```
To:
```
© 2025 RYX. All rights reserved. Built in Coimbatore, India.
```

**Step 7: Add products column to footer grid**

Add a Products column in the grid between Services and Company.

**Step 8: Commit**

```bash
git add src/components/layout/footer-minimal.tsx
git commit -m "fix: update footer with real contact info, products link, remove fake socials"
```

---

### Task 11: Build Verification

**Step 1: Run full build**

Run: `cd /home/development1/Desktop/Ryx && npm run build`
Expected: Build succeeds with no errors

**Step 2: Fix any build errors**

If TypeScript or build errors appear, fix them:
- Unused imports → remove them
- Missing imports → add them
- Type errors → fix type definitions

**Step 3: Run dev server and visually verify**

Run: `npm run dev`
Visit each page:
- / (Home)
- /about
- /services
- /portfolio
- /contact

Verify no broken pages or missing content.

**Step 4: Final commit**

If any fixes were needed:
```bash
git add -A
git commit -m "fix: resolve build errors from content cleanup"
```

---

## Summary of Changes

| File | What Changed |
|------|-------------|
| `layout.tsx` | SEO meta, structured data, removed fake verification & ratings |
| `hero-3d.tsx` | H1, subtitle, CTAs (WhatsApp + Valoryx), trust line |
| `services-simple.tsx` | 6 real service cards with real descriptions |
| `portfolio-simple.tsx` | 2 real projects, removed Unsplash images & fake stats |
| `about/page.tsx` | Real stats, authentic mission/vision, Why Choose Us, removed team/timeline |
| `services/page.tsx` | Real services, removed pricing, real stats |
| `portfolio/page.tsx` | 2 real projects, real stats, removed fake data |
| `contact/page.tsx` | Real contact info, WhatsApp CTA, INR budgets |
| `contact-minimal.tsx` | Real contact info |
| `footer-minimal.tsx` | Real contact info, Valoryx product link, removed fake socials |
