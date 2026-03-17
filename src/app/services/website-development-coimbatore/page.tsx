import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Website Development Coimbatore — Professional Websites | RYX Tech",
  description:
    "Professional website development in Coimbatore. Fast, SEO-optimized, mobile-first websites that rank on Google. Better than WordPress. From Rs.40,000. RYX Tech.",
  keywords: [
    "website development coimbatore",
    "website developer coimbatore",
    "professional website coimbatore",
    "website development company coimbatore",
    "business website coimbatore",
    "website making coimbatore",
    "website creation coimbatore",
    "SEO website coimbatore",
  ],
  alternates: {
    canonical: "https://ryxtech.in/services/website-development-coimbatore",
  },
  openGraph: {
    title: "Website Development Coimbatore — Professional Websites | RYX Tech",
    description:
      "RYX Tech builds fast, SEO-optimized business websites in Coimbatore. Better than WordPress. Ranks on Google. Starting Rs.40,000.",
    url: "https://ryxtech.in/services/website-development-coimbatore",
    siteName: "RYX Tech",
    locale: "en_IN",
    type: "website",
  },
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Development Coimbatore",
  description:
    "Professional website development in Coimbatore by RYX Tech. Fast, SEO-optimized, mobile-first business websites that help you rank on Google.",
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
  serviceType: "Website Development",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    priceRange: "40000-80000",
  },
  url: "https://ryxtech.in/services/website-development-coimbatore",
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why should I choose a custom website over WordPress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordPress sites are built on a plugin-heavy architecture that slows down over time and requires constant security updates. Custom websites built with Next.js load 3 to 5 times faster, have no plugin vulnerabilities, and are tailored exactly to your business needs. Faster loading directly improves your Google ranking and reduces bounce rates.",
      },
    },
    {
      "@type": "Question",
      name: "How long does website development take in Coimbatore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard 5 to 8 page business website takes 3 to 4 weeks. A landing page takes 1 week. More complex websites with a blog, booking system, or e-commerce features take 5 to 8 weeks. We give you a firm timeline before starting.",
      },
    },
    {
      "@type": "Question",
      name: "Will my website appear on Google search?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build every website with full on-page SEO — proper title tags, meta descriptions, heading structure, image alt text, schema markup, and fast loading speeds. We also submit your site to Google Search Console. Ranking on Google also depends on your content and backlinks over time, but we give you the technical foundation that Google rewards.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay separately for hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Website hosting and domain registration are billed separately. We recommend Vercel for hosting (starting at zero cost for static sites) and Namecheap or GoDaddy for domain registration. A typical .in domain costs Rs.800 to Rs.1,200 per year, and basic hosting costs Rs.0 to Rs.3,000 per year depending on your needs.",
      },
    },
    {
      "@type": "Question",
      name: "Can you redesign my existing website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Website redesign and migration is a common service we offer. We review your existing site, identify what is working, and rebuild it with modern technology while preserving your SEO rankings. Redesign pricing is the same as a new website — starting from Rs.40,000.",
      },
    },
  ],
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SPEAKABLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ryxtech.in/services/website-development-coimbatore/#webpage",
  "url": "https://ryxtech.in/services/website-development-coimbatore",
  "name": "Website Development Coimbatore — Professional Websites | RYX Tech",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable", "dl dt", "dl dd"],
  },
  "about": {
    "@type": "Thing",
    "name": "Website Development Coimbatore",
    "description": "Professional website development in Coimbatore by RYX Tech — fast, SEO-optimized, mobile-first business websites built with Next.js starting from ₹40,000.",
  },
  "isPartOf": { "@id": "https://ryxtech.in/#website" },
};

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://ryxtech.in" },
  { name: "Services", url: "https://ryxtech.in/services" },
  {
    name: "Website Development Coimbatore",
    url: "https://ryxtech.in/services/website-development-coimbatore",
  },
];

const ADVANTAGES = [
  {
    title: "3x Faster Than WordPress",
    description:
      "WordPress sites average 3 to 5 second load times. Our Next.js sites typically load in under 1 second. Google rewards fast sites with better rankings.",
  },
  {
    title: "Ranks on Google",
    description:
      "Every site includes full on-page SEO, schema markup, Core Web Vitals optimization, and Google Search Console setup from day one.",
  },
  {
    title: "No Plugin Vulnerabilities",
    description:
      "WordPress is the most hacked CMS in the world because of plugins. Our custom code has no plugin layer — fewer attack surfaces, better security.",
  },
  {
    title: "Zero Ongoing License Fees",
    description:
      "No WordPress theme fees, no premium plugin renewals, no page builder subscriptions. You own the code outright.",
  },
  {
    title: "Built for Your Business",
    description:
      "Not a template. Every page is designed specifically for your business, your customers, and your goals. No generic layouts.",
  },
  {
    title: "WhatsApp-First Support",
    description:
      "Post-launch support via WhatsApp. No ticket systems, no call centers. Direct access to the developer who built your site.",
  },
];

export default function WebsiteDevelopmentCoimbatorePage() {
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
              Website Development Coimbatore —{" "}
              <span className="text-white/60">
                Fast, Modern, Built to Rank on Google
              </span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              We develop professional business websites in Coimbatore that load fast, look
              great, and rank on Google. Built with Next.js — not WordPress — for maximum
              performance and minimum maintenance headaches.
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
              <span>Starting at Rs.40,000</span>
              <span>3 to 6 weeks delivery</span>
              <span>SEO included by default</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Website Development in Coimbatore — What You Actually Need
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Most business owners in Coimbatore come to us with one of two problems:
                  they either have no website, or they have a website that does not work —
                  slow, outdated, not showing up on Google, and embarrassing to share with
                  clients. Both problems have the same solution: a professionally developed
                  website built with the right technology.
                </p>
                <p>
                  When we say right technology, we mean Next.js. While most local developers
                  in Coimbatore still build with WordPress or basic HTML templates, we use
                  Next.js — the same framework used by Airbnb, TikTok, and thousands of
                  high-traffic businesses worldwide. The result is a website that loads in
                  under 1 second, scores high on Google&apos;s Core Web Vitals, and requires
                  minimal maintenance.
                </p>
                <p>
                  A fast-loading website is not just a technical achievement — it directly
                  affects your Google ranking. Google has confirmed that page speed is a
                  ranking factor. A website that loads in 0.8 seconds will outrank an
                  identical website that loads in 3 seconds, all else being equal. We
                  optimize every image, eliminate render-blocking scripts, and deploy on
                  global CDNs to hit those load time targets.
                </p>
                <p>
                  Local SEO is baked into our development process. Every website we build
                  for a Coimbatore business includes: a properly structured Google Business
                  Profile integration, local schema markup with your address and phone
                  number, neighborhood-specific landing pages if needed, and content
                  optimized for Coimbatore-specific search queries.
                </p>
                <p>
                  We also handle content. Many business owners do not know what to write on
                  their website — we help you structure your services clearly, write
                  compelling copy, and make sure your key messages are visible above the
                  fold. A beautiful website with weak content does not convert. We make sure
                  yours does both.
                </p>
                <p>
                  Post-launch, we provide 30 days of free support. After that, we offer
                  affordable monthly maintenance plans for updates, security patches, and
                  new content additions. You can also manage the site yourself — we provide
                  a simple training session before handover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-black">
              Why Our Websites Outperform WordPress Sites
            </h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              This is not about preference. It is about measurable results.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {ADVANTAGES.map(({ title, description }) => (
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

        {/* Comparison table */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-black">
              RYX Tech vs. WordPress vs. Freelancer
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 pr-6 font-semibold text-neutral-500 uppercase tracking-widest text-xs">
                      Feature
                    </th>
                    <th className="text-left py-3 pr-6 font-semibold text-black">RYX Tech</th>
                    <th className="text-left py-3 pr-6 font-semibold text-neutral-500">
                      WordPress Agency
                    </th>
                    <th className="text-left py-3 font-semibold text-neutral-500">
                      Freelancer
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {[
                    ["Page Load Speed", "Under 1 second", "2 to 5 seconds", "Varies"],
                    ["SEO Setup", "Full (included)", "Basic", "Often skipped"],
                    ["Mobile-First", "Always", "Usually", "Depends"],
                    ["Security", "No plugins, minimal attack surface", "Plugin-dependent", "Varies"],
                    ["Post-Launch Support", "30 days free", "Paid plan required", "Often unavailable"],
                    ["Code Ownership", "100% yours", "Theme-locked", "Sometimes"],
                    ["Ongoing Plugin Costs", "None", "Rs.5,000-20,000/yr", "Depends"],
                    ["Direct Dev Access", "Yes always", "Account manager", "Yes"],
                  ].map(([feature, ryx, wp, freelancer]) => (
                    <tr key={feature}>
                      <td className="py-3 pr-6 text-neutral-500">{feature}</td>
                      <td className="py-3 pr-6 font-medium text-black">{ryx}</td>
                      <td className="py-3 pr-6 text-neutral-500">{wp}</td>
                      <td className="py-3 text-neutral-500">{freelancer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#0a0a0a] text-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Website Development Pricing</h2>
            <p className="text-white/50 mb-12 max-w-2xl">
              Transparent, fixed pricing with no hidden fees.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <div className="border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Business Website
                </p>
                <p className="text-4xl font-bold mb-2">Rs.40,000 – Rs.80,000</p>
                <p className="text-white/50 text-sm mb-6">Most business websites fall here</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>5 to 10 pages</li>
                  <li>Mobile-first responsive design</li>
                  <li>Full on-page SEO</li>
                  <li>Google Analytics and Search Console</li>
                  <li>WhatsApp chat widget</li>
                  <li>Contact form</li>
                  <li>Google Maps embed</li>
                  <li>30-day post-launch support</li>
                </ul>
              </div>
              <div className="border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Monthly Maintenance
                </p>
                <p className="text-4xl font-bold mb-2">Rs.3,000/mo</p>
                <p className="text-white/50 text-sm mb-6">Optional ongoing support</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Content updates</li>
                  <li>Security monitoring</li>
                  <li>Performance checks</li>
                  <li>New page additions</li>
                  <li>WhatsApp support</li>
                  <li>Priority response</li>
                </ul>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-8">
              See full pricing details on our{" "}
              <Link href="/pricing" className="text-white/70 underline underline-offset-2">
                pricing page
              </Link>
              .
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
                { href: "/services/web-application-development", label: "Web App Development" },
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
            <h2 className="text-3xl font-bold mb-4">
              Let Us Build Your Website in Coimbatore
            </h2>
            <p className="text-white/60 mb-8">
              Fast, professional, SEO-ready. Contact us for a free consultation and quote.
              We typically respond within a few hours.
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
