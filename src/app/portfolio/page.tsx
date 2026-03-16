import type { Metadata } from "next";
import PortfolioClient from "./portfolio-client";
import { fetchOrgProjects } from "@/lib/github";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Portfolio — Our Projects & Products",
  description:
    "See what RYX Tech has built: Valoryx (offline GST billing), BigTeam (community platform), and custom business websites. Real projects, real results.",
  alternates: { canonical: "https://ryxtech.in/portfolio" },
  openGraph: {
    title: "Portfolio — Our Projects & Products",
    description: "Valoryx (offline GST billing), BigTeam (community platform), and custom business websites. Real projects.",
    url: "https://ryxtech.in/portfolio",
    type: "website",
    siteName: "RYX Tech",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Our Projects & Products",
    description: "Valoryx (offline GST billing), BigTeam (community platform), and custom business websites. Real projects.",
    images: ["/og-image.jpg"],
  },
};

// Revalidate page every hour so new repos appear without a full redeploy
export const revalidate = 3600;

export default async function PortfolioPage() {
  const projects = await fetchOrgProjects("ryxdevsolution-stack");
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ryxtech.in" },
        { name: "Portfolio", url: "https://ryxtech.in/portfolio" },
      ]} />
      <PortfolioClient projects={projects} />
    </>
  );
}
