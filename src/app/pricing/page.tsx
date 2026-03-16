import type { Metadata } from "next";
import PricingClient from "./pricing-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Pricing — Custom Quotes Based on Your Project",
  description:
    "RYX Tech doesn't use fixed pricing — every project is scoped based on your requirements. Get a free consultation and a transparent quote within 24 hours.",
  alternates: { canonical: "https://ryxtech.in/pricing" },
  openGraph: {
    title: "Pricing — Custom Quotes Based on Your Project",
    description:
      "No fixed rates. Every project at RYX Tech is priced based on your scope, timeline, and goals. Free consultation, transparent quote.",
    url: "https://ryxtech.in/pricing",
    type: "website",
    siteName: "RYX Tech",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Custom Quotes Based on Your Project",
    description: "No fixed rates. Free consultation, transparent quote within 24 hours. RYX Tech, Coimbatore.",
    images: ["/og-image.jpg"],
  },
};

// Hardcoded FAQ structured data — no user input, XSS-safe
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why doesn't RYX Tech list prices on their website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every project has different requirements, features, timelines, and scale. A 3-page website costs differently from a multi-branch inventory system. We scope your exact requirements first and give you a fixed, transparent quote.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I get a quote from RYX Tech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Within 24 hours of your first message. WhatsApp is the fastest way to reach us.",
      },
    },
    {
      "@type": "Question",
      name: "Is the initial consultation free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The discovery call and project scoping are completely free. You only pay once we agree on scope and you approve the quote.",
      },
    },
    {
      "@type": "Question",
      name: "Can I pay in installments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with milestone-based payments — typically 40% upfront, 40% at mid-delivery, and 20% on final handover.",
      },
    },
    {
      "@type": "Question",
      name: "Does RYX Tech work with small businesses and startups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with businesses of all sizes — from single-owner shops needing a website to funded startups building full-stack platforms.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      {/* Safe: FAQ_SCHEMA is hardcoded structured data, no user input involved */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ryxtech.in" },
          { name: "Pricing", url: "https://ryxtech.in/pricing" },
        ]}
      />
      <PricingClient />
    </>
  );
}
