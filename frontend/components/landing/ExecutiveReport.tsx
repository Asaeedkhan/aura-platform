"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reportHighlights = [
  { label: "Business Health", value: "82 / 100", icon: TrendingUp },
  { label: "AI Readiness", value: "High", icon: Sparkles },
  { label: "Estimated Savings", value: "AED 420,000", icon: FileText },
  { label: "Recommended AI Agents", value: "Finance, Procurement, HR", icon: Users },
];

const recommendations = [
  "Finance AI Agent",
  "Procurement AI Agent",
  "Customer Support Agent",
  "HR Assistant",
  "Compliance Agent",
];

export function ExecutiveReport() {
  return (
    <section id="report" className="bg-slate-950 px-6 py-20 text-slate-100 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Executive Report</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A concise summary leaders can act on immediately
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            The report converts the assessment into a readable scorecard with operational priorities, ROI signals, and recommended AI agents.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full border-slate-800 bg-slate-900/80">
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {reportHighlights.map((highlight) => {
                    const Icon = highlight.icon;

                    return (
                      <div key={highlight.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm text-slate-400">{highlight.label}</p>
                          <div className="rounded-full bg-blue-500/10 p-2 text-blue-300">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>
                        <p className="mt-3 text-2xl font-semibold text-white">{highlight.value}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-200">Priority outcome</p>
                  <p className="mt-3 text-lg leading-8 text-slate-100">
                    AURA identifies where automation can reduce manual work, tighten approvals, and improve visibility across the business.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <Card className="h-full border-slate-800 bg-slate-900/80">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Recommended AI Workforce</p>
                <div className="mt-4 space-y-3">
                  {recommendations.map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-300">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-slate-100">{item}</span>
                      </div>
                      <span className="text-sm text-slate-400">High impact</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700"
                    onClick={() => {
                      window.location.href = "/report";
                    }}
                  >
                    View Full Report
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800"
                    onClick={() => {
                      window.location.hash = "workflow";
                    }}
                  >
                    Explore Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}