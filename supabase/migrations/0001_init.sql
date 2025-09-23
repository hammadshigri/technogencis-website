-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Leads (marketing contact)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Jobs
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  location text not null,
  type text not null check (type in ('full-time','part-time','contract','internship')),
  department text not null,
  requirements text[] not null default '{}',
  benefits text[] not null default '{}',
  salary_min numeric,
  salary_max numeric,
  salary_currency text,
  is_remote boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Applications
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  user_id uuid,
  status text not null default 'pending' check (status in ('pending','reviewing','interview','accepted','rejected')),
  cover_letter text,
  resume_url text not null,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Events (audit trail)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade,
  actor_id uuid,
  type text not null,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.leads enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.events enable row level security;

-- Leads RLS: deny all (service_role bypasses RLS)
drop policy if exists "leads service only" on public.leads;
create policy "leads service only" on public.leads for all using (false) with check (false);

-- Jobs RLS: public read; (admin write policies can be added later as needed)
drop policy if exists "jobs read" on public.jobs;
create policy "jobs read" on public.jobs for select using (true);

-- Applications RLS: user can view their own; insert own
drop policy if exists "apps read own" on public.applications;
drop policy if exists "apps write own" on public.applications;
create policy "apps read own" on public.applications for select using (auth.uid() = user_id);
create policy "apps write own" on public.applications for insert with check (auth.uid() = user_id);

-- Events RLS: (add admin-only policies later as needed)
drop policy if exists "events admin read" on public.events;
drop policy if exists "events admin write" on public.events;
