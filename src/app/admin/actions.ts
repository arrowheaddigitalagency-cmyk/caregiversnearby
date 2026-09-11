"use server";

import { revalidatePath } from "next/cache";
import { ContentStatus, ContentType, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/cms";
import {
  canCreateRole,
  canManageUser,
  isStaffAdmin,
} from "@/lib/roles";

async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

/** Client admin or developer super admin */
async function requireStaffAdmin() {
  const session = await requireAuth();
  if (!isStaffAdmin(session.user.role)) {
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
  await requireStaffAdmin();
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
      error:
        "Image uploads are not available yet. Please ask a developer to finish media storage setup.",
    };
  }

  const blob = await put(`seo/${Date.now()}-${file.name}`, file, {
    access: "public",
  });
  return { ok: true as const, url: blob.url };
}

export async function createUser(formData: FormData) {
  const session = await requireStaffAdmin();
  const email = String(formData.get("email") || "")
    .toLowerCase()
    .trim();
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "");
  const requestedRole = String(formData.get("role") || "SEO");

  if (!email || password.length < 8) {
    return;
  }

  const role =
    requestedRole === "ADMIN"
      ? Role.ADMIN
      : requestedRole === "SUPER_ADMIN"
        ? Role.SUPER_ADMIN
        : Role.SEO;

  // Never allow creating SUPER_ADMIN from the dashboard
  if (role === Role.SUPER_ADMIN || !canCreateRole(session.user.role, role)) {
    return;
  }

  try {
    await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash: await bcrypt.hash(password, 12),
        role,
      },
    });
  } catch {
    return;
  }

  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await requireStaffAdmin();
  if (session.user.id === id) {
    return;
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target || !canManageUser(session.user.role, target.role)) {
    return;
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function changeOwnPassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await requireAuth();
  if (input.newPassword.length < 8) {
    return { ok: false as const, error: "New password must be at least 8 characters" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return { ok: false as const, error: "User not found" };
  }

  const valid = await bcrypt.compare(input.currentPassword, user.passwordHash);
  if (!valid) {
    return { ok: false as const, error: "Current password is incorrect" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(input.newPassword, 12) },
  });

  return { ok: true as const };
}

export async function resetUserPassword(input: {
  userId: string;
  newPassword: string;
}) {
  const session = await requireStaffAdmin();
  if (input.newPassword.length < 8) {
    return { ok: false as const, error: "Password must be at least 8 characters" };
  }

  const target = await prisma.user.findUnique({ where: { id: input.userId } });
  if (!target || !canManageUser(session.user.role, target.role)) {
    return { ok: false as const, error: "Not allowed to reset this user" };
  }

  await prisma.user.update({
    where: { id: input.userId },
    data: { passwordHash: await bcrypt.hash(input.newPassword, 12) },
  });

  return { ok: true as const };
}
