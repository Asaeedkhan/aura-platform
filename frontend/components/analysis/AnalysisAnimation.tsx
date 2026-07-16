"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { analysisSteps } from "@/data/rules";

const DURATION_MS = 5000;

export function AnalysisAnimation() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  const stepDuration = useMemo(() => DURATION_MS / analysisSteps.length, []);

  useEffect(() => {
    let animationFrame = 0;
    let startTime = 0;

    const tick = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const nextProgress = Math.min((elapsed / DURATION_MS) * 100, 100);
      const nextCompletedSteps = Math.min(Math.floor(elapsed / stepDuration), analysisSteps.length);

      setProgress(nextProgress);
      setCompletedSteps(nextCompletedSteps);

      if (elapsed < DURATION_MS) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      window.setTimeout(() => {
        router.replace("/report");
      }, 300);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [router, stepDuration]);

  const radius = 78;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-8 text-slate-100 sm:px-8 lg:px-12 xl:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
        <Card className="overflow-hidden border-slate-800 bg-slate-900/85 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-center">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-56 w-56">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180" aria-hidden="true">
                    <circle cx="90" cy="90" r={radius} stroke="rgba(51,65,85,0.9)" strokeWidth={strokeWidth} fill="none" />
                    <motion.circle
                      cx="90"
                      cy="90"
                      r={radius}
                      stroke="url(#analysisProgressGradient)"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={circumference}
                      animate={{ strokeDashoffset }}
                      transition={{ ease: "linear", duration: 0.12 }}
                    />
                    <defs>
                      <linearGradient id="analysisProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-semibold tracking-tight text-white">{Math.round(progress)}%</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Processing</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">AURA</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    AURA AI is analyzing your business
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                    Please wait while we generate your personalized AI Transformation Report.
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Analysis Sequence</p>
                  <p className="text-sm font-medium text-slate-300">Approx. 5 seconds</p>
                </div>

                <div className="space-y-3">
                  {analysisSteps.map((step, index) => {
                    const isComplete = index < completedSteps;
                    const isActive = index === completedSteps && progress < 100;

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        className={`flex items-center gap-4 rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                          isComplete
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : isActive
                              ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
                              : "border-slate-800 bg-slate-950/70 text-slate-400"
                        }`}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${isComplete ? "border-emerald-500/30 bg-emerald-500/10" : "border-slate-700 bg-slate-900"}`}>
                          {isComplete ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <span className="text-xs font-semibold text-slate-300">{index + 1}</span>}
                        </div>
                        <span>{step.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}