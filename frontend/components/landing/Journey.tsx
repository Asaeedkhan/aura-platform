"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CircleCheckBig,
  FileSearch2,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Start Free Assessment",
    description: "Begin with a guided diagnostic that maps your business goals and priorities.",
    icon: BrainCircuit,
  },
  {
    title: "6 Business Questions",
    description: "Answer focused questions that uncover workflows, bottlenecks, and high-value opportunities.",
    icon: FileSearch2,
  },
  {
    title: "AI Thinking Screen",
    description: "AURA evaluates your operations and suggests the best-fit automation strategy.",
    icon: Sparkles,
  },
  {
    title: "Business Intelligence Report",
    description: "Receive a concise report with insights, ROI expectations, and implementation guidance.",
    icon: CircleCheckBig,
  },
  {
    title: "Recommended AI Workflows",
    description: "Explore the most relevant workflows for your team and business model.",
    icon: Workflow,
  },
  {
    title: "Workflow Simulation",
    description: "Preview how each workflow will operate before rolling it out across your business.",
    icon: Bot,
  },
];

export function Journey() {
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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            How AURA works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            From discovery to deployment in one guided journey
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Move from a simple assessment to intelligent workflow orchestration without changing how your team works.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="relative"
              >
                <Card className="h-full border-slate-200 bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-slate-400">0{index + 1}</span>
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                  </CardContent>
                </Card>

                {index < steps.length - 1 ? (
                  <div className="hidden lg:flex absolute right-[-12px] top-1/2 -translate-y-1/2 text-slate-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
