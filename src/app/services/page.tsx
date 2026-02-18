"use client";

import { NavbarMinimal } from "@/components/layout/navbar-minimal";
import { FooterMinimal } from "@/components/layout/footer-minimal";
import { AnimatedCursor } from "@/components/ui/animated-cursor";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import {
  Code, Database, Palette, Cpu, Smartphone, Globe,
  Zap, Shield, Rocket, CheckCircle, ArrowRight,
  BarChart, Users, Clock, Award
} from "lucide-react";

const ParticleMorph = dynamic(
  () => import("@/components/three/particle-morph/particle-morph").then(mod => ({ default: mod.ParticleMorph })),
  { ssr: false }
);

const mainServices = [
  {
    icon: Code,
    title: "Billing & Invoicing Software",
    description: "Valoryx — our GST-compliant billing software that works offline with SQLite and syncs to cloud via Supabase. Generate invoices, track payments, manage inventory, and file GST returns.",
    features: ["GST billing with CGST, SGST, IGST & HSN codes", "Real-time inventory with low-stock alerts", "Offline mode with auto-sync when back online", "Thermal printer support — no driver needed"],
    gradient: "from-violet-600 to-purple-600",
  },
  {
    icon: Database,
    title: "Websites & Web Applications",
    description: "Fast, SEO-optimized websites using Next.js and React. Landing pages, dashboards, and full web applications with user management — all production-ready.",
    features: ["Next.js / React based development", "Mobile-responsive from day one", "SEO-optimized structure and performance", "Supabase / MySQL backend integration"],
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform Android and iOS apps built with React Native. One codebase, two platforms — your app reaches every customer without doubling the cost.",
    features: ["React Native for Android & iOS", "Push notifications & real-time updates", "App Store & Play Store deployment", "Offline-capable architecture"],
    gradient: "from-pink-600 to-rose-600",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean, functional designs that your users can navigate without a manual. Interfaces that look professional and convert visitors into customers.",
    features: ["Figma-based design workflow", "Mobile-first responsive layouts", "Conversion-focused UI patterns", "Consistent design systems"],
    gradient: "from-orange-600 to-amber-600",
  },
  {
    icon: Cpu,
    title: "CRM & Custom Business Software",
    description: "Custom CRMs, ERPs, and internal tools tailored to how your business actually works. Role-based access, audit logs, dashboards, and bulk operations.",
    features: ["Role-based access with audit logging", "Custom dashboards and analytics", "Bulk import/export with Excel support", "Multi-tenant SaaS architecture"],
    gradient: "from-green-600 to-teal-600",
  },
  {
    icon: Globe,
    title: "SEO & Digital Presence",
    description: "We structure every website for Google from the ground up — proper meta tags, structured data, fast loading, and mobile optimization.",
    features: ["On-page SEO setup", "Google Search Console integration", "Core Web Vitals optimization", "Structured data / Schema markup"],
    gradient: "from-indigo-600 to-purple-600",
  }
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your vision, goals, and requirements",
    icon: Users,
    color: "from-violet-600 to-purple-600"
  },
  {
    step: "02",
    title: "Strategy",
    description: "Creating a detailed roadmap and project timeline",
    icon: BarChart,
    color: "from-blue-600 to-cyan-600"
  },
  {
    step: "03",
    title: "Design",
    description: "Crafting beautiful, user-centered designs",
    icon: Palette,
    color: "from-pink-600 to-rose-600"
  },
  {
    step: "04",
    title: "Development",
    description: "Building your solution with clean, scalable code",
    icon: Code,
    color: "from-orange-600 to-amber-600"
  },
  {
    step: "05",
    title: "Testing",
    description: "Rigorous testing to ensure quality and performance",
    icon: Shield,
    color: "from-green-600 to-teal-600"
  },
  {
    step: "06",
    title: "Launch",
    description: "Deploying your project and providing ongoing support",
    icon: Rocket,
    color: "from-indigo-600 to-purple-600"
  }
];

// Default shapes per section block when no service is hovered
const BLOCK_DEFAULT_SHAPES: (number | null)[] = [null, 4];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeBlock, setActiveBlock] = useState(0);

  // Refs for the 2 zigzag content blocks
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  // Track which block is in viewport to trigger scroll-based morphing
  useEffect(() => {
    const refs = [block1Ref, block2Ref];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.findIndex((r) => r.current === entry.target);
            if (idx !== -1) setActiveBlock(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Active shape: hovered service card takes priority, otherwise section default
  const activeShape = hoveredService !== null
    ? hoveredService
    : BLOCK_DEFAULT_SHAPES[activeBlock];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);

  return (
    <>
      <AnimatedCursor />
      <NavbarMinimal />
      <main ref={containerRef} className="min-h-screen">
        {/* Hero Section with Floating Gradient Orbs */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {/* Beautiful floating gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top left - Blue to Violet */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full opacity-20 blur-3xl animate-float" />

            {/* Top right - Purple to Pink */}
            <div className="absolute top-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-25 blur-3xl animate-float"
                 style={{ animationDelay: '2s', animationDuration: '25s' }} />

            {/* Center - Violet glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-300 to-fuchsia-400 rounded-full opacity-15 blur-3xl animate-pulse"
                 style={{ animationDuration: '10s' }} />

            {/* Bottom left - Pink to Orange */}
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-br from-pink-400 to-orange-300 rounded-full opacity-20 blur-3xl animate-float"
                 style={{ animationDelay: '4s', animationDuration: '30s' }} />

            {/* Bottom right - Blue accent */}
            <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-3xl animate-float"
                 style={{ animationDelay: '1s', animationDuration: '22s' }} />
          </div>

          {/* Subtle light overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-purple-50/30 z-10" />

          {/* Content */}
          <div className="container mx-auto px-6 md:px-12 relative z-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full bg-white/80 backdrop-blur-lg shadow-xl border border-violet-100"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-4 h-4 text-violet-600" />
                <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  Our Services
                </span>
              </motion.span>

              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-violet-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Solutions That
                  </motion.span>
                </span>
                <span className="block">Transform Business</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto"
              >
                From billing software to custom CRMs — we build tools that run your business smoother
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services + Process — Zigzag sections with sticky particle background */}
        <section className="relative bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
          {/* Sticky particle canvas — stays in viewport while content scrolls */}
          <div className="sticky top-0 h-screen w-full z-0 pointer-events-none">
            <ParticleMorph activeShape={activeShape} />
          </div>

          {/* Content scrolls over the sticky particle background */}
          <div className="relative z-10" style={{ marginTop: '-100vh' }}>
            <div className="container mx-auto px-6 md:px-12 space-y-40 py-32">

            {/* ── Block 1: What We Offer ── aligned LEFT */}
            <motion.div
              ref={block1Ref}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="flex justify-start"
            >
              <div className="w-full lg:w-[75%]">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-5xl md:text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                      What We Offer
                    </span>
                  </h2>
                  <p className="text-xl text-gray-700 max-w-2xl">
                    Comprehensive digital services tailored to your needs
                  </p>
                  <motion.p
                    className="text-sm text-gray-500 mt-3"
                    animate={{ opacity: hoveredService === null ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Hover over a service to see it come alive
                  </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {mainServices.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredService(index)}
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} scale={1.02}>
                        <motion.div
                          className={`relative h-full bg-white/85 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 ${
                            hoveredService === index
                              ? 'border-violet-300 shadow-2xl shadow-violet-200/50'
                              : 'border-violet-100/80'
                          }`}
                          whileHover={{ y: -5 }}
                        >
                          <div className={`relative h-20 bg-gradient-to-r ${service.gradient} flex items-center px-6 gap-4`}>
                            <motion.div
                              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center"
                              animate={hoveredService === index ? { rotate: 360 } : {}}
                              transition={{ duration: 0.8 }}
                            >
                              <service.icon className="w-5 h-5 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-lg font-bold text-white">{service.title}</h3>
                            </div>
                          </div>
                          <div className="p-5">
                            <p className="text-gray-700 text-sm mb-4">{service.description}</p>
                            <ul className="space-y-1.5 mb-4">
                              {service.features.map((feature, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0.7 }}
                                  animate={hoveredService === index ? { opacity: 1, x: 0 } : { opacity: 0.7 }}
                                  transition={{ duration: 0.3, delay: i * 0.05 }}
                                  className="flex items-center gap-2 text-xs text-gray-700"
                                >
                                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                            <motion.a
                              href="#"
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                              whileHover={{ x: 5 }}
                            >
                              Learn More <ArrowRight className="w-3.5 h-3.5" />
                            </motion.a>
                          </div>
                          {hoveredService === index && (
                            <motion.div
                              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient}`}
                              layoutId="activeService"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </motion.div>
                      </Tilt>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Block 2: Our Process ── aligned RIGHT */}
            <motion.div
              ref={block2Ref}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="flex justify-end"
            >
              <div className="w-full lg:w-[75%]">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12 text-right"
                >
                  <h2 className="text-5xl md:text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                      Our Process
                    </span>
                  </h2>
                  <p className="text-xl text-gray-700 max-w-2xl ml-auto">
                    A proven methodology that ensures project success
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {process.map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="relative p-8 bg-white/85 backdrop-blur-lg rounded-3xl shadow-xl border border-violet-100 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-200/50 group transition-all duration-300"
                        whileHover={{ y: -10 }}
                      >
                        <motion.div
                          className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          {item.step}
                        </motion.div>
                        <motion.div
                          className={`w-14 h-14 mb-5 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <item.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                        <p className="text-gray-700 text-sm">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-gradient-to-br from-violet-600 to-pink-600 relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Rocket, value: "5+", label: "Projects Delivered" },
                { icon: Users, value: "1", label: "Live SaaS Product" },
                { icon: Clock, value: "10+", label: "Technologies We Use" },
                { icon: Award, value: "WhatsApp", label: "Direct Founder Support" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="text-white"
                  >
                    <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <motion.div
                      className="text-5xl font-bold mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-white/80">{stat.label}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
          {/* Floating gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-pink-400 to-orange-300 rounded-full opacity-20 blur-3xl animate-float"
                 style={{ animationDelay: '3s' }} />
          </div>

          <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  Ready to Get Started?
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-12">
                Let's discuss your project and see how we can help you achieve your goals
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-2xl group"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Your Project</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      <FooterMinimal />
    </>
  );
}