"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Hero() {
  const metrics = [
    { label: "Business Health", value: "82%" },
    { label: "Automation Potential", value: "High" },
    { label: "Estimated Savings", value: "AED 420,000" },
    { label: "Time Saved", value: "186 Hours" },
  ];

  const workflows = ["Invoice Automation", "Procurement", "Customer Support", "HR"];

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 text-slate-900 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl flex-1"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            AI Business Transformation Platform
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Your AI Business Operating System
          </h1>

          <p className="mt-6 text-xl leading-8 text-slate-600">
            Understand your business. Discover inefficiencies. Deploy AI automation.
          </p>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            AURA analyzes how your business works, identifies automation opportunities, estimates ROI, and generates intelligent AI workflows in minutes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700" onClick={() => window.location.href = "/assessment"}>
              Start Free Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full border-slate-200 px-6 text-slate-700 hover:bg-slate-50" onClick={() => window.location.hash = "report"}>
              <PlayCircle className="mr-2 h-4 w-4" />
              View Executive Report
            </Button>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Trusted by SMEs</p>
            <div className="mt-4 flex flex-col gap-3 text-sm font-medium text-slate-700 sm:flex-row sm:flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Up to 40% operational cost reduction
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Identify automation opportunities in under 3 minutes
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                ROI report instantly generated
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-xl flex-1"
        >
          <Card className="overflow-hidden border-slate-200/80 bg-white">
            <CardHeader className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Business Assessment
                </CardTitle>
                <div className="rounded-full bg-blue-600/10 p-2 text-blue-600">
                  <BrainCircuit className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Recommended Workflows</p>
                    <p className="text-lg font-semibold text-slate-900">High-impact automation</p>
                  </div>
                  <div className="rounded-full bg-white p-2 text-blue-600 shadow-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-3">
                  {workflows.map((workflow, index) => (
                    <div key={workflow} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
                      <span className="font-medium text-slate-700">{workflow}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Sparkles key={`${workflow}-${i}`} className={`h-4 w-4 ${i < 4 + (index % 2) ? "opacity-100" : "opacity-40"}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Projected ROI</p>
                    <p className="text-sm text-slate-600">+34% efficiency in 30 days</p>
                  </div>
                </div>
                <div className="rounded-full bg-white p-2 text-slate-500 shadow-sm">
                  <Clock3 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
