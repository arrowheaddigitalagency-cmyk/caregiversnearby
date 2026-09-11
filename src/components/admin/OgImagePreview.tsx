"use client";

import {
  DEFAULT_SITE_OG_FALLBACK,
  IMAGE_SIZE_HINTS,
} from "@/lib/imageHints";

export function OgImagePreview({
  url,
  label = "Current Open Graph image",
}: {
  url?: string | null;
  label?: string;
}) {
  const src = url?.trim() || DEFAULT_SITE_OG_FALLBACK;
  const isCustom = Boolean(url?.trim());

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {isCustom
          ? "Custom image set for this page."
          : "No custom OG image yet — showing site logo as a fallback preview."}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Open Graph preview"
        className="mt-3 max-h-40 w-full rounded-lg border border-slate-200 bg-white object-contain"
      />
      <p className="mt-2 text-[11px] text-slate-500">{IMAGE_SIZE_HINTS.og}</p>
    </div>
  );
}
