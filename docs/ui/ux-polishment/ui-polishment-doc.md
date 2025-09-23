---
Overall Theme & Feel

Professional, modern corporate tech agency look & feel. Clean layout, lots of whitespace, high contrast headings.

Use of large hero images / backgrounds, strong typography.

Emphasis on trust: stats, global presence, leadership photos.

Labelling of services, industries, insights is prominent so visitors can “scan” quickly.

Theme Usage
Primary accent Deep/dark blue / navy tones Used in main CTAs (“Get in Touch”, “Let’s Talk Business”) and nav bar. Gives trust, seriousness.
Secondary accent Slight lighter blues / possibly teals Used in highlight sections, hover states.
Backgrounds Mostly white, very light grey for alternate sections Keeps content readable, clean.
Text Dark grey / near black for headings; medium grey for body text; lighter for subtext Good visual hierarchy and readability.
Imagery High quality photography, often desaturated or muted tone, overlayed with subtle gradients or color overlays.

Theme & Color Palette

Primary Color: Deep Navy Blue (0C1C2B (backgrounds, header, footer))

Accent Color: Bright Green (4CAF50 (CTAs, icons, hover states))

Secondary Accent: Light Teal (00D0B6 (section highlights))

Neutral Backgrounds: White (FFFFFF and very light gray F8F9FA))

Typography:

Headings: Bold, sans-serif (looks like Poppins / Inter)

Body: Lighter sans-serif, ~16–18px line height

Overall Style: Clean, corporate-tech, with generous white space and high-contrast sections.

---

1. Homepage Sections (UI/UX + Animations)
   1.A Hero Section

Background: Full-width dark navy gradient with a faint pattern overlay.

Content: Large bold headline + subcopy + “Let’s Build Together” style CTA button.

Animation:

Text fades/slides up on load.

CTA button uses a subtle scale hover effect.

Tech to replicate:

Tailwind + Framer Motion for fade/slide animations.

Next.js Image for optimized background.

1.B Services Overview Cards

Layout: 3–4 card grid, white cards on light background.

Icons: Simple line icons, colored green/teal on hover.

Animation:

Cards lift slightly (translateY + shadow) on hover.

Icons animate in (scale-up) when scrolled into view.

Tech:

Tailwind hover:scale-105 hover:shadow-lg.

Framer Motion whileInView animations.

1.C Industries Highlight Section

Background: Light gray with faint abstract shapes.

Layout: Horizontal scroll or card grid.

Animation:

Cards fade-in as user scrolls.

Section heading slides in from left.

Tech:

Framer Motion for staggered fade-in.

1.D Case Studies Teaser Grid

Background: White.

Layout: Large image thumbnails with overlaid text.

Animation:

Parallax hover effect on images.

On scroll: grid fades and scales in.

Tech:

react-scroll-parallax for subtle parallax images.

CSS transform scale for hover zoom.

1.E Company Stats (KPIs)

Background: Dark navy section to contrast previous light section.

Layout: 3–4 big bold stats with icons (white text).

Animation:

Number counters animate from 0 to actual values on scroll.

Tech:

react-countup for number animation.

Framer Motion for fade/slide.

1.F Leadership Preview

Background: White, minimal.

Layout: Team photos in a grid with names & roles.

Animation:

Photos fade up with staggered delay.

On hover, slight zoom or reveal of LinkedIn icon.

Tech:

Next.js <Image /> optimized photos.

Framer Motion for stagger.

1.G Global Presence / Locations

Background: Dark gradient or navy with world map overlay image.

Layout: Map + pinned offices, small cards below.

Animation:

Pins pop/scale in when scrolled into view.

Parallax slow-move effect on the background map.

Tech:

react-simple-maps or custom SVG map.

react-scroll-parallax for map movement.

1.H Contact CTA

Background: Bright green or teal gradient for contrast.

Content: Big headline + button.

Animation:

Button pulse hover effect.

Fade-in on scroll.

Tech:

Tailwind gradient utilities.

Framer Motion fade.

2. SERVICES /services & Service detail page (UI/UX + Animations)
   Services list (cards with icons)

Grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.

Card: left icon, title, two-line lead, small CTA.

Hover: icon container background animates to accent and icon color flips to white.

Focus ring: ring-2 ring-primary/40.

Service detail (template placeholder)

Header: H2 + subcopy + secondary CTA

Hero visual: svg/illustration on right with subtle parallax (translateY -6px).

Content sections: alternating image-left image-right. Each section reveal uses fade + slide.

Sidebar (optional): quick links for sub-sections; sticky on desktop using position: sticky; top: 96px.

3. INDUSTRIES / industries & details page (UI/UX + Animations)

Industries list grid

Card-focused grid with descriptive icons.

Card behavior: same as services but with tag badges (enterprise/SMB, region).

Animation: flip-in on first view (scale + rotateZ 1.5deg).

Industry detail

Use hero, problem → solution → success story structure.

Include industry-specific case callouts with inline metrics.

Charts: Animations for charts reveal (animate lines from left to right). Use recharts or chart.js with animation enabled.

Case studies /case-studies & detail
Grid & Detail

Grid as earlier. On detail:

Hero with big client logo, short summary & metrics.

Problem → Approach → Results sections with blockquote and pull quotes.

CTA: “See similar case studies” + “Contact us”.

Animation: timeline scroll reveal for approach steps (step-by-step fade + upward slide with connector line animation).

4. About / about page (UI/UX + Animations)

Company story

Timeline component with alternating steps; animate each step in view.

Use aria-hidden decorative connectors.

Leadership profiles

Full card grid; each card expands to reveal contact/LinkedIn on click (accessible expand/collapse).

Use details element or custom accordion with ARIA attributes.

Global offices

Map integration: lightweight interactive world map (Leaflet or static svg) with hoverable pins. Pins pop on hover (scale + shadow).

Mobile: collapse to list view.

5. Contact /contact
   Form UI

Use react-hook-form, client-side zod validation.

Fields: name, email, company, message, optional file.

Submit flow:

Client validates.

Upload attachment to signed URL (if present).

POST lead to Supabase function endpoint.

Show success state modal / inline success message.

UX & animations

Inline validation errors animate with slide-down + red border.

Submit button becomes spinner then success tick (micro animation).

Use ARIA role="status" for success messages.
