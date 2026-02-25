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
    default: "RYX — Build & Scale",
    template: "%s | RYX",
  },
  description:
    "RYX Dev Solutions — Coimbatore-based software company building Valoryx (GST billing), websites, mobile apps & custom CRMs for Indian & global businesses. Fast delivery, direct developer access.",
  keywords: [
    // Product
    "billing software india", "GST billing software", "GST invoicing app", "offline billing software",
    "Valoryx billing", "invoice software coimbatore", "billing app tamil nadu",
    // Services
    "web development coimbatore", "website design coimbatore", "custom software development india",
    "mobile app development coimbatore", "react native app development india",
    "custom CRM development", "CRM software india", "next.js development company india",
    "supabase developer india", "UI UX design coimbatore",
    // Geo
    "software company coimbatore", "IT company coimbatore", "tech startup coimbatore",
    "web developer coimbatore", "app developer tamil nadu", "software development tamil nadu",
  ],
  authors: [{ name: "RYX Dev Solutions", url: "https://ryx.dev" }],
  creator: "RYX Dev Solutions",
  publisher: "RYX Dev Solutions",
  metadataBase: new URL("https://ryx.dev"),
  alternates: {
    canonical: "https://ryx.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ryx.dev",
    siteName: "RYX Dev Solutions",
    title: "RYX — Build & Scale",
    description:
      "Coimbatore-based software company. We build Valoryx (GST billing), websites, mobile apps & custom CRMs. Direct developer access. Serving India & worldwide.",
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
    title: "RYX — Build & Scale",
    description:
      "Coimbatore software company. GST billing, websites, apps & CRMs. Direct developer access. India & worldwide.",
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
      "@id": "https://ryx.dev/#business",
      "name": "RYX Dev Solutions",
      "alternateName": "RYX",
      "url": "https://ryx.dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ryx.dev/RYX_Logo.png",
        "width": 1024,
        "height": 1024,
      },
      "image": "https://ryx.dev/og-image.jpg",
      "description": "RYX Dev Solutions is a software company based in Coimbatore, India. We build Valoryx (GST-compliant billing software), custom websites, mobile apps, and CRM systems for businesses in India and worldwide.",
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
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GST Billing Software (Valoryx)", "description": "Offline & online GST-compliant billing, invoicing and inventory management." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "description": "Next.js and React-based websites and web applications." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development", "description": "React Native cross-platform mobile apps for iOS and Android." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom CRM Development", "description": "Tailored CRM systems built for specific business workflows." } },
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
