"use client";

import { NavbarMinimal } from "@/components/layout/navbar-minimal";
import { FooterMinimal } from "@/components/layout/footer-minimal";
import { AnimatedCursor } from "@/components/ui/animated-cursor";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useCallback } from "react";
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
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    features: ["React/Next.js", "Node.js Backend", "Responsive Design", "SEO Optimization"],
    gradient: "from-violet-600 to-purple-600",
    price: "$5,000+"
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Scalable database solutions optimized for performance and reliability",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
    features: ["MySQL/PostgreSQL", "MongoDB", "Redis Caching", "Data Migration"],
    gradient: "from-blue-600 to-cyan-600",
    price: "$3,000+"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that users love",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    features: ["React Native", "Flutter", "iOS/Android", "App Store Deployment"],
    gradient: "from-pink-600 to-rose-600",
    price: "$8,000+"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that enhance user experience",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    gradient: "from-orange-600 to-amber-600",
    price: "$2,500+"
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Intelligent solutions powered by machine learning and AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    features: ["ChatGPT Integration", "Custom ML Models", "Computer Vision", "NLP Solutions"],
    gradient: "from-green-600 to-teal-600",
    price: "$10,000+"
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Strategic marketing solutions to grow your online presence",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    features: ["SEO Strategy", "Content Marketing", "Social Media", "Analytics"],
    gradient: "from-indigo-600 to-purple-600",
    price: "$2,000/mo"
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

const pricing = [
  {
    name: "Starter",
    price: "$2,999",
    description: "Perfect for small businesses and startups",
    features: [
      "5-page website",
      "Responsive design",
      "Basic SEO",
      "Contact form",
      "1 month support"
    ],
    gradient: "from-gray-600 to-gray-700",
    popular: false
  },
  {
    name: "Professional",
    price: "$7,999",
    description: "Ideal for growing businesses",
    features: [
      "10-page website",
      "Custom design",
      "Advanced SEO",
      "CMS integration",
      "E-commerce ready",
      "3 months support"
    ],
    gradient: "from-violet-600 to-purple-600",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations",
    features: [
      "Unlimited pages",
      "Custom features",
      "API integrations",
      "Advanced security",
      "Dedicated team",
      "12 months support"
    ],
    gradient: "from-orange-600 to-amber-600",
    popular: false
  }
];

// Default shapes per section block when no service is hovered
const BLOCK_DEFAULT_SHAPES: (number | null)[] = [null, 4, 5]; // sphere, neural network, bar chart

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeBlock, setActiveBlock] = useState(0);

  // Refs for the 3 zigzag content blocks
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);

  // Track which block is in viewport to trigger scroll-based morphing
  useEffect(() => {
    const refs = [block1Ref, block2Ref, block3Ref];
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
                From concept to launch, we deliver exceptional digital solutions that drive growth and innovation
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services + Process + Pricing — Zigzag sections with sticky particle background */}
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
                              <span className="text-white/80 text-xs">Starting at {service.price}</span>
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

            {/* ── Block 3: Pricing Plans ── aligned LEFT */}
            <motion.div
              ref={block3Ref}
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
                      Pricing Plans
                    </span>
                  </h2>
                  <p className="text-xl text-gray-700 max-w-2xl">
                    Transparent pricing with no hidden fees
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  {pricing.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Tilt
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        perspective={1000}
                        scale={plan.popular ? 1.05 : 1.02}
                      >
                        <motion.div
                          className={`relative h-full p-8 bg-white/85 backdrop-blur-lg rounded-3xl shadow-xl border ${
                            plan.popular ? 'border-violet-300 ring-4 ring-violet-600 ring-offset-4' : 'border-violet-100/80 hover:border-violet-300'
                          } hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-300`}
                          whileHover={{ y: -10 }}
                        >
                          {plan.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-bold rounded-full">
                              Most Popular
                            </div>
                          )}
                          <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                            {plan.name}
                          </h3>
                          <div className="mb-4">
                            <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                            {plan.price !== "Custom" && <span className="text-gray-700">/project</span>}
                          </div>
                          <p className="text-gray-700 mb-8">{plan.description}</p>
                          <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="flex items-start gap-2 text-sm"
                              >
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                <span className="text-gray-700">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                          <motion.a
                            href="/contact"
                            className={`block w-full py-3 text-center font-semibold rounded-full transition-all ${
                              plan.popular
                                ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:shadow-lg'
                                : 'bg-violet-100 text-gray-900 hover:bg-violet-200 border border-violet-200'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Get Started
                          </motion.a>
                        </motion.div>
                      </Tilt>
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
                { icon: Rocket, value: "500+", label: "Projects Launched" },
                { icon: Users, value: "200+", label: "Happy Clients" },
                { icon: Clock, value: "50K+", label: "Hours Worked" },
                { icon: Award, value: "25+", label: "Awards Won" }
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