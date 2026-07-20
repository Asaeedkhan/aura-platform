from __future__ import annotations

import json
import os
from typing import Any

from openai import OpenAI

from app.models import AssessmentInput, BusinessReport


def generate_business_report(payload: AssessmentInput) -> tuple[BusinessReport, str]:
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini").strip()

    if api_key:
        report = _generate_with_openai(payload, api_key=api_key, model=model)
        if report:
            return report, "openai"

    return _generate_with_rules(payload), "rules"


def _generate_with_openai(payload: AssessmentInput, api_key: str, model: str) -> BusinessReport | None:
    client = OpenAI(api_key=api_key)
    prompt = _build_prompt(payload)

    try:
        response = client.responses.create(
            model=model,
            input=prompt,
            max_output_tokens=1200,
        )
    except Exception:
        return None

    text_output = ""
    for item in getattr(response, "output", []):
        for content in getattr(item, "content", []):
            if getattr(content, "type", "") == "output_text":
                text_output += getattr(content, "text", "")

    if not text_output:
        return None

    try:
        parsed = json.loads(text_output)
        return BusinessReport.model_validate(parsed)
    except Exception:
        return None


def _build_prompt(payload: AssessmentInput) -> str:
    return (
        "You are an enterprise transformation analyst. Return ONLY valid JSON in this exact shape: "
        "{"
        '"scores":{"businessHealth":0,"aiReadiness":0,"automationPotential":0},'
        '"financialImpact":{"estimatedSavings":0,"monthlyHoursSaved":0,"roiMonths":0},'
        '"recommendations":{"priority":["..."],"roadmap":[{"phase":"0-30 Days","title":"..."}]},'
        '"workflows":[{"title":"...","icon":"workflow","steps":[{"id":"step-1","label":"...","type":"document"}]}]'
        "}. "
        "Rules: scores must be 0-100, roiMonths >= 1, at least 1 workflow with at least 3 steps, "
        "and step type must be one of document|ai|approval|system|user. "
        f"Assessment input: {payload.model_dump_json()}"
    )


def _generate_with_rules(payload: AssessmentInput) -> BusinessReport:
    readiness = 60
    health = 70
    savings = 420_000
    monthly_hours = 120
    workflow_title = "Workflow Mapping"
    workflow_icon = "workflow"
    steps: list[dict[str, Any]] = [
        {"id": "step-1", "label": "Business Input", "type": "document"},
        {"id": "step-2", "label": "AI Analysis", "type": "ai"},
        {"id": "step-3", "label": "Manager Review", "type": "approval"},
        {"id": "step-4", "label": "ERP/CRM", "type": "system"},
    ]

    challenge = payload.challenge.lower()
    industry = payload.industry.lower()

    if "procurement" in challenge:
        readiness += 15
        savings += 450_000
        monthly_hours = 180
        workflow_title = "Purchase Orders"
        workflow_icon = "shopping-cart"
        steps = [
            {"id": "po-1", "label": "Purchase Request", "type": "document"},
            {"id": "po-2", "label": "AI Procurement Agent", "type": "ai"},
            {"id": "po-3", "label": "Supplier Risk Analysis", "type": "ai"},
            {"id": "po-4", "label": "Manager Approval", "type": "approval"},
            {"id": "po-5", "label": "SAP ERP", "type": "system"},
        ]

    if "health" in industry:
        readiness += 10
        health += 5
        savings += 220_000
        monthly_hours = 150
        workflow_title = "Patient Intake"
        workflow_icon = "heart-pulse"
        steps = [
            {"id": "pt-1", "label": "Patient Registration", "type": "document"},
            {"id": "pt-2", "label": "AI Document Processing", "type": "ai"},
            {"id": "pt-3", "label": "Insurance Verification", "type": "approval"},
            {"id": "pt-4", "label": "Medical Records System", "type": "system"},
        ]

    if "support" in challenge or "customer" in challenge:
        readiness += 12
        savings += 180_000
        monthly_hours = 140
        workflow_title = "Customer Support"
        workflow_icon = "headset"
        steps = [
            {"id": "cs-1", "label": "Customer Email", "type": "document"},
            {"id": "cs-2", "label": "AI Support Agent", "type": "ai"},
            {"id": "cs-3", "label": "Knowledge Base", "type": "system"},
            {"id": "cs-4", "label": "CRM", "type": "system"},
        ]

    if payload.goal.strip():
        readiness += 5

    readiness = min(100, readiness)
    health = min(100, health)
    automation = min(100, round((readiness + health) / 2))
    roi_months = max(1, round(savings / max(1, monthly_hours) / 8_000))

    return BusinessReport.model_validate(
        {
            "scores": {
                "businessHealth": health,
                "aiReadiness": readiness,
                "automationPotential": automation,
            },
            "financialImpact": {
                "estimatedSavings": savings,
                "monthlyHoursSaved": monthly_hours,
                "roiMonths": roi_months,
            },
            "recommendations": {
                "priority": [
                    "Business Intelligence Agent",
                    "Document Intelligence",
                    "Approval Automation",
                ],
                "roadmap": [
                    {"phase": "0-30 Days", "title": "Workflow Discovery"},
                    {"phase": "30-60 Days", "title": "AI Pilot"},
                    {"phase": "60-90 Days", "title": "System Integration"},
                ],
            },
            "workflows": [
                {
                    "title": workflow_title,
                    "icon": workflow_icon,
                    "steps": steps,
                }
            ],
        }
    )
