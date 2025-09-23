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
- Supabase (Auth, Database, Storage + public read policies where needed)
- FastAPI backend for ATS + OpenAI Agents SDK integration
- Background workers (Celery or RQ) with Redis (e.g., Upstash Redis) as the queue
- Email provider (Postmark/Resend/SendGrid) for notifications
- File storage for resumes in Supabase Storage with presigned uploads
- SWR for client-side fetching, React Hook Form + Zod for forms/validation
- Vercel (frontend), Railway/Fly.io (backend) — or Vercel Functions for thin adapters
- Sentry (error logging), Playwright/Cypress (E2E), Jest + RTL (unit/integration)

### HR Automation Workflow Alignment

This plan aligns with `docs/hr-automation-workflow-guide/hr-automation-docs.md`:

1. HR posts job → stored in Supabase (`jobs`)
2. Public careers page shows jobs (ISR or cached fetch)
3. Candidate applies with resume upload → FastAPI receives form + file or presigned URL
4. Worker parses resume + AI scoring → updates Supabase (`applications`, `applicants`)
5. HR dashboard to review, filter, change status
6. Status changes trigger notifications via background worker

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
- Apply form: RHF + Zod
  - File upload via presigned URL to Supabase Storage (preferred) or direct multipart to FastAPI
  - Submit application payload to FastAPI which enqueues processing job
- Client hints and accessibility; optimistic UI where appropriate

## 5. FastAPI ATS Service (M4)

- Endpoints:
  - `POST /apply` (application payload + file reference)
  - `POST /presign-upload` (optional) → returns presigned URL for resume upload
  - `POST /parse-resume` (file URL) → structured JSON
  - `POST /score-candidate` → score + rationale
  - `POST /webhooks/supabase` (optional) for async processing callbacks
- Integrations: OpenAI Agents SDK; error handling, retries, timeouts
- Persistence: store parsed artifacts, audit logs (optional)
- Immediately enqueue background job (Redis) for parsing/scoring
- Email notifications (candidate updates) via provider (e.g., Resend/SendGrid)

## 6. Background Workers & Queue (M5)

- Choose worker stack (Celery or RQ) and set up Redis
- Job handlers:
  - Download resume from Supabase Storage via signed URL
  - Parse resume (OpenAI Agents SDK) and extract fields (skills, experience, etc.)
  - Score candidate and persist to Supabase (`applications`, optional `parsed_json` column)
  - Emit events to `events` table for audit trail
- Idempotency keys and retries; dead-letter handling strategy
- Trigger notification jobs when application status changes

## 7. HR Dashboard (M6)

- Auth: Supabase Auth; role-based guards (`public`, `hr`, `admin`)
- Protected routes in `@dashboard`: applicants table (filters, search, score), detail view (resume preview, parsed data, notes)
- Actions (shadcn components): shortlist, reject, comment, trigger email; audit trail to `events`
- Data fetching: server components + SWR for client refinements

## 8. Notifications & Automations (M7)

- Status change → webhook or direct call to FastAPI to enqueue email job
- Worker sends emails via provider (Postmark/Resend) and logs to `notifications` table
- Templates for candidate updates; HR CC options

## 9. Authentication & Authorization (M8)

- Supabase Auth provider wiring; server-side session retrieval
- Role assignment strategy: `user_roles` table or JWT claims
- Middleware for route protection; server actions validating role

## 10. Observability & Quality (M9)

- Sentry setup (frontend + backend) with source maps
- Request logging, tracing on backend; rate limiting, CORS, security headers
- Error boundaries per route segment (`error.tsx`)

## 11. Testing Strategy (M10)

- Unit: components, utils (Jest + RTL)
- Integration: data fetching boundaries, form flows (Jest + MSW)
- E2E: core funnels (Home → Contact, Careers → Apply, Dashboard flows) with Playwright/Cypress
- Contract tests between frontend and FastAPI (schema validation)

## 12. Performance & Security (Ongoing)

- Use server components; `next/image`, `next/font`, dynamic imports
- Cache and ISR revalidate tags; SWR caching
- Security: input validation (Zod), output encoding, HTTPS, secrets on server, CSRF on mutations, Storage rules

## 13. Deployment & Environments (M11)

- Vercel project with envs; preview deployments per PR
- Backend deploy on Railway/Fly.io; health checks; rollout strategy
- Contentful spaces/environments; webhooks for revalidation

## 14. Data Model (initial cut)

- `jobs(id, slug, title, description_rich, location, type, created_at, updated_at, status)`
- `applicants(id, name, email, phone, created_at)`
- `applications(id, job_id, applicant_id, resume_url, parsed_json, ai_score, status, created_at)`
- `events(id, application_id, type, payload_json, created_at)`
- `notifications(id, application_id, type, payload_json, created_at)`
- `leads(id, name, email, message, created_at)`
- `user_roles(user_id, role)`

## 15. API Contracts (high level)

- Frontend → FastAPI
  - `POST /apply`: `{ jobId, applicant, resumeUrl, ... }` → `{ applicationId }`
  - `POST /presign-upload`: `{ filename, contentType }` → `{ url, fields }`
  - `POST /parse-resume`: `{ applicationId, resumeUrl }` → `{ parsed, skills, experience }`
  - `POST /score-candidate`: `{ applicationId, parsed }` → `{ score, reasons }`
- Webhooks → Frontend/Supabase
  - Revalidate ISR on Contentful publish events

## 16. Milestones & Timeline

- [ ] M0 (1d): Repos, CI, base tooling
- [ ] M1 (2d): Frontend foundation (+ shadcn/ui setup)
- [ ] M2 (5d): Marketing pages + Contentful integration
- [ ] M3 (4d): Careers listing + job detail + apply form (frontend)
- [ ] M4 (4d): FastAPI ATS endpoints + presigned uploads + Storage wiring
- [ ] M5 (4d): Background workers (Celery/RQ) + Redis + resume parsing + AI scoring
- [ ] M6 (4d): HR Dashboard (list, detail, actions, filters)
- [ ] M7 (2d): Notifications & automations (status-change triggers, email templates)
- [ ] M8 (2d): AuthN/Z hardening (RBAC, route protection, policies)
- [ ] M9 (1d): Observability (Sentry, logs, tracing)
- [ ] M10 (2d): Testing (unit, integration, E2E) + CI quality gates
- [ ] M11 (1d): Deployment + runbooks

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
