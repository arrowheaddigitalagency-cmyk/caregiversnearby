import Link from "next/link";
import { ContentType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { DEFAULT_SEO } from "@/lib/cms";

const PAGE_SLUGS = ["home", "about", "contact", "join-us"] as const;

type PageWithSeo = Prisma.ContentEntryGetPayload<{ include: { seo: true } }>;

export default async function AdminPagesList() {
  let entries: PageWithSeo[] = [];
  try {
    entries = await prisma.contentEntry.findMany({
      where: { type: ContentType.PAGE },
      include: { seo: true },
      orderBy: { slug: "asc" },
    });
  } catch {
    entries = [];
  }

  const bySlug = new Map(entries.map((e) => [e.slug, e]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Pages</h1>
        <p className="mt-1 text-slate-600">
          Edit core site pages and their SEO meta.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Page</th>
              <th className="px-4 py-3 font-medium">Path</th>
              <th className="px-4 py-3 font-medium">Meta title</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {PAGE_SLUGS.map((slug) => {
              const entry = bySlug.get(slug);
              const path = slug === "home" ? "/" : `/${slug}`;
              return (
                <tr key={slug} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium capitalize">
                    {entry?.title || slug}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{path}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-slate-500">
                    {entry?.seo?.title || DEFAULT_SEO[slug]?.title || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/pages/${slug}`}
                      className="font-semibold text-brand-teal hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
