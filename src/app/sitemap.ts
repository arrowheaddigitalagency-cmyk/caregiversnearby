import { MetadataRoute } from "next";
import { ContentStatus, ContentType } from "@prisma/client";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.caregiversnearby.com";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/join-us`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const entries = await prisma.contentEntry.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        type: {
          in: [ContentType.BLOG, ContentType.LOCATION],
        },
      },
      include: { seo: true },
    });

    dynamicRoutes = entries
      .filter((entry) => !entry.seo?.noIndex)
      .map((entry) => {
        const prefix = entry.type === ContentType.BLOG ? "blog" : "locations";
        return {
          url: `${baseUrl}/${prefix}/${entry.slug}`,
          lastModified: entry.publishedAt || entry.updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      });
  } catch {
    dynamicRoutes = [];
  }

  return [...staticRoutes, ...dynamicRoutes];
}
