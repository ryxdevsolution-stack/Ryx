"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { SectionLabel } from "../section-label";
import { CinematicHeading } from "../cinematic-heading";
import { makeStaggerParent, FADE_UP_CHILD } from "../motion";
import { SectionReveal } from "../section-reveal";

const FAQ_ITEMS = [
  {
    q: "How much does a website cost in India?",
    a: "For a professional business website (5–15 pages, custom design, mobile-first, contact form), expect Rs.40,000 – Rs.1,20,000. Simple template sites start lower; complex web applications start higher. We give you a fixed quote upfront — no hidden fees.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard business website takes 3–6 weeks from kickoff to launch. Complex web applications take 8–16 weeks. We give you a clear timeline before we start, and we stick to it.",
  },
  {
    q: "Do you build mobile apps too?",
    a: "We specialise in web applications that work on all devices. For native iOS/Android apps, we can discuss the right approach — sometimes a PWA (Progressive Web App) is a better and more cost-effective solution than a native app.",
  },
  {
    q: "What's the difference between a website and a web application?",
    a: "A website presents information (home, about, services, contact). A web application has user accounts, data entry, and business logic — like a billing system, CRM, or booking platform. We build both.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. We assess your current site, understand what's working, and redesign it with better performance, design, and SEO. We typically rebuild rather than patch — old codebases accumulate technical debt that slows everything down.",
  },
  {
    q: "Do you offer GST billing software?",
    a: "Yes — we built Valoryx, our own GST-compliant billing software that works offline with local SQLite and syncs to the cloud. We also build custom billing and inventory systems tailored to your business workflow.",
  },
  {
    q: "Will my website rank on Google?",
    a: "We build every site with technical SEO as a baseline: fast load times, semantic HTML, proper metadata, structured data, and mobile-first design. Ranking for competitive keywords also requires content and link-building — we can advise on a full SEO strategy.",
  },
  {
    q: "Do you provide support after the website launches?",
    a: "Yes. We provide WhatsApp support post-launch. Most of our clients stay with us long-term. No ticket queues — you talk directly to the developers who built your product.",
  },
  {
    q: "Can I update my website content myself?",
    a: "We can integrate a CMS so your team can edit text, images, and blog posts without touching code. We recommend the right CMS based on your use case — some clients prefer a simple admin panel, others prefer Notion-based workflows.",
  },
  {
    q: "Do you work with clients outside Coimbatore?",
    a: "Absolutely. We work with clients across India and internationally. All communication happens over WhatsApp, email, and video calls. We've successfully delivered projects for clients we've never met in person.",
  },
];

const headerParent = makeStaggerParent(0.08, 0);

export function FaqSection() {
  return (
    <section className="ig-section-white py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionReveal variants={headerParent} className="mb-14" amount={0.2}>
          <motion.div variants={FADE_UP_CHILD}>
            <SectionLabel text="Common questions" variant="light" />
          </motion.div>
          <motion.div variants={FADE_UP_CHILD} className="mt-5">
            <CinematicHeading className="ig-heading-1" variant="light" delay={0}>
              Everything you want to know
            </CinematicHeading>
          </motion.div>
        </SectionReveal>

        {/* Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          className="divide-y divide-neutral-200 border-t border-neutral-200"
        >
          {FAQ_ITEMS.map((item, i) => (
            <Accordion.Item key={i} value={`item-${i}`}>
              <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left">
                <span className="text-base font-medium text-black group-data-[state=open]:text-neutral-700 transition-colors">
                  {item.q}
                </span>
                <Plus
                  size={18}
                  className="shrink-0 mt-0.5 text-neutral-400 transition-transform duration-300 group-data-[state=open]:rotate-45"
                />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <p className="pb-5 text-sm text-neutral-500 leading-relaxed">{item.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
