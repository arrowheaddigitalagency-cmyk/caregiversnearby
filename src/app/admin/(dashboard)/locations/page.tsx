import Link from "next/link";
import { ContentType } from "@prisma/client";
import { ContentTable } from "@/components/admin/ContentTable";
import { prisma } from "@/lib/db";

export default async function AdminLocationsList() {
  let rows: Awaited<ReturnType<typeof prisma.contentEntry.findMany>> = [];
  try {
    rows = await prisma.contentEntry.findMany({
      where: { type: ContentType.LOCATION },
      orderBy: { updatedAt: "desc" },
    });
  } catch {
    rows = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Local SEO pages</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Yeh city/county landing pages hain — jaise{" "}
            <strong>Madison GA</strong>, <strong>Athens</strong>,{" "}
            <strong>Baldwin County</strong>. Google local searches ke liye SEO
            team yeh pages banati hai (
            <code className="rounded bg-slate-100 px-1 text-xs">
              /locations/your-city
            </code>
            ). Yeh homepage services list nahi hai.
          </p>
        </div>
        <Link
          href="/admin/locations/new"
          className="rounded-2xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white"
        >
          New local page
        </Link>
      </div>
      <ContentTable
        rows={rows}
        editBase="/admin/locations"
        publicBase="/locations"
      />
    </div>
  );
}
