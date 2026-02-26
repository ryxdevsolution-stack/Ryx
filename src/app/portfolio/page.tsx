import type { Metadata } from "next";
import PortfolioClient from "./portfolio-client";

export const metadata: Metadata = {
  title: "Portfolio — Valoryx, BigTeam & More",
  description: "See what RYX Dev Solutions has built: Valoryx billing SaaS, BigTeam community platform, Chendur & Co tax consultancy site, and Boutique fashion landing page.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
