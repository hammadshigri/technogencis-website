# TechnoGencis ATS Backend

FastAPI backend service for AI-powered Applicant Tracking System.

## Features

- Resume parsing and candidate scoring
- OpenAI Agents SDK integration
- Email notifications
- RESTful API endpoints

## Tech Stack

- FastAPI (Python web framework)
- OpenAI Agents SDK
- Pydantic for data validation
- Python-dotenv for environment variables

## Getting Started

1. Create virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Run the development server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API documentation available at: http://localhost:8000/docs

## API Endpoints

- `POST /api/v1/parse-resume` - Parse resume and extract structured data
- `POST /api/v1/score-candidate` - Score candidate based on job requirements
- `GET /health` - Health check endpoint

## Environment Variables

- `OPENAI_API_KEY` - OpenAI API key for agents SDK
- `EMAIL_API_KEY` - Email service API key (Resend/SendGrid)
- `DATABASE_URL` - Database connection string (if using persistent storage)

## Development

Run tests:

```bash
pytest
```

Format code:

```bash
black .
```

Lint code:

```bash
flake8 .
```

## Deployment

Build Docker image:

```bash
docker build -t technogencis-ats .
```

Deploy to Railway/Fly.io following their respective documentation.

## License

Private - TechnoGencis
