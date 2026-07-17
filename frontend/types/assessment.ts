export type AssessmentAnswers = {
  industry: string;
  companySize: string;
  challenge: string;
  systems: string[];
  otherSystem: string;
  documentVolume: string;
  documentTypes: string[];
  goal: string;
};

export type AnalysisStep = {
  id: string;
  label: string;
};

export type BusinessReportInput = {
  industry: string;
  companySize: string;
  challenge: string;
  systems: string[];
  documents: string[] | number | string;
  goal: string;
};

export type WorkflowStepType = "document" | "ai" | "approval" | "system" | "user";

export type WorkflowStep = {
  id: string;
  label: string;
  type: WorkflowStepType;
};

export type WorkflowDefinition = {
  title: string;
  icon: string;
  steps: WorkflowStep[];
};

export type BusinessOpportunity = {
  opportunity: string;
  businessImpact: string;
  implementationEffort: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  estimatedRoi: string;
};

export type BusinessReport = {
  scores: {
    businessHealth: number;
    aiReadiness: number;
    automationPotential: number;
  };
  financialImpact: {
    estimatedSavings: number;
    monthlyHoursSaved: number;
    roiMonths: number;
  };
  recommendations: {
    priority: string[];
    roadmap: Array<{
      phase: string;
      title: string;
    }>;
  };
  opportunities: BusinessOpportunity[];
  workflows: WorkflowDefinition[];
  businessHealth: number;
  aiReadiness: number;
  automationPotential: string;
  estimatedSavings: number;
  estimatedHours: number;
  recommendedAgents: string[];
  roadmap: string[];
  suggestedWorkflows: string[];
  topRecommendation: string;
};

export type IntelligenceReport = BusinessReport;