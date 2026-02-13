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
    default: "RYX - Micro SaaS, Database Management & AI Solutions",
    template: "%s | RYX"
  },
  description: "RYX builds scalable micro SaaS tools, manages Supabase/MySQL databases, and delivers SEO-optimized websites with AI-powered prompt engineering. Deploy in days, not months.",
  keywords: ["micro saas", "database management", "supabase", "mysql", "prompt engineering", "fullstack development", "web design", "ai solutions"],
  authors: [{ name: "RYX Team" }],
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
    title: "RYX - Micro SaaS & Database Solutions",
    description: "Deploy scalable micro SaaS products, optimize databases, and build AI-powered applications. From idea to production in days.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RYX - Micro SaaS & Database Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RYX - Micro SaaS & Database Solutions",
    description: "Deploy scalable micro SaaS products, optimize databases, and build AI-powered applications.",
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
  verification: {
    google: "your-google-verification-code",
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
    "description": "RYX builds scalable micro SaaS tools, manages Supabase/MySQL databases, and delivers SEO-optimized websites with AI-powered prompt engineering.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Remote First",
      "addressCountry": "Worldwide"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-RYX-TECH",
      "contactType": "Customer Service",
      "email": "hello@ryx.dev"
    },
    "sameAs": [
      "https://github.com/ryx-team",
      "https://linkedin.com/company/ryx-team",
      "https://twitter.com/ryx_team"
    ],
    "areaServed": "Worldwide",
    "serviceType": [
      "Micro SaaS Development",
      "Database Management",
      "Web Development", 
      "AI Integration",
      "Prompt Engineering"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5"
    }
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
