---
owner: web
status: draft
purpose: Actionable implementation plan aligned with project-specification.md and best-practises.md
---

# Implementation Plan

This plan translates the specification into concrete milestones, epics, and tasks. It follows `docs/best-practises.md` for structure, performance, security, testing, and tooling.

## 0. Tech Stack & Baseline

- Next.js 13+ with `app/` router, TypeScript, Server Components by default
- Tailwind CSS + shadcn/ui (Radix UI + Tailwind components)
- Contentful (CMS) via GraphQL — limited to case studies/blog content
- Supabase (Auth, Database, Storage)
- FastAPI backend for ATS + OpenAI Agents SDK integration
- SWR for client-side fetching, React Hook Form + Zod for forms/validation
- Vercel (frontend), Railway/Fly.io (backend) — or Vercel Functions for thin adapters
- Sentry (error logging), Playwright/Cypress (E2E), Jest + RTL (unit/integration)

## 1. Repository Setup (Milestone M0)

- Initialize monorepo (optional) or two repos:
  - `frontend/` Next.js app
  - `backend/` FastAPI service
- Add base configs: ESLint, Prettier, TypeScript strict, Tailwind, Husky + lint-staged
- Add shadcn/ui setup (init config, component registry, base primitives)
- Add CI: GitHub Actions (lint, type-check, test, build)
- Secrets handling via `.env.local`, `.env.production` with Vercel/hosted secrets

## 2. Frontend Foundation (M1)

- Create `app/` structure: `layout.tsx`, `page.tsx`, `error.tsx`, `loading.tsx`, `@marketing`, `@careers`, `@dashboard`
- Global styling with Tailwind; set up `next/font` and base theme tokens
- Install and configure shadcn/ui; define design tokens and theming (light/dark)
- Shared libs: `lib/contentful.ts`, `lib/supabase.ts`, `lib/fetcher.ts`, `types/`
- Routing groups and metadata with `head` or metadata API

## 3. Marketing Site (M2)

- Contentful integration (blogs/case studies only) using JS SDK per `docs/contentful-guide/contentful-doc.md` (`lib/contentful.js`, `fetchAllPosts`, `fetchPostBySlug`), with ISR
  - Include dynamic detail pages with `[slug]`, `generateStaticParams`, and rich text rendering via `@contentful/rich-text-react-renderer`
- Pages with ISR:
  - Home, Services, Industries, Case Studies, About, Contact
- Components (shadcn-based): hero, grids, cards, leadership, offices, rich text renderer
- Lead form (Contact): React Hook Form + Zod → Supabase `leads` table
- SEO: metadata, OpenGraph, sitemaps, robots, structured data

## 4. Careers & Job Details (M3)

- Supabase schema: `jobs`, `applications`, `applicants`, `events`
- Careers listing page with filters (role, location, type)
- Dynamic job detail route `[slug]/page.tsx` (ISR/SSR as needed)
- Apply form: RHF + Zod, file upload to Supabase Storage (or direct to backend presigned upload)
- Client hints and accessibility; optimistic UI where appropriate

## 5. FastAPI ATS Service (M4)

- Endpoints:
  - `POST /parse-resume` (file or URL) → structured JSON
  - `POST /score-candidate` → score + rationale
  - `POST /webhooks/supabase` (optional) for async processing
- Integrations: OpenAI Agents SDK; error handling, retries, timeouts
- Persistence (optional): store parsed artifacts, audit logs
- Email notifications (candidate updates) via provider (e.g., Resend/SendGrid)

## 6. HR Dashboard (M5)

- Auth: Supabase Auth; role-based guards (`public`, `hr`, `admin`)
- Protected routes in `@dashboard`: applicants table (filters, search, score), detail view (resume preview, parsed data, notes)
- Actions (shadcn components): shortlist, reject, comment, trigger email; audit trail to `events`
- Data fetching: server components + SWR for client refinements

## 7. Authentication & Authorization (M6)

- Supabase Auth provider wiring; server-side session retrieval
- Role assignment strategy: `user_roles` table or JWT claims
- Middleware for route protection; server actions validating role

## 8. Observability & Quality (M7)

- Sentry setup (frontend + backend) with source maps
- Request logging, tracing on backend; rate limiting, CORS, security headers
- Error boundaries per route segment (`error.tsx`)

## 9. Testing Strategy (Ongoing)

- Unit: components, utils (Jest + RTL)
- Integration: data fetching boundaries, form flows (Jest + MSW)
- E2E: core funnels (Home → Contact, Careers → Apply, Dashboard flows) with Playwright/Cypress
- Contract tests between frontend and FastAPI (schema validation)

## 10. Performance & Security (Ongoing)

- Use server components; `next/image`, `next/font`, dynamic imports
- Cache and ISR revalidate tags; SWR caching
- Security: input validation (Zod), output encoding, HTTPS, secrets on server, CSRF on mutations, Storage rules

## 11. Deployment & Environments (M8)

- Vercel project with envs; preview deployments per PR
- Backend deploy on Railway/Fly.io; health checks; rollout strategy
- Contentful spaces/environments; webhooks for revalidation

## 12. Data Model (initial cut)

- `jobs(id, slug, title, description_rich, location, type, created_at, updated_at, status)`
- `applicants(id, name, email, phone, created_at)`
- `applications(id, job_id, applicant_id, resume_url, parsed_json, ai_score, status, created_at)`
- `events(id, application_id, type, payload_json, created_at)`
- `leads(id, name, email, message, created_at)`
- `user_roles(user_id, role)`

## 13. API Contracts (high level)

- Frontend → FastAPI
  - `POST /parse-resume`: `{ applicationId, resumeUrl|file }` → `{ parsed, skills, experience }`
  - `POST /score-candidate`: `{ applicationId, parsed }` → `{ score, reasons }`
- Webhooks → Frontend/Supabase
  - Revalidate ISR on Contentful publish events

## 14. Milestones & Timeline

- [ ] M0 (1d): Repos, CI, base tooling
- [ ] M1 (2d): Frontend foundation (+ shadcn/ui setup)
- [ ] M2 (5d): Marketing pages + Contentful integration
- [ ] M3 (4d): Careers listing + job detail + apply form
- [ ] M4 (5d): FastAPI ATS endpoints + OpenAI integration
- [ ] M5 (4d): HR Dashboard
- [ ] M6 (2d): AuthN/Z hardening
- [ ] M7 (1d): Observability
- [ ] M8 (1d): Deployment + runbooks

## 15. Risks & Mitigations

- Contentful schema churn → use codegen and environment gating
- OpenAI quota/latency → queue + async webhooks; graceful degradation
- PII handling → storage lifecycle policies, encryption, access rules
- SEO regressions → prerendering, sitemaps, structured data, monitoring

## 16. Acceptance Criteria (Definition of Done)

- All specified pages live with CMS data and ISR
- Careers flow from listing → apply → ATS processing → HR dashboard review
- Auth roles enforced; no protected data leaked to clients
- Test suites green; performance budgets met; error rates within SLO
