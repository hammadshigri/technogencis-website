---
milestone: M4
status: planned
scope: FastAPI ATS service and OpenAI integration
---

# Milestone M4 — FastAPI ATS Service

- [ ] Scaffold FastAPI project structure with settings and logging
- [ ] Implement `POST /parse-resume` to return structured JSON (skills, experience, education)
- [ ] Implement `POST /score-candidate` to return `{ score, reasons }`
- [ ] Integrate OpenAI Agents SDK with configurable models, timeouts, retries
- [ ] Optional persistence for parsed artifacts and audit logs
- [ ] Email notifications integration (Resend/SendGrid) for candidate updates
- [ ] Dockerfile and deployment workflow (Railway/Fly.io)
- [ ] Basic rate limiting, CORS, and security headers
- [ ] Apply `docs/fastapi-best-practices.md`: DI via Depends, Pydantic schemas, versioned routes `/api/v1`, structured logging, error envelopes, health/readiness probes, tests
