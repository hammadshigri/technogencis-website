---
milestone: M10
status: planned
scope: Notifications & automations (status-change triggers, emails)
---

# Milestone M10 — Notifications & Automations

- [ ] Status-change trigger (frontend or webhook) → queue email job
- [ ] Email templates for candidate updates (applied, shortlisted, rejected, hired)
- [ ] Provider integration (Postmark/Resend) with environment-driven config
- [ ] Log emails to `notifications` table; link to `applications`
- [ ] HR CC configuration and unsubscribe preferences (basic)
- [ ] Retry and failure handling; DLQ strategy reuse
- [ ] E2E test for status-change → email path (stub provider)
