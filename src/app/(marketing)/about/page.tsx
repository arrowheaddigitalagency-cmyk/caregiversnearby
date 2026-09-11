import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { getPageMetadata, getPageSections, getSiteSettings } from "@/lib/cms";
import { ABOUT_CONTENT, SITE_INFO } from "@/lib/data/content";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("about", "/about");
}

export default async function AboutPage() {
  const [sections, settings] = await Promise.all([
    getPageSections("about"),
    getSiteSettings(),
  ]);

  return (
    <AboutClient
      about={sections.about || ABOUT_CONTENT}
      siteInfo={{
        ...SITE_INFO,
        ...settings,
      }}
    />
  );
}
