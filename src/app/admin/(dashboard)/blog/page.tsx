import Link from "next/link";
import { ContentType } from "@prisma/client";
import { ContentTable } from "@/components/admin/ContentTable";
import { prisma } from "@/lib/db";

export default async function AdminBlogList() {
  let posts: Awaited<ReturnType<typeof prisma.contentEntry.findMany>> = [];
  try {
    posts = await prisma.contentEntry.findMany({
      where: { type: ContentType.BLOG },
      orderBy: { updatedAt: "desc" },
    });
  } catch {
    posts = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Blog</h1>
          <p className="mt-1 text-slate-600">
            Articles live on the public site at{" "}
            <Link href="/blog" className="font-semibold text-brand-teal hover:underline">
              /blog
            </Link>
            . Add cover images and publish when ready.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-2xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white"
        >
          New post
        </Link>
      </div>
      <ContentTable rows={posts} editBase="/admin/blog" publicBase="/blog" />
    </div>
  );
}
