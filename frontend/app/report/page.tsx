"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateBusinessReport } from "@/lib/intelligence";
import { ExecutiveReport } from "@/components/report/ExecutiveReport";
import { formatCurrency } from "@/components/report/utils";
import type { AssessmentAnswers, BusinessOpportunity, BusinessReport, WorkflowDefinition, WorkflowStepType } from "@/types/assessment";

const fallbackAnswers: AssessmentAnswers = {
  industry: "",
  companySize: "",
  challenge: "",
  systems: [],
  otherSystem: "",
  documentVolume: "",
  documentTypes: [],
  goal: "",
};

const generatedReportStorageKey = "aura-generated-business-report";
const assessmentStorageKey = "aura-assessment-answers";

type StoredReport = Omit<Partial<BusinessReport>, "scores" | "financialImpact" | "recommendations" | "workflows"> & {
  scores?: Partial<BusinessReport["scores"]>;
  financialImpact?: Partial<BusinessReport["financialImpact"]>;
  recommendations?: Partial<BusinessReport["recommendations"]>;
  workflows?: Array<
    | BusinessReport["workflows"][number]
    | {
        name?: string;
        title?: string;
        icon?: string;
        steps?: Array<string | { id?: string; label?: string; type?: WorkflowStepType }>;
      }
  >;
  opportunities?: Array<
    | BusinessOpportunity
    | {
        title?: string;
        opportunity?: string;
        businessImpact?: string;
        implementationEffort?: string;
        priority?: string;
        estimatedRoi?: string;
      }
  >;
};

function normalizeStoredOpportunities(
  report: StoredReport,
  fallbackPriority: string[],
  estimatedSavings: number,
  estimatedHours: number,
): BusinessOpportunity[] {
  if (report.opportunities?.length) {
    return report.opportunities.map((entry, index) => {
      const priority = (entry.priority ?? "Medium").toString().toLowerCase();
      const normalizedPriority: BusinessOpportunity["priority"] =
        priority === "critical" ? "Critical" : priority === "high" ? "High" : priority === "low" ? "Low" : "Medium";

      return {
        opportunity: entry.opportunity ?? entry.title ?? `Opportunity ${index + 1}`,
        businessImpact: entry.businessImpact ?? "Improve execution velocity and cross-team consistency",
        implementationEffort: entry.implementationEffort ?? "Medium",
        priority: normalizedPriority,
        estimatedRoi: entry.estimatedRoi ?? "6-9 months",
      };
    });
  }

  const topPriority = fallbackPriority[0] ?? "Business Intelligence Agent";
  const secondPriority = fallbackPriority[1] ?? "Process Automation";

  return [
    {
      opportunity: `${topPriority} rollout`,
      businessImpact: `Unlock up to AED ${Math.round(estimatedSavings * 0.35).toLocaleString("en-AE")} annual value`,
      implementationEffort: "Medium",
      priority: "Critical",
      estimatedRoi: "4-6 months",
    },
    {
      opportunity: `${secondPriority} expansion`,
      businessImpact: `Recover ~${Math.round(estimatedHours * 0.3).toLocaleString("en-AE")} hours/month in key workflows`,
      implementationEffort: "High",
      priority: "High",
      estimatedRoi: "6-9 months",
    },
  ];
}

function normalizeStoredWorkflows(report: StoredReport): WorkflowDefinition[] {
  const toStepType = (value: string): WorkflowStepType => {
    const normalized = value.toLowerCase();

    if (/(document|invoice|contract|form|records|data|file|claim)/.test(normalized)) {
      return "document";
    }

    if (/(approval|review|signature|sign-off)/.test(normalized)) {
      return "approval";
    }

    if (/(sap|erp|ehr|hris|system|dashboard|calendar|ledger|archive|payer)/.test(normalized)) {
      return "system";
    }

    if (/(manager|agent|planner|handoff|candidate|patient|supplier|request|message)/.test(normalized)) {
      return "user";
    }

    return "ai";
  };

  if (report.workflows?.length) {
    return report.workflows.map((workflow, workflowIndex) => {
      const title = "title" in workflow && workflow.title ? workflow.title : ("name" in workflow && workflow.name ? workflow.name : `Workflow ${workflowIndex + 1}`);
      const icon = "icon" in workflow && workflow.icon ? workflow.icon : "workflow";
      const steps = (workflow.steps ?? []).map((step, stepIndex) => {
        if (typeof step === "string") {
          return {
            id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${stepIndex + 1}`,
            label: step,
            type: toStepType(step),
          };
        }

        const fallbackLabel = step.label ?? `Step ${stepIndex + 1}`;

        return {
          id: step.id ?? `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${stepIndex + 1}`,
          label: fallbackLabel,
          type: step.type ?? toStepType(fallbackLabel),
        };
      });

      return { title, icon, steps };
    });
  }

  return (report.suggestedWorkflows ?? []).map((title, workflowIndex) => ({
    title,
    icon: "workflow",
    steps: ["Input", "Process AI", "Approval", "System"].map((label, stepIndex) => ({
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${workflowIndex + 1}-${stepIndex + 1}`,
      label,
      type: toStepType(label),
    })),
  }));
}

function normalizeReport(report: StoredReport): BusinessReport {
  const priority = report.recommendations?.priority ?? report.recommendedAgents ?? [];
  const roadmap = report.recommendations?.roadmap ?? (report.roadmap ?? []).map((title, index) => ({
    phase: `${index === 0 ? "0-30 Days" : index === 1 ? "30-60 Days" : "60-90 Days"}`,
    title,
  }));

  const workflows = normalizeStoredWorkflows(report);

  const businessHealth = report.businessHealth ?? report.scores?.businessHealth ?? 0;
  const aiReadiness = report.aiReadiness ?? report.scores?.aiReadiness ?? 0;
  const estimatedSavings = report.estimatedSavings ?? report.financialImpact?.estimatedSavings ?? 0;
  const estimatedHours = report.estimatedHours ?? report.financialImpact?.monthlyHoursSaved ?? 0;
  const opportunities = normalizeStoredOpportunities(report, priority, estimatedSavings, estimatedHours);

  return {
    scores: {
      businessHealth: report.scores?.businessHealth ?? businessHealth,
      aiReadiness: report.scores?.aiReadiness ?? aiReadiness,
      automationPotential: report.scores?.automationPotential ?? aiReadiness,
    },
    financialImpact: {
      estimatedSavings: report.financialImpact?.estimatedSavings ?? estimatedSavings,
      monthlyHoursSaved: report.financialImpact?.monthlyHoursSaved ?? estimatedHours,
      roiMonths: report.financialImpact?.roiMonths ?? 8,
    },
    recommendations: {
      priority,
      roadmap,
    },
    opportunities,
    workflows,
    businessHealth,
    aiReadiness,
    automationPotential: report.automationPotential ?? `${report.scores?.automationPotential ?? aiReadiness}`,
    estimatedSavings,
    estimatedHours,
    recommendedAgents: priority,
    roadmap: roadmap.map((item) => item.title),
    suggestedWorkflows: workflows.map((item) => item.title),
    topRecommendation: priority[0] ?? "Business Intelligence Agent",
  };
}

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<BusinessReport>(() => generateBusinessReport({
    industry: fallbackAnswers.industry,
    companySize: fallbackAnswers.companySize,
    challenge: fallbackAnswers.challenge,
    systems: fallbackAnswers.systems,
    documents: fallbackAnswers.documentVolume,
    goal: fallbackAnswers.goal,
  }));

  useEffect(() => {
    const storedReport = loadGeneratedReport();

    if (storedReport) {
      setReport(normalizeReport(storedReport));
      return;
    }

    const answers = loadAssessmentAnswers() ?? fallbackAnswers;
    setReport(normalizeReport(generateBusinessReport({
      industry: answers.industry,
      companySize: answers.companySize,
      challenge: answers.challenge,
      systems: answers.systems,
      documents: answers.documentVolume,
      goal: answers.goal,
    })));
  }, []);

  function loadGeneratedReport(): StoredReport | null {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.sessionStorage.getItem(generatedReportStorageKey);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as StoredReport;
    } catch {
      return null;
    }
  }

  function loadAssessmentAnswers(): AssessmentAnswers | null {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.sessionStorage.getItem(assessmentStorageKey);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as AssessmentAnswers;
    } catch {
      return null;
    }
  }

  const handleDownloadPdf = () => {
    const reportContent = `AURA Executive Report

Business Health Score: ${report.scores.businessHealth} / 100
AI Readiness: ${report.scores.aiReadiness}
Automation Potential: ${report.scores.automationPotential} / 100
Estimated Annual Savings: ${formatCurrency(report.financialImpact.estimatedSavings)}
Estimated Time Saved: ${report.financialImpact.monthlyHoursSaved} Hours / Month
Estimated ROI: ${report.financialImpact.roiMonths} Months

Recommended AI Workforce:
- ${report.recommendations.priority.join("\n- ")}

Implementation Timeline:
- Immediate: Priority Launch
- ${report.recommendations.roadmap[0]?.title ?? "Workflow 1"}: 2 Weeks
- ${report.recommendations.roadmap[1]?.title ?? "Workflow 2"}: 1 Month
- ${report.recommendations.roadmap[2]?.title ?? "Workflow 3"}: Quarter 2`;

    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aura-executive-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8">
        <ExecutiveReport report={report} />

        <div className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4">
          <div className="text-sm text-slate-400">Ready to transform your business?</div>
          <Button onClick={handleDownloadPdf} variant="outline" className="rounded-full border-slate-700 bg-transparent px-5 text-slate-200 hover:bg-slate-800">
            Download Executive Report
          </Button>
          <Button onClick={() => router.push("/dashboard")} className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700">
            Schedule AI Strategy Session
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
