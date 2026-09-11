import { ContentStatus, ContentType, Prisma } from "@prisma/client";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import {
  ABOUT_CONTENT,
  FAQS,
  SERVICES,
  SITE_INFO,
  STEPS,
  TESTIMONIALS,
  WHY_US,
} from "@/lib/data/content";
import { DEFAULT_SITE_OG_FALLBACK } from "@/lib/imageHints";

const BASE_URL = "https://www.caregiversnearby.com";

export const DEFAULT_SEO: Record<
  string,
  { title: string; description: string; canonical: string }
> = {
  home: {
    title:
      "Caregivers Nearby | Compassionate Care. Trusted Caregivers. Right Nearby.",
    description:
      "Find trusted local caregivers for seniors and individuals needing home assistance. Caregivers Nearby offers Companion Care, Personal Assistance, Respite Care, and specialized Dementia Care.",
    canonical: "/",
  },
  about: {
    title: "About Us",
    description:
      "Learn about Caregivers Nearby — our mission to help seniors live safely and independently at home across Central and East Georgia.",
    canonical: "/about",
  },
  contact: {
    title: "Request Care",
    description:
      "Contact Caregivers Nearby to request compassionate in-home companion care for your loved one in Georgia.",
    canonical: "/contact",
  },
  "join-us": {
    title: "Join as a Caregiver",
    description:
      "Apply to join the Caregivers Nearby network. Flexible scheduling, meaningful work, and competitive opportunities.",
    canonical: "/join-us",
  },
};

export type PageSections = {
  hero?: { headline?: string; subheadline?: string };
  faqs?: typeof FAQS;
  steps?: typeof STEPS;
  testimonials?: typeof TESTIMONIALS;
  whyUs?: typeof WHY_US;
  services?: typeof SERVICES;
  about?: typeof ABOUT_CONTENT;
  contactIntro?: { headline?: string; body?: string };
  joinIntro?: { headline?: string; body?: string };
};

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (settings) {
      return {
        name: settings.name,
        tagline: settings.tagline ?? SITE_INFO.tagline,
        phone: settings.phone ?? SITE_INFO.phone,
        email: settings.email ?? SITE_INFO.email,
        hours: settings.hours ?? SITE_INFO.hours,
        address: settings.address ?? SITE_INFO.address,
        emergencyNotice:
          settings.emergencyNotice ?? SITE_INFO.emergencyNotice,
      };
    }
  } catch {
    // DB unavailable — fall back to static
  }
  return { ...SITE_INFO };
}

export async function getContentEntry(
  type: ContentType,
  slug: string,
  opts?: { publishedOnly?: boolean }
) {
  try {
    return await prisma.contentEntry.findUnique({
      where: { type_slug: { type, slug } },
      include: { seo: true },
    });
  } catch {
    return null;
  }
}

export async function getPublishedEntries(type: ContentType) {
  try {
    return await prisma.contentEntry.findMany({
      where: { type, status: ContentStatus.PUBLISHED },
      include: { seo: true },
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPageSections(slug: string): Promise<PageSections> {
  const entry = await getContentEntry(ContentType.PAGE, slug);
  if (entry?.sections && typeof entry.sections === "object") {
    return entry.sections as PageSections;
  }

  // Static fallbacks matching current site content
  if (slug === "home") {
    return {
      hero: {
        headline: "Compassionate Care. Trusted Caregivers. Right Nearby.",
        subheadline:
          "Premium, trusted local caregiver matching for seniors who want to age safely at home.",
      },
      faqs: FAQS,
      steps: STEPS,
      testimonials: TESTIMONIALS,
      whyUs: WHY_US,
      services: SERVICES,
    };
  }
  if (slug === "about") {
    return { about: ABOUT_CONTENT };
  }
  if (slug === "contact") {
    return {
      contactIntro: {
        headline: "Request Care",
        body: "Tell us about your loved one's needs. Our care team will follow up promptly.",
      },
    };
  }
  if (slug === "join-us") {
    return {
      joinIntro: {
        headline: "Join Our Caregiver Network",
        body: "Apply to become a Caregivers Nearby caregiver and make a meaningful difference.",
      },
    };
  }
  return {};
}

export function buildMetadataFromSeo(opts: {
  slug: string;
  path: string;
  seo?: {
    title?: string | null;
    description?: string | null;
    canonical?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: string | null;
    noIndex?: boolean | null;
  } | null;
  fallbackTitle?: string;
  fallbackDescription?: string;
}): Metadata {
  const defaults = DEFAULT_SEO[opts.slug];
  const title =
    opts.seo?.title || opts.fallbackTitle || defaults?.title || "Caregivers Nearby";
  const description =
    opts.seo?.description ||
    opts.fallbackDescription ||
    defaults?.description ||
    "";
  const canonical =
    opts.seo?.canonical || defaults?.canonical || opts.path;
  const ogTitle = opts.seo?.ogTitle || title;
  const ogDescription = opts.seo?.ogDescription || description;
  const ogImage = opts.seo?.ogImage || DEFAULT_SITE_OG_FALLBACK;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical.startsWith("http")
        ? canonical
        : `${BASE_URL}${canonical}`,
      siteName: "Caregivers Nearby",
      locale: "en_US",
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: opts.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export async function getPageMetadata(
  slug: string,
  path: string
): Promise<Metadata> {
  const entry = await getContentEntry(ContentType.PAGE, slug);
  return buildMetadataFromSeo({
    slug,
    path,
    seo: entry?.seo,
  });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export type ContentEntryWithSeo = Prisma.ContentEntryGetPayload<{
  include: { seo: true };
}>;
