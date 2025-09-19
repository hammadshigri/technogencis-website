# Contributing to TechnoGencis Website

Thank you for your interest in contributing to the TechnoGencis website project!

## Development Workflow

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy environment file: `cp .env.local.example .env.local`
4. Configure environment variables
5. Run development server: `npm run dev`

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use conventional commit messages
- Write meaningful commit messages

### Commit Message Format

```
type(scope): description

Examples:
feat(auth): add Supabase authentication
fix(ui): resolve mobile navigation issue
docs(readme): update setup instructions
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting: `npm run lint && npm run type-check`
4. Commit with conventional format
5. Push and create a pull request
6. Ensure all checks pass

### Testing

- Write unit tests for new components
- Test responsive design on multiple screen sizes
- Verify accessibility compliance

### Deployment

- Changes to `main` branch trigger automatic deployment
- Preview deployments are created for pull requests

## Questions?

Contact the development team or create an issue for discussions.
