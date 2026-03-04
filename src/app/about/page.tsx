import type { Metadata } from "next";
import AboutClient from "./about-client";

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
};

export default function AboutPage() {
  return <AboutClient />;
}
