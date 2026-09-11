"use server";

import { revalidatePath } from "next/cache";
import { ContentStatus, ContentType, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/cms";

async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== Role.ADMIN) {
    throw new Error("Admin only");
  }
  return session;
}

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().optional(),
});

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      name: String(formData.get("name") || "Caregivers Nearby"),
      tagline: String(formData.get("tagline") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      hours: String(formData.get("hours") || ""),
      address: String(formData.get("address") || ""),
      emergencyNotice: String(formData.get("emergencyNotice") || ""),
    },
    update: {
      name: String(formData.get("name") || "Caregivers Nearby"),
      tagline: String(formData.get("tagline") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      hours: String(formData.get("hours") || ""),
      address: String(formData.get("address") || ""),
      emergencyNotice: String(formData.get("emergencyNotice") || ""),
    },
  });
  revalidatePath("/", "layout");
}

export async function updatePageContent(input: {
  slug: string;
  title: string;
  sectionsJson: string;
  seo: z.infer<typeof seoSchema>;
}) {
  await requireAuth();
  let sections: unknown;
  try {
    sections = JSON.parse(input.sectionsJson);
  } catch {
    return { ok: false, error: "Sections must be valid JSON" };
  }

  const seo = seoSchema.parse(input.seo);
  const entry = await prisma.contentEntry.upsert({
    where: { type_slug: { type: ContentType.PAGE, slug: input.slug } },
    create: {
      type: ContentType.PAGE,
      slug: input.slug,
      title: input.title,
      h1: input.title,
      sections: sections as object,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      seo: { create: seo },
    },
    update: {
      title: input.title,
      sections: sections as object,
      status: ContentStatus.PUBLISHED,
    },
  });

  await prisma.seoMeta.upsert({
    where: { contentEntryId: entry.id },
    create: { contentEntryId: entry.id, ...seo },
    update: seo,
  });

  const path =
    input.slug === "home"
      ? "/"
      : `/${input.slug}`;
  revalidatePath(path);
  revalidatePath("/admin");
  return { ok: true };
}

export async function saveContentEntry(input: {
  id?: string;
  type: ContentType;
  title: string;
  slug?: string;
  h1?: string;
  excerpt?: string;
  body?: string;
  coverImage?: string;
  status: ContentStatus;
  seo: z.infer<typeof seoSchema>;
}) {
  await requireAuth();
  if (input.type === ContentType.SERVICE) {
    return {
      ok: false,
      error: "Service pages are managed by developers, not the CMS",
    };
  }
  const seo = seoSchema.parse(input.seo);
  const slug = input.slug?.trim() || slugify(input.title);
  if (!slug) {
    return { ok: false, error: "Slug is required" };
  }

  const publishedAt =
    input.status === ContentStatus.PUBLISHED ? new Date() : null;

  try {
    if (input.id) {
      const entry = await prisma.contentEntry.update({
        where: { id: input.id },
        data: {
          title: input.title,
          slug,
          h1: input.h1 || input.title,
          excerpt: input.excerpt,
          body: input.body,
          coverImage: input.coverImage,
          status: input.status,
          publishedAt:
            input.status === ContentStatus.PUBLISHED
              ? publishedAt ?? new Date()
              : null,
        },
      });
      await prisma.seoMeta.upsert({
        where: { contentEntryId: entry.id },
        create: { contentEntryId: entry.id, ...seo },
        update: seo,
      });
    } else {
      const entry = await prisma.contentEntry.create({
        data: {
          type: input.type,
          title: input.title,
          slug,
          h1: input.h1 || input.title,
          excerpt: input.excerpt,
          body: input.body,
          coverImage: input.coverImage,
          status: input.status,
          publishedAt,
          seo: { create: seo },
        },
      });
      void entry;
    }
  } catch (e) {
    const message =
      e instanceof Error && e.message.includes("Unique")
        ? "Slug already exists for this content type"
        : "Failed to save content";
    return { ok: false, error: message };
  }

  revalidatePath("/blog");
  revalidatePath("/locations");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  return { ok: true, slug };
}

export async function deleteContentEntry(id: string) {
  await requireAuth();
  await prisma.contentEntry.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/locations");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  return { ok: true };
}

export async function uploadAdminImage(formData: FormData) {
  await requireAuth();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false as const, error: "No file provided" };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false as const,
      error: "BLOB_READ_WRITE_TOKEN is not configured",
    };
  }

  const blob = await put(`seo/${Date.now()}-${file.name}`, file, {
    access: "public",
  });
  return { ok: true as const, url: blob.url };
}

export async function createUser(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") || "")
    .toLowerCase()
    .trim();
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "SEO") as Role;

  if (!email || password.length < 8) {
    return;
  }

  try {
    await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash: await bcrypt.hash(password, 12),
        role: role === Role.ADMIN ? Role.ADMIN : Role.SEO,
      },
    });
  } catch {
    return;
  }

  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();
  if (session.user.id === id) {
    return;
  }
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
