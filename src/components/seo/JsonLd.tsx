import React from "react";
import { SITE_INFO } from "@/lib/data/content";

interface JsonLdProps {
  type: "LocalBusiness" | "FAQ" | "Breadcrumbs" | "Article";
  data?: any;
  siteInfo?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export default function JsonLd({ type, data, siteInfo }: JsonLdProps) {
  let schema: any = null;
  const info = { ...SITE_INFO, ...siteInfo };

  if (type === "LocalBusiness") {
    schema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: info.name,
      image: "https://www.caregiversnearby.com/og-image.jpg",
      telephone: info.phone,
      email: info.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1141 Hawthorne Circle",
        addressLocality: "Madison",
        addressRegion: "GA",
        postalCode: "30650",
        addressCountry: "US",
      },
      url: "https://www.caregiversnearby.com",
      description:
        "Find trusted local caregivers for seniors and adults in Georgia. Offering companion care, light housekeeping, respite care, and specialized memory support throughout Morgan, Greene, Putnam, Bibb, Hancock, Oconee, Clarke, and Baldwin counties.",
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "$$",
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Georgia",
        },
        {
          "@type": "AdministrativeArea",
          name: "Madison",
        },
      ],
    };
  }

  if (type === "FAQ" && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.map(
        (item: { question: string; answer: string }) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })
      ),
    };
  }

  if (type === "Breadcrumbs" && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.map(
        (item: { name: string; item: string }, idx: number) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          item: item.item,
        })
      ),
    };
  }

  if (type === "Article" && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.headline,
      description: data.description,
      image: data.image,
      datePublished: data.datePublished,
      author: {
        "@type": "Organization",
        name: info.name,
      },
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
