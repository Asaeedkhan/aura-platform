"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  "Understanding your industry",
  "Evaluating business maturity",
  "Detecting automation opportunities",
  "Calculating potential ROI",
  "Building your AI transformation roadmap",
];

export function AnalysisLoader() {
  return (
    <Card className="mx-auto w-full max-w-2xl border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.12)]">
      <CardContent className="px-8 py-10 sm:px-10">
        <div className="flex items-center justify-center">
          <div className="rounded-full border border-blue-100 bg-blue-50 p-3 text-blue-600">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            AURA AI is analyzing your business...
          </h2>
          <div className="mx-auto mt-4 h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.25, duration: 0.35 }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">{step}</span>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Generating your Executive Report...
        </p>
      </CardContent>
    </Card>
  );
}
