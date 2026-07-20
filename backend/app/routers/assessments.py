from fastapi import APIRouter

from app.models import AssessmentInput, AssessmentRecord, new_id, now_iso

router = APIRouter(tags=["assessments"])

ASSESSMENTS: list[AssessmentRecord] = []


@router.get("/assessments", response_model=list[AssessmentRecord])
def list_assessments() -> list[AssessmentRecord]:
    return ASSESSMENTS


@router.post("/assessments", response_model=AssessmentRecord)
def create_assessment(payload: AssessmentInput) -> AssessmentRecord:
    record = AssessmentRecord(
        id=new_id("asm"),
        created_at=now_iso(),
        payload=payload,
    )
    ASSESSMENTS.append(record)
    return record
