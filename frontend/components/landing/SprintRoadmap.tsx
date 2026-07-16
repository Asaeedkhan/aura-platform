"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const sprints = [
  {
    title: "Landing Page",
    status: "Completed",
    description: "The public entry point introduces AURA and the value proposition.",
    accent: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  {
    title: "Start Assessment",
    status: "Next",
    description: "A clear call to action moves users into the guided assessment experience.",
    accent: "border-slate-200 bg-white text-slate-700",
    icon: CircleDashed,
  },
  {
    title: "6 Smart Questions",
    status: "Planned",
    description: "A focused question set captures the operational context needed for analysis.",
    accent: "border-slate-200 bg-white text-slate-700",
    icon: Sparkles,
  },
  {
    title: "AI Analysis (Animated)",
    status: "Planned",
    description: "An animated analysis stage shows AURA processing the inputs into insight.",
    accent: "border-slate-200 bg-white text-slate-700",
    icon: Sparkles,
  },
  {
    title: "Executive Report",
    status: "Planned",
    description: "The final report summarizes readiness, ROI, and recommended next steps.",
    accent: "border-slate-200 bg-white text-slate-700",
    icon: Sparkles,
  },
];

export function SprintRoadmap() {
  return (
    <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Sprint Roadmap</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            From landing page to executive report
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The flow now follows the exact journey users will see from first visit through report generation.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {sprints.map((sprint, index) => {
            const Icon = sprint.icon;

            return (
              <motion.div
                key={sprint.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className={`h-full border ${sprint.accent} ${sprint.title === "Landing Page" ? "shadow-[0_20px_60px_-20px_rgba(16,185,129,0.18)]" : ""}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className={`rounded-full p-2 ${sprint.title === "Landing Page" ? "bg-emerald-100 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-950">{sprint.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{sprint.description}</p>

                    <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {sprint.status}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}