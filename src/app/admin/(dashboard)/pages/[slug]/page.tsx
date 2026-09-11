import { notFound } from "next/navigation";
import { ContentType } from "@prisma/client";
import { PageEditor } from "@/components/admin/PageEditor";
import { prisma } from "@/lib/db";
import { DEFAULT_SEO, getPageSections } from "@/lib/cms";

const ALLOWED = new Set(["home", "about", "contact", "join-us"]);

export default async function EditPageAdmin({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ALLOWED.has(slug)) notFound();

  let entry = null;
  try {
    entry = await prisma.contentEntry.findUnique({
      where: { type_slug: { type: ContentType.PAGE, slug } },
      include: { seo: true },
    });
  } catch {
    entry = null;
  }

  const sections = entry?.sections
    ? entry.sections
    : await getPageSections(slug);
  const defaults = DEFAULT_SEO[slug];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold capitalize">
          Edit {slug}
        </h1>
        <p className="mt-1 text-slate-600">
          Update page sections and SEO for{" "}
          {slug === "home" ? "/" : `/${slug}`}.
        </p>
      </div>
      <PageEditor
        slug={slug}
        title={entry?.title || slug}
        sectionsJson={JSON.stringify(sections, null, 2)}
        seo={{
          title: entry?.seo?.title || defaults?.title || "",
          description: entry?.seo?.description || defaults?.description || "",
          canonical: entry?.seo?.canonical || defaults?.canonical || "",
          ogTitle: entry?.seo?.ogTitle || "",
          ogDescription: entry?.seo?.ogDescription || "",
          ogImage: entry?.seo?.ogImage || "",
          noIndex: entry?.seo?.noIndex || false,
        }}
      />
    </div>
  );
}
