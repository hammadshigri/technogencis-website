---
milestone: M2
status: planned
scope: Marketing site pages with Contentful and ISR
---

# Milestone M2 — Marketing Site (CMS-limited)

- [ ] Build static-first UIs per `milestone-M2-static-marketing.md`
- [ ] Configure Contentful (only for Case Studies/Blog): space, content models, API keys (Preview + Delivery)
- [ ] Implement `lib/contentful.js` per `docs/contentful-guide/contentful-doc.md`
- [ ] Add `fetchAllPosts`, `fetchPostBySlug` and map function
- [ ] Implement blogs/case-studies pages using Server Components with ISR (`export const revalidate = 60`)
- [ ] Add dynamic `[slug]` route: `generateStaticParams`, detail page rendering with `@contentful/rich-text-react-renderer`
- [ ] Swap placeholders to CMS data for Case Studies/Blog; keep Services/Industries/About static/MDX
- [ ] Implement ISR for marketing routes with appropriate revalidate intervals
- [ ] Implement shadcn-based components: hero, grids, cards, leadership, offices, rich text renderer
- [ ] Implement Contact lead form (React Hook Form + Zod) → Supabase `leads`
- [ ] SEO: metadata, OpenGraph images, sitemap, robots.txt, structured data
- [ ] Add Contentful → ISR revalidation webhook endpoint
