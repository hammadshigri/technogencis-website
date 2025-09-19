---
milestone: M2-static
status: planned
scope: Static-first marketing pages (UI only), then CMS wiring
---

# Milestone M2 (Static-First) — Marketing Pages

## Home (`/`)

- [ ] Hero section (headline, subcopy, CTA)
- [ ] Services overview (cards)
- [ ] Industries highlight
- [ ] Case studies teaser grid
- [ ] Company stats (KPIs)
- [ ] Leadership preview
- [ ] Global presence/locations
- [ ] Contact CTA

## Services (`/services`)

- [ ] Services list (cards with icons)
- [ ] Service detail template (static placeholder)

## Industries (`/industries`)

- [ ] Industries list grid
- [ ] Industry detail template (static placeholder)

## Case Studies (`/case-studies`)

- [ ] Case studies grid (static now; will swap to Contentful via Contentful SDK later)
- [ ] Case study detail template (static placeholder with rich text; CMS-ready slots)

## About (`/about`)

- [ ] Company story
- [ ] Leadership profiles
- [ ] Global offices map/list

## Contact (`/contact`)

- [ ] Contact form UI (static)
- [ ] Success/error states (UI only)

## Cross-cutting

- [ ] Build components using shadcn/ui (buttons, cards, nav, footer, sections)
- [ ] Add responsive layouts and accessibility checks
- [ ] Placeholder data via constants; isolate to `lib/mock/` for later swap to Contentful SDK
