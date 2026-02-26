import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description: "Get in touch with RYX Dev Solutions. WhatsApp, email, or contact form. Based in Coimbatore, serving businesses across India. We reply within 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
