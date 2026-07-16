"use client";

import { motion } from "framer-motion";
import { Brain, Bot, ChartNoAxesCombined, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Business Intelligence",
    description: "Map operations in real time and uncover the processes most ready for automation.",
    icon: Brain,
  },
  {
    title: "Workflow Automation",
    description: "Deploy AI-driven workflows that move work forward without manual handoffs.",
    icon: Bot,
  },
  {
    title: "ROI Analytics",
    description: "Measure impact with clear financial forecasting and performance visibility.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "AI Workforce",
    description: "Coordinate specialist agents that amplify teams across finance, operations, and support.",
    icon: Users,
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Capabilities</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Designed for modern enterprise operations
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            AURA combines business intelligence, automation, and measurable ROI into one operating layer for growth-minded teams.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className="h-full border-slate-200 bg-white">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl text-slate-950">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-slate-600">{feature.description}</p>
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
