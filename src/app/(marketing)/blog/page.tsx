import Link from "next/link";
import type { Metadata } from "next";
import { ContentType } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { getPublishedEntries } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Senior care tips, caregiver guidance, and local resources from Caregivers Nearby.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedEntries(ContentType.BLOG);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-sky to-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
            Resources
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-brand-navy sm:text-5xl">
            Care insights & family guides
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Practical articles for Georgia families navigating in-home companion
            care, dementia support, and caregiver wellbeing.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-slate-500 sm:col-span-2 lg:col-span-3">
              Posts coming soon. Check back shortly for caregiver guides and
              local care tips.
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_12px_40px_rgba(11,45,82,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(11,45,82,0.1)]"
              >
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt=""
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-44 items-end bg-gradient-to-br from-brand-navy to-brand-teal/80 p-5">
                    <p className="text-sm font-semibold text-white/90">
                      Caregivers Nearby
                    </p>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-heading text-xl font-bold text-brand-navy group-hover:text-brand-teal">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-navy">
                    Read article
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
