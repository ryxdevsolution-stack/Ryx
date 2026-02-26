import type { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Services — Web Apps, Billing Software & Websites",
  description: "Custom software development by RYX Dev Solutions. Billing & inventory systems, full-stack web applications, business websites, and UI/UX design. Based in Coimbatore.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
