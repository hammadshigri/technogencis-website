---
milestone: M2-UI-UX
status: planned
scope: Modern UI polish, micro-interactions, and accessibility across marketing pages
---

# Milestone M2 — UI/UX Polishment (Marketing)

This milestone elevates the marketing surfaces (Home, About, Services, Industries, Contact) with modern layout, micro-animations, and accessibility, inspired by enterprise tech sites like Devsinc (see reference). Content for Blogs/Case Studies will be wired in M2 CMS.

- Reference inspiration: https://www.devsinc.com/

## 0) Prereqs & Dependencies

- [x] Install UI/animation libs
  - [x] framer-motion (section reveals, slide/scale)
  - [x] react-countup (KPI counters)
  - [x] react-hook-form + zod (contact form validation; client-side)
  - [x] Optional: react-scroll-parallax (subtle parallax on case images, map)
  - [x] Optional: react-simple-maps or Leaflet (global map), recharts/chart.js (animated charts)
- [x] Tailwind tokens audit
  - [x] Confirm primary/secondary accents and surface tokens
  - [x] Ensure accessible contrast for headings/body/subtext in light & dark
- [x] Reduced motion support
  - [x] Wrap motion variants to respect prefers-reduced-motion

## 0a) Theme, Palette & Typography

- [x] Color palette definition (tokens)
  - [x] Primary (deep navy): #0C1C2B — backgrounds, header, footer
  - [x] Accent (teal): #00D0B6 — section highlights/accents
  - [x] Neutrals: white #FFFFFF, light gray #F8F9FA — backgrounds/alt sections
  - [x] Text colors: headings near-black, body mid-gray, subtext lighter gray
- [x] Tailwind theme tokens mapped to CSS variables
  - [x] Extend colors (primary, secondary, accent, muted, foreground/background)
  - [x] Verify border, ring, surface elevations match palette
  - [x] Light/dark variants pass contrast requirements
- [x] Typography setup (Next.js fonts)
  - [x] Headings: Poppins (600/700); body: Inter
  - [x] Configure via next/font with proper subsets and fallbacks
  - [x] Establish scale (h1–h6), line-heights (≈1.4–1.6), and weights
- [x] Overall style rules
  - [x] Generous whitespace and section spacing scale (consistent across pages)
  - [x] High-contrast headings; readable body text
  - [x] Imagery guidelines: high-quality, desaturated/muted with subtle gradients
  - [x] Accessibility: ensure all chosen colors meet WCAG contrast

## 1) Home (`/`) — Sections & Animations

### 1.A Hero

- [x] Full-width dark/navy gradient or pattern overlay
- [x] H1 + subcopy + primary/secondary CTAs; no layout shift (CLS-safe)
- [x] Framer Motion: text fade/slide up on load; CTA hover scale 1.02 + elevation
- [x] Keyboard-focusable CTAs; visible focus rings

### 1.B Services Overview Cards

- [x] 3–4 card grid (icon, title, 1–2 line blurb, chevron/cta)
- [x] Cards: bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all
- [x] Framer Motion: staggered whileInView reveal (staggerChildren ≈ 0.06)
- [x] Keyboard accessible; focus ring on card/cta

### 1.C Industries Highlight

- [x] Two-column split (visual left, list right) or horizontally scrollable strip
- [x] Heading slides in from left; items fade in
- [x] Motion variants: x: -30→0 for image, x: 30→0 for text

### 1.D Case Studies Teaser Grid

- [x] Grid of large image thumbnails with overlaid text
- [x] Hover: image scale(1.03) + brightness(0.9), card lift
- [x] Optional parallax on hover/scroll

### 1.E Company Stats (KPIs)

- [x] Row of 3–5 KPI tiles; large number + label
- [x] react-countup: animate once when in view; ARIA live if updating
- [x] Tile style: bg-gradient-to-br from-primary/5 to-surface rounded-xl p-6

### 1.F Leadership Preview

- [x] Row/grid of avatar photos with name + role
- [x] Framer Motion: avatars scale/fade in with 0.06s stagger
- [x] Hover: slight zoom or reveal LinkedIn icon (a11y friendly)

### 1.G Global Presence / Locations

- [x] Section with world map background or list + map teaser
- [x] Pins pop/scale in when scrolled into view (if map used)
- [x] Parallax slow-move effect on background (optional)

### 1.H Contact CTA

- [x] Big rounded card overlapping boundary (negative margin ok)
- [x] CTA uses primary accent; button micro bounce on hover (scale 1.03)

## 2) Services (`/services` + `[slug]`)

### List

- [x] Cards: left icon, title, two-line lead, small CTA
- [x] Hover: icon container animates to accent and icon flips to white
- [x] Focus ring: ring-2 ring-primary/40 on interactive regions
- [x] Framer Motion: scroll reveal for the grid

### Detail (template placeholder)

- [x] Header: H2 + subcopy + secondary CTA
- [x] Visual (svg/illustration) on right; subtle parallax (translateY -6px)
- [x] Alternating content sections (image-left / image-right)
- [x] Each section: fade + slide reveal; respects reduced motion
- [x] Optional sticky sidebar quick links (sticky; top: 96px)

## 3) Industries (`/industries` + `[slug]`)

### List

- [x] Descriptive icon cards; optional badges (enterprise/SMB, region)
- [x] Flip-in/scale-in animation on first view (scale + small rotate)
- [x] Focus ring on cards/links

### Detail

- [x] Hero; sections: problem → solution → success story
- [x] Inline metric callouts with icons
- [x] Optional chart reveal (recharts/chart.js) for sample metric

## 4) Case Studies (`/case-studies` + `[slug]`)

### Grid

- [x] Image overlays; hover lift; accessible labels
- [x] Optional parallax (react-scroll-parallax)

### Detail (placeholder until CMS)

- [x] Hero area with client name/logo placeholder + metrics
- [x] Sections: Problem → Approach → Results; include blockquote/pull quote
- [x] Timeline-style reveal for approach steps (sequential fade/slide)

## 5) About (`/about`)

- [x] Company story timeline (alternating steps, animated on in-view)
- [x] Leadership profiles: expandable cards (details/accordion) with ARIA
- [ ] Global offices: card grid now; optional map (Leaflet/static SVG) later

## 6) Contact (`/contact`)

- [x] Split layout (info panel left, form right)
- [x] React Hook Form + zod validation
  - [x] Required: name, email (valid), message; optional: company
  - [x] Inline validation errors animate (slide-down), announce via ARIA
- [x] Submit micro-interactions
  - [x] Button → spinner → success tick state
  - [x] role="status" region for success message

## 7) Accessibility & Performance

- [ ] Keyboard nav/focus states across all interactive controls
- [ ] Prefers-reduced-motion respected; disable heavy effects
- [ ] CLS-safe hero/section imagery; use next/image where applicable
- [ ] Lazy-load heavy visuals; ensure good LCP
- [ ] Lighthouse checks (performance, a11y, best practices, SEO)

## 8) Theming & Consistency

- [x] Consolidate gradient tokens; primary/secondary surfaces usage
- [ ] Spacing scale consistency across sections
- [ ] Border radii and elevations standardized

## 9) QA & Sign-off

- [ ] Cross-browser smoke (Chromium/Firefox/WebKit)
- [ ] Responsive checks at key breakpoints (sm/md/lg/xl)
- [ ] Stakeholder review (screenshots/video captures) and sign-off
