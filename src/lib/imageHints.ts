/** Recommended image sizes shown in the SEO admin UI */
export const IMAGE_SIZE_HINTS = {
  cover:
    "Recommended: 1600×900 px (16:9). JPG or WebP, under 500 KB.",
  og: "Recommended: 1200×630 px (Open Graph). JPG or WebP, under 300 KB.",
  body: "Recommended: max width 1200 px. JPG or WebP, under 400 KB.",
  media:
    "Recommended: 1200×630 px for social/OG, or 1600×900 px for covers. JPG or WebP.",
} as const;

/** Shown when a page has no custom OG image yet */
export const DEFAULT_SITE_OG_FALLBACK =
  "https://www.caregiversnearby.com/logo/caregiverslogo.png";
