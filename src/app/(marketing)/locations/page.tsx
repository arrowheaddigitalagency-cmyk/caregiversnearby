import Link from "next/link";
import type { Metadata } from "next";
import { ContentType } from "@prisma/client";
import { getPublishedEntries } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Find Caregivers Nearby companion care across Central and East Georgia cities and counties.",
};

export default async function LocationsIndexPage() {
  const entries = await getPublishedEntries(ContentType.LOCATION);

  return (
    <div className="bg-gradient-to-b from-brand-sky to-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
          Local coverage
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-brand-navy">
          Where we serve
        </h1>
        <p className="mt-3 text-slate-600">
          Local pages for the Georgia communities we support — helpful if you
          are searching for caregivers near your city or county.
        </p>
        <div className="mt-10 space-y-4">
          {entries.length === 0 ? (
            <p className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-slate-500">
              Local area pages coming soon.
            </p>
          ) : (
            entries.map((entry) => (
              <Link
                key={entry.id}
                href={`/locations/${entry.slug}`}
                className="block rounded-[1.25rem] border border-slate-100 bg-white p-6 shadow-sm transition hover:border-brand-teal"
              >
                <h2 className="font-heading text-xl font-bold text-brand-navy">
                  {entry.title}
                </h2>
                {entry.excerpt ? (
                  <p className="mt-2 text-sm text-slate-600">{entry.excerpt}</p>
                ) : null}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
