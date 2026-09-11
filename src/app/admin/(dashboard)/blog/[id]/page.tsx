import { notFound } from "next/navigation";
import { ContentType } from "@prisma/client";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { prisma } from "@/lib/db";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await prisma.contentEntry.findFirst({
    where: { id, type: ContentType.BLOG },
    include: { seo: true },
  });
  if (!entry) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Edit blog post</h1>
      </div>
      <ContentEditor
        type={ContentType.BLOG}
        id={entry.id}
        listPath="/admin/blog"
        initial={{
          title: entry.title,
          slug: entry.slug,
          h1: entry.h1 || entry.title,
          excerpt: entry.excerpt || "",
          body: entry.body || "",
          coverImage: entry.coverImage || "",
          status: entry.status,
          seo: {
            title: entry.seo?.title || "",
            description: entry.seo?.description || "",
            canonical: entry.seo?.canonical || "",
            ogTitle: entry.seo?.ogTitle || "",
            ogDescription: entry.seo?.ogDescription || "",
            ogImage: entry.seo?.ogImage || "",
            noIndex: entry.seo?.noIndex || false,
          },
        }}
      />
    </div>
  );
}
