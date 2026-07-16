"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="bg-white px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-slate-950 px-8 py-12 text-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Call to Action</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to transform your business with AI?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Start with a guided assessment and uncover the workflows, ROI, and workforce strategy that fit your business.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700" onClick={() => window.location.href = "/assessment"}>
              Start Your Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800">
              Book a Strategy Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
