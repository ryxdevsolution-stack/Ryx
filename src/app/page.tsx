import dynamic from "next/dynamic";
import { Navbar } from "@/components/ryx/navbar";
import { HeroSection } from "@/components/ryx/sections/hero";

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
const ScrollMarqueeSection = dynamic(
  () =>
    import("@/components/ryx/sections/scroll-marquee").then((m) => ({
      default: m.ScrollMarqueeSection,
    })),
  { loading: () => <div className="min-h-[12vh] bg-ig-dark" /> }
);
const PortfolioTeaserSection = dynamic(
  () =>
    import("@/components/ryx/sections/portfolio-teaser").then((m) => ({
      default: m.PortfolioTeaserSection,
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
const BlogTeaserSection = dynamic(
  () =>
    import("@/components/ryx/sections/blog-teaser").then((m) => ({
      default: m.BlogTeaserSection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/ryx/sections/testimonials").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
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

export default function Home() {
  return (
    <>
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

        {/* Dark — Infinite scrolling marquee: technologies & clients */}
        <ScrollMarqueeSection />

        {/* Dark — Portfolio teaser: 2 real projects, link to /portfolio */}
        <PortfolioTeaserSection />

        {/* White — Animated metrics from SITE_CONFIG */}
        <MetricsSection />

        {/* White — Tech stack badges */}
        <TechBadgesSection />

        {/* White — Blog teaser: 3 articles, link to /blog */}
        <BlogTeaserSection />

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
