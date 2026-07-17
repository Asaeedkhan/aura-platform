import type { BusinessReport } from "@/types/assessment";
import { FinancialImpact } from "./FinancialImpact";
import { OpportunityMatrix } from "./OpportunityMatrix";
import { RecommendedAgents } from "./RecommendedAgents";
import { RoadmapTimeline } from "./RoadmapTimeline";
import { ScoreCards } from "./ScoreCards";
import { WorkflowDiagram } from "./WorkflowDiagram";

type ExecutiveReportProps = {
  report: BusinessReport;
};

function getSummaryText(report: BusinessReport) {
  const annualHoursSaved = Math.round(report.financialImpact.monthlyHoursSaved * 12);
  return `Based on the assessment, AURA identified a focused ${report.topRecommendation} recommendation. The organization shows AI readiness of ${report.scores.aiReadiness} with ${annualHoursSaved.toLocaleString("en-AE")} hours saved per year and estimated annual savings of AED ${report.financialImpact.estimatedSavings.toLocaleString("en-AE")}.`;
}

export function ExecutiveReport({ report }: ExecutiveReportProps) {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-[32px] border border-slate-800 bg-slate-900/80 px-6 py-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.65)] sm:px-8 lg:px-10">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Executive Report</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Executive Summary</h2>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">AI Transformation Snapshot</p>
        <p className="mt-5 text-base leading-7 text-slate-300">{getSummaryText(report)}</p>
      </div>

      <ScoreCards report={report} />

      <div className="mt-3">
        <FinancialImpact report={report} />
      </div>

      <div className="mt-3">
        <OpportunityMatrix opportunities={report.opportunities} />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <WorkflowDiagram report={report} />
        <div className="space-y-3">
          <RecommendedAgents report={report} />
          <RoadmapTimeline report={report} />
        </div>
      </div>
    </div>
  );
}
