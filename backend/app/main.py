from pathlib import Path

from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.analyze import router as analyze_router
from app.routers.assessments import router as assessments_router
from app.routers.chat import router as chat_router
from app.routers.health import router as health_router
from app.routers.reports import router as reports_router

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

app = FastAPI(title="AURA Backend API", version="0.1.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=[
		"http://localhost:3000",
		"http://127.0.0.1:3000",
	],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(assessments_router)
app.include_router(reports_router)
app.include_router(analyze_router)
app.include_router(chat_router)
