import type { Metadata } from "next";
import TermsClient from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy",
  description: "Terms of service and privacy policy for RYX Tech.",
};

export default function TermsPage() {
  return <TermsClient />;
}
