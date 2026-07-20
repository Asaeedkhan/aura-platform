from fastapi import APIRouter
import logging
import os

from app.models import ChatRequest, ChatResponse
from app.services.chat_service import generate_chat_answer

router = APIRouter(tags=["chat"])
logger = logging.getLogger(__name__)


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    if not os.getenv("OPENAI_API_KEY"):
        return ChatResponse(
            answer="AI Advisor is unavailable because no OpenAI API key is configured."
        )

    report_present = payload.report is not None and len(payload.report) > 0
    logger.info("/chat report present: %s", report_present)
    logger.info("/chat report top-level keys: %s", list(payload.report.keys()) if payload.report else [])

    try:
        answer = generate_chat_answer(report=payload.report, messages=payload.messages, question=payload.question)
    except Exception:
        return ChatResponse(
            answer="AI Advisor is temporarily unavailable. Please try again later."
        )

    return ChatResponse(answer=answer)
