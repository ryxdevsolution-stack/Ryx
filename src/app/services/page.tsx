import type { Metadata } from "next";
import ServicesClient from "./services-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Services — Web Apps, Billing & Marketing",
  description:
    "RYX Tech Coimbatore — GST billing, web apps, UI/UX design, and digital marketing. Google Ads, Meta Ads, social media. WhatsApp support.",
  alternates: { canonical: "https://ryxtech.in/services" },
  openGraph: {
    title: "Services — Web Apps, Billing & Marketing",
    description: "RYX Tech Coimbatore — GST billing, web apps, UI/UX design, and digital marketing. Google Ads, Meta Ads, social media. WhatsApp support.",
    url: "https://ryxtech.in/services",
    type: "website",
    siteName: "RYX Tech",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Web Apps, Billing & Marketing",
    description: "RYX Tech Coimbatore — GST billing, web apps, UI/UX design, and digital marketing. Google Ads, Meta Ads, social media. WhatsApp support.",
    images: ["/og-image.jpg"],
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a website cost in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a professional business website, expect Rs.40,000 to Rs.1,20,000. Fixed quote upfront, no hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard business website takes 3-6 weeks. Complex web applications take 8-16 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer GST billing software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes we built Valoryx, our own GST-compliant billing software that works offline and syncs to the cloud.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide support after the website launches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WhatsApp support post-launch. Direct developer access, no ticket queues.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with clients outside Coimbatore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We work with clients across India and internationally via WhatsApp, email, and video calls.",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ryxtech.in" },
        { name: "Services", url: "https://ryxtech.in/services" },
      ]} />
      {/* Safe: FAQ_SCHEMA is hardcoded structured data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <ServicesClient />
    </>
  );
}
