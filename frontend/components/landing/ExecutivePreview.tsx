"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateBusinessReport } from "@/lib/intelligence";
import { ExecutiveReport } from "@/components/report/ExecutiveReport";
import type { BusinessReportInput } from "@/types/assessment";

const sampleAssessment: BusinessReportInput = {
  industry: "Procurement",
  companySize: "1000+",
  challenge: "procurement",
  systems: ["sap", "microsoft-dynamics-365", "salesforce"],
  documents: "2000-10000",
  goal: "Reduce manual work and improve approval visibility",
};

const sampleReport = generateBusinessReport(sampleAssessment);

export function ExecutivePreview() {
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mt-12"
        >
          <ExecutiveReport report={sampleReport} />
        </motion.div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4">
          <div className="text-sm text-slate-400">View the same report experience end to end</div>
          <Button
            className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700"
            onClick={() => {
              window.location.href = "/report";
            }}
          >
            View Full Report
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
