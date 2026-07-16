"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Building2, FileText, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { title: "Invoices", description: "Capture incoming invoices and extract key details", icon: FileText },
  { title: "AI Finance Agent", description: "Classify, validate, and route for review", icon: Bot },
  { title: "Approval", description: "Route to the right approver with built-in controls", icon: ShieldCheck },
  { title: "ERP System", description: "Post approved transactions into your system of record", icon: Building2 },
];

export function WorkflowFlow() {
  return (
    <section className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Workflow Example</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            From invoice intake to ERP posting
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            AURA orchestrates the full path from receipt to approval with intelligent automation at every handoff.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-1 flex-col items-center"
              >
                <Card className="w-full border-slate-200 bg-white">
                  <CardContent className="flex flex-col items-center px-5 py-6 text-center">
                    <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 ? (
                  <div className="mt-4 text-slate-400 lg:mt-0 lg:ml-4 lg:self-center">
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
