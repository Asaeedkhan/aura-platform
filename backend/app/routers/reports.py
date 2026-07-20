from fastapi import APIRouter

from app.models import ReportRecord, new_id, now_iso

router = APIRouter(tags=["reports"])

REPORTS: list[ReportRecord] = []


@router.get("/reports", response_model=list[ReportRecord])
def list_reports() -> list[ReportRecord]:
    return REPORTS


@router.post("/reports", response_model=ReportRecord)
def create_report(payload: dict) -> ReportRecord:
    record = ReportRecord(
        id=new_id("rpt"),
        created_at=now_iso(),
        assessment_id=str(payload.get("assessment_id", "")),
        data=payload,
    )
    REPORTS.append(record)
    return record
