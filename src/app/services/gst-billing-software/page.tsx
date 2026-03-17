import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "GST Billing Software India — Valoryx by RYX Tech | Offline-First",
  description:
    "Valoryx is an offline-first GST billing software by RYX Tech, Coimbatore. Thermal printing, multi-branch, inventory, GST reports. Built for Indian small businesses. Contact for demo.",
  keywords: [
    "GST billing software india",
    "billing software coimbatore",
    "GST invoice software",
    "Valoryx billing",
    "offline GST billing software",
    "GST billing app india",
    "thermal printer billing software",
    "inventory billing software coimbatore",
  ],
  alternates: {
    canonical: "https://ryxtech.in/services/gst-billing-software",
  },
  openGraph: {
    title: "Valoryx — Offline-First GST Billing Software by RYX Tech",
    description:
      "Valoryx is an offline-first GST billing app for Indian businesses. Thermal printing, inventory, multi-branch, cloud sync. By RYX Tech, Coimbatore.",
    url: "https://ryxtech.in/services/gst-billing-software",
    siteName: "RYX Tech",
    locale: "en_IN",
    type: "website",
  },
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Valoryx",
  description:
    "Offline-first GST billing software for Indian small businesses and retailers. Features: GST-compliant invoicing, inventory management, multi-branch support, thermal printer integration, cloud sync.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows, Web",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "RYX Tech",
      url: "https://ryxtech.in",
    },
  },
  provider: {
    "@type": "Organization",
    name: "RYX Tech",
    url: "https://ryxtech.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8667258008",
      email: "ryxtechie@gmail.com",
    },
  },
  url: "https://ryxtech.in/services/gst-billing-software",
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Valoryx work without internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Valoryx is built offline-first — it works completely without an internet connection. All data is stored locally on your device. When you connect to the internet, it syncs to the cloud automatically. This makes it ideal for shops and businesses in areas with unreliable connectivity.",
      },
    },
    {
      "@type": "Question",
      name: "Is Valoryx compliant with Indian GST requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Valoryx generates GST-compliant invoices with CGST, SGST, and IGST breakdowns. It supports multiple GST slabs (0%, 5%, 12%, 18%, 28%), HSN codes, and generates GSTR reports. Invoices include all mandatory fields required by GST law.",
      },
    },
    {
      "@type": "Question",
      name: "Does it support thermal printers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Valoryx supports 58mm and 80mm thermal printers that are common in Indian retail shops. You can print GST invoices and receipts directly from the app. It also supports A4 PDF invoice printing for formal billing.",
      },
    },
    {
      "@type": "Question",
      name: "Can I manage multiple branches with Valoryx?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Valoryx supports multi-branch operation. Each branch maintains its own inventory and billing, and the owner gets a consolidated view across all branches from the dashboard. Branch-level reports and transfers between branches are supported.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Valoryx cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Valoryx pricing depends on the number of users and branches. Contact us on WhatsApp at +91-8667258008 or email ryxtechie@gmail.com for a demo and pricing tailored to your business size.",
      },
    },
  ],
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SPEAKABLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ryxtech.in/services/gst-billing-software/#webpage",
  "url": "https://ryxtech.in/services/gst-billing-software",
  "name": "GST Billing Software India — Valoryx by RYX Tech | Offline-First",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable", "dl dt", "dl dd"],
  },
  "about": {
    "@type": "Thing",
    "name": "GST Billing Software",
    "description": "Valoryx is an offline-first GST billing software by RYX Tech built for Indian small businesses — with thermal printing, inventory management, multi-branch support, and GST compliance.",
  },
  "isPartOf": { "@id": "https://ryxtech.in/#website" },
};

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://ryxtech.in" },
  { name: "Services", url: "https://ryxtech.in/services" },
  {
    name: "GST Billing Software",
    url: "https://ryxtech.in/services/gst-billing-software",
  },
];

const FEATURES = [
  {
    title: "Offline-First Architecture",
    description:
      "Works 100% without internet. All data stored locally and syncs to the cloud when you reconnect. Never lose a sale due to poor connectivity.",
  },
  {
    title: "GST-Compliant Invoicing",
    description:
      "Generates proper GST invoices with CGST, SGST, and IGST breakdowns. Supports all GST slabs, HSN codes, and auto-calculates tax amounts.",
  },
  {
    title: "Thermal Printer Support",
    description:
      "Print receipts on 58mm and 80mm thermal printers directly from the app. Also generates A4 PDF invoices for formal billing via email or WhatsApp.",
  },
  {
    title: "Inventory Management",
    description:
      "Track stock in real time. Get alerts when items run low. Record purchases and auto-update stock levels when you create invoices.",
  },
  {
    title: "Multi-Branch Support",
    description:
      "Manage multiple shops or branches from one account. Each branch has its own inventory and billing. Consolidated reports for owners.",
  },
  {
    title: "GST Reports",
    description:
      "Generate GSTR-ready reports for your accountant. Monthly, quarterly, and annual summaries of sales, purchases, and tax collected.",
  },
  {
    title: "Customer Ledger",
    description:
      "Track customer balances and credit. Know who owes you money. Send payment reminders. Maintain complete transaction history per customer.",
  },
  {
    title: "Cloud Sync",
    description:
      "When connected to internet, data syncs to the cloud. Access your business data from anywhere. Automatic backup so you never lose data.",
  },
];

export default function GstBillingSoftwarePage() {
  return (
    <>
      {/* Safe: JSON-LD is hardcoded structured data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }}
      />
      {/* Safe: JSON-LD is hardcoded structured data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      {/* Safe: JSON-LD is hardcoded structured data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SPEAKABLE_SCHEMA) }}
      />
      <BreadcrumbSchema items={BREADCRUMB_ITEMS} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0a0a0a] text-white pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              RYX Tech · Coimbatore — Flagship Product
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Valoryx — GST Billing Software for{" "}
              <span className="text-white/60">
                Indian Businesses That Works Offline
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              Valoryx is an offline-first GST billing app built by RYX Tech for Indian
              retailers, shopkeepers, and small businesses. Thermal printing, inventory
              management, multi-branch support, and GST reports — all in one app.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/918667258008"
                className="bg-white text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-100 transition-colors"
              >
                Request a Demo
              </a>
              <Link
                href="/contact"
                className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                Get Pricing
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/50">
              <span>Works without internet</span>
              <span>Thermal printer support</span>
              <span>GST-compliant by design</span>
            </div>
          </div>
        </section>

        {/* About Valoryx */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-black">
                GST Billing Software Built for Indian Realities
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Valoryx was born out of a simple frustration: most billing software
                  available in India is either too expensive, too complicated, too slow, or
                  stops working when the internet goes down. We built Valoryx to fix all of
                  these problems.
                </p>
                <p>
                  The offline-first architecture is the most important feature. In India,
                  internet connectivity can be unreliable — especially during peak business
                  hours, in basement shops, or in tier-2 cities and semi-urban areas.
                  Valoryx stores all data locally on your device. You can create bills,
                  manage inventory, and print receipts even without an internet connection.
                  When you reconnect, everything syncs to the cloud automatically.
                </p>
                <p>
                  GST compliance is non-negotiable for Indian businesses. Valoryx generates
                  invoices with proper CGST and SGST breakdowns for intra-state sales and
                  IGST for inter-state transactions. It supports all GST tax slabs — 0%,
                  5%, 12%, 18%, and 28% — and automatically selects the correct rate based
                  on the HSN code of the product. At the end of the month, it generates
                  GSTR-ready reports that your accountant can directly use.
                </p>
                <p>
                  Thermal printing is a must for retail. Valoryx works with standard 58mm
                  and 80mm thermal receipt printers that you can buy in any market for
                  under Rs.3,000. You can also print formal GST invoices as A4 PDFs and
                  share them via WhatsApp or email directly from the app.
                </p>
                <p>
                  For businesses with multiple locations, the multi-branch feature lets you
                  manage each branch independently while giving the owner a consolidated
                  view of total sales, inventory, and revenue across all branches. Stock
                  transfers between branches are tracked and recorded.
                </p>
                <p>
                  Valoryx is currently available for Windows desktop and as a web
                  application. Mobile app support is planned. Contact us for a live demo —
                  we will walk you through the entire product in 30 minutes and answer all
                  your questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-black">
              Everything Your Business Needs in One App
            </h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              Valoryx covers billing, inventory, reports, and customer management — no
              additional tools needed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map(({ title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 border border-neutral-100"
                >
                  <h3 className="font-bold text-base mb-2 text-black">{title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-black">
              Who Uses Valoryx
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  type: "Retail Shops",
                  description:
                    "Grocery stores, clothing shops, electronics retailers — any business that needs fast billing with thermal receipt printing.",
                },
                {
                  type: "Wholesale Traders",
                  description:
                    "Businesses doing bulk sales to other businesses. Track pending payments, generate GST invoices, manage large stock volumes.",
                },
                {
                  type: "Service Businesses",
                  description:
                    "Workshops, service centres, repair shops. Bill for labor and parts, track customer history, send professional invoices.",
                },
                {
                  type: "Pharmacies",
                  description:
                    "Medicine inventory with batch numbers and expiry dates. Generate pharmacy bills with correct GST rates.",
                },
                {
                  type: "Restaurants and Bakeries",
                  description:
                    "Quick billing with thermal printing. Table management, takeaway orders, and end-of-day sales reports.",
                },
                {
                  type: "Multi-Branch Businesses",
                  description:
                    "Businesses with more than one location that need centralized control while each branch operates independently.",
                },
              ].map(({ type, description }) => (
                <div
                  key={type}
                  className="border border-neutral-100 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-lg mb-2 text-black">{type}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-black">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-8">
              {FAQ_SCHEMA.mainEntity.map((item) => (
                <div
                  key={item.name}
                  className="border-b border-neutral-200 pb-8"
                >
                  <dt className="font-bold text-lg text-black mb-3">{item.name}</dt>
                  <dd className="text-neutral-600 leading-relaxed">
                    {item.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Internal links */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm text-neutral-500 mb-4 font-semibold uppercase tracking-widest">
              Explore More
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/services", label: "All Services" },
                { href: "/services/custom-software-development", label: "Custom Software" },
                { href: "/services/web-application-development", label: "Web App Development" },
                { href: "/services/web-design-coimbatore", label: "Web Design" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-neutral-50 border border-neutral-200 text-neutral-700 text-sm px-4 py-2 rounded-full hover:border-neutral-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0a0a0a] text-white py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              See Valoryx in Action
            </h2>
            <p className="text-white/60 mb-8">
              Request a free 30-minute demo on WhatsApp or video call. We will show you
              the full product and answer every question you have about how it fits your
              business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/918667258008"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-full text-sm hover:bg-neutral-100 transition-colors"
              >
                Request a Demo on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                Get Pricing
              </Link>
            </div>
            <p className="text-white/30 text-sm mt-6">
              Or email us at{" "}
              <a
                href="mailto:ryxtechie@gmail.com"
                className="text-white/50 hover:text-white transition-colors"
              >
                ryxtechie@gmail.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
