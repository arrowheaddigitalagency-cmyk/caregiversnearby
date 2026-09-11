import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getPageMetadata, getPageSections, getSiteSettings } from "@/lib/cms";
import { FAQS, SERVICES, STEPS, TESTIMONIALS } from "@/lib/data/content";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home", "/");
}

export default async function HomePage() {
  const [sections, settings] = await Promise.all([
    getPageSections("home"),
    getSiteSettings(),
  ]);

  return (
    <HomeClient
      services={sections.services?.length ? sections.services : SERVICES}
      steps={sections.steps?.length ? sections.steps : STEPS}
      testimonials={
        sections.testimonials?.length ? sections.testimonials : TESTIMONIALS
      }
      faqs={sections.faqs?.length ? sections.faqs : FAQS}
      sitePhone={settings.phone}
    />
  );
}
