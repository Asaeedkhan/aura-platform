"use client";

import { motion } from "framer-motion";
import { ArrowDown, Building2, FileSearch2, Globe2, Layers3, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { title: "Industry", description: "Tell AURA what sector you operate in so the analysis is grounded in your context.", icon: Globe2 },
  { title: "Company Size", description: "Set the scale of your business to calibrate process complexity and ROI.", icon: Building2 },
  { title: "Operational Challenge", description: "Choose the department or bottleneck that needs the most attention.", icon: Layers3 },
  { title: "Current Systems", description: "Share the systems your team already uses so integration paths are realistic.", icon: FileSearch2 },
  { title: "Document Volume", description: "Estimate the amount of operational work flowing through the business.", icon: Sparkles },
  { title: "Business Goal", description: "Define the outcome you want, from cost reduction to faster delivery.", icon: Target },
];

export function AssessmentJourney() {
  return (
    <section id="assessment" className="bg-white px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Assessment</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Six questions that shape the analysis
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The assessment stays focused on the operational signals that matter most, so the rest of the journey can be fast and relevant.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="border-slate-200 bg-slate-50/80">
                <CardContent className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                      {(() => {
                        const Icon = step.icon;

                        return <Icon className="h-5 w-5" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 ? (
                    <div className="flex items-center justify-center text-slate-400">
                      <ArrowDown className="h-5 w-5" />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/assessment"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Start the 6-question assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
