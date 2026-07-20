from fastapi import APIRouter

from app.models import AnalyzeResponse, AssessmentInput, AssessmentRecord, ReportRecord, new_id, now_iso
from app.routers.assessments import ASSESSMENTS
from app.routers.reports import REPORTS
from app.services.report_engine import generate_business_report

router = APIRouter(tags=["analyze"])


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(payload: AssessmentInput) -> AnalyzeResponse:
    assessment = AssessmentRecord(
        id=new_id("asm"),
        created_at=now_iso(),
        payload=payload,
    )
    ASSESSMENTS.append(assessment)

    business_report, provider = generate_business_report(payload)

    report = ReportRecord(
        id=new_id("rpt"),
        created_at=now_iso(),
        assessment_id=assessment.id,
        data=business_report.model_dump(),
    )
    REPORTS.append(report)

    return AnalyzeResponse(
        assessment_id=assessment.id,
        report_id=report.id,
        provider=provider,
        summary=f"Analysis completed successfully via {provider}.",
        business_report=business_report,
    )
