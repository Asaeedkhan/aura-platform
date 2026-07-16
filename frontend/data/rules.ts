import type { AnalysisStep } from "@/types/assessment";

export const analysisSteps: AnalysisStep[] = [
  { id: "answers", label: "Assessment Answers" },
  { id: "engine", label: "AURA Intelligence Engine" },
  { id: "report", label: "Business Intelligence Report" },
];

export const reportSteps = [
  "Assessment Answers",
  "AURA Intelligence Engine",
  "Business Intelligence Report",
] as const;

export const workflowCategories = [
  "ERP",
  "CRM",
  "Accounting",
  "Productivity",
] as const;