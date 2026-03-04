import type { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Services — Web Apps, Billing Software & Websites | RYX Tech Coimbatore",
  description:
    "Custom software development by RYX Tech, Coimbatore. GST billing systems, full-stack web applications, business websites, UI/UX design. Direct developer access, WhatsApp support.",
  alternates: { canonical: "https://ryxtech.in/services" },
  openGraph: {
    title: "Services — Web Apps, Billing Software & Websites | RYX Tech",
    description: "Custom software development by RYX Tech, Coimbatore. GST billing, full-stack web apps, business websites.",
    url: "https://ryxtech.in/services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Services" }],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <ServicesClient />
    </>
  );
}
