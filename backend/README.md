# Backend

FastAPI service for AURA.

## Endpoints

- `POST /analyze`
- `GET /reports`
- `POST /reports`
- `GET /assessments`
- `POST /assessments`
- `GET /health`

## Runtime Flow

`Assessment -> FastAPI -> OpenAI -> BusinessReport`

- `POST /analyze` receives an assessment payload.
- FastAPI calls the report engine service.
- If `OPENAI_API_KEY` is configured, it attempts OpenAI generation.
- If OpenAI is unavailable, it falls back to deterministic rules.
- The endpoint returns a `BusinessReport` payload and stores it in `/reports`.

## Environment Variables

- `OPENAI_API_KEY` (optional but recommended)
- `OPENAI_MODEL` (optional, default: `gpt-4.1-mini`)

## Run

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
