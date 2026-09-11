# SEO Admin CMS — Team Handoff

## What this is
Password-protected CMS at `/admin` for Caregivers Nearby. SEO team edits meta tags, core page content, blog posts, and local city/county landing pages.

## BLOB_READ_WRITE_TOKEN (image uploads)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → project **caregiversnearby**
2. **Storage** → **Create** → **Blob**
3. Copy the read/write token
4. **Settings → Environment Variables** → add `BLOB_READ_WRITE_TOKEN` for Production + Preview
5. Local: paste the same value into `.env.local`
6. Redeploy (or restart `npm run dev`)

Without this token, Media / blog image upload will show an error.

## Setup (developers)

1. Neon Postgres `DATABASE_URL`
2. `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Optional: `BLOB_READ_WRITE_TOKEN`
4. `npm run db:setup` then `npm run dev`
5. `/admin/login`

## SEO team areas

| Area | Use for |
|------|---------|
| **Pages** | Home, About, Contact, Join Us — SEO meta + sections JSON |
| **Blog** | Articles at `/blog` + `/blog/[slug]` with cover/body images |
| **Local SEO** | City/county landings at `/locations/[slug]` for Google local search |
| **Media** | Standalone image uploads |
| **Settings** | View for SEO users; **Admin only** can edit |
| **Users** | Admin invites SEO teammates |

### What Local SEO means
Not the homepage “Services” section. These are separate pages like `/locations/madison-ga` so Google can rank “caregivers near Madison GA”.

### Meta tips
- Title ≈ 50–60 characters; description ≈ 150–160
- Draft → Publish (drafts stay out of sitemap)
- noindex only when a page must stay out of Google

## Out of scope
Rank tracking tools (Search Console / Ahrefs). Service landing page CMS (removed — developer builds those if needed).
