import type { Metadata } from "next";
import TermsClient from "./terms-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy",
  description: "Read the terms of service and privacy policy for RYX Tech, Coimbatore. Covers website usage, data handling, intellectual property, and service agreements.",
  alternates: { canonical: "https://ryxtech.in/terms" },
  // Legal pages waste crawl budget — pass through links but don't index
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    siteName: "RYX Tech",
    title: "Terms of Service & Privacy Policy",
    description: "Read the terms of service and privacy policy for RYX Tech, Coimbatore. Covers website usage, data handling, intellectual property, and service agreements.",
    url: "https://ryxtech.in/terms",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Terms" }],
  },
  twitter: {
    card: "summary",
    title: "Terms of Service & Privacy Policy",
    description: "Read the terms of service and privacy policy for RYX Tech, Coimbatore.",
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ryxtech.in" },
        { name: "Terms", url: "https://ryxtech.in/terms" },
      ]} />
      <TermsClient />
    </>
  );
}
