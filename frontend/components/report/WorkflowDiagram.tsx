"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  CalendarCheck,
  CalendarDays,
  CheckSquare,
  Clock3,
  Database,
  FileBadge,
  FileHeart,
  FileSignature,
  FileText,
  FolderInput,
  FolderOpen,
  GitBranch,
  Headset,
  HeartPulse,
  Mail,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  ChevronDown,
  User,
  UserPlus,
  UsersRound,
  Warehouse,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { BusinessReport, WorkflowStep, WorkflowStepType } from "@/types/assessment";

type WorkflowDiagramProps = {
  report: BusinessReport;
};

const iconByType: Record<WorkflowStepType, React.ComponentType<{ className?: string }>> = {
  document: FileText,
  ai: Bot,
  approval: CheckSquare,
  system: Database,
  user: User,
};

const iconByWorkflow: Record<string, React.ComponentType<{ className?: string }>> = {
  "bar-chart-3": BarChart3,
  boxes: Boxes,
  "calendar-check": CalendarCheck,
  "calendar-days": CalendarDays,
  "clock-3": Clock3,
  "check-circle": CheckSquare,
  "file-heart": FileHeart,
  "file-invoice": FileBadge,
  "file-signature": FileSignature,
  "folder-input": FolderInput,
  "folder-open": FolderOpen,
  "git-branch": GitBranch,
  headset: Headset,
  "heart-pulse": HeartPulse,
  mail: Mail,
  "rotate-ccw": RotateCcw,
  "shield-check": ShieldCheck,
  "shopping-cart": ShoppingCart,
  "user-plus": UserPlus,
  "users-round": UsersRound,
  warehouse: Warehouse,
  workflow: Workflow,
};

function getWorkflowScore(title: string, priorities: string[]) {
  const normalizedTitle = title.toLowerCase();

  return priorities.reduce((score, priority, index) => {
    const normalizedPriority = priority.toLowerCase();

    if (normalizedTitle.includes(normalizedPriority) || normalizedPriority.includes(normalizedTitle)) {
      return score + (priorities.length - index) * 3;
    }

    const titleTokens = normalizedTitle.split(/\s+/);
    const priorityTokens = normalizedPriority.split(/\s+/);
    const overlap = titleTokens.filter((token) => priorityTokens.includes(token)).length;

    return score + overlap;
  }, 0);
}

function getDefaultWorkflowIndex(report: BusinessReport) {
  if (report.workflows.length <= 1) {
    return 0;
  }

  let bestIndex = 0;
  let bestScore = Number.NEGATIVE_INFINITY;

  report.workflows.forEach((workflow, index) => {
    const score = getWorkflowScore(workflow.title, report.recommendations.priority);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function StepCard({ step }: { step: WorkflowStep }) {
  const StepIcon = iconByType[step.type] ?? Workflow;

  return (
    <div className="w-full min-w-[180px] rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-blue-500/10 p-1.5 text-blue-300">
          <StepIcon className="h-4 w-4" />
        </div>
        <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{step.type}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-slate-100">{step.label}</div>
    </div>
  );
}

export function WorkflowDiagram({ report }: WorkflowDiagramProps) {
  const workflows = report.workflows;
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(() => getDefaultWorkflowIndex(report));
  const [isLegendExpanded, setIsLegendExpanded] = useState(false);

  useEffect(() => {
    setActiveWorkflowIndex(getDefaultWorkflowIndex(report));
  }, [report]);

  const activeWorkflow = useMemo(() => workflows[activeWorkflowIndex] ?? workflows[0], [activeWorkflowIndex, workflows]);

  if (!activeWorkflow) {
    return null;
  }

  const WorkflowIcon = iconByWorkflow[activeWorkflow.icon] ?? Workflow;

  return (
    <Card className="border-slate-800 bg-slate-950/70 shadow-none">
      <CardContent className="px-5 py-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Workflow Preview</p>

        {workflows.length > 1 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {workflows.map((workflow, index) => (
              <button
                key={workflow.title}
                type="button"
                onClick={() => setActiveWorkflowIndex(index)}
                className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] transition ${
                  index === activeWorkflowIndex
                    ? "border-blue-500/40 bg-blue-500/15 text-blue-200"
                    : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                }`}
              >
                {workflow.title}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-500/10 p-2 text-blue-300">
                <WorkflowIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-medium text-white">{activeWorkflow.title}</div>
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Connected Flow</div>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={isLegendExpanded}
              aria-controls="workflow-legend"
              onClick={() => setIsLegendExpanded((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
            >
              Legend
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isLegendExpanded ? "rotate-180" : "rotate-0"}`} />
            </button>
          </div>

          <div
            id="workflow-legend"
            className={`grid overflow-hidden transition-all duration-300 ease-out ${isLegendExpanded ? "mb-4 grid-rows-[1fr] opacity-100" : "mb-0 grid-rows-[0fr] opacity-0"}`}
          >
            <div className="min-h-0">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300">📄 Document - Business document or input</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300">🤖 AI Agent - AI analysis or automation</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300">👤 User - Human task</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300">✅ Approval - Decision or approval step</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300">🗄️ System - ERP, CRM, or other enterprise system</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2 sm:hidden">
            {activeWorkflow.steps.map((step, index) => (
              <div key={step.id}>
                <StepCard step={step} />
                {index < activeWorkflow.steps.length - 1 ? <div className="py-1 text-center text-slate-500">↓</div> : null}
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto pb-2 sm:block">
            <div className="flex min-w-max items-center gap-2">
              {activeWorkflow.steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2">
                  <StepCard step={step} />
                  {index < activeWorkflow.steps.length - 1 ? <ArrowRight className="h-4 w-4 text-slate-500" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
