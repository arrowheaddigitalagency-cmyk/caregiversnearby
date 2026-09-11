import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

export function ContentArticle({
  title,
  body,
  coverImage,
  typeLabel,
  breadcrumbs,
}: {
  title: string;
  body?: string | null;
  coverImage?: string | null;
  typeLabel: string;
  breadcrumbs: { name: string; item: string }[];
}) {
  return (
    <article className="bg-white py-16 sm:py-24">
      <JsonLd type="Breadcrumbs" data={breadcrumbs} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
          {typeLabel}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-brand-navy">
          {title}
        </h1>
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt=""
            className="mt-8 max-h-96 w-full rounded-2xl object-cover"
          />
        ) : null}
        {body ? (
          <div
            className="prose prose-slate mt-10 max-w-none prose-headings:font-heading prose-a:text-brand-teal"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <p className="mt-10 text-slate-500">Content coming soon.</p>
        )}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white"
          >
            Request Care
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-navy"
          >
            Back home
          </Link>
        </div>
      </div>
    </article>
  );
}
