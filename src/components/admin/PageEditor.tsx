"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";
import { updatePageContent, uploadAdminImage } from "@/app/admin/actions";
import { IMAGE_SIZE_HINTS } from "@/lib/imageHints";
import { OgImagePreview } from "@/components/admin/OgImagePreview";

type SeoFields = {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  noIndex: boolean;
};

export function PageEditor({
  slug,
  title: initialTitle,
  sectionsJson,
  seo: initialSeo,
}: {
  slug: string;
  title: string;
  sectionsJson: string;
  seo: SeoFields;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [sections, setSections] = useState(sectionsJson);
  const [seo, setSeo] = useState(initialSeo);
  const [message, setMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();

  const titleLen = seo.title.length;
  const descLen = seo.description.length;

  const titleHint = useMemo(() => {
    if (titleLen === 0) return "Recommended ~50–60 characters";
    if (titleLen < 40) return "A bit short";
    if (titleLen > 60) return "May truncate in Google";
    return "Good length";
  }, [titleLen]);

  const descHint = useMemo(() => {
    if (descLen === 0) return "Recommended ~150–160 characters";
    if (descLen < 120) return "A bit short";
    if (descLen > 160) return "May truncate in Google";
    return "Good length";
  }, [descLen]);

  async function handleOgUpload(file?: File) {
    if (!file) return;
    setUploadError("");
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadAdminImage(fd);
    setUploading(false);
    if (!result.ok) {
      setUploadError(result.error || "Upload failed");
      return;
    }
    setSeo((s) => ({ ...s, ogImage: result.url }));
  }

  function onSave() {
    setMessage("");
    startTransition(async () => {
      const result = await updatePageContent({
        slug,
        title,
        sectionsJson: sections,
        seo,
      });
      if (!result.ok) {
        setMessage(result.error || "Save failed");
        return;
      }
      setMessage("Saved");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(11,45,82,0.05)]">
        <h2 className="font-heading text-lg font-bold">Page</h2>
        <label className="mt-4 block text-sm font-medium">Internal title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
        />
        <label className="mt-4 block text-sm font-medium">
          Sections JSON (hero, FAQs, services, about, etc.)
        </label>
        <textarea
          value={sections}
          onChange={(e) => setSections(e.target.value)}
          rows={16}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs"
        />
      </div>

      <div className="rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(11,45,82,0.05)]">
        <h2 className="font-heading text-lg font-bold">SEO meta</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field
            label={`Meta title (${titleLen}) — ${titleHint}`}
            value={seo.title}
            onChange={(v) => setSeo({ ...seo, title: v })}
          />
          <Field
            label="Canonical path"
            value={seo.canonical}
            onChange={(v) => setSeo({ ...seo, canonical: v })}
          />
          <div className="md:col-span-2">
            <Field
              label={`Meta description (${descLen}) — ${descHint}`}
              value={seo.description}
              onChange={(v) => setSeo({ ...seo, description: v })}
              textarea
            />
          </div>
          <Field
            label="OG title"
            value={seo.ogTitle}
            onChange={(v) => setSeo({ ...seo, ogTitle: v })}
          />
          <div>
            <label className="block text-sm font-medium">OG image</label>
            <p className="mt-0.5 text-xs text-slate-500">{IMAGE_SIZE_HINTS.og}</p>
            <div className="mt-1 flex gap-2">
              <input
                value={seo.ogImage}
                onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              />
              <label className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleOgUpload(e.target.files?.[0])}
                />
              </label>
            </div>
          </div>
          <div className="md:col-span-2">
            <Field
              label="OG description"
              value={seo.ogDescription}
              onChange={(v) => setSeo({ ...seo, ogDescription: v })}
              textarea
            />
          </div>
          <div className="md:col-span-2">
            <OgImagePreview url={seo.ogImage} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={seo.noIndex}
              onChange={(e) => setSeo({ ...seo, noIndex: e.target.checked })}
            />
            noindex (hide from search engines)
          </label>
        </div>
      </div>

      {uploadError ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {uploadError}
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-2xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save page"}
        </button>
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  const className =
    "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-teal";
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={className}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </div>
  );
}
