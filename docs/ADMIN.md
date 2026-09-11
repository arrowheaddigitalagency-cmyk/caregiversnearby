# SEO Admin CMS — Team Handoff

## What this is
Password-protected CMS at `/admin` for Caregivers Nearby. The SEO team edits meta tags, core page content, blog posts, and local city/county landing pages.

## Where content appears

| Admin area | Public URL |
|------------|------------|
| Pages | `/`, `/about`, `/contact`, `/join-us` |
| Blog | `/blog` and `/blog/[slug]` (also in main nav) |
| Local areas | `/locations` and `/locations/[slug]` (footer: Service Areas) |

Local area pages use the same clean article layout as blog posts — they do not break the site design. The template is built once by developers; the SEO team creates each city/county page and manages its SEO over time.

## Image sizes

| Use | Recommended size |
|-----|------------------|
| Open Graph (social share) | **1200×630 px** |
| Blog / page cover | **1600×900 px** (16:9) |
| Images inside article body | Max width **1200 px** |

Prefer JPG or WebP, keep files under ~300–500 KB.

## Media uploads (developers)

Create a Vercel Blob store and ensure `BLOB_READ_WRITE_TOKEN` is set on Production / Preview (and locally via `vercel env pull`). SEO users only see the upload UI — not setup steps.

## Roles

| Role | Access |
|------|--------|
| **SUPER_ADMIN** | Developer only. Creates Admins + SEO users. Full access. Credentials stay with the developer team. |
| **ADMIN** | Client admin. Creates SEO users, edits settings, manages content. Cannot create Super Admins. |
| **SEO** | Edit pages, blog, local areas, media; **view-only** settings |

Seed with `SUPERADMIN_EMAIL` / `SUPERADMIN_PASSWORD`. Optionally set `CLIENT_ADMIN_EMAIL` / `CLIENT_ADMIN_PASSWORD` for the client admin.

## Meta tips
- Title ≈ 50–60 characters; description ≈ 150–160
- Draft → Publish (drafts stay out of the sitemap)
- Use noindex only when a page must stay out of Google
