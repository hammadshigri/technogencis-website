---
milestone: M4
status: planned
scope: FastAPI ATS service, presigned uploads, and OpenAI integration
---

# Milestone M4 — FastAPI ATS Service

- [ ] Scaffold FastAPI project structure with settings and logging
- [ ] Implement `POST /apply` to accept application payload and enqueue processing job
- [ ] Implement `POST /presign-upload` to return Supabase Storage presigned URL and fields
- [ ] Implement `POST /parse-resume` (file URL) → structured JSON (skills, experience, education)
- [ ] Implement `POST /score-candidate` → `{ score, reasons }`
- [ ] Enqueue background job (Redis) from `/apply` for parsing/scoring
- [ ] Integrate OpenAI Agents SDK with configurable models, timeouts, retries
- [ ] Optional persistence for parsed artifacts and audit logs
- [ ] Email notifications integration (Resend/SendGrid) for candidate updates (stub)
- [ ] Dockerfile and deployment workflow (Railway/Fly.io)
- [ ] Basic rate limiting, CORS, and security headers
- [ ] Apply `docs/fastapi-best-practices.md`: DI via Depends, Pydantic schemas, versioned routes `/api/v1`, structured logging, error envelopes, health/readiness probes, tests
