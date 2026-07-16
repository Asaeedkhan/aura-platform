"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportPage() {
  const router = useRouter();

  const handleDownloadPdf = () => {
    const reportContent = `AURA Executive Report

Business Health Score: 82 / 100
AI Readiness: High
Automation Potential: Very High
Estimated Annual Savings: AED 420,000
Estimated Time Saved: 186 Hours / Month

Recommended AI Workforce:
- Finance AI Agent
- Procurement AI Agent
- Customer Support Agent
- HR Assistant
- Compliance Agent

Implementation Timeline:
- Immediate: Priority Launch
- Invoice Processing: 2 Weeks
- Vendor Approval: 1 Month
- HR Onboarding: Quarter 2
- Predictive Analytics: Next Phase`;

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
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-[32px] border border-slate-800 bg-slate-900/80 px-8 py-10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.65)] sm:px-10 lg:px-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
            <Sparkles className="h-4 w-4" />
            AURA Report
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Executive Summary</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">AI Transformation Snapshot</p>
          <p className="mt-5 text-center text-base leading-7 text-slate-300">
            Based on your assessment, AURA identified significant automation opportunities in Finance and Procurement. Your organization demonstrates high AI readiness with an estimated annual efficiency gain of AED 110,000 per year.
          </p>
        </div>

        <div className="grid w-full gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Business Health</p>
            <p className="mt-2 text-2xl font-semibold text-white">82/100</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI Readiness</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-300">High</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Automation</p>
            <p className="mt-2 text-2xl font-semibold text-cyan-300">Very High</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Annual Savings</p>
            <p className="mt-2 text-2xl font-semibold text-white">AED 110,000</p>
          </div>
        </div>

        <div className="mt-8 w-full space-y-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Transformation Curve</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="w-full max-w-xl text-center">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Traditional</span>
                  <span>AI Driven</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-800">
                  <div className="mx-auto h-2 w-1/2 rounded-full bg-gradient-to-r from-slate-400 to-blue-500" />
                </div>
                <div className="mt-3 text-sm font-medium text-cyan-300">▲ Your Business</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Finance Workflow</p>
            <div className="mt-4 flex flex-col items-center gap-2 text-sm text-slate-200">
              <div className="text-lg font-medium text-white">Invoices</div>
              <div className="text-slate-500">▼</div>
              <div className="text-lg font-medium text-cyan-300">AI Finance Analyst</div>
              <div className="text-slate-500">▼</div>
              <div className="text-lg font-medium text-white">Manager Approval</div>
              <div className="text-slate-500">▼</div>
              <div className="text-lg font-medium text-white">ERP System</div>
            </div>
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-emerald-300">
              Estimated Savings: AED 110,000/year
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Assessment Confidence</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-3xl font-semibold text-white">94%</div>
              <div className="text-slate-400">Based on:</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-emerald-300">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">✓ Industry</span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">✓ Company Size</span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">✓ Technology Stack</span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">✓ Business Goals</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recommended AI Workforce</p>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span>Finance AI Agent</span>
                <span className="text-amber-300">★★★★★</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Procurement AI Agent</span>
                <span className="text-amber-300">★★★★★</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Customer Support Agent</span>
                <span className="text-amber-300">★★★★★</span>
              </div>
              <div className="flex items-center justify-between">
                <span>HR Assistant</span>
                <span className="text-amber-300">★★★★</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Compliance Agent</span>
                <span className="text-amber-300">★★★★</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Implementation Roadmap</p>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Month 1</div>
                <div className="mt-1 font-medium text-white">Invoice Processing</div>
                <div className="mt-1 h-1 rounded-full bg-slate-800">
                  <div className="h-1 w-3/4 rounded-full bg-blue-500" />
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Month 2</div>
                <div className="mt-1 font-medium text-white">Procurement Automation</div>
                <div className="mt-1 h-1 rounded-full bg-slate-800">
                  <div className="h-1 w-2/3 rounded-full bg-cyan-500" />
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Month 3</div>
                <div className="mt-1 font-medium text-white">Customer Support AI</div>
                <div className="mt-1 h-1 rounded-full bg-slate-800">
                  <div className="h-1 w-1/2 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Quarter 2</div>
                <div className="mt-1 font-medium text-white">Predictive Analytics</div>
                <div className="mt-1 h-1 rounded-full bg-slate-800">
                  <div className="h-1 w-1/3 rounded-full bg-violet-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

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
