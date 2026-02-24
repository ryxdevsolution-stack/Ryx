import dynamic from "next/dynamic";
import { Navbar } from "@/components/ignitex/navbar";
import { HeroSection } from "@/components/ignitex/sections/hero";

// Below-the-fold sections — lazy loaded to reduce initial JS bundle
const ServicesTeaserSection = dynamic(
  () =>
    import("@/components/ignitex/sections/services-teaser").then((m) => ({
      default: m.ServicesTeaserSection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const PortfolioTeaserSection = dynamic(
  () =>
    import("@/components/ignitex/sections/portfolio-teaser").then((m) => ({
      default: m.PortfolioTeaserSection,
    })),
  { loading: () => <div className="min-h-[60vh] bg-ig-dark" /> }
);
const MetricsSection = dynamic(
  () =>
    import("@/components/ignitex/sections/metrics").then((m) => ({
      default: m.MetricsSection,
    })),
  { loading: () => <div className="min-h-[50vh]" /> }
);
const TechBadgesSection = dynamic(
  () =>
    import("@/components/ignitex/sections/tech-badges").then((m) => ({
      default: m.TechBadgesSection,
    })),
  { loading: () => <div className="min-h-[20vh]" /> }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/ignitex/sections/testimonials").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const ContactCTASection = dynamic(
  () =>
    import("@/components/ignitex/sections/contact-cta").then((m) => ({
      default: m.ContactCTASection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const Footer = dynamic(
  () =>
    import("@/components/ignitex/sections/footer").then((m) => ({
      default: m.Footer,
    })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Dark — Hero (above fold, eager) */}
        <HeroSection />

        {/* White — Services teaser: 4 cards, link to /services */}
        <ServicesTeaserSection />

        {/* Dark — Portfolio teaser: 2 real projects, link to /portfolio */}
        <PortfolioTeaserSection />

        {/* White — Animated metrics from SITE_CONFIG */}
        <MetricsSection />

        {/* White — Tech stack badges */}
        <TechBadgesSection />

        {/* Dark — Testimonials (social proof) */}
        <TestimonialsSection />

        {/* Dark — Contact CTA with form */}
        <ContactCTASection />
      </main>

      {/* Dark — Footer */}
      <Footer />
    </>
  );
}
