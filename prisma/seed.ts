import "dotenv/config";
import { ContentStatus, ContentType, Role, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  ABOUT_CONTENT,
  FAQS,
  SERVICES,
  SITE_INFO,
  STEPS,
  TESTIMONIALS,
  WHY_US,
} from "../src/lib/data/content";
import { DEFAULT_SEO } from "../src/lib/cms";

const prisma = new PrismaClient();

async function upsertPage(
  slug: string,
  title: string,
  sections: object,
  seo: { title: string; description: string; canonical: string }
) {
  const entry = await prisma.contentEntry.upsert({
    where: { type_slug: { type: ContentType.PAGE, slug } },
    create: {
      type: ContentType.PAGE,
      slug,
      title,
      h1: title,
      sections,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      seo: {
        create: {
          title: seo.title,
          description: seo.description,
          canonical: seo.canonical,
          ogTitle: seo.title,
          ogDescription: seo.description,
        },
      },
    },
    update: {
      title,
      sections,
      status: ContentStatus.PUBLISHED,
    },
  });

  await prisma.seoMeta.upsert({
    where: { contentEntryId: entry.id },
    create: {
      contentEntryId: entry.id,
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      ogTitle: seo.title,
      ogDescription: seo.description,
    },
    update: {
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
    },
  });
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@caregiversnearby.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      name: "Site Admin",
      role: Role.ADMIN,
    },
    update: {
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      name: SITE_INFO.name,
      tagline: SITE_INFO.tagline,
      phone: "+1 404-754-2651",
      email: SITE_INFO.email,
      hours: SITE_INFO.hours,
      address: SITE_INFO.address,
      emergencyNotice: SITE_INFO.emergencyNotice,
    },
    update: {
      phone: "+1 404-754-2651",
      email: SITE_INFO.email,
      address: SITE_INFO.address,
    },
  });

  await upsertPage(
    "home",
    "Home",
    {
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
    },
    DEFAULT_SEO.home
  );

  await upsertPage(
    "about",
    "About Us",
    { about: ABOUT_CONTENT },
    DEFAULT_SEO.about
  );

  await upsertPage(
    "contact",
    "Request Care",
    {
      contactIntro: {
        headline: "Request Care",
        body: "Tell us about your loved one's needs. Our care team will follow up promptly.",
      },
    },
    DEFAULT_SEO.contact
  );

  await upsertPage(
    "join-us",
    "Join as a Caregiver",
    {
      joinIntro: {
        headline: "Join Our Caregiver Network",
        body: "Apply to become a Caregivers Nearby caregiver and make a meaningful difference.",
      },
    },
    DEFAULT_SEO["join-us"]
  );

  console.log("Seed complete.");
  console.log(`Admin login: ${email} / (ADMIN_PASSWORD or ChangeMe123!)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
