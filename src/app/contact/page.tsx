import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description: "Get in touch with RYX Tech. WhatsApp, email, or contact form. Based in Coimbatore, serving businesses across India. We reply within 24 hours.",
  alternates: { canonical: "https://ryxtech.in/contact" },
  openGraph: {
    title: "Contact Us — Start Your Project | RYX Tech",
    description: "Get in touch with RYX Tech. WhatsApp, email, or contact form. Based in Coimbatore. We reply within 24 hours.",
    url: "https://ryxtech.in/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact RYX Tech" }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
