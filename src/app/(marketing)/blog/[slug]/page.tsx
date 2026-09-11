import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentStatus, ContentType } from "@prisma/client";
import {
  buildMetadataFromSeo,
  getContentEntry,
} from "@/lib/cms";
import { ContentArticle } from "@/components/content/ContentArticle";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentEntry(ContentType.BLOG, slug);
  if (!entry || entry.status !== ContentStatus.PUBLISHED) {
    return { title: "Post not found" };
  }
  return buildMetadataFromSeo({
    slug,
    path: `/blog/${slug}`,
    seo: entry.seo,
    fallbackTitle: entry.title,
    fallbackDescription: entry.excerpt || undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getContentEntry(ContentType.BLOG, slug);
  if (!entry || entry.status !== ContentStatus.PUBLISHED) notFound();

  return (
    <ContentArticle
      title={entry.h1 || entry.title}
      coverImage={entry.coverImage}
      body={entry.body}
      typeLabel="Blog"
      breadcrumbs={[
        { name: "Home", item: "https://www.caregiversnearby.com" },
        { name: "Blog", item: "https://www.caregiversnearby.com/blog" },
        {
          name: entry.title,
          item: `https://www.caregiversnearby.com/blog/${entry.slug}`,
        },
      ]}
    />
  );
}
