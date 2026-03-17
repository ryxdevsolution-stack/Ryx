import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Web Application Development Coimbatore — Full-Stack Solutions | RYX Tech",
  description:
    "Custom web application development in Coimbatore. React, Next.js, Python, Flask, PostgreSQL, Supabase. Admin dashboards, REST APIs, role-based access. From Rs.80,000. RYX Tech.",
  keywords: [
    "web application development coimbatore",
    "web app development india",
    "custom web application coimbatore",
    "full stack web development coimbatore",
    "react next.js development india",
    "python flask development coimbatore",
    "admin dashboard development",
    "custom web app coimbatore",
  ],
  alternates: {
    canonical: "https://ryxtech.in/services/web-application-development",
  },
  openGraph: {
    title: "Web Application Development Coimbatore — Full-Stack by RYX Tech",
    description:
      "Full-stack web app development in Coimbatore. React, Next.js, Python, PostgreSQL. Admin dashboards, APIs, payment integration. Starting Rs.80,000.",
    url: "https://ryxtech.in/services/web-application-development",
    siteName: "RYX Tech",
    locale: "en_IN",
    type: "website",
  },
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Application Development Coimbatore",
  description:
    "Full-stack web application development in Coimbatore. RYX Tech builds React, Next.js, Python and Flask powered web apps with admin dashboards, REST APIs, and payment integration.",
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
  serviceType: "Web Application Development",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    priceRange: "80000-300000",
  },
  url: "https://ryxtech.in/services/web-application-development",
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does custom web application development cost in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Web application development at RYX Tech starts at Rs.80,000 for simpler apps and can go up to Rs.3,00,000 for complex platforms with multiple user roles, payment integration, and third-party API connections. We provide a detailed quote after understanding your requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What tech stack do you use for web app development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use React and Next.js for the frontend, Python with Flask or FastAPI for the backend, and PostgreSQL or Supabase for the database. For payments, we integrate Razorpay or Stripe. For file storage, we use Supabase Storage or AWS S3.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a web application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard web application takes 8 to 16 weeks depending on complexity. A simpler app with a few features and one user role may take 8 weeks. A complex platform with multiple modules, roles, and integrations can take 16 weeks or more.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide post-launch maintenance for web apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer monthly maintenance plans that cover bug fixes, security updates, feature additions, and performance monitoring. Maintenance plans start at Rs.8,000 per month.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build a web app that works on mobile too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our web applications are fully responsive and work on desktop, tablet, and mobile browsers. If you need a native mobile app (iOS or Android), we can discuss that as a separate project or as a Progressive Web App (PWA) which can be installed on mobile devices.",
      },
    },
  ],
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SPEAKABLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ryxtech.in/services/web-application-development/#webpage",
  "url": "https://ryxtech.in/services/web-application-development",
  "name": "Web Application Development Coimbatore — Full-Stack Solutions | RYX Tech",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable", "dl dt", "dl dd"],
  },
  "about": {
    "@type": "Thing",
    "name": "Web Application Development",
    "description": "Full-stack custom web application development using React, Next.js, Python, and PostgreSQL for Indian businesses — from admin dashboards to SaaS platforms.",
  },
  "isPartOf": { "@id": "https://ryxtech.in/#website" },
};

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://ryxtech.in" },
  { name: "Services", url: "https://ryxtech.in/services" },
  {
    name: "Web Application Development",
    url: "https://ryxtech.in/services/web-application-development",
  },
];

const TECH_STACK = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Python", "Flask", "FastAPI", "Node.js"] },
  { category: "Database", items: ["PostgreSQL", "Supabase", "SQLite", "Redis"] },
  { category: "APIs & Auth", items: ["REST APIs", "JWT Auth", "OAuth", "Razorpay"] },
  { category: "DevOps", items: ["Vercel", "Railway", "Nginx", "GitHub Actions"] },
  { category: "Storage", items: ["Supabase Storage", "AWS S3", "Cloudinary"] },
];

const APP_TYPES = [
  {
    title: "Admin Dashboards",
    description:
      "Custom dashboards with analytics, charts, data tables, and CRUD operations. Role-based access control so different users see different data.",
  },
  {
    title: "SaaS Platforms",
    description:
      "Multi-tenant platforms with subscription billing, user onboarding flows, team management, and usage metering.",
  },
  {
    title: "Business Management Tools",
    description:
      "Internal tools for managing orders, inventory, employees, attendance, and reporting — replacing spreadsheets with proper software.",
  },
  {
    title: "Customer Portals",
    description:
      "Client-facing portals where customers can track orders, raise tickets, access documents, and communicate with your team.",
  },
  {
    title: "E-commerce Backends",
    description:
      "Custom e-commerce solutions with product management, order tracking, payment integration with Razorpay, and GST invoice generation.",
  },
  {
    title: "API Development",
    description:
      "RESTful APIs that connect your frontend to your backend or integrate with third-party services like payment gateways and SMS providers.",
  },
];

export default function WebApplicationDevelopmentPage() {
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
              RYX Tech · Coimbatore, India
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Web Application Development in Coimbatore —{" "}
              <span className="text-white/60">Full-Stack Solutions by RYX Tech</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              We build custom web applications using React, Next.js, Python, and PostgreSQL.
              From admin dashboards to full SaaS platforms — we turn complex business
              requirements into clean, scalable software.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-white text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-100 transition-colors"
              >
                Start a Project
              </Link>
              <a
                href="https://wa.me/918667258008"
                className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/50">
              <span>Rs.80,000 to Rs.3,00,000</span>
              <span>8 to 16 weeks timeline</span>
              <span>Post-launch maintenance available</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Custom Web Applications Built for Indian Businesses
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Off-the-shelf software rarely fits the way Indian businesses actually
                  operate. Your GST workflow, your multi-branch inventory system, your
                  customer credit management — these are specific to your business and your
                  market. Generic SaaS tools force you to change your workflow to fit their
                  software. We build software that fits your workflow.
                </p>
                <p>
                  RYX Tech specializes in full-stack web application development for
                  businesses in Coimbatore and across India. Our stack — React and Next.js
                  on the frontend, Python with Flask on the backend, and PostgreSQL or
                  Supabase for the database — is battle-tested for performance, security, and
                  long-term maintainability.
                </p>
                <p>
                  We have built admin dashboards that replaced 10-tab Excel spreadsheets,
                  customer portals that reduced support emails by 60%, and internal tools
                  that automated hours of manual data entry every day. Every application we
                  build starts with a deep understanding of your business processes.
                </p>
                <p>
                  Role-based access control is standard in all our applications — admins,
                  managers, employees, and customers each see only what they should see.
                  All data is secured with JWT authentication and server-side authorization
                  checks. We do not cut corners on security.
                </p>
                <p>
                  Payment integration is a common requirement for Indian web apps. We
                  integrate Razorpay for domestic payments, supporting UPI, cards, net
                  banking, and EMI. For international clients, we also integrate Stripe.
                  GST-compliant invoice generation is built in by default for any app
                  handling transactions.
                </p>
                <p>
                  Every application is deployed with proper infrastructure — version-controlled
                  code on GitHub, automated deployments via GitHub Actions or Vercel, database
                  backups, and server monitoring. You get not just working software, but
                  software that can be maintained, updated, and scaled as your business grows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Types */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-black">
              Types of Web Apps We Build
            </h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              From internal tools to customer-facing platforms — we handle the full spectrum.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {APP_TYPES.map(({ title, description }) => (
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

        {/* Tech Stack */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-black">Our Technology Stack</h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              Modern, proven technologies chosen for performance, security, and long-term
              maintainability.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {TECH_STACK.map(({ category, items }) => (
                <div key={category}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                    {category}
                  </p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-sm font-medium text-neutral-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#0a0a0a] text-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Web Application Development Pricing</h2>
            <p className="text-white/50 mb-12 max-w-2xl">
              Pricing varies by scope. These are indicative ranges — we provide a fixed
              quote after a requirements discussion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Simple Web App
                </p>
                <p className="text-4xl font-bold mb-2">Rs.80,000</p>
                <p className="text-white/50 text-sm mb-6">Starting price</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Single module</li>
                  <li>1 to 2 user roles</li>
                  <li>CRUD operations</li>
                  <li>Basic dashboard</li>
                  <li>REST API</li>
                  <li>8 to 10 week delivery</li>
                </ul>
              </div>
              <div className="border border-white rounded-2xl p-8 relative">
                <p className="absolute -top-3 left-6 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                  Most Common
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Business Platform
                </p>
                <p className="text-4xl font-bold mb-2">Rs.1,50,000</p>
                <p className="text-white/50 text-sm mb-6">Mid-range scope</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Multiple modules</li>
                  <li>3 to 5 user roles</li>
                  <li>Admin dashboard</li>
                  <li>Payment integration</li>
                  <li>Email and SMS notifications</li>
                  <li>Reports and exports</li>
                  <li>12 to 14 week delivery</li>
                </ul>
              </div>
              <div className="border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Enterprise App
                </p>
                <p className="text-4xl font-bold mb-2">Rs.3,00,000+</p>
                <p className="text-white/50 text-sm mb-6">Complex scope</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Full SaaS or multi-tenant</li>
                  <li>Complex business logic</li>
                  <li>Third-party integrations</li>
                  <li>Advanced analytics</li>
                  <li>Mobile PWA</li>
                  <li>CI/CD pipeline setup</li>
                  <li>16+ week delivery</li>
                </ul>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-8">
              Need a more precise estimate?{" "}
              <a
                href="https://wa.me/918667258008"
                className="text-white/70 underline underline-offset-2"
              >
                WhatsApp us your requirements
              </a>{" "}
              and we will respond within 24 hours.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-black">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-8">
              {FAQ_SCHEMA.mainEntity.map((item) => (
                <div
                  key={item.name}
                  className="border-b border-neutral-100 pb-8"
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
        <section className="bg-neutral-50 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm text-neutral-500 mb-4 font-semibold uppercase tracking-widest">
              Explore More
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/services", label: "All Services" },
                { href: "/services/web-design-coimbatore", label: "Web Design" },
                { href: "/services/custom-software-development", label: "Custom Software" },
                { href: "/services/gst-billing-software", label: "GST Billing Software" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white border border-neutral-200 text-neutral-700 text-sm px-4 py-2 rounded-full hover:border-neutral-400 transition-colors"
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
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Web App?</h2>
            <p className="text-white/60 mb-8">
              Tell us what you want to build. We will scope it, quote it, and deliver it
              on time. No vague timelines, no surprise invoices.
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
