import type { Metadata } from "next";
import DigitalMarketingClient from "./digital-marketing-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Digital Marketing Services in Coimbatore | Google Ads, Meta Ads, Social Media | RYX Tech",
  description:
    "RYX Tech offers end-to-end digital marketing in Coimbatore — Google Ads, Meta Ads, Instagram & LinkedIn management, content strategy, and WhatsApp campaigns. Results-driven marketing for Indian businesses.",
  alternates: { canonical: "https://ryxtech.in/services/digital-marketing" },
  keywords: [
    "digital marketing coimbatore",
    "google ads agency coimbatore",
    "meta ads management india",
    "social media marketing coimbatore",
    "facebook ads coimbatore",
    "instagram marketing coimbatore",
    "digital marketing agency tamil nadu",
    "content marketing india",
    "whatsapp marketing india",
    "lead generation coimbatore",
  ],
  openGraph: {
    title: "Digital Marketing Services in Coimbatore | RYX Tech",
    description:
      "Google Ads, Meta Ads, social media management, and content strategy for Indian businesses. RYX Tech, Coimbatore.",
    url: "https://ryxtech.in/services/digital-marketing",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Digital Marketing by RYX Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services in Coimbatore | RYX Tech",
    description:
      "Google Ads, Meta Ads, social media management, and content strategy for Indian businesses.",
    images: ["/og-image.jpg"],
  },
};

// Static hardcoded JSON-LD — no user input, safe
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ryxtech.in/services/digital-marketing",
  name: "Digital Marketing Services",
  description:
    "End-to-end digital marketing including Google Ads, Meta Ads, social media management, content strategy, and WhatsApp campaigns for businesses in Coimbatore and across India.",
  provider: {
    "@type": "Organization",
    "@id": "https://ryxtech.in/#organization",
    name: "RYX Tech",
  },
  areaServed: [
    { "@type": "City", name: "Coimbatore" },
    { "@type": "AdministrativeArea", name: "Tamil Nadu" },
    { "@type": "Country", name: "India" },
  ],
  serviceType: "Digital Marketing",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads (Facebook & Instagram)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Marketing & Blog Strategy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp & Email Campaigns" } },
    ],
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much do Google Ads cost for a small business in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google Ads budgets typically start from Rs.10,000-30,000/month for small businesses. RYX Tech manages the campaigns and optimises for the lowest cost-per-lead. Management fee is separate and transparent.",
      },
    },
    {
      "@type": "Question",
      name: "Do you run Meta Ads (Facebook and Instagram ads) for businesses in Coimbatore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We run Meta Ads campaigns for local and national businesses — audience research, creative design, A/B testing, and weekly performance reports included.",
      },
    },
    {
      "@type": "Question",
      name: "What does social media management include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Content creation, scheduling, engagement, hashtag strategy, and monthly analytics reports for Instagram, LinkedIn, and Facebook.",
      },
    },
    {
      "@type": "Question",
      name: "Can you handle both the website and digital marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — that is our advantage. We build your website and run your marketing, so there is no disconnect between the two. Faster load times, better landing pages, and ads that convert.",
      },
    },
  ],
};

export default function DigitalMarketingPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ryxtech.in" },
        { name: "Services", url: "https://ryxtech.in/services" },
        { name: "Digital Marketing", url: "https://ryxtech.in/services/digital-marketing" },
      ]} />
      {/* Static JSON-LD structured data — no user input, safe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <DigitalMarketingClient />
    </>
  );
}
