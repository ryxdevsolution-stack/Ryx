import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { ChatWidget } from "@/components/ui/chat-widget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Top-tier SEO metadata
export const metadata: Metadata = {
  title: {
    default: "RYX — Billing Software, Web Development & Custom CRM Solutions | Coimbatore",
    template: "%s | RYX"
  },
  description: "RYX builds Valoryx — a GST-compliant billing software that works offline and online. We also develop websites, mobile apps, and custom CRMs for businesses in India and worldwide. Based in Coimbatore.",
  keywords: ["billing software india", "GST billing software", "offline billing app", "invoice software", "web development coimbatore", "custom CRM development", "react native app development", "supabase developer", "next.js development company"],
  authors: [{ name: "RYX" }],
  creator: "RYX",
  metadataBase: new URL("https://ryx.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryx.dev",
    siteName: "RYX",
    title: "RYX — Billing Software, Websites & Custom CRM Solutions",
    description: "We build Valoryx — GST-compliant billing that works offline. Plus websites, apps, and CRMs for businesses in India and globally.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RYX — Billing Software, Websites & Custom CRM Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RYX — Billing Software & Web Development",
    description: "GST-compliant billing software + custom web & app development. Based in Coimbatore, serving globally.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RYX",
    "url": "https://ryx.dev",
    "logo": "https://ryx.dev/RYX_Logo.png",
    "description": "RYX builds Valoryx — a GST-compliant billing software — and develops websites, mobile apps, and custom CRM solutions for businesses in India and worldwide.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-6374853277",
      "contactType": "Customer Service",
      "email": "ryxdevsolutions@gmail.com"
    },
    "areaServed": ["India", "Worldwide"],
    "serviceType": [
      "Billing Software Development",
      "Web Application Development",
      "Mobile App Development",
      "Custom CRM Development",
      "UI/UX Design",
      "SEO Services"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
          <ChatWidget />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
