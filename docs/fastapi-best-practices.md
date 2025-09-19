---
description: FastAPI best practices for ATS backend (security, performance, testing, ops)
---

# FastAPI Best Practices (ATS Backend)

## Architecture & Structure

- [ ] Use modular package layout: `app/api`, `app/core`, `app/models`, `app/services`, `app/schemas`, `app/db`
- [ ] Dependency Injection via `Depends` for db/session, settings, security
- [ ] Pydantic models in `schemas/` for request/response validation
- [ ] Separate business logic in `services/`; keep endpoints thin

## Configuration & Settings

- [ ] Centralize config with Pydantic `BaseSettings`; load from env
- [ ] Distinguish `dev`, `staging`, `prod` via env vars; never commit secrets
- [ ] Typed settings for external services (OpenAI, email, storage)

## Security

- [ ] Enable CORS with explicit origins; deny `*` in prod
- [ ] Add security headers (via Starlette middlewares)
- [ ] Validate and sanitize inputs (filenames, URLs); limit upload sizes
- [ ] Use signed URLs for storage; avoid serving raw uploads directly
- [ ] Rate limit sensitive endpoints; include request timeouts
- [ ] Avoid leaking stack traces in prod; structured error responses

## Performance & Reliability

- [ ] Use async endpoints where IO-bound; threadpool for CPU-bound parsing
- [ ] Set client timeouts/retries for OpenAI calls; exponential backoff
- [ ] Implement idempotency keys for mutation endpoints if retried by clients
- [ ] Add caching (where safe) for static metadata

## Observability

- [ ] Structured logging (JSON); include correlation/request IDs
- [ ] Central error reporting (Sentry) with request context
- [ ] Basic metrics (latency, error rate); health and readiness probes

## Data & Models

- [ ] Define ORM models (SQLModel/SQLAlchemy) separately from Pydantic schemas
- [ ] Use Alembic for migrations if using SQL DB
- [ ] Store PII with encryption at rest; minimize retention with lifecycle policies

## API Design

- [ ] Version routes: `/api/v1/...`
- [ ] Consistent response envelope and error schema
- [ ] Pagination for list endpoints; validation via Pydantic
- [ ] OpenAPI docs with tags, examples, and descriptions

## Testing

- [ ] Unit tests for services; integration tests for endpoints (TestClient)
- [ ] Mock external systems (OpenAI, email) in tests
- [ ] Contract tests shared with frontend (schemas)

## Operations

- [ ] Containerize with slim Python base; multi-stage builds
- [ ] Use `gunicorn`/`uvicorn` workers tuned for environment
- [ ] Readiness/liveness endpoints and startup/shutdown events
- [ ] CI: lint (ruff/flake8), type-check (mypy/pyright), tests, security scan (bandit)
