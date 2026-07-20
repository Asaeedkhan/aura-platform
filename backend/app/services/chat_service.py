from __future__ import annotations

import json
import os
import logging
from typing import Any

from openai import OpenAI

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """
You are AURA AI Advisor.

Only answer using the supplied report.
Never invent information.

If the answer is unavailable reply exactly:
"The report does not contain enough information to answer this question."

Keep answers executive friendly.
Reference report sections whenever possible.
""".strip()


def generate_chat_answer(report: dict[str, Any], messages: list[dict[str, str]], question: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini").strip()

    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not configured.")

    report_text = json.dumps(report, ensure_ascii=True)
    safe_report_text = report_text if len(report_text) <= 12_000 else f"{report_text[:12_000]}...<truncated>"

    logger.info("OpenAI prompt SYSTEM section:\n%s", SYSTEM_PROMPT)
    logger.info("OpenAI prompt REPORT section:\n%s", safe_report_text)
    logger.info("OpenAI prompt PRIOR MESSAGES count: %s", len(messages))
    logger.info("OpenAI prompt USER question:\n%s", question)

    client = OpenAI(api_key=api_key)

    prior_conversation_lines: list[str] = []
    for message in messages:
        role = message.get("role", "user").strip().upper()
        content = message.get("content", "").strip()
        if not content:
            continue
        prior_conversation_lines.append(f"{role}: {content}")

    prior_conversation_text = "\n".join(prior_conversation_lines) if prior_conversation_lines else "None"

    user_prompt = (
        "REPORT\n"
        f"{safe_report_text}\n\n"
        "PREVIOUS CONVERSATION\n"
        f"{prior_conversation_text}\n\n"
        "CURRENT QUESTION\n"
        f"{question}"
    )

    input_messages: list[dict[str, str]] = [
        {
            "role": "system",
            "content": f"SYSTEM\n{SYSTEM_PROMPT}",
        }
    ]

    input_messages.append({"role": "user", "content": user_prompt})

    response = client.responses.create(
        model=model,
        input=input_messages,
        max_output_tokens=600,
    )

    text_output = ""
    for item in getattr(response, "output", []):
        for content in getattr(item, "content", []):
            if getattr(content, "type", "") == "output_text":
                text_output += getattr(content, "text", "")

    if not text_output.strip():
        raise RuntimeError("OpenAI returned an empty response.")

    return text_output.strip()
