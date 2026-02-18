# Content Cleanup Design — RYX Landing Page

**Date:** 2026-02-18
**Scope:** Content-only update — replace fake/placeholder data with real RYX business content
**Source:** Landing_Page_Action_Plan.md

## Decisions Made

1. **Content-only** — keep existing design, animations, page structure
2. **Testimonials** → Replace with "Why Choose Us" section (3 trust statements)
3. **Pricing** → Remove entirely from Services page
4. **Team + Timeline** → Remove from About page until real data available
5. **Portfolio** → 2 real projects (Valoryx + RYX Website), remove fake counters/images

## Files to Modify (12 files)

### 1. `src/app/layout.tsx` — SEO & Structured Data
- Title: "RYX — Billing Software, Web Development & Custom CRM Solutions | Coimbatore"
- Meta description: Real RYX description from Action Plan
- Keywords: billing software india, GST billing software, etc.
- OG tags: Real titles and descriptions
- Twitter cards: Real content
- Remove fake Google verification code
- Structured data: Remove aggregateRating, update contact info, add serviceType array

### 2. `src/components/sections/hero-3d.tsx` — Hero Section
- Badge: "Built in Coimbatore, Serving Globally"
- H1: "We Build Software That Actually Solves Your Business Problems"
- Subtitle: "From GST-compliant billing software to custom CRMs..."
- CTA Primary: "Talk to Us on WhatsApp" → wa.me/916374853277
- CTA Secondary: "Try Valoryx Free" → mj-billing.vercel.app/landing
- Trust line: "No credit card needed | 14-day free trial | Made in India"

### 3. `src/app/page.tsx` — Home Page
- Verify hero, services, portfolio, contact sections reference correct components
- No major content changes here (content lives in components)

### 4. `src/components/sections/services-simple.tsx` — Services Cards (Home)
- Card 1: Billing & Invoicing Software (Valoryx)
- Card 2: Websites & Web Applications
- Card 3: Mobile App Development
- Card 4: CRM & Custom Business Software
- Card 5: UI/UX Design
- Card 6: SEO & Digital Presence
- Each with real descriptions and features from Action Plan

### 5. `src/app/services/page.tsx` — Services Page
- Update "What We Offer" block with same 6 real services
- Update "Our Process" with authentic workflow steps
- REMOVE pricing section entirely
- Update stats to real numbers

### 6. `src/components/sections/portfolio-simple.tsx` — Portfolio Cards (Home)
- Project 1: Valoryx — GST Billing Software (Full Stack Product)
- Project 2: RYX — Company Landing Page (Web Development)
- Remove fake view/like counters
- Remove stock Unsplash images (use placeholder or real screenshots)

### 7. `src/app/portfolio/page.tsx` — Portfolio Page
- Replace 6 fake projects with 2 real ones
- Remove fake stats (150+ projects, 98% satisfaction, 25+ awards)
- Update category filters to match real categories (Full Stack, Web Dev)
- Remove "Load More" button (only 2 projects)

### 8. `src/app/about/page.tsx` — About Page
- Stats: 5+ Projects, 1 Live SaaS Product, 10+ Technologies, WhatsApp Direct Support
- Keep Mission/Vision/Values — update text to be authentic
- REMOVE TeamAnimated section
- REMOVE JourneyTimeline section
- REPLACE TestimonialsAnimated with "Why Choose Us" section:
  - "Work directly with the developers who build your product"
  - "We use our own software daily — Valoryx was built because we needed it first"
  - "Based in Coimbatore, available on WhatsApp. No ticket systems."

### 9. `src/app/contact/page.tsx` — Contact Page
- Email: ryxdevsolutions@gmail.com
- Phone/WhatsApp: +91 6374853277, 8667258008, 9003523067
- Location: Coimbatore, Tamil Nadu, India
- Add WhatsApp CTA: wa.me/916374853277
- Service dropdown: Billing Software / Website / Mobile App / CRM / Other
- Subtitle: "Whether you need a billing solution, a website, or a custom CRM..."

### 10. `src/components/sections/contact-minimal.tsx` — Contact Form (Home)
- Update any contact info displayed
- Ensure form fields match Action Plan

### 11. `src/components/layout/footer-minimal.tsx` — Footer
- Brand: RYX + real email + all 3 phone numbers
- Product links: Valoryx → mj-billing.vercel.app/landing
- Remove fake social media links (github.com/ryx-team, etc.)
- Copyright: "2025 RYX. All rights reserved. Built in Coimbatore, India."
- Company description: Real RYX description

### 12. `src/components/layout/navbar-minimal.tsx` — Navbar
- Verify routes are correct (Home, About, Services, Portfolio, Contact)
- No content changes expected

## Items to Remove (Checklist)
- [ ] Fake Google verification code from meta tags
- [ ] aggregateRating from structured data
- [ ] Fake social media links
- [ ] Unsplash stock portfolio images
- [ ] Fake view/like counters on portfolio cards
- [ ] Fake stats (50+/200+ Projects, 30+ Clients, 25+ Awards)
- [ ] Fake contact info (hello@ryx.dev, +1-555-RYX-TECH)
- [ ] Pricing section from services page
- [ ] Team section from about page
- [ ] Journey timeline from about page
- [ ] Testimonials carousel (replace with "Why Choose Us")

## Real Contact Info
- Email: ryxdevsolutions@gmail.com
- Phone 1: +91 6374853277
- Phone 2: 8667258008
- Phone 3: 9003523067
- WhatsApp: wa.me/916374853277
- Location: Coimbatore, Tamil Nadu, India
