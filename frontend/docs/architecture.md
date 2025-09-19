# Architecture Overview

## System Architecture

The TechnoGencis website is a full-stack application consisting of:

### Frontend (Next.js)

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Deployment**: Vercel

### Backend (FastAPI)

- **Framework**: FastAPI (Python)
- **Purpose**: ATS processing with OpenAI integration
- **Deployment**: Railway/Fly.io

### Data Layer

- **CMS**: Contentful (case studies/blog content)
- **Database**: Supabase (auth, jobs, applications, leads)
- **Storage**: Supabase Storage (resume uploads)

## Directory Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/       # Marketing pages (public)
│   │   ├── (careers)/         # Careers pages (public)
│   │   ├── (dashboard)/       # HR dashboard (protected)
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   └── marketing/        # Marketing-specific components
│   ├── lib/                  # Utility functions
│   │   ├── contentful.ts     # Contentful client
│   │   ├── supabase.ts       # Supabase client
│   │   └── utils.ts          # Helper functions
│   └── types/                # TypeScript definitions
```

## Key Features

### Marketing Website

- Static pages with ISR for case studies
- Content managed via Contentful CMS
- SEO optimized with metadata

### Careers Section

- Dynamic job listings from Supabase
- Application forms with file upload
- Resume processing via FastAPI

### HR Dashboard

- Protected routes with role-based access
- Applicant management interface
- AI-powered candidate scoring

## Security Considerations

- Environment variables for sensitive data
- Role-based access control (RBAC)
- Input validation with Zod
- CSRF protection for mutations
- Secure file upload handling

## Performance Optimizations

- Server Components by default
- Image optimization with next/image
- Code splitting and lazy loading
- ISR for content freshness
- SWR for client-side caching
