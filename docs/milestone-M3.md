---
milestone: M3
status: completed
scope: Careers listing, job details, apply form with uploads
---

# Milestone M3 — Careers & Job Details

- [x] Create Supabase schema: `jobs`, `applications`, `applicants`, `events`
- [x] Seed initial `jobs` and verify RLS policies
- [x] Build Careers listing with filters (role, location, type) and pagination
- [x] Build dynamic job detail route `[slug]/page.tsx` (ISR/SSR as needed)
- [x] Implement Apply form (RHF + Zod) with resume upload (presigned URL via Server Action)
- [x] Persist application via Next.js Server Actions; show confirmation and email acknowledgement (stub)
- [x] Accessibility review and keyboard navigation for all new UI
- [x] **NEW**: Refactor database operations to use Server Actions (`actions/jobs.ts`)
- [x] **NEW**: Update careers pages to fetch data from Supabase database
- [x] **NEW**: Fix environment variable mapping for Supabase service role
- [x] **NEW**: Implement proper field name mapping (snake_case from DB to frontend usage)
