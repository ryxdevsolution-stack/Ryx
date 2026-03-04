import type { Metadata } from "next";
import PortfolioClient from "./portfolio-client";
import { fetchOrgProjects } from "@/lib/github";

export const metadata: Metadata = {
  title: "Portfolio — Projects by RYX Tech | Coimbatore Software Company",
  description:
    "See what RYX Tech has built: Valoryx (offline GST billing), BigTeam (community platform), and custom business websites. Real projects, real results.",
  alternates: { canonical: "https://ryxtech.in/portfolio" },
  openGraph: {
    title: "Portfolio — Projects by RYX Tech | Coimbatore Software Company",
    description: "Valoryx (offline GST billing), BigTeam (community platform), and custom business websites. Real projects.",
    url: "https://ryxtech.in/portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RYX Tech Portfolio" }],
  },
};

// Revalidate page every hour so new repos appear without a full redeploy
export const revalidate = 3600;

export default async function PortfolioPage() {
  const projects = await fetchOrgProjects("ryxdevsolution-stack");
  return <PortfolioClient projects={projects} />;
}
