---
milestone: M6
status: planned
scope: Authentication & Authorization hardening
---

# Milestone M6 — AuthN/Z

- [ ] Integrate Supabase Auth across server components (session retrieval) and client
- [ ] Implement `user_roles` table and role assignment flows
- [ ] Add middleware to guard `@dashboard` and admin operations
- [ ] Ensure no secrets in client code; move to server where needed
- [ ] Use Next.js Server Actions for all sensitive DB writes; keep secrets server-only
- [ ] RLS policies on Supabase tables to restrict access appropriately
- [ ] Add tests for protected routes and role checks
