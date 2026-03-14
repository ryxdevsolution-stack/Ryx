import type { Metadata } from "next";
import TermsClient from "./terms-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy | RYX Tech",
  description: "Terms of service and privacy policy for RYX Tech.",
  alternates: { canonical: "https://ryxtech.in/terms" },
  // Legal pages waste crawl budget — pass through links but don't index
  robots: { index: false, follow: true },
  openGraph: {
    title: "Terms of Service & Privacy Policy | RYX Tech",
    description: "Terms of service and privacy policy for RYX Tech.",
    url: "https://ryxtech.in/terms",
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
