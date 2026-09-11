"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ContentStatus, ContentType } from "@prisma/client";
import { ImagePlus, Loader2 } from "lucide-react";
import {
  deleteContentEntry,
  saveContentEntry,
  uploadAdminImage,
} from "@/app/admin/actions";
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

export function ContentEditor({
  type,
  id,
  initial,
  listPath,
}: {
  type: ContentType;
  id?: string;
  listPath: string;
  initial?: {
    title: string;
    slug: string;
    h1: string;
    excerpt: string;
    body: string;
    coverImage: string;
    status: ContentStatus;
    seo: SeoFields;
  };
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [h1, setH1] = useState(initial?.h1 || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [body, setBody] = useState(initial?.body || "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage || "");
  const [status, setStatus] = useState<ContentStatus>(
    initial?.status || ContentStatus.DRAFT
  );
  const [seo, setSeo] = useState<SeoFields>(
    initial?.seo || {
      title: "",
      description: "",
      canonical: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      noIndex: false,
    }
  );
  const [message, setMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState<"cover" | "og" | "body" | null>(
    null
  );

  const titleLen = seo.title.length;
  const descLen = seo.description.length;

  const publicPath = useMemo(() => {
    const base = type === ContentType.BLOG ? "/blog" : "/locations";
    return `${base}/${slug || "…"}`;
  }, [type, slug]);

  async function handleUpload(
    file: File | undefined,
    target: "cover" | "og" | "body"
  ) {
    if (!file) return;
    setUploadError("");
    setUploading(target);
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadAdminImage(fd);
    setUploading(null);
    if (!result.ok) {
      setUploadError(result.error || "Upload failed");
      return;
    }
    if (target === "cover") {
      setCoverImage(result.url);
      if (!seo.ogImage) setSeo((s) => ({ ...s, ogImage: result.url }));
    } else if (target === "og") {
      setSeo((s) => ({ ...s, ogImage: result.url }));
    } else {
      const imgTag = `\n<img src="${result.url}" alt="" />\n`;
      setBody((b) => `${b}${imgTag}`);
    }
  }

  function onSave() {
    setMessage("");
    startTransition(async () => {
      const result = await saveContentEntry({
        id,
        type,
        title,
        slug,
        h1,
        excerpt,
        body,
        coverImage,
        status,
        seo,
      });
      if (!result.ok) {
        setMessage(result.error || "Save failed");
        return;
      }
      setMessage("Saved");
      router.push(listPath);
      router.refresh();
    });
  }

  function onDelete() {
    if (!id || !confirm("Delete this entry permanently?")) return;
    startTransition(async () => {
      await deleteContentEntry(id);
      router.push(listPath);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(11,45,82,0.05)] md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" value={title} onChange={setTitle} />
          <Field label="Slug (URL)" value={slug} onChange={setSlug} />
          <Field label="H1 headline" value={h1} onChange={setH1} />
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ContentStatus)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            >
              <option value={ContentStatus.DRAFT}>Draft</option>
              <option value={ContentStatus.PUBLISHED}>Published</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Cover image</label>
            <p className="mt-0.5 text-xs text-slate-500">
              {IMAGE_SIZE_HINTS.cover}
            </p>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-start">
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Image URL or upload below"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              />
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-brand-navy hover:bg-slate-100">
                {uploading === "cover" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleUpload(e.target.files?.[0], "cover")
                  }
                />
              </label>
            </div>
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImage}
                alt=""
                className="mt-3 max-h-48 rounded-2xl border border-slate-100 object-cover"
              />
            ) : null}
          </div>

          <div className="md:col-span-2">
            <Field
              label="Excerpt / short summary"
              value={excerpt}
              onChange={setExcerpt}
              textarea
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <label className="block text-sm font-medium">
                  Body (HTML allowed)
                </label>
                <p className="text-xs text-slate-500">{IMAGE_SIZE_HINTS.body}</p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                {uploading === "body" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ImagePlus className="h-3.5 w-3.5" />
                )}
                Insert image in body
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files?.[0], "body")}
                />
              </label>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={14}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs"
              placeholder="<p>Write your article HTML here…</p>"
            />
          </div>

          <p className="text-sm text-slate-500 md:col-span-2">
            Public URL:{" "}
            <span className="font-semibold text-brand-navy">{publicPath}</span>
          </p>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(11,45,82,0.05)] md:p-6">
        <h2 className="font-heading text-lg font-bold">SEO meta</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field
            label={`Meta title (${titleLen}/60)`}
            value={seo.title}
            onChange={(v) => setSeo({ ...seo, title: v })}
          />
          <Field
            label="Canonical"
            value={seo.canonical}
            onChange={(v) => setSeo({ ...seo, canonical: v })}
          />
          <div className="md:col-span-2">
            <Field
              label={`Meta description (${descLen}/160)`}
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
                {uploading === "og" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files?.[0], "og")}
                />
              </label>
            </div>
            <div className="mt-3">
              <OgImagePreview url={seo.ogImage || coverImage} />
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
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={seo.noIndex}
              onChange={(e) => setSeo({ ...seo, noIndex: e.target.checked })}
            />
            noindex (hide from Google)
          </label>
        </div>
      </div>

      {uploadError ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {uploadError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-2xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {id ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={pending}
            className="rounded-2xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600"
          >
            Delete
          </button>
        ) : null}
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
