"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const industries = [
  "Construction",
  "Healthcare",
  "Manufacturing",
  "Logistics",
  "Retail",
  "Hospitality",
  "Government",
  "Other",
];

const companySizes = [
  { value: "1-50", label: "1–50 employees" },
  { value: "51-250", label: "51–250 employees" },
  { value: "251-1000", label: "251–1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

const operationalChallenges = [
  {
    value: "finance",
    title: "Finance & Accounting",
    description: "Reduce manual reconciliation and speed up reporting.",
    icon: "💰",
  },
  {
    value: "procurement",
    title: "Procurement",
    description: "Streamline sourcing, approvals, and vendor workflows.",
    icon: "📦",
  },
  {
    value: "hr",
    title: "Human Resources",
    description: "Automate onboarding, employee requests, and document handling.",
    icon: "👥",
  },
  {
    value: "support",
    title: "Customer Support",
    description: "Improve response times and case resolution consistency.",
    icon: "🎧",
  },
  {
    value: "sales",
    title: "Sales & CRM",
    description: "Clean up pipeline data and accelerate follow-up actions.",
    icon: "📊",
  },
  {
    value: "operations",
    title: "Operations",
    description: "Coordinate teams, tasks, and handoffs with less friction.",
    icon: "⚙️",
  },
  {
    value: "compliance",
    title: "Compliance",
    description: "Keep controls, audits, and policy tracking organized.",
    icon: "📋",
  },
  {
    value: "other",
    title: "Other",
    description: "Share the workflow or bottleneck that matters most.",
    icon: "🔧",
  },
];

const businessSystemGroups = [
  {
    category: "ERP",
    options: [
      { value: "sap", label: "SAP" },
      { value: "oracle", label: "Oracle" },
      { value: "microsoft-dynamics-365", label: "Microsoft Dynamics 365" },
      { value: "odoo", label: "Odoo" },
    ],
  },
  {
    category: "CRM",
    options: [
      { value: "salesforce", label: "Salesforce" },
      { value: "hubspot", label: "HubSpot" },
      { value: "zoho", label: "Zoho" },
    ],
  },
  {
    category: "Accounting",
    options: [
      { value: "quickbooks", label: "QuickBooks" },
      { value: "xero", label: "Xero" },
    ],
  },
  {
    category: "Productivity",
    options: [{ value: "microsoft-365", label: "Microsoft 365" }],
  },
];

const documentVolumeOptions = [
  { value: "less-than-100", label: "<100" },
  { value: "100-500", label: "100–500" },
  { value: "500-2000", label: "500–2,000" },
  { value: "2000-10000", label: "2,000–10,000" },
  { value: "more-than-10000", label: "10,000+" },
];

const documentTypes = [
  "Invoices",
  "Purchase Orders",
  "Contracts",
  "HR Documents",
  "Customer Support Requests",
  "Emails",
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [answers, setAnswers] = useState({
    industry: "",
    companySize: "",
    challenge: "",
    systems: [] as string[],
    otherSystem: "",
    documentVolume: "",
    documentTypes: [] as string[],
    goal: "",
  });

  const progressPercent = (currentStep / 6) * 100;

  const updateAnswer = (field: "industry" | "companySize" | "challenge" | "otherSystem" | "documentVolume" | "goal", value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSystem = (system: string) => {
    setAnswers((prev) => {
      const systems = prev.systems.includes(system)
        ? prev.systems.filter((item) => item !== system)
        : [...prev.systems, system];

      return { ...prev, systems };
    });
  };

  const toggleDocumentType = (documentType: string) => {
    setAnswers((prev) => {
      const documentTypes = prev.documentTypes.includes(documentType)
        ? prev.documentTypes.filter((item) => item !== documentType)
        : [...prev.documentTypes, documentType];

      return { ...prev, documentTypes };
    });
  };

  const analysisSteps = [
    "Understanding your industry",
    "Evaluating business maturity",
    "Detecting automation opportunities",
    "Calculating potential ROI",
    "Building your AI transformation roadmap",
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((step) => step + 1);
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(6);

    const timer = window.setInterval(() => {
      setAnalysisStage((stage) => {
        if (stage >= analysisSteps.length - 1) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            window.location.href = "/analysis";
          }, 600);
          return stage;
        }

        return stage + 1;
      });
    }, 900);
  };

  const handlePrevious = () => {
    if (isAnalyzing) {
      return;
    }

    setCurrentStep((step) => Math.max(1, step - 1));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            AURA Business Assessment
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Discover your automation potential
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-600">
            This wizard layout is ready for the assessment questions.
          </p>
        </div>

        <Card className="border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.12)]">
          <CardHeader className="border-b border-slate-100 px-6 py-5">
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${isAnalyzing ? 100 : progressPercent}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{isAnalyzing ? "Analysis" : `Step ${currentStep} of 6`}</span>
              <span>{isAnalyzing ? "100% complete" : `${Math.round(progressPercent)}% complete`}</span>
            </div>
          </CardHeader>

          <CardContent className="px-6 py-8">
            <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-950">AURA AI is analyzing your business...</h2>
                  <div className="mt-8 w-full max-w-xl space-y-3 text-left">
                    {analysisSteps.map((step, index) => {
                      const isComplete = index < analysisStage;
                      const isActive = index === analysisStage;

                      return (
                        <div
                          key={step}
                          className={`flex items-center rounded-2xl border px-4 py-3 text-sm transition ${
                            isComplete
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : isActive
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <span className={`mr-3 h-2.5 w-2.5 rounded-full ${isComplete ? "bg-emerald-500" : isActive ? "bg-blue-600" : "bg-slate-300"}`} />
                          {isComplete ? "✓" : isActive ? "●" : "○"} {step}
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-8 text-sm font-medium text-slate-500">Generating your Executive Report...</p>
                </div>
              ) : currentStep === 1 ? (
                <>
                  <h2 className="text-2xl font-semibold text-slate-950">What industry does your organization operate in?</h2>
                  <p className="mt-2 text-sm text-slate-500">Select the sector that best describes your business so AURA can tailor its analysis.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {industries.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateAnswer("industry", option)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          answers.industry === option
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : currentStep === 2 ? (
                <>
                  <h2 className="text-2xl font-semibold text-slate-950">How many people work in your organization?</h2>
                  <p className="mt-2 text-sm text-slate-500">Your team size helps estimate automation opportunities and potential ROI.</p>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {companySizes.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateAnswer("companySize", option.value)}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          answers.companySize === option.value
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span className="block text-sm font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : currentStep === 3 ? (
                <>
                  <h2 className="text-2xl font-semibold text-slate-950">What is your biggest operational challenge today?</h2>
                  <p className="mt-2 text-sm text-slate-500">Choose the area where improving efficiency would create the greatest business impact.</p>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {operationalChallenges.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateAnswer("challenge", option.value)}
                        className={`group rounded-3xl border p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                          answers.challenge === option.value
                            ? "border-blue-600 bg-blue-50 shadow-md"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <div className="text-base font-semibold">{option.title}</div>
                            <div className="mt-1 text-sm text-slate-500">{option.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : currentStep === 4 ? (
                <>
                  <h2 className="text-2xl font-semibold text-slate-950">Which business systems does your organization currently use?</h2>
                  <p className="mt-2 text-sm text-slate-500">Select all systems currently in use to identify integration opportunities and AI automation potential.</p>

                  <div className="mt-6 space-y-5">
                    {businessSystemGroups.map((group) => (
                      <div key={group.category} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{group.category}</h3>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {group.options.map((system) => {
                            const isSelected = answers.systems.includes(system.value);

                            return (
                              <Card
                                key={system.value}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isSelected}
                                onClick={() => toggleSystem(system.value)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    toggleSystem(system.value);
                                  }
                                }}
                                className={`cursor-pointer rounded-2xl border px-4 py-3 text-left text-sm font-medium transition hover:-translate-y-0.5 ${
                                  isSelected
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span>{system.label}</span>
                                  <span
                                    className={`h-4 w-4 rounded-full border ${
                                      isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"
                                    }`}
                                  />
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Card className="mt-6 border-dashed border-slate-300 bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-blue-50 p-2 text-blue-600">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-700">Other</p>
                          <p className="mt-1 text-sm text-slate-500">Add another business system not listed above.</p>
                          <input
                            id="other-system"
                            value={answers.otherSystem}
                            onChange={(event) => updateAnswer("otherSystem", event.target.value)}
                            placeholder="Type another system here"
                            className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-0 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : currentStep === 5 ? (
                <>
                  <h2 className="text-2xl font-semibold text-slate-950">Approximately how many business documents do you process each month?</h2>
                  <p className="mt-2 text-sm text-slate-500">Include invoices, purchase orders, contracts, HR documents, emails, customer requests, and other operational paperwork.</p>
                  <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    {documentVolumeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateAnswer("documentVolume", option.value)}
                        className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition hover:-translate-y-0.5 ${
                          answers.documentVolume === option.value
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-950">Which document types?</h3>
                    <p className="mt-1 text-sm text-slate-500">Select all the document categories you handle regularly.</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {documentTypes.map((type) => {
                        const isSelected = answers.documentTypes.includes(type);

                        return (
                          <label
                            key={type}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                              isSelected
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-slate-200 bg-white text-slate-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleDocumentType(type)}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{type}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-slate-950">If AURA could solve one business challenge in the next 90 days, what would you prioritize?</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Tell us your highest-priority objective so we can generate personalized AI recommendations.
                  </p>
                  <textarea
                    value={answers.goal}
                    onChange={(event) => updateAnswer("goal", event.target.value)}
                    placeholder='Example: "Reduce invoice processing time by 70%, automate vendor approvals, and shorten customer response times."'
                    className="mt-6 min-h-[220px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500"
                  />
                </>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button
                variant="outline"
                className="rounded-full border-slate-200 px-5"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isAnalyzing}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700"
                onClick={handleNext}
                disabled={currentStep === 6 && isAnalyzing}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
