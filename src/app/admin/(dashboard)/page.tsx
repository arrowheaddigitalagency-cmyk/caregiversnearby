import Link from "next/link";
import { ContentType } from "@prisma/client";
import {
  FileText,
  Newspaper,
  MapPinned,
  Users,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export default async function AdminOverviewPage() {
  const session = await auth();
  let counts = { pages: 0, blog: 0, locations: 0, users: 0 };
  try {
    const [pages, blog, locations, users] = await Promise.all([
      prisma.contentEntry.count({ where: { type: ContentType.PAGE } }),
      prisma.contentEntry.count({ where: { type: ContentType.BLOG } }),
      prisma.contentEntry.count({ where: { type: ContentType.LOCATION } }),
      prisma.user.count(),
    ]);
    counts = { pages, blog, locations, users };
  } catch {
    // DB may not be configured yet
  }

  const cards = [
    {
      label: "Site pages",
      value: counts.pages,
      href: "/admin/pages",
      icon: FileText,
      tint: "from-sky-500/15 to-transparent",
    },
    {
      label: "Blog posts",
      value: counts.blog,
      href: "/admin/blog",
      icon: Newspaper,
      tint: "from-teal-500/15 to-transparent",
    },
    {
      label: "Local SEO pages",
      value: counts.locations,
      href: "/admin/locations",
      icon: MapPinned,
      tint: "from-emerald-500/15 to-transparent",
    },
    {
      label: "Users",
      value: counts.users,
      href: "/admin/users",
      icon: Users,
      tint: "from-indigo-500/10 to-transparent",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(11,45,82,0.06)] backdrop-blur md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-teal">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome back
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              SEO control room
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Hi {session?.user?.name || session?.user?.email || "there"} — edit
              page SEO, publish blog posts, and launch local landing pages for
              Georgia cities & counties.
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20 transition hover:-translate-y-0.5"
          >
            New blog post
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(11,45,82,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(11,45,82,0.1)]"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.tint}`}
              />
              <div className="relative flex items-start justify-between">
                <div className="rounded-2xl bg-brand-navy/5 p-2.5 text-brand-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-brand-teal" />
              </div>
              <p className="relative mt-6 text-sm text-slate-500">{card.label}</p>
              <p className="relative mt-1 font-heading text-3xl font-bold">
                {card.value}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white bg-white p-6 shadow-[0_12px_40px_rgba(11,45,82,0.05)]">
          <h2 className="font-heading text-lg font-bold">What is Local SEO?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Local SEO pages are city/county landings like{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              /locations/madison-ga
            </code>
            . Google pe “caregivers near Madison GA” jaisi searches ke liye yeh
            pages rank karwati hain. SEO team inhe create/publish karti hai —
            yeh alag service catalog nahi hai.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-white bg-white p-6 shadow-[0_12px_40px_rgba(11,45,82,0.05)] text-sm text-slate-600">
          <h2 className="font-heading text-lg font-bold text-brand-navy">
            Quick tips
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Title ≈ 50–60 characters; description ≈ 150–160.</li>
            <li>Draft first, then Publish — drafts stay out of sitemap.</li>
            <li>Blog cover images upload Blog editor ya Media se.</li>
            <li>Settings: SEO team dekh sakti hai, sirf Admin edit kare.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
