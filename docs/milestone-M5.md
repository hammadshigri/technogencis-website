---
milestone: M5
status: planned
scope: HR Dashboard (protected), applicant management
---

# Milestone M5 — HR Dashboard

- [ ] Protect `@dashboard` routes using Supabase Auth middleware/guards
- [ ] Applicants list: table (shadcn table) with filters, search, sorting, pagination
- [ ] Show AI score, application status, and key fields in the list
- [ ] Applicant detail page: resume preview, parsed data, AI score, notes
- [ ] Actions (Server Actions): shortlist, reject, add comment, trigger email notification
- [ ] Persist actions to `events` table via Server Actions (audit trail)
- [ ] UX polish with shadcn components: dialogs, toasts, skeletons
- [ ] Status change (Server Action) → call FastAPI to enqueue notification job; log to `notifications`
- [ ] Show application timeline from `events` (status changes, comments, emails)
- [ ] Verify RLS/role checks for `applications`, `applicants`, `events` access
