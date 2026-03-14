type BreadcrumbItem = {
  name: string;
  url: string;
};

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Renders a BreadcrumbList JSON-LD schema for SEO.
 * Safe: all data is hardcoded at build time from page components — no user input.
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  // Safe: JSON-LD is hardcoded structured data from page components, no user input
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
