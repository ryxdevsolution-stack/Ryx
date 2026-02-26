"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ryx/navbar";
import { SectionLabel } from "@/components/ryx/section-label";
import { ScriptText } from "@/components/ryx/script-text";
import { SITE_CONFIG } from "@/lib/site-config";
import { EASE_STANDARD } from "@/components/ryx/motion";

const Footer = dynamic(
  () => import("@/components/ryx/sections/footer").then((m) => ({ default: m.Footer })),
  { loading: () => <div className="min-h-[40vh] bg-ig-dark" /> }
);

const LAST_UPDATED = "24 February 2026";

export default function TermsClient() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero — dark ── */}
        <section className="ig-section-dark relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="absolute inset-0 ig-texture-dark" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel text="Legal" variant="dark" />
            <motion.h1
              className="ig-heading-1 text-white mt-5 mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_STANDARD }}
            >
              Terms &amp; <ScriptText>Privacy</ScriptText>
            </motion.h1>
            <motion.p
              className="text-ig-text-light-muted text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Last updated: {LAST_UPDATED}
            </motion.p>
          </div>
        </section>

        {/* ── Content — white ── */}
        <section className="ig-section-white py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="prose prose-neutral max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-h3:mt-8 prose-p:text-neutral-600 prose-li:text-neutral-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
            >

              {/* ─── TERMS OF SERVICE ─── */}
              <h2>Terms of Service</h2>

              <h3>1. Agreement to Terms</h3>
              <p>
                By accessing or using any services provided by <strong>{SITE_CONFIG.company.name}</strong> (&quot;RYX&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h3>2. Services Provided</h3>
              <p>
                RYX Dev Solutions provides software development services including but not limited to:
              </p>
              <ul>
                <li>Custom web application development (Next.js, React)</li>
                <li>Mobile application development (React Native)</li>
                <li>Billing and CRM software (Valoryx)</li>
                <li>UI/UX design services</li>
                <li>SEO and digital presence setup</li>
              </ul>
              <p>
                All project scopes, timelines, and deliverables are agreed upon in writing (via email or signed agreement) before work commences.
              </p>

              <h3>3. Payment Terms</h3>
              <p>
                Payment terms are specified individually for each project and may include:
              </p>
              <ul>
                <li>An advance payment (typically 30–50%) required before work begins</li>
                <li>Milestone-based payments as agreed in the project proposal</li>
                <li>Final payment upon delivery and client sign-off</li>
              </ul>
              <p>
                All payments are in Indian Rupees (INR) unless otherwise agreed. Late payments may result in a pause of work. No refunds are issued for work already completed and approved.
              </p>

              <h3>4. Intellectual Property</h3>
              <p>
                Upon receipt of full payment, the client receives full ownership of all custom code and assets developed specifically for their project. RYX retains the right to display the work in our portfolio unless the client requests confidentiality in writing.
              </p>
              <p>
                Third-party libraries, frameworks, and tools used in the project are subject to their respective open-source or commercial licenses.
              </p>

              <h3>5. Limitation of Liability</h3>
              <p>
                RYX Dev Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific service that caused the damage.
              </p>
              <p>
                We do not guarantee uninterrupted or error-free operation of any software delivered. Maintenance and support terms are agreed separately from initial development.
              </p>

              <h3>6. Governing Law</h3>
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu, India.
              </p>

              <h3>7. Contact</h3>
              <p>
                For questions regarding these Terms of Service, please contact us at{" "}
                <a href={`mailto:${SITE_CONFIG.company.email}`} className="text-black underline underline-offset-2">
                  {SITE_CONFIG.company.email}
                </a>{" "}
.
              </p>

              {/* ─── PRIVACY POLICY ─── */}
              <h2 className="mt-16 pt-16 border-t border-neutral-200">Privacy Policy</h2>

              <h3>1. Information We Collect</h3>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li>Contact information (name, email address, phone number)</li>
                <li>Business information (company name, project requirements)</li>
                <li>Communication records (emails, WhatsApp messages, form submissions)</li>
              </ul>
              <p>
                We also collect anonymized usage data through website analytics (if enabled) to understand how visitors use our site.
              </p>

              <h3>2. How We Use Your Data</h3>
              <p>We use the information collected to:</p>
              <ul>
                <li>Respond to your inquiries and fulfill project contracts</li>
                <li>Send project updates, invoices, and relevant communications</li>
                <li>Improve our services and website</li>
                <li>Send occasional newsletters or updates (only with your explicit consent)</li>
              </ul>
              <p>
                We do not sell, trade, or rent your personal information to third parties.
              </p>

              <h3>3. Data Storage &amp; Security</h3>
              <p>
                Your data is stored securely. We use industry-standard encryption and access controls. Project files and communications are stored in encrypted cloud services (Google Workspace, Supabase). We retain client data for the duration of the project and for a reasonable period thereafter for legal and accounting purposes.
              </p>

              <h3>4. Third-Party Services</h3>
              <p>
                Our services and website may integrate with third-party tools including:
              </p>
              <ul>
                <li>Google Analytics (website usage analytics)</li>
                <li>Supabase (database and authentication)</li>
                <li>Vercel (website hosting)</li>
                <li>WhatsApp Business (client communication)</li>
              </ul>
              <p>
                Each third-party service has its own privacy policy governing data use.
              </p>

              <h3>5. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Withdraw consent for marketing communications at any time</li>
              </ul>

              <h3>6. Contact</h3>
              <p>
                For privacy-related concerns or data requests, contact our team at{" "}
                <a href={`mailto:${SITE_CONFIG.company.email}`} className="text-black underline underline-offset-2">
                  {SITE_CONFIG.company.email}
                </a>
                . We will respond within 7 business days.
              </p>

              <div className="mt-12 pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-400">
                  &copy; {new Date().getFullYear()} {SITE_CONFIG.company.name}. {SITE_CONFIG.company.city}, {SITE_CONFIG.company.state}, {SITE_CONFIG.company.country}.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
