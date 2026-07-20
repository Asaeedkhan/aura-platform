from datetime import datetime, UTC
from typing import Any
from uuid import uuid4
from typing import Literal

from pydantic import BaseModel, Field


class AssessmentInput(BaseModel):
    industry: str = Field(default="")
    company_size: str = Field(default="")
    challenge: str = Field(default="")
    systems: list[str] = Field(default_factory=list)
    documents: str | int | list[str] = Field(default="")
    goal: str = Field(default="")


class AssessmentRecord(BaseModel):
    id: str
    created_at: str
    payload: AssessmentInput

class WorkflowStep(BaseModel):
    id: str
    label: str
    type: Literal["document", "ai", "approval", "system", "user"]

class WorkflowDefinition(BaseModel):
    title: str
    icon: str
    steps: list[WorkflowStep]

class ReportScores(BaseModel):
    businessHealth: int
    aiReadiness: int
    automationPotential: int

class FinancialImpact(BaseModel):
    estimatedSavings: int
    monthlyHoursSaved: int
    roiMonths: int

class ReportRoadmapStep(BaseModel):
    phase: str
    title: str

class ReportRecommendations(BaseModel):
    priority: list[str]
    roadmap: list[ReportRoadmapStep]

class BusinessReport(BaseModel):
    scores: ReportScores
    financialImpact: FinancialImpact
    recommendations: ReportRecommendations
    workflows: list[WorkflowDefinition]



class AnalyzeResponse(BaseModel):
    assessment_id: str
    report_id: str
    provider: Literal["openai", "rules"]
    summary: str
    business_report: BusinessReport


class ReportRecord(BaseModel):
    id: str
    created_at: str
    assessment_id: str
    data: dict[str, Any]


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1)


class ChatRequest(BaseModel):
    report: dict[str, Any] = Field(default_factory=dict)
    messages: list[ChatMessage] = Field(default_factory=list)
    question: str = Field(min_length=1)


class ChatResponse(BaseModel):
    answer: str


def now_iso() -> str:
    return datetime.now(UTC).isoformat()


def new_id(prefix: str) -> str:
    return f"{prefix}_{uuid4().hex[:10]}"
