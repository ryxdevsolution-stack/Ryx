import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ryx/navbar";
import { Footer } from "@/components/ryx/sections/footer";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "AI Development & AI-Powered Software in India | RYX Tech Coimbatore",
  description:
    "RYX Tech builds AI-powered software, chatbots, and intelligent web applications for Indian businesses. Custom AI integration starting from ₹80,000. Coimbatore-based, serving all of India.",
  keywords: [
    "AI development India",
    "AI software development",
    "AI-powered web applications",
    "artificial intelligence software India",
    "chatbot development India",
    "AI integration Coimbatore",
  ],
  alternates: {
    canonical: "https://ryxtech.in/services/ai-development",
  },
  openGraph: {
    title: "AI Development & AI-Powered Software in India | RYX Tech Coimbatore",
    description:
      "RYX Tech builds AI-powered software, chatbots, and intelligent web applications for Indian businesses. Custom AI integration starting from ₹80,000.",
    url: "https://ryxtech.in/services/ai-development",
    siteName: "RYX Tech",
    locale: "en_IN",
    type: "website",
  },
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Development Service",
  description:
    "RYX Tech builds AI-powered software, intelligent chatbots, and AI-integrated web applications for Indian businesses — from Coimbatore, serving all of India.",
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
  areaServed: { "@type": "Country", name: "India" },
  serviceType: "AI Development",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    priceRange: "80000-500000",
  },
  url: "https://ryxtech.in/services/ai-development",
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI development for businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI development for businesses means building software that uses artificial intelligence — machine learning, large language models, and intelligent automation — to perform tasks that would otherwise require human judgment or repetitive manual effort. Examples include customer service chatbots, automated data processing, smart dashboards with predictive analytics, and natural language search for internal tools.",
      },
    },
    {
      "@type": "Question",
      name: "How much does AI software cost in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI software development in India starts at Rs.40,000 for a basic chatbot integrated into an existing website. AI-powered automation scripts and pipelines range from Rs.30,000 to Rs.80,000. A full AI-integrated web application costs Rs.1,20,000 to Rs.5,00,000 depending on the features and complexity. RYX Tech provides fixed project quotes after a requirements discussion.",
      },
    },
    {
      "@type": "Question",
      name: "Can small businesses afford AI software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI development costs have dropped significantly in 2025. A basic AI chatbot for customer service or lead generation starts at Rs.40,000 to Rs.80,000 — within reach for most serious small businesses. The return on investment is typically fast: a chatbot handling 60% of customer queries saves significant staff time from the first month.",
      },
    },
    {
      "@type": "Question",
      name: "How long does AI development take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standalone AI chatbot or automation script takes 2 to 4 weeks. An AI-integrated web application with multiple AI features takes 8 to 14 weeks. Timeline depends on the complexity of the AI integration, the data available for training or context, and the underlying application being built.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build chatbots for Indian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RYX Tech builds AI-powered chatbots for Indian businesses with multilingual support (English, Tamil, Hindi). Our chatbots integrate with your existing website, WhatsApp Business, or web application and handle customer service queries, lead generation, FAQ responses, and escalation to human agents. Contact us on WhatsApp at +91-8667258008 for a demo.",
      },
    },
  ],
};

/* Safe: JSON-LD is hardcoded structured data, no user input */
const SPEAKABLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ryxtech.in/services/ai-development/#webpage",
  "url": "https://ryxtech.in/services/ai-development",
  "name": "AI Development & AI-Powered Software in India | RYX Tech Coimbatore",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable", "dl dt", "dl dd"],
  },
  "about": {
    "@type": "Thing",
    "name": "AI Development",
    "description": "RYX Tech builds AI-powered software, chatbots, and intelligent web applications for Indian businesses — custom AI development from Coimbatore serving all of India.",
  },
  "isPartOf": { "@id": "https://ryxtech.in/#website" },
};

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://ryxtech.in" },
  { name: "Services", url: "https://ryxtech.in/services" },
  { name: "AI Development", url: "https://ryxtech.in/services/ai-development" },
];

const AI_FEATURES = [
  {
    title: "Intelligent Chatbots",
    description:
      "Customer service and lead generation chatbots that understand natural language in English and Tamil. Integrated with your website or WhatsApp Business. Handles FAQs, product queries, and appointment booking automatically.",
  },
  {
    title: "Automated Data Processing",
    description:
      "AI-powered pipelines that extract data from scanned invoices, emails, and PDFs — and automatically populate your management systems. Reduces manual data entry by 80 to 90 percent.",
  },
  {
    title: "Smart Dashboards",
    description:
      "Business intelligence dashboards with predictive analytics. Forecast sales, predict stock-outs, identify at-risk customers, and surface anomalies in your data — automatically.",
  },
  {
    title: "AI-Powered Billing Automation",
    description:
      "Intelligent billing systems that auto-generate purchase orders when stock runs low, flag unusual invoice patterns, and predict cash flow based on outstanding receivables.",
  },
  {
    title: "Natural Language Search",
    description:
      "Search your business data in plain English. Type 'show all overdue orders above Rs.10,000 from Chennai' and your application understands and executes it instantly.",
  },
  {
    title: "Document Intelligence",
    description:
      "Extract, classify, and process information from contracts, invoices, forms, and reports automatically. Works with scanned documents and PDFs using OCR and AI parsing.",
  },
];

const AI_TECH = [
  { category: "Languages", items: ["Python", "TypeScript", "Node.js"] },
  { category: "AI APIs", items: ["OpenAI API", "Anthropic Claude", "Gemini API"] },
  { category: "Frameworks", items: ["LangChain", "LlamaIndex", "FastAPI"] },
  { category: "Databases", items: ["PostgreSQL", "Supabase", "Pinecone (vectors)"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Deployment", items: ["Vercel", "Railway", "AWS"] },
];

export default function AiDevelopmentPage() {
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
              AI Development &amp; Intelligent Software Solutions{" "}
              <span className="text-white/60">for Indian Businesses</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              We build AI-powered software, chatbots, and intelligent web applications
              for Indian businesses. From automated data processing to smart dashboards
              and conversational AI — we make AI practical and affordable for companies
              across India.
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
              <span>AI chatbots from Rs.40,000</span>
              <span>AI-integrated web apps from Rs.1,20,000</span>
              <span>Serving all of India</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Making AI Practical for Indian Businesses
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Artificial intelligence is no longer reserved for large corporations with
                  crore-sized IT budgets. In 2025, Indian small and medium businesses can
                  integrate AI into their operations at a fraction of what it cost three
                  years ago. The question is no longer whether AI is relevant — it is
                  which AI applications will have the highest impact for your specific
                  business.
                </p>
                <p>
                  At RYX Tech, we take a practical approach to AI development. We do not
                  recommend AI for its own sake — we identify the specific manual processes,
                  repetitive decisions, and data analysis tasks where AI will save your
                  business real time and money. Then we build focused, well-engineered
                  solutions that work reliably in production.
                </p>
                <p>
                  Our AI work uses proven foundations — OpenAI APIs, Python ML libraries,
                  LangChain for building AI pipelines, and vector databases for intelligent
                  search. We build on top of these with custom business logic, Indian
                  language support, GST compliance, and the specific integrations your
                  business needs.
                </p>
                <p>
                  We are based in Coimbatore and work with businesses across India. Whether
                  you are a retailer wanting a customer service chatbot, a manufacturer
                  wanting to automate invoice processing, or a service business wanting
                  predictive analytics — we can scope, quote, and deliver a solution that
                  fits your budget and timeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section className="bg-neutral-50 py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-black">What We Build with AI</h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              Practical AI applications designed for Indian businesses — not buzzword
              demonstrations, but tools that save time and money from day one.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {AI_FEATURES.map(({ title, description }) => (
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
            <h2 className="text-3xl font-bold mb-3 text-black">AI Technologies We Use</h2>
            <p className="text-neutral-500 mb-12 max-w-2xl">
              We use Python, OpenAI API, LangChain, vector databases, and Next.js — proven
              tools that production AI systems rely on.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {AI_TECH.map(({ category, items }) => (
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
            <h2 className="text-3xl font-bold mb-3">AI Software Pricing in India</h2>
            <p className="text-white/50 mb-12 max-w-2xl">
              Transparent pricing ranges. We provide a fixed quote after understanding
              your requirements — no billable hours, no surprise invoices.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <div className="border border-white/10 rounded-2xl p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  Basic AI Chatbot
                </p>
                <p className="text-4xl font-bold mb-2">Rs.40,000 – Rs.80,000</p>
                <p className="text-white/50 text-sm mb-6">Integrated into existing website or WhatsApp</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Natural language understanding</li>
                  <li>Product/service knowledge base</li>
                  <li>FAQ handling</li>
                  <li>Lead capture and escalation</li>
                  <li>English and Tamil support</li>
                  <li>2 to 4 week delivery</li>
                </ul>
              </div>
              <div className="border border-white rounded-2xl p-8 relative">
                <p className="absolute -top-3 left-6 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                  Most Requested
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                  AI-Integrated Web App
                </p>
                <p className="text-4xl font-bold mb-2">Rs.1,20,000 – Rs.5,00,000</p>
                <p className="text-white/50 text-sm mb-6">Full application with AI features</p>
                <ul className="space-y-3 text-sm text-white/70">
                  <li>Custom web application</li>
                  <li>AI-powered features (chatbot, analytics, automation)</li>
                  <li>Admin dashboard</li>
                  <li>Database integration</li>
                  <li>API connections</li>
                  <li>8 to 14 week delivery</li>
                </ul>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-8">
              Need a precise estimate?{" "}
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
                { href: "/services/web-application-development", label: "Web App Development" },
                { href: "/services/custom-software-development", label: "Custom Software" },
                { href: "/services/web-design-coimbatore", label: "Web Design" },
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
              Ready to Add AI to Your Business?
            </h2>
            <p className="text-white/60 mb-8">
              Tell us the business problem you want to solve. We will assess whether AI
              is the right solution, define the scope, and give you a fixed quote. No
              obligation, no sales pitch.
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
