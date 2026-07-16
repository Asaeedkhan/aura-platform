"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "34%", label: "Average efficiency gain" },
  { value: "12 weeks", label: "Typical time to first ROI" },
  { value: "$180K", label: "Annual savings per 50-person team" },
  { value: "3x", label: "Faster approvals and handoffs" },
];

export function ROIStats() {
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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">ROI Statistics</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Measurable outcomes from day one
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            AURA helps leadership teams turn operational complexity into concrete performance improvements.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Card className="h-full border-slate-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                    <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
