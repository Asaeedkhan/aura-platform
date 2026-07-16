import type { BusinessReport, BusinessReportInput, WorkflowDefinition, WorkflowStep, WorkflowStepType } from "@/types/assessment";

const RULES = {
  procurementSystems: ["sap", "oracle", "microsoft dynamics 365", "microsoft-dynamics-365", "odoo"],
  customerServiceSystems: ["salesforce", "hubspot", "zoho"],
  industryBonuses: {
    manufacturing: { aiReadiness: 15, label: "automation" },
    healthcare: { aiReadiness: 10, label: "compliance" },
    retail: { aiReadiness: 15, label: "customer service" },
  } as const,
  challengeRecommendations: {
    finance: "Finance AI Analyst",
    hr: "HR AI Assistant",
    procurement: "Procurement AI Manager",
    support: "Customer Service AI",
    customer: "Customer Service AI",
    sales: "Customer Service AI",
  } as const,
  defaultWorkflows: ["Workflow Mapping", "Document Intake", "Executive Reporting"],
  defaultAgents: ["Business Intelligence Agent"],
} as const;

export function generateBusinessReport(answers: BusinessReportInput): BusinessReport {
  const normalizedIndustry = answers.industry.toLowerCase();
  const normalizedChallenge = answers.challenge.toLowerCase();
  const normalizedSystems = answers.systems.map((system) => system.toLowerCase());
  const documentsCount = normalizeDocuments(answers.documents);

  const state = createInitialReportState();

  applyIndustryRules(state, normalizedIndustry);
  applyChallengeRules(state, normalizedChallenge, normalizedIndustry);
  applySystemRules(state, normalizedSystems);
  applyDocumentRules(state, documentsCount);
  applyCompanySizeRules(state, answers.companySize);
  applyGoalRules(state, answers.goal);

  state.businessHealth = clamp(state.businessHealth, 0, 100);
  state.aiReadiness = clamp(state.aiReadiness, 0, 100);

  return {
    scores: {
      businessHealth: state.businessHealth,
      aiReadiness: state.aiReadiness,
      automationPotential: calculateAutomationPotentialScore(state),
    },
    financialImpact: {
      estimatedSavings: state.estimatedSavings,
      monthlyHoursSaved: state.estimatedHours,
      roiMonths: calculateRoiMonths(state.estimatedSavings, state.estimatedHours),
    },
    recommendations: {
      priority: state.recommendedAgents,
      roadmap: state.roadmap.map((title, index) => ({
        phase: `${index === 0 ? "0-30 Days" : index === 1 ? "30-60 Days" : "60-90 Days"}`,
        title,
      })),
    },
    workflows: state.workflows.map((name) => ({
      ...buildWorkflow(name),
    })),
    businessHealth: state.businessHealth,
    aiReadiness: state.aiReadiness,
    automationPotential: state.automationPotential,
    estimatedSavings: state.estimatedSavings,
    estimatedHours: state.estimatedHours,
    recommendedAgents: state.recommendedAgents,
    roadmap: state.roadmap,
    suggestedWorkflows: state.workflows,
    topRecommendation: state.recommendedAgents[0] ?? "Business Intelligence Agent",
  };
}

function createInitialReportState() {
  return {
    businessHealth: 72,
    aiReadiness: 58,
    automationPotential: "Moderate",
    estimatedSavings: 420_000,
    estimatedHours: 96,
    recommendedAgents: ["Business Intelligence Agent"] as string[],
    roadmap: ["Discovery", "Pilot", "Scale"] as string[],
    workflows: [...RULES.defaultWorkflows] as string[],
  };
}

function applyIndustryRules(state: ReturnType<typeof createInitialReportState>, industry: string) {
  const bonus = RULES.industryBonuses[industry as keyof typeof RULES.industryBonuses];

  if (!bonus) {
    return;
  }

  state.aiReadiness += bonus.aiReadiness;
  state.automationPotential = bonus.label === "customer service" ? "High" : `High ${bonus.label}`;
}

function applyChallengeRules(
  state: ReturnType<typeof createInitialReportState>,
  challenge: string,
  industry: string,
) {
  if (challenge.includes("finance")) {
    setRecommendation(state, RULES.challengeRecommendations.finance);
    state.recommendedAgents = [RULES.challengeRecommendations.finance, "Procurement AI Manager"];
    state.workflows = ["Invoice Processing", "Approvals", "Month-End Close"];
    state.aiReadiness += 8;
    state.businessHealth += 4;
    state.estimatedSavings += 180_000;
    state.estimatedHours += 40;
    state.roadmap = ["Finance workflow mapping", "Automated approvals", "ERP integration"];
  }

  if (challenge.includes("hr")) {
    setRecommendation(state, RULES.challengeRecommendations.hr);
    state.recommendedAgents = [RULES.challengeRecommendations.hr, "Employee Experience Bot"];
    state.workflows = ["Employee Onboarding", "Leave Requests", "HR Documents"];
    state.aiReadiness += 7;
    state.estimatedSavings += 140_000;
    state.estimatedHours += 28;
    state.roadmap = ["HR workflow discovery", "Self-service automation", "Policy assistant"];
  }

  if (challenge.includes("procurement")) {
    setRecommendation(state, RULES.challengeRecommendations.procurement);
    state.recommendedAgents = [RULES.challengeRecommendations.procurement, "Supplier Intelligence", "Contract Automation"];
    state.workflows = ["Supplier Intelligence", "Contract Automation", "Purchase Orders"];
    state.aiReadiness = Math.max(state.aiReadiness, 87);
    state.estimatedSavings = Math.max(state.estimatedSavings, 1_400_000);
    state.estimatedHours += 64;
    state.roadmap = ["Supplier intelligence mapping", "Contract automation", "Governance rollout"];
    state.automationPotential = "Very High";
  }

  if (challenge.includes("support") || challenge.includes("customer")) {
    setRecommendation(state, RULES.challengeRecommendations.support);
    state.recommendedAgents = [RULES.challengeRecommendations.support, "Case Routing Bot"];
    state.workflows = ["Returns", "Inventory", "Customer Support"];
    state.aiReadiness += 12;
    state.estimatedSavings += 220_000;
    state.estimatedHours += 36;
    state.roadmap = ["Support triage", "Case automation", "Customer self-service"];
  }

  if (industry.includes("healthcare") || challenge.includes("compliance")) {
    state.recommendedAgents = ["Patient Administration AI", "Claims Automation Bot"];
    state.automationPotential = "High compliance";
    state.workflows = ["Patient Intake", "Claims", "Medical Documents", "Scheduling"];
    state.aiReadiness += 6;
    state.estimatedSavings += 260_000;
    state.estimatedHours += 44;
    state.roadmap = ["Intake automation", "Claims handling", "Document workflow"];
  }
}

function applySystemRules(state: ReturnType<typeof createInitialReportState>, systems: string[]) {
  const hasProcurementSignal = systems.some((system) => (RULES.procurementSystems as readonly string[]).includes(system));
  const hasCustomerServiceSignal = systems.some((system) => (RULES.customerServiceSystems as readonly string[]).includes(system));

  if (hasProcurementSignal) {
    if (!state.recommendedAgents.includes("Procurement AI Manager")) {
      state.recommendedAgents = ["Procurement AI Manager", ...state.recommendedAgents.filter((agent) => agent !== "Procurement AI Manager")];
    }
    state.aiReadiness += 8;
    state.estimatedSavings += 240_000;
    state.estimatedHours += 32;
    if (!state.workflows.includes("Purchase Orders")) {
      state.workflows = ["Purchase Orders", "Supplier Emails", "Inventory Forecasting"];
    }
  }

  if (hasCustomerServiceSignal) {
    if (!state.recommendedAgents.includes("Customer Service AI")) {
      state.recommendedAgents = ["Customer Service AI", ...state.recommendedAgents.filter((agent) => agent !== "Customer Service AI")];
    }
    state.aiReadiness += 7;
    state.estimatedSavings += 160_000;
    state.estimatedHours += 22;
    if (!state.workflows.includes("Returns")) {
      state.workflows = ["Returns", "Inventory", "Customer Support"];
    }
  }
}

function applyDocumentRules(state: ReturnType<typeof createInitialReportState>, documentsCount: number) {
  if (documentsCount >= 5000) {
    state.businessHealth += 5;
    state.aiReadiness += 5;
    state.estimatedSavings += 180_000;
    state.estimatedHours += 24;
  } else if (documentsCount >= 1000) {
    state.businessHealth += 3;
    state.aiReadiness += 3;
    state.estimatedSavings += 90_000;
    state.estimatedHours += 12;
  } else if (documentsCount > 0) {
    state.businessHealth += 1;
    state.aiReadiness += 1;
    state.estimatedSavings += 45_000;
    state.estimatedHours += 6;
  }
}

function applyCompanySizeRules(state: ReturnType<typeof createInitialReportState>, companySize: string) {
  if (companySize.includes("1000")) {
    state.estimatedSavings = Math.round(state.estimatedSavings * 1.35);
    state.estimatedHours = Math.round(state.estimatedHours * 1.25);
    state.businessHealth += 3;
  } else if (companySize.includes("251-1000")) {
    state.estimatedSavings = Math.round(state.estimatedSavings * 1.18);
    state.estimatedHours = Math.round(state.estimatedHours * 1.12);
    state.businessHealth += 2;
  }
}

function applyGoalRules(state: ReturnType<typeof createInitialReportState>, goal: string) {
  if (goal.trim()) {
    state.aiReadiness += 2;
    state.businessHealth += 1;
  }
}

function setRecommendation(state: ReturnType<typeof createInitialReportState>, recommendation: string) {
  state.recommendedAgents = [recommendation];
}

function normalizeDocuments(documents: string[] | number | string): number {
  if (typeof documents === "number") {
    return documents;
  }

  if (typeof documents === "string") {
    if (documents.includes("-")) {
      const [minValue, maxValue] = documents.split("-").map((value) => Number.parseInt(value.replace(/[^\d]/g, ""), 10));
      const safeMin = Number.isNaN(minValue) ? 0 : minValue;
      const safeMax = Number.isNaN(maxValue) ? safeMin : maxValue;

      return Math.round((safeMin + safeMax) / 2);
    }

    const numeric = Number.parseInt(documents.replace(/[^\d]/g, ""), 10);

    return Number.isNaN(numeric) ? 0 : numeric;
  }

  return documents.length;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function calculateAutomationPotentialScore(state: ReturnType<typeof createInitialReportState>) {
  return clamp(Math.round((state.aiReadiness + state.businessHealth) / 2), 0, 100);
}

function calculateRoiMonths(estimatedSavings: number, estimatedHours: number) {
  const baseline = estimatedHours === 0 ? 1 : estimatedHours;
  return Math.max(1, Math.round(estimatedSavings / (baseline * 8_000)));
}

function buildWorkflow(workflowName: string): WorkflowDefinition {
  const defaults: Record<string, { icon: string; steps: string[] }> = {
    "Invoice Processing": { icon: "file-invoice", steps: ["Invoices", "Document AI", "Finance AI Agent", "Manager Approval", "SAP"] },
    Approvals: { icon: "check-circle", steps: ["Request", "Policy AI", "Manager Approval", "ERP"] },
    "Month-End Close": { icon: "calendar-check", steps: ["Data Collection", "Finance AI Agent", "Review", "Ledger"] },
    "Supplier Intelligence": { icon: "users-round", steps: ["Supplier", "Document AI", "Risk AI", "Approval"] },
    "Contract Automation": { icon: "file-signature", steps: ["Contract", "Document AI", "Legal AI", "Signature"] },
    "Purchase Orders": { icon: "shopping-cart", steps: ["Purchase Request", "AI Procurement Agent", "Supplier Risk Analysis", "Manager Approval", "SAP ERP"] },
    "Supplier Emails": { icon: "mail", steps: ["Inbox", "Document AI", "Response AI", "ERP"] },
    "Inventory Forecasting": { icon: "boxes", steps: ["Inventory Data", "Forecast AI", "Planner Review", "ERP"] },
    Returns: { icon: "rotate-ccw", steps: ["Request", "Policy AI", "Approval", "Resolution"] },
    Inventory: { icon: "warehouse", steps: ["Stock Data", "Prediction AI", "Manager Approval", "System Update"] },
    "Customer Support": { icon: "headset", steps: ["Customer Email", "AI Support Agent", "Knowledge Base", "CRM"] },
    "Employee Onboarding": { icon: "user-plus", steps: ["Candidate File", "Document AI", "HR AI Assistant", "Manager Approval", "HRIS"] },
    "Leave Requests": { icon: "calendar-days", steps: ["Request", "Policy AI", "Manager Approval", "HRIS"] },
    "HR Documents": { icon: "folder-open", steps: ["Document", "Document AI", "HR AI Assistant", "Archive"] },
    "Patient Intake": { icon: "heart-pulse", steps: ["Patient Registration", "AI Document Processing", "Insurance Verification", "Medical Records System"] },
    Claims: { icon: "shield-check", steps: ["Claim", "Document AI", "Approval", "Payer System"] },
    "Medical Documents": { icon: "file-heart", steps: ["Records", "Document AI", "Review", "EHR"] },
    Scheduling: { icon: "clock-3", steps: ["Request", "Scheduling AI", "Approval", "Calendar"] },
    "Workflow Mapping": { icon: "git-branch", steps: ["Process", "Analysis AI", "Recommendation", "Implement"] },
    "Document Intake": { icon: "folder-input", steps: ["Document", "Capture", "Classify AI", "Route"] },
    "Executive Reporting": { icon: "bar-chart-3", steps: ["Data", "Analytics AI", "Summary", "Dashboard"] },
  };

  const workflow = defaults[workflowName] ?? {
    icon: "workflow",
    steps: ["Input", "Process AI", "Review", "System"],
  };

  return {
    title: workflowName,
    icon: workflow.icon,
    steps: workflow.steps.map((label, index) => ({
      id: `${toId(workflowName)}-${index + 1}`,
      label,
      type: inferStepType(label, index, workflow.steps.length),
    })),
  };
}

function inferStepType(label: string, index: number, total: number): WorkflowStepType {
  const normalized = label.toLowerCase();

  if (/(document|invoice|contract|form|records|data|file|claim)/.test(normalized)) {
    return "document";
  }

  if (/(approval|review|signature|sign-off)/.test(normalized)) {
    return "approval";
  }

  if (/(sap|erp|ehr|hris|system|dashboard|calendar|ledger|archive|payer)/.test(normalized) || index === total - 1) {
    return "system";
  }

  if (/(manager|agent|planner|handoff|candidate|patient|supplier|request|message)/.test(normalized)) {
    return "user";
  }

  if (/(ai|analysis|forecast|prediction|classify|triage|policy|compliance|analytics)/.test(normalized)) {
    return "ai";
  }

  return index % 2 === 0 ? "document" : "ai";
}

function toId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}