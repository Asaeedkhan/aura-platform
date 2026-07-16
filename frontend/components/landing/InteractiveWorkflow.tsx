"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, FileText, PlayCircle, ShieldCheck, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { title: "Landing", description: "Understand the business challenge and desired outcomes", icon: FileText },
  { title: "Assessment", description: "Collect the context behind operations, approvals, and growth goals", icon: Workflow },
  { title: "Analysis Animation", description: "Watch AURA evaluate the workflow and highlight automation opportunities", icon: PlayCircle },
  { title: "Executive Report", description: "Receive a scorecard with readiness, savings, and workforce recommendations", icon: ShieldCheck },
  { title: "Interactive Workflow", description: "Explore the recommended workflow in a guided, click-through experience", icon: Bot },
];

export function InteractiveWorkflow() {
  return (
    <section id="workflow" className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Interactive Workflow</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Follow the journey from insight to action
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Each step moves from discovery to recommendation so teams can understand how AI decision-making actually works.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className="h-full border-slate-200 bg-white">
                  <CardContent className="p-5">
                    <div className="rounded-full bg-blue-50 p-2 text-blue-600 w-fit">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700" onClick={() => window.location.href = "/assessment"}>
            Start the Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
