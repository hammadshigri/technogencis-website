# TechnoGencis Website Frontend

A modern corporate website built with Next.js 13+, TypeScript, and Tailwind CSS.

## Features

- **Marketing Website**: Company services, industries, case studies, leadership profiles
- **Careers Section**: Job listings with dynamic application forms
- **HR Dashboard**: Protected applicant management system
- **AI-Powered ATS**: Automated resume parsing and candidate scoring

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Auth, Database, Storage)
- Contentful CMS (for case studies/blog)
- FastAPI backend for ATS processing

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
# Edit .env.local with your actual values
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (marketing)/    # Marketing pages
│   ├── (careers)/      # Careers pages
│   └── (dashboard)/    # HR dashboard (protected)
├── components/         # Reusable UI components
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## Contributing

Please follow the established code style and run linting before committing:

```bash
npm run lint:fix
npm run format
```

## License

Private - TechnoGencis
