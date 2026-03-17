import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Custom Software Development Coimbatore — IT Company | RYX Tech",
  description:
    "Custom software development in Coimbatore. Automation, billing software, ERP-like systems, Python automation. RYX Tech — software company in Coimbatore. Contact us today.",
  keywords: [
    "custom software development coimbatore",
    "software development company coimbatore",
    "software company coimbatore",
    "IT company coimbatore",
    "python automation coimbatore",
    "billing software coimbatore",
    "ERP software coimbatore",
    "business software development india",
  ],
  alternates: {
    canonical: "https://ryxtech.in/services/custom-software-development",
  },
  openGraph: {
    title: "Custom Software Development Coimbatore | RYX Tech",
    description:
      "RYX Tech is a software company in Coimbatore building custom automation tools, billing software, and ERP-like systems for Indian businesses.",
    url: "https://ryxtech.in/services/custom-software-development",
    siteName: "RYX Tech",
    locale: "en_IN",
    type: "website",
  },
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software Development Coimbatore",
  description:
    "Custom software development for Indian businesses. RYX Tech builds automation tools, billing software, ERP-like systems, and Python-powered business solutions in Coimbatore.",
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
      contactType: "customer service",
    },
  },
  areaServed: [
    { "@type": "City", name: "Coimbatore" },
    { "@type": "Country", name: "India" },
  ],
  serviceType: "Custom Software Development",
  url: "https://ryxtech.in/services/custom-software-development",
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of custom software do you build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build billing and invoice software, inventory management systems, employee management tools, business process automation scripts using Python, ERP-like systems for SMEs, reporting dashboards, and data processing tools. We also build GST-compliant software for Indian businesses.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I choose custom software over off-the-shelf SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaS tools have monthly fees that add up over years, force you to change your workflow to match their system, and often have features you do not need and lack features you do need. Custom software is a one-time investment that works exactly how your business works, with no recurring license fees and no data locked in a third-party system.",
      },
    },
    {
      "@type": "Question",
      name: "How much does custom software development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple automation tools and scripts start at Rs.20,000. A full billing or management software starts at Rs.80,000. More complex systems like multi-branch inventory or ERP-like platforms range from Rs.1,50,000 to Rs.3,00,000+. We provide a detailed quote after understanding your exact requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Does your software work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we specialize in offline-first software. Our flagship product Valoryx is an offline-first GST billing app that works without internet and syncs to the cloud when connected. We can build similar offline-first capability into any software we develop for you.",
      },
    },
    {
      "@type": "Question",
      name: "Can you automate my existing manual processes using Python?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Python automation is one of our core strengths. We can automate Excel report generation, data entry from PDFs or forms, email notifications and follow-ups, WhatsApp notifications, invoice generation, bank reconciliation, and more. Most automation projects are completed in 2 to 4 weeks.",
      },
    },
  ],
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SPEAKABLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ryxtech.in/services/custom-software-development/#webpage",
  "url": "https://ryxtech.in/services/custom-software-development",
  "name": "Custom Software Development Coimbatore — IT Company | RYX Tech",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable", "dl dt", "dl dd"],
  },
  "about": {
    "@type": "Thing",
    "name": "Custom Software Development",
    "description": "Custom software development for Indian businesses — automation tools, billing software, ERP-like systems, and Python-powered business solutions by RYX Tech in Coimbatore.",
  },
  "isPartOf": { "@id": "https://ryxtech.in/#website" },
};

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://ryxtech.in" },
  { name: "Services", url: "https://ryxtech.in/services" },
  {
    name: "Custom Software Development",
    url: "https://ryxtech.in/services/custom-software-development",
  },
];

const SOFTWARE_TYPES = [
  {
    title: "Billing & Invoice Software",
    description:
      "GST-compliant billing software with thermal printer support, PDF invoice generation, payment tracking, and customer ledger. Built for Indian SMEs.",
  },
  {
    title: "Inventory Management",
    description:
      "Track stock levels across multiple locations, get low-stock alerts, manage purchase orders, and generate inventory reports. Works offline.",
  },
  {
    title: "Employee & HR Tools",
    description:
      "Attendance tracking, leave management, salary calculation, and payslip generation. Reduces HR admin time by 70%.",
  },
  {
    title: "Python Automation Scripts",
    description:
      "Automate repetitive tasks — Excel report generation, email dispatching, PDF data extraction, WhatsApp notifications, and data entry.",
  },
  {
    title: "Business Dashboards",
    description:
      "Real-time business intelligence dashboards showing sales trends, revenue, inventory levels, and customer metrics. Works on web and desktop.",
  },
  {
    title: "ERP-Like Management Systems",
    description:
      "Integrated systems connecting sales, inventory, finance, and HR in one platform. Designed for manufacturing and trading companies in Coimbatore.",
  },
];

export default function CustomSoftwareDevelopmentPage() {
  return (
    <>
      {/* Safe: JSON-LD is hardcoded structured data, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
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
              RYX Tech · Software Company · Coimbatore, India
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Custom Software Development Coimbatore —{" "}
              <span className="text-white/60">
                Automation, Billing Tools and Business Systems
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              We build software that fits your business — not the other way around.
              Automation tools, billing software, ERP-like systems, and Python-powered
              solutions for Indian companies. Based in Coimbatore, serving businesses
              across India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-white text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-100 transition-colors"
              >
                Discuss Your Project
              </Link>
              <a
                href="https://wa.me/918667258008"
                className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/50">
              <span>Automation from Rs.20,000</span>
              <span>Full systems from Rs.80,000</span>
              <span>Offline-first capable</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Software Built for How Indian Businesses Actually Operate
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Indian businesses have unique requirements: GST compliance, multiple tax
                  slabs, HSN codes, e-way bills, TDS calculations, and a mix of cash and
                  digital payments. Generic international SaaS tools rarely handle these
                  correctly. We build software that is GST-compliant by design.
                </p>
                <p>
                  RYX Tech is a software development company based in Coimbatore with deep
                  experience building tools for Indian SMEs — manufacturers, retailers,
                  traders, service businesses, and healthcare providers. Our flagship
                  product, Valoryx, is an offline-first GST billing software we built from
                  the ground up for Indian shopkeepers and small business owners. It handles
                  invoicing, inventory, multi-branch management, and thermal printing — all
                  without requiring an internet connection.
                </p>
                <p>
                  The same expertise that went into Valoryx goes into every custom software
                  project we take on. We understand the practical realities: internet
                  connectivity is not always reliable, staff turnover means software must be
                  easy to learn, and business owners need reports they can actually act on.
                </p>
                <p>
                  Our Python automation work has saved clients significant time on
                  repetitive tasks. We have built scripts that automatically generate weekly
                  Excel reports from raw data, send WhatsApp reminders to customers with
                  pending payments, extract data from scanned GST invoices, and reconcile
                  bank statements with accounting records. These automations typically pay
                  for themselves within 2 to 3 months.
                </p>
                <p>
                  We also build larger systems: ERP-like platforms for manufacturers
                  managing production, purchase, sales, and accounts in one integrated
                  system. For a Coimbatore-based textile manufacturer, this might mean
                  tracking yarn procurement, weaving production, finished goods inventory,
                  and customer dispatch all in one place.
                </p>
                <p>
                  Every software project we deliver comes with full source code ownership,
                  documentation, and a training session. You are not dependent on us to keep
                  using your software — though most clients do choose our maintenance
                  plans for ongoing support and feature additions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Software Types */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-black">
              Software We Build for Coimbatore Businesses
            </h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              From simple automation to complex multi-module systems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SOFTWARE_TYPES.map(({ title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 border border-neutral-100"
                >
                  <h3 className="font-bold text-lg mb-2 text-black">{title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Valoryx spotlight */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#0a0a0a] text-white rounded-3xl p-10 lg:p-16">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                Flagship Product
              </p>
              <h2 className="text-3xl font-bold mb-4">Valoryx — Our Own GST Billing Software</h2>
              <p className="text-white/70 leading-relaxed max-w-2xl mb-8">
                Valoryx is the billing software we built for ourselves and our clients.
                Offline-first, GST-compliant, with thermal printing, inventory management,
                multi-branch support, and cloud sync when connected. It is what we built to
                prove our capability — and it is available for your business too.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                {[
                  { stat: "Offline", label: "Works without internet" },
                  { stat: "GST", label: "Fully compliant" },
                  { stat: "Multi", label: "Branch support" },
                  { stat: "Thermal", label: "Printer support" },
                ].map(({ stat, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-black mb-1">{stat}</p>
                    <p className="text-white/50 text-xs">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/services/gst-billing-software"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-100 transition-colors"
              >
                Learn About Valoryx
              </Link>
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
                { href: "/services/web-application-development", label: "Web App Development" },
                { href: "/services/gst-billing-software", label: "GST Billing Software" },
                { href: "/services/web-design-coimbatore", label: "Web Design" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/pricing", label: "Pricing" },
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
              Ready to Build Custom Software?
            </h2>
            <p className="text-white/60 mb-8">
              Describe your business problem. We will tell you how software can solve it
              and what it will cost. No obligation, no sales pitch — just an honest
              conversation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-full text-sm hover:bg-neutral-100 transition-colors"
              >
                Get a Free Quote
              </Link>
              <a
                href="https://wa.me/918667258008"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                WhatsApp Us
              </a>
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
