"use client";

import { useState, useTransition } from "react";
import { Copy, ImagePlus, Loader2 } from "lucide-react";
import { uploadAdminImage } from "@/app/admin/actions";
import { IMAGE_SIZE_HINTS } from "@/lib/imageHints";

export default function AdminMediaPage() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    setError("");
    setUrl("");
    startTransition(async () => {
      const result = await uploadAdminImage(fd);
      if (!result.ok) {
        setError(result.error || "Upload failed");
        return;
      }
      setUrl(result.url);
    });
  }

  async function copyUrl() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Media library</h1>
        <p className="mt-1 text-slate-600">
          Upload images for blog covers, Open Graph (social share) previews, and
          article content. Copy the URL and paste it into a page or blog post.
        </p>
        <p className="mt-2 text-sm text-slate-500">{IMAGE_SIZE_HINTS.media}</p>
      </div>

      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-[0_12px_40px_rgba(11,45,82,0.04)]">
        <label className="inline-flex cursor-pointer flex-col items-center gap-3">
          <span className="rounded-2xl bg-brand-navy/5 p-4 text-brand-navy">
            {pending ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : (
              <ImagePlus className="h-7 w-7" />
            )}
          </span>
          <span className="text-sm font-semibold text-brand-navy">
            {pending ? "Uploading…" : "Click to upload an image"}
          </span>
          <span className="text-xs text-slate-500">PNG, JPG, or WebP</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />
        </label>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {url ? (
          <div className="mx-auto mt-6 max-w-lg space-y-3 text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Uploaded"
              className="max-h-56 w-full rounded-2xl border border-slate-100 object-cover"
            />
            <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
              <p className="flex-1 break-all font-mono text-xs text-slate-600">
                {url}
              </p>
              <button
                type="button"
                onClick={copyUrl}
                className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-semibold text-brand-navy shadow-sm"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
