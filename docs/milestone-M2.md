---
milestone: M2
status: planned
scope: Marketing site pages with Contentful and ISR
---

# Milestone M2 — Marketing Site (CMS-limited)

- [x] Build static-first UIs per `milestone-M2-static-marketing.md`
- [x] Configure Contentful (only for Case Studies/Blog): space, content models, API keys (Preview + Delivery)
- [x] Implement `lib/contentful.ts` per `docs/contentful-guide/contentful-doc.md`
  - [x] Use server-only env vars (e.g., `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`) — do not expose via `NEXT_PUBLIC_*`
  - [x] Add helpers: `fetchAllPosts`, `fetchPostBySlug`, and `mapPost`
- [x] Install renderer: `@contentful/rich-text-react-renderer`
- [x] Blogs route structure (per guide): `src/app/(marketing)/blogs/page.tsx` with `export const revalidate = 60`
- [x] Blog detail: `src/app/(marketing)/blogs/[slug]/page.tsx` with `generateStaticParams` and rich text rendering
- [x] Case Studies mirror the Blogs approach (list + `[slug]` detail) or defer if out of scope
- [x] Swap placeholders to CMS data for Case Studies/Blog; keep Services/Industries/About static/MDX
- [x] Implement ISR for marketing routes with appropriate revalidate intervals
- [x] Implement shadcn-based components: hero, grids, cards, leadership, offices, rich text renderer
- [x] Implement Contact lead form (RHF + Zod) via Next.js Server Actions → Supabase `leads` (fallback API optional)
- [x] SEO: metadata, OpenGraph images, sitemap, robots.txt, structured data
- [x] Add Contentful → ISR revalidation webhook endpoint
