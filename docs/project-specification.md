---
This project is a modern, full‑stack corporate website for a  software development company, designed to showcase its services, industry expertise, and success stories while integrating a fully automated AI‑powered Applicant Tracking System (ATS) for recruitment.

The marketing side of the site will serve as the company’s digital front door — highlighting service offerings, industry‑specific solutions, case studies, leadership profiles, and global presence. All marketing content will be managed via Contentful CMS, enabling non‑technical teams to update pages without developer involvement. The site will be built with Next.js 13+ for performance, SEO, and scalability, and deployed on Vercel with Incremental Static Regeneration to keep content fresh.

The careers section will feature dynamic job listings sourced from Supabase (or optionally Contentful), with detailed job pages and an application form that supports resume uploads. Resumes will be processed by a dedicated FastAPI backend integrated with the OpenAI Agents SDK, enabling automated parsing, skills extraction, and candidate scoring. This data will feed into a secure HR dashboard, where recruiters can filter, search, and shortlist applicants efficiently.

Supabase Auth will handle authentication and role‑based access control, ensuring that HR and admin tools remain secure. The system will also automate candidate notifications via email, streamlining the recruitment process end‑to‑end.

The result will be a high‑performance, content‑driven, and AI‑enhanced corporate platform that not only markets the company’s capabilities but also transforms its hiring workflow into a fast, data‑driven process — positioning the business as a forward‑thinking leader in Pakistan’s software industry.
---

## 1. Core Features & Architecture

Marketing Website
Content Source: All marketing content (services, industries, case studies, leadership profiles) fetched from Contentful CMS via GraphQL API.

Pages: Service browsing, industry-specific pages, case studies & insights, leadership profiles, global office locations.

Lead Capture: Contact form integrated with Supabase for storing leads.

UI: Fully responsive, themed UI with reusable components (Tailwind CSS + component library).

Rendering Strategy: Use Incremental Static Regeneration (ISR) for marketing content to keep pages fresh without full rebuilds.

Careers & ATS
Job Listings: Stored in Supabase (or optionally Contentful for marketing-style job posts).

Job Detail Pages: Dynamic routes with job description, requirements, and application form.

Resume Upload & Parsing: File upload to Supabase Storage or direct to FastAPI backend.

AI Processing: FastAPI service integrates with OpenAI Agents SDK to parse resumes, extract structured data, and score candidates.

HR Dashboard: Protected route for HR team to view applicants, filter/search, and see AI scores.

Notifications: Automated email updates to candidates (via backend service).

Authentication & Authorization
Auth Provider: Supabase Auth (email/password or magic link).

Roles:

public: Marketing site + job listings

hr: HR dashboard access

admin: Manage jobs, applicants, and content

Access Control: Role-based route protection in Next.js..

Deployment
Frontend: Next.js app deployed on Vercel.

Backend: FastAPI service deployed separately (Railway, Fly.io, or Vercel Functions).

CMS: Contentful for marketing content.

## 2. Screens & Navigation

Main Navigation (app/)
Home (page.tsx): Hero section, services overview, industries, case studies, stats, leadership, contact CTA.

Services page: List of services from Contentful.

Industries page: Industry-specific solutions.

Case Studies page: Grid of case studies with detail pages.

About page: Company story, leadership profiles, global offices.

Careers page: Job listings with filters.

Contact page: Lead capture form.

HR Dashboard page: Protected route for HR team.

Job Details
Job Detail page Job description, requirements, apply form with resume upload.

HR Dashboard
Applicants List page Table of applicants with filters, search, and AI score.

Applicant Detail page Resume preview, parsed data, AI score, notes.

Other Screens
Not Found (+not-found.tsx): Custom 404 page.

Error (error.tsx): Route-level error handling.

## 3. Development Guidelines

Server Components by default; Client Components only for interactivity.

Tailwind CSS for styling.

React Hook Form + Zod for form handling & validation.

SWR for client-side data fetching.

Role-based route guards for HR dashboard.

ISR for marketing pages; SSR for dynamic content.
