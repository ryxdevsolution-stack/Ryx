import dynamic from "next/dynamic";
import { Navbar } from "@/components/ignitex/navbar";
import { HeroSection } from "@/components/ignitex/sections/hero";
import { AboutStudioSection } from "@/components/ignitex/sections/about-studio";

// Below-the-fold sections — lazy loaded to reduce initial JS bundle
const AboutDetailSection = dynamic(
  () => import("@/components/ignitex/sections/about-detail").then((m) => ({ default: m.AboutDetailSection })),
  { loading: () => <div className="min-h-[40vh]" /> }
);
const ServicesSection = dynamic(
  () => import("@/components/ignitex/sections/services").then((m) => ({ default: m.ServicesSection })),
  { loading: () => <div className="min-h-screen" /> }
);
const ClientLogosSection = dynamic(
  () => import("@/components/ignitex/sections/client-logos").then((m) => ({ default: m.ClientLogosSection })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const PortfolioGallerySection = dynamic(
  () => import("@/components/ignitex/sections/portfolio-gallery").then((m) => ({ default: m.PortfolioGallerySection })),
  { loading: () => <div className="min-h-screen" /> }
);
const ProjectShowcaseSection = dynamic(
  () => import("@/components/ignitex/sections/project-showcase").then((m) => ({ default: m.ProjectShowcaseSection })),
  { loading: () => <div className="min-h-screen" /> }
);
const ProcessSection = dynamic(
  () => import("@/components/ignitex/sections/process").then((m) => ({ default: m.ProcessSection })),
  { loading: () => <div className="min-h-screen" /> }
);
const WhyUsSection = dynamic(
  () => import("@/components/ignitex/sections/why-us").then((m) => ({ default: m.WhyUsSection })),
  { loading: () => <div className="min-h-screen" /> }
);
const MetricsSection = dynamic(
  () => import("@/components/ignitex/sections/metrics").then((m) => ({ default: m.MetricsSection })),
  { loading: () => <div className="min-h-[50vh]" /> }
);
const PricingSection = dynamic(
  () => import("@/components/ignitex/sections/pricing").then((m) => ({ default: m.PricingSection })),
  { loading: () => <div className="min-h-screen" /> }
);
const TestimonialsSection = dynamic(
  () => import("@/components/ignitex/sections/testimonials").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const TeamSection = dynamic(
  () => import("@/components/ignitex/sections/team").then((m) => ({ default: m.TeamSection })),
  { loading: () => <div className="min-h-screen" /> }
);
const CaseStudiesSection = dynamic(
  () => import("@/components/ignitex/sections/case-studies").then((m) => ({ default: m.CaseStudiesSection })),
  { loading: () => <div className="min-h-screen" /> }
);
const BlogPreviewSection = dynamic(
  () => import("@/components/ignitex/sections/blog-preview").then((m) => ({ default: m.BlogPreviewSection })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const ContactCTASection = dynamic(
  () => import("@/components/ignitex/sections/contact-cta").then((m) => ({ default: m.ContactCTASection })),
  { loading: () => <div className="min-h-[60vh]" /> }
);
const Footer = dynamic(
  () => import("@/components/ignitex/sections/footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Dark — Hero (above fold, eager) */}
        <HeroSection />

        {/* Light — About the studio (near fold, eager) */}
        <AboutStudioSection />

        {/* Light — About detail / tagline */}
        <AboutDetailSection />

        {/* Dark — Services accordion */}
        <ServicesSection />

        {/* Light — Client logos marquee */}
        <ClientLogosSection />

        {/* Light — Portfolio gallery grid */}
        <PortfolioGallerySection />

        {/* Dark — Project showcase slider */}
        <ProjectShowcaseSection />

        {/* Light — Our process */}
        <ProcessSection />

        {/* Light — Why choose us bento */}
        <WhyUsSection />

        {/* Dark — Metrics / stats */}
        <MetricsSection />

        {/* Dark — Pricing */}
        <div id="pricing">
          <PricingSection />
        </div>

        {/* Dark — Testimonials */}
        <TestimonialsSection />

        {/* Dark — Team */}
        <TeamSection />

        {/* Light — Case studies */}
        <CaseStudiesSection />

        {/* Light — Blog preview */}
        <BlogPreviewSection />

        {/* Dark — Contact CTA */}
        <ContactCTASection />
      </main>

      {/* Dark — Footer */}
      <Footer />
    </>
  );
}
