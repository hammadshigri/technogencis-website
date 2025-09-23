---
milestone: M2-static
status: planned
scope: Static-first marketing pages (UI only), then CMS wiring
---

# Milestone M2 (Static-First) — Marketing Pages

## Home (`/`)

- [x] Hero section (headline, subcopy, CTA)
- [x] Services overview (cards)
- [x] Industries highlight
- [x] Case studies teaser grid
- [x] Company stats (KPIs)
- [x] Leadership preview
- [x] Global presence/locations
- [x] Contact CTA

## Services (`/services`)

- [x] Services list (cards with icons)
- [x] Service detail template (static placeholder)

## Industries (`/industries`)

- [x] Industries list grid
- [x] Industry detail template (static placeholder)

## Case Studies (`/case-studies`)

- [x] Case studies grid (static now; will swap to Contentful via Contentful SDK later)
- [x] Case study detail template (static placeholder with rich text; CMS-ready slots)

## About (`/about`)

- [x] Company story
- [x] Leadership profiles
- [x] Global offices map/list

## Contact (`/contact`)

- [x] Contact form UI (static)
- [x] Success/error states (UI only)

## Cross-cutting

- [x] Build components using shadcn/ui (buttons, cards, nav, footer, sections)
- [ ] Add responsive layouts and accessibility checks
- [x] Placeholder data via constants; isolate to `lib/mock/` for later swap to Contentful SDK
