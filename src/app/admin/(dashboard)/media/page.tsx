"use client";

import { useState, useTransition } from "react";
import { Copy, ImagePlus, Loader2 } from "lucide-react";
import { uploadAdminImage } from "@/app/admin/actions";

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
          Upload images for blog covers, OG tags, and article body.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/80 p-5 text-sm text-slate-700">
        <p className="font-semibold text-brand-navy">
          BLOB_READ_WRITE_TOKEN kaise banayein
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            Vercel Dashboard → project <strong>caregiversnearby</strong> →{" "}
            <strong>Storage</strong> → <strong>Create</strong> →{" "}
            <strong>Blob</strong>
          </li>
          <li>Store create hone ke baad token generate / copy karo</li>
          <li>
            Project → <strong>Settings → Environment Variables</strong> → add{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">
              BLOB_READ_WRITE_TOKEN
            </code>{" "}
            (Production + Preview)
          </li>
          <li>Local ke liye same value `.env.local` mein paste karo</li>
          <li>Redeploy / restart `npm run dev`</li>
        </ol>
        <p className="mt-3 text-xs text-slate-500">
          Direct link:{" "}
          <a
            className="font-medium text-brand-teal hover:underline"
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noreferrer"
          >
            vercel.com/dashboard
          </a>
        </p>
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
          <span className="text-xs text-slate-500">PNG, JPG, WEBP</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />
        </label>
        {error ? (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        ) : null}
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
