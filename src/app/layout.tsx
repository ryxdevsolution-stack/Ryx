import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import { ParallaxProvider } from "@/components/ryx/parallax-provider";

const ChatWidget = dynamic(
  () => import("@/components/ui/chat-widget").then((m) => ({ default: m.ChatWidget })),
  { loading: () => null }
);

const ScrollProgress = dynamic(
  () => import("@/components/ryx/scroll-progress").then((m) => ({ default: m.ScrollProgress })),
  { loading: () => null }
);

import { RibbonsWrapper } from "@/components/ui/ribbons-wrapper";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

const greatVibes = localFont({
  src: [
    {
      path: "../fonts/GreatVibes-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-script",
  display: "swap",
});

// Top-tier SEO metadata
export const metadata: Metadata = {
  title: {
    default: "RYX Dev Solutions — Software Company in Coimbatore",
    template: "%s | RYX Dev Solutions",
  },
  description:
    "RYX Dev Solutions — Coimbatore-based software company. We built Valoryx (offline-first GST billing), BigTeam (community platform), and business websites. Direct developer access, WhatsApp support.",
  keywords: [
    // Product
    "billing software india", "GST billing software", "GST invoicing app", "offline billing software",
    "Valoryx billing", "invoice software coimbatore", "billing app tamil nadu",
    // Services
    "web development coimbatore", "website design coimbatore", "custom software development india",
    "full-stack web applications", "business website coimbatore", "landing page design india",
    "flask python web development", "react developer coimbatore",
    "next.js development company india",
    "supabase developer india", "UI UX design coimbatore",
    // Geo
    "software company coimbatore", "IT company coimbatore", "tech startup coimbatore",
    "web developer coimbatore", "app developer tamil nadu", "software development tamil nadu",
  ],
  authors: [{ name: "RYX Dev Solutions", url: "https://ryxtech.in" }],
  creator: "RYX Dev Solutions",
  publisher: "RYX Dev Solutions",
  metadataBase: new URL("https://ryxtech.in"),
  alternates: {
    canonical: "https://ryxtech.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ryxtech.in",
    siteName: "RYX Dev Solutions",
    title: "RYX Dev Solutions — Software Company in Coimbatore",
    description:
      "Coimbatore-based software company. We build Valoryx (GST billing), full-stack web apps, and business websites. Direct developer access. India & worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RYX Dev Solutions — Build & Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ryxdev",
    creator: "@ryxdev",
    title: "RYX Dev Solutions — Software Company in Coimbatore",
    description:
      "Coimbatore software company. GST billing, web apps, websites. Direct developer access. India & worldwide.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/RYX_Logo.png", type: "image/png", sizes: "1024x1024" },
    ],
    shortcut: "/RYX_Logo.png",
    apple: [{ url: "/RYX_Logo.png", sizes: "1024x1024", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Geo targeting
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Coimbatore, Tamil Nadu, India",
    "geo.position": "11.0168;76.9558",
    "ICBM": "11.0168, 76.9558",
    "language": "English",
    "revisit-after": "7 days",
    "rating": "general",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data — LocalBusiness for geo SEO + Organization for brand
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://ryxtech.in/#business",
      "name": "RYX Dev Solutions",
      "alternateName": "RYX",
      "url": "https://ryxtech.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ryxtech.in/RYX_Logo.png",
        "width": 1024,
        "height": 1024,
      },
      "image": "https://ryxtech.in/og-image.jpg",
      "description": "RYX Dev Solutions builds billing software, full-stack web applications, and business websites for companies in Coimbatore, India and worldwide.",
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Coimbatore",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641001",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 11.0168,
        "longitude": 76.9558,
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "email": "ryxdevsolutions@gmail.com",
          "availableLanguage": ["English", "Tamil"],
          "areaServed": ["IN", "Worldwide"],
        },
        {
          "@type": "ContactPoint",
          "contactType": "Sales",
          "url": "https://wa.me/918667258008",
          "contactOption": "TollFree",
        },
      ],
      "sameAs": [
        "https://github.com/ryxdevsolution-stack",
        "https://instagram.com/ryxdev",
        "https://linkedin.com/company/ryxdev",
        "https://x.com/ryxdev",
      ],
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
        { "@type": "City", "name": "Coimbatore" },
        { "@type": "AdministrativeArea", "name": "Worldwide" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "RYX Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Billing & Inventory Software (Valoryx)", "description": "Offline-first GST-compliant billing, invoicing, inventory management with multi-branch support and thermal printing." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Stack Web Applications", "description": "React and Flask-based web platforms with admin dashboards, analytics, role-based access, and payment integration." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Websites & Landing Pages", "description": "SEO-optimized, responsive websites with WhatsApp integration and lead generation for small businesses." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design", "description": "User interface and experience design using Figma." } },
        ],
      },
      "numberOfEmployees": { "@type": "QuantitativeValue", "value": 3 },
      "priceRange": "₹₹",
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Safe: JSON-LD is our own hardcoded structured data, no user input */}
        {structuredData.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${geist.variable} ${greatVibes.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <ScrollProgress />
          <RibbonsWrapper />
          <ParallaxProvider>
            {children}
          </ParallaxProvider>
          <ChatWidget />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
