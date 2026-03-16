import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ryx/navbar";
import { HeroSection } from "@/components/ryx/sections/hero";

export const metadata: Metadata = {
  title: "RYX Tech — Software Company in Coimbatore | Custom Web Apps & Billing Software",
  description:
    "RYX Tech builds custom software for Indian businesses — GST billing systems, full-stack web apps, and professional websites. Based in Coimbatore, Tamil Nadu. Direct developer access, WhatsApp support.",
  keywords: [
    "software company Coimbatore",
    "web development Coimbatore",
    "custom software India",
    "GST billing software",
    "website design Coimbatore",
    "web app development Tamil Nadu",
  ],
  alternates: { canonical: "https://ryxtech.in" },
  openGraph: {
    title: "RYX Tech — Software Company in Coimbatore",
    description:
      "Custom web apps, billing software, and business websites. Direct developer access.",
    url: "https://ryxtech.in",
    siteName: "RYX Tech",
    type: "website",
  },
};

// Below-the-fold sections — lazy loaded to reduce initial JS bundle
const ServicesTeaserSection = dynamic(
  () =>
    import("@/components/ryx/sections/services-teaser").then((m) => ({
      default: m.ServicesTeaserSection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const ProcessStepsSection = dynamic(
  () =>
    import("@/components/ryx/sections/process-steps").then((m) => ({
      default: m.ProcessStepsSection,
    })),
  { loading: () => <div className="min-h-[60vh] bg-ig-dark" /> }
);
const WhyUsSection = dynamic(
  () =>
    import("@/components/ryx/sections/why-us").then((m) => ({
      default: m.WhyUsSection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/ryx/sections/testimonials").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <div className="min-h-[60vh] bg-ig-dark" /> }
);
const ScrollMarqueeSection = dynamic(
  () =>
    import("@/components/ryx/sections/scroll-marquee").then((m) => ({
      default: m.ScrollMarqueeSection,
    })),
  { loading: () => <div className="min-h-[12vh] bg-ig-dark" /> }
);
const ManifestoSection = dynamic(
  () =>
    import("@/components/ryx/sections/manifesto").then((m) => ({
      default: m.ManifestoSection,
    })),
  { loading: () => <div className="min-h-[60vh] bg-ig-dark" /> }
);
const MetricsSection = dynamic(
  () =>
    import("@/components/ryx/sections/metrics").then((m) => ({
      default: m.MetricsSection,
    })),
  { loading: () => <div className="min-h-[50vh]" /> }
);
const TechBadgesSection = dynamic(
  () =>
    import("@/components/ryx/sections/tech-badges").then((m) => ({
      default: m.TechBadgesSection,
    })),
  { loading: () => <div className="min-h-[20vh]" /> }
);
import { BlogTeaserServer } from "@/components/ryx/sections/blog-teaser-server";
const ContactCTASection = dynamic(
  () =>
    import("@/components/ryx/sections/contact-cta").then((m) => ({
      default: m.ContactCTASection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const Footer = dynamic(
  () =>
    import("@/components/ryx/sections/footer").then((m) => ({
      default: m.Footer,
    })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

// Speakable + about/mentions schema — tells Google AI Overviews which sections to quote
// Safe: JSON.stringify of hardcoded object — no user input involved
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ryxtech.in/#webpage",
  "url": "https://ryxtech.in",
  "name": "RYX Tech — Software Company in Coimbatore",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-subtitle", ".service-card h3", ".faq-question"],
  },
  "about": {
    "@type": "Thing",
    "name": "Custom Software Development",
    "description": "RYX Tech builds custom software for Indian businesses — GST billing systems, full-stack web apps, and professional websites. Based in Coimbatore, Tamil Nadu.",
  },
  "mentions": [
    { "@type": "SoftwareApplication", "name": "Valoryx", "description": "Offline-first GST billing and inventory software for Indian SMEs" },
    { "@type": "Place", "name": "Coimbatore", "address": { "@type": "PostalAddress", "addressRegion": "Tamil Nadu", "addressCountry": "IN" } },
  ],
};

export default function Home() {
  return (
    <>
      {/* speakable JSON-LD: hardcoded structured data only, no user input — XSS safe */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <Navbar />
      <main>
        {/* Dark — Hero (above fold, eager) */}
        <HeroSection />

        {/* White — Services teaser: 4 cards, link to /services */}
        <ServicesTeaserSection />

        {/* Dark — How we work: 3-step process */}
        <ProcessStepsSection />

        {/* White — Why choose RYX: asymmetric bento grid */}
        <WhyUsSection />

        {/* White — Mid-page CTA: after social proof */}
        <section className="bg-white py-14 sm:py-16 border-t border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-400 mb-4">Ready to build?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 leading-tight">
              Got a project in mind?<br className="hidden sm:block" /> Let&apos;s talk.
            </h2>
            <p className="text-base text-neutral-500 mb-8 max-w-md mx-auto">
              From GST billing to full-stack web apps — we scope, build, and ship fast.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors duration-200"
            >
              Start a project →
            </a>
          </div>
        </section>

        {/* Dark — Client testimonials: avatar carousel */}
        <TestimonialsSection />

        {/* Dark — Infinite scrolling marquee: technologies & clients */}
        <ScrollMarqueeSection />

        {/* Dark — Manifesto: founding story, quote, narrative stats */}
        <ManifestoSection />

        {/* White — Animated metrics from SITE_CONFIG */}
        <MetricsSection />

        {/* White — Tech stack badges */}
        <TechBadgesSection />

        {/* White — Blog preview: 3 latest articles */}
        <BlogTeaserServer />

        {/* Dark — Contact CTA with form */}
        <ContactCTASection />
      </main>

      {/* Dark — Footer */}
      <Footer />
    </>
  );
}
