import type { Metadata } from "next";
import AboutClient from "./about-client";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "About Us — Software Team in Coimbatore | RYX Tech",
  description:
    "Meet the 3-person founding team behind RYX Tech. Building production-grade custom software from Coimbatore since 2025. Valoryx billing software, BigTeam, and client websites.",
  alternates: { canonical: "https://ryxtech.in/about" },
  openGraph: {
    title: "About Us — Software Team in Coimbatore | RYX Tech",
    description: "Meet the 3-person founding team behind RYX Tech. Building production-grade custom software from Coimbatore since 2025.",
    url: "https://ryxtech.in/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — Software Team in Coimbatore | RYX Tech",
    description: "Meet the 3-person founding team behind RYX Tech. Building production-grade custom software from Coimbatore since 2025.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ryxtech.in" },
        { name: "About", url: "https://ryxtech.in/about" },
      ]} />
      <AboutClient />
    </>
  );
}
