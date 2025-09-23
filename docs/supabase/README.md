# Supabase Setup

1. Create a Supabase project (done).
2. Set env vars in `frontend/.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE` (server only, used by server actions/APIs)
3. Apply SQL migrations in `supabase/migrations/` to create tables and RLS.

## Apply via SQL Editor

- Open Supabase Dashboard → SQL Editor.
- Paste the contents of `supabase/migrations/0001_init.sql` and run.

## Tables Created

- `leads` (marketing contact submissions)
- `jobs` (careers postings)
- `applications` (candidate applications)
- `events` (audit trail / timeline)

RLS is enabled. `leads` denies all by default; the `service_role` key used on the server bypasses RLS.

## Notes

- Never expose `SUPABASE_SERVICE_ROLE` to the client. Keep it server-only.
- Adjust RLS and admin policies later when Auth roles are finalized.
- Contact API uses the service role: `src/app/api/contact/route.ts`.
