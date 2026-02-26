import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us — Our Team & Story",
  description: "Meet the team behind RYX Dev Solutions. 3 co-founders building production-grade software from Coimbatore since 2023. Valoryx, BigTeam, and more.",
};

export default function AboutPage() {
  return <AboutClient />;
}
