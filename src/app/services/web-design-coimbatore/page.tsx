import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Web Design Coimbatore — Professional Website Design | RYX Tech",
  description:
    "Looking for web design in Coimbatore? RYX Tech creates responsive, SEO-optimized business websites and landing pages. UI/UX focused. From ₹40,000. Call or WhatsApp us today.",
  keywords: [
    "web design coimbatore",
    "website design coimbatore",
    "web designer coimbatore",
    "professional web design coimbatore",
    "responsive web design coimbatore",
    "website design company coimbatore",
    "UI UX design coimbatore",
    "landing page design coimbatore",
  ],
  alternates: {
    canonical: "https://ryxtech.in/services/web-design-coimbatore",
  },
  openGraph: {
    title: "Web Design Coimbatore — Professional Website Design | RYX Tech",
    description:
      "RYX Tech builds stunning, fast, SEO-optimized business websites in Coimbatore. Mobile-first design. Starting ₹40,000.",
    url: "https://ryxtech.in/services/web-design-coimbatore",
    siteName: "RYX Tech",
    locale: "en_IN",
    type: "website",
  },
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Design Coimbatore",
  description:
    "Professional website design services in Coimbatore, Tamil Nadu. RYX Tech creates responsive, SEO-optimized business websites, landing pages, and UI/UX designs.",
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
  areaServed: { "@type": "City", name: "Coimbatore" },
  serviceType: "Web Design",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    priceRange: "40000-80000",
  },
  url: "https://ryxtech.in/services/web-design-coimbatore",
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does web design cost in Coimbatore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A professional business website from RYX Tech starts at Rs.40,000 and goes up to Rs.80,000 depending on the number of pages, design complexity, and custom features. Landing pages start at Rs.20,000. We provide fixed pricing with no hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to design a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard business website takes 3 to 6 weeks from kickoff to launch. This includes wireframing, design, development, content integration, and testing. Rush timelines are available for an additional fee.",
      },
    },
    {
      "@type": "Question",
      name: "Will my website be mobile-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every website we design is mobile-first and fully responsive. We test across iOS, Android, and all major browsers before delivery. Over 70% of web traffic in India is mobile, so this is non-negotiable for us.",
      },
    },
    {
      "@type": "Question",
      name: "Do you include SEO with web design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our websites include on-page SEO — optimized meta titles, descriptions, heading structure, image alt text, schema markup, and Core Web Vitals optimization. We also set up Google Search Console and Google Analytics.",
      },
    },
    {
      "@type": "Question",
      name: "Will I be able to update the website myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We either build a simple CMS for your website or provide a 1-hour training session so you can update text, images, and blog posts on your own. For ongoing maintenance, we offer monthly support packages.",
      },
    },
  ],
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SPEAKABLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ryxtech.in/services/web-design-coimbatore/#webpage",
  "url": "https://ryxtech.in/services/web-design-coimbatore",
  "name": "Web Design Coimbatore — Professional Website Design | RYX Tech",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable", "dl dt", "dl dd"],
  },
  "about": {
    "@type": "Thing",
    "name": "Web Design Coimbatore",
    "description": "Professional website design services in Coimbatore by RYX Tech — responsive, SEO-optimized business websites and landing pages starting from ₹40,000.",
  },
  "isPartOf": { "@id": "https://ryxtech.in/#website" },
};

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://ryxtech.in" },
  { name: "Services", url: "https://ryxtech.in/services" },
  { name: "Web Design Coimbatore", url: "https://ryxtech.in/services/web-design-coimbatore" },
];

const FEATURES = [
  {
    title: "Mobile-First Design",
    description:
      "Every website is designed for mobile first, then scaled up. Over 70% of your visitors come from smartphones — we make sure they get a flawless experience.",
  },
  {
    title: "SEO-Optimized Structure",
    description:
      "Clean semantic HTML, fast load times, structured data, and optimized meta tags baked in from day one. Your site is Google-ready before it launches.",
  },
  {
    title: "UI/UX That Converts",
    description:
      "We don't just make websites look good. Every layout, color choice, and call-to-action is designed to guide visitors toward taking action — calling you, booking, or buying.",
  },
  {
    title: "Fast Load Speeds",
    description:
      "Slow websites lose customers. We build with performance-first principles — optimized images, minimal JavaScript, and CDN delivery to ensure sub-2s load times.",
  },
  {
    title: "Analytics & Search Console",
    description:
      "We set up tracking from day one so you can see where your visitors come from, which pages they visit, and how they find you on Google.",
  },
  {
    title: "WhatsApp & Contact Integration",
    description:
      "Every website we build includes a WhatsApp chat button, a contact form, and Google Maps integration — making it easy for Coimbatore customers to reach you instantly.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We start with a 30-minute call to understand your business, target audience, competitors, and goals. No forms — just a real conversation on WhatsApp or phone.",
  },
  {
    step: "02",
    title: "Design & Wireframe",
    description:
      "We create wireframes and a visual prototype in Figma. You see exactly how your website will look before a single line of code is written.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Once you approve the design, we build it with Next.js and Tailwind CSS — modern, fast, and fully responsive code that performs exceptionally on Google.",
  },
  {
    step: "04",
    title: "Review & Launch",
    description:
      "You review the live preview, we make revisions, and then we deploy to your domain. Post-launch support is included for 30 days.",
  },
];

export default function WebDesignCoimbatorePage() {
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
              Web Design Coimbatore —{" "}
              <span className="text-white/60">
                Professional Website Design by RYX Tech
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              We design and build high-performance, SEO-optimized business websites for
              Coimbatore companies. Mobile-first, conversion-focused, and built with modern
              technology that your competitors are not using yet.
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
              <span>Fixed pricing — no hidden fees</span>
              <span>30-day post-launch support</span>
              <span>Delivered in 3 to 6 weeks</span>
            </div>
          </div>
        </section>

        {/* About the service */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Why Web Design in Coimbatore Matters More Than Ever
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Coimbatore is no longer just a textile and engineering hub — it is one of
                  the fastest-growing tech and business cities in Tamil Nadu. Customers in
                  Coimbatore now search Google before calling anyone. If your website does not
                  show up, or shows up but looks outdated, you are losing business to
                  competitors every single day.
                </p>
                <p>
                  At RYX Tech, we build websites that work as active sales tools — not digital
                  brochures. Every design decision is backed by data: layout, color,
                  typography, button placement, and page speed. We use the same technologies
                  that top startups and enterprises use: Next.js for lightning-fast performance,
                  Tailwind CSS for pixel-perfect design, and structured data markup that helps
                  Google understand your business.
                </p>
                <p>
                  Whether you are a doctor in R.S. Puram, a manufacturer in Peelamedu, a
                  retailer in Gandhipuram, or a startup in TIDEL Park — a professionally
                  designed website is the foundation of your digital presence. We have helped
                  businesses across Coimbatore establish that foundation.
                </p>
                <p>
                  Our web design process starts with understanding your customers, your
                  competitors, and what makes your business unique. We create wireframes first
                  so you see the layout before we write a single line of code. Once approved,
                  we develop the full site with responsive design, optimized images, and clean
                  semantic HTML that search engines love.
                </p>
                <p>
                  Every website includes: SEO-optimized pages with proper meta tags and
                  schema markup, a WhatsApp chat button for instant customer contact, Google
                  Analytics and Search Console integration, contact forms with email
                  notifications, and a Google Maps embed for local SEO. These are not add-ons
                  — they are standard in every project.
                </p>
                <p>
                  We also build landing pages for specific campaigns — product launches, Google
                  Ads, and seasonal promotions. A focused landing page with a single
                  call-to-action converts significantly better than sending ad traffic to your
                  homepage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-black">
              What Is Included in Every Web Design Project
            </h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              No tiers, no upsells. These are standard in every website we build.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map(({ title, description }) => (
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

        {/* Process */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-black">How We Work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map(({ step, title, description }) => (
                <div key={step}>
                  <p className="text-5xl font-black text-neutral-100 mb-3">{step}</p>
                  <h3 className="font-bold text-lg mb-2 text-black">{title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#0a0a0a] text-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Web Design Pricing in Coimbatore</h2>
            <p className="text-white/50 mb-12 max-w-2xl">
              Fixed project pricing. No monthly fees unless you choose a maintenance plan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Landing Page
                </p>
                <p className="text-4xl font-bold mb-2">Rs.20,000</p>
                <p className="text-white/50 text-sm mb-6">Starting price</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Single-page design</li>
                  <li>Mobile-responsive</li>
                  <li>SEO meta tags</li>
                  <li>Contact form</li>
                  <li>WhatsApp button</li>
                  <li>1-week delivery</li>
                </ul>
              </div>
              <div className="border border-white rounded-2xl p-8 relative">
                <p className="absolute -top-3 left-6 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Business Website
                </p>
                <p className="text-4xl font-bold mb-2">Rs.40,000</p>
                <p className="text-white/50 text-sm mb-6">5 to 8 pages</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Home, About, Services, Contact and more</li>
                  <li>Mobile-first design</li>
                  <li>Full on-page SEO</li>
                  <li>Google Analytics setup</li>
                  <li>WhatsApp chat widget</li>
                  <li>Google Maps integration</li>
                  <li>3 to 4 week delivery</li>
                  <li>30-day support</li>
                </ul>
              </div>
              <div className="border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Premium Website
                </p>
                <p className="text-4xl font-bold mb-2">Rs.80,000</p>
                <p className="text-white/50 text-sm mb-6">Custom scope</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Everything in Business</li>
                  <li>Blog and CMS integration</li>
                  <li>Advanced animations</li>
                  <li>E-commerce features</li>
                  <li>Custom integrations</li>
                  <li>6-week delivery</li>
                  <li>60-day support</li>
                </ul>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-8">
              All prices are for full project delivery. Hosting and domain are billed separately.{" "}
              <Link href="/pricing" className="text-white/70 underline underline-offset-2">
                View full pricing
              </Link>
            </p>
          </div>
        </section>

        {/* Why RYX Tech */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-black">
                  Why Coimbatore Businesses Choose RYX Tech
                </h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>
                    We are a small, focused team — not a 50-person agency with account
                    managers between you and your developer. When you work with RYX Tech, you
                    work directly with the people building your website. That means faster
                    decisions, better communication, and no quality compromise.
                  </p>
                  <p>
                    We understand Coimbatore businesses because we are one. We know what local
                    customers search for, what kind of trust signals matter in this market, and
                    how to position your business in Tamil Nadu&apos;s competitive digital landscape.
                  </p>
                  <p>
                    Our websites are built using technologies like Next.js that most local
                    design shops in Coimbatore do not use. This means your site loads faster,
                    ranks better on Google, and handles traffic without breaking.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/portfolio"
                    className="bg-black text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-800 transition-colors"
                  >
                    View Our Work
                  </Link>
                  <Link
                    href="/services"
                    className="border border-black/20 text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-black/5 transition-colors"
                  >
                    All Services
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "3–6", label: "Weeks to launch" },
                  { stat: "100%", label: "Mobile responsive" },
                  { stat: "Rs.40K", label: "Starting price" },
                  { stat: "30d", label: "Post-launch support" },
                ].map(({ stat, label }) => (
                  <div
                    key={label}
                    className="bg-white rounded-2xl p-6 border border-neutral-100 text-center"
                  >
                    <p className="text-4xl font-black text-black mb-1">{stat}</p>
                    <p className="text-sm text-neutral-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
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
                { href: "/services/web-application-development", label: "Web Application Development" },
                { href: "/services/website-development-coimbatore", label: "Website Development" },
                { href: "/services/custom-software-development", label: "Custom Software" },
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
            <h2 className="text-3xl font-bold mb-4">Ready for a Stunning Website?</h2>
            <p className="text-white/60 mb-8">
              Contact us on WhatsApp or fill out our contact form and we will get back to
              you within 24 hours with a custom quote.
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
