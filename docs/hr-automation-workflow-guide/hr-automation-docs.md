1️⃣ HR Posts a Job

What happens:
HR creates job postings inside your custom HR dashboard (not Contentful).
The job is saved to Supabase jobs table.
Public careers page automatically fetches it.

Tech:

Frontend: Next.js 13+ (App Router), Tailwind/Shadcn UI dashboard

Backend: Direct Supabase insert/update

DB: Supabase jobs table

2️⃣ Job Appears on Public Careers Page

What happens:
Public visitors see job listings instantly via Supabase API (ISR for SEO).

Tech:

Frontend: Next.js ISR + Tailwind/Shadcn UI

DB: Supabase jobs table (public policies)

3️⃣ Candidate Applies with Resume Upload

What happens:

Candidate fills form on /careers/[jobId] page.

Next.js sends form + file to FastAPI backend.

FastAPI stores:

Applicant record in Supabase applicants table

Resume file in Supabase Storage

FastAPI then enqueues a background task (Celery or RQ) to parse the resume.

Tech:

Frontend: Next.js form (React Hook Form + Zod validation)

Backend: FastAPI endpoint /apply

DB: Supabase applicants + Supabase Storage

Background tasks: Celery/RQ worker queued with Redis

4️⃣ Background Resume Parsing & AI Processing

What happens:

Worker (Celery/RQ) picks up the job from Redis.

Worker downloads resume file from Supabase Storage.

Worker calls OpenAI Agents SDK to extract skills, experience, etc.

Worker updates Supabase applicants table with parsed JSON and a “scored” field.

Worker optionally triggers email notification (via Postmark/Resend) to HR and candidate.

Tech:

Worker: Celery or RQ worker in Python

Queue: Redis (managed, e.g., Upstash Redis)

AI: OpenAI Agents SDK (Python)

DB: Supabase applicants

Notifications: Postmark/SendGrid/Resend API from worker

5️⃣ HR Reviews Applicants in Dashboard

What happens:

HR logs in and sees all applicants with parsed data (skills, score).

HR can filter, search, and change status (Shortlisted / Rejected / Hired).

When status changes, a background task is enqueued to send email notifications to the candidate.

Tech:

Frontend: Next.js protected routes + Shadcn UI DataGrid

Backend: Supabase Auth (RBAC), Supabase queries

Background tasks: Celery worker sends notification emails

DB: Supabase applicants

6️⃣ Notifications & Automations

What happens:

Status change triggers webhook or direct call to FastAPI → enqueues task

Worker sends candidate email (and logs to Supabase notifications table)

Tech:

Worker: Celery

Queue: Redis

Email: Postmark/SendGrid
