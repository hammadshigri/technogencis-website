---
milestone: M9
status: planned
scope: Background workers, Redis queue, resume parsing and AI scoring
---

# Milestone M9 — Background Workers & Queue

- [ ] Choose worker stack (Celery or RQ) and provision Redis (e.g., Upstash)
- [ ] Worker app: settings, logging, retry/backoff, idempotency keys
- [ ] Implement job: download resume from Supabase Storage via signed URL
- [ ] Implement job: parse resume (OpenAI Agents SDK) → structured fields
- [ ] Implement job: score candidate → `ai_score`, rationale
- [ ] Persist results to Supabase (`applications.parsed_json`, `ai_score`)
- [ ] Emit audit trail to `events` table
- [ ] Dead-letter and failure alerting strategy
- [ ] Minimal smoke tests and local dev workflow (docker-compose)
