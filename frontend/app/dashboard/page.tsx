"use client";

import { ArrowRight, Bot, BriefcaseBusiness, DollarSign, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Business Health", value: "82%", icon: Bot },
  { label: "Automation Potential", value: "HIGH", icon: TrendingUp },
  { label: "Estimated Savings", value: "AED 420,000", icon: DollarSign },
  { label: "Recommended AI Agents", value: "Finance, Procurement, HR, Customer Support", icon: Users },
];

const workflows = [
  { name: "Finance", status: "★★★★★", impact: "High" },
  { name: "Procurement", status: "★★★★★", impact: "High" },
  { name: "HR", status: "★★★★", impact: "Medium" },
  { name: "Customer Support", status: "★★★★", impact: "Medium" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <Sparkles className="h-4 w-4" />
              AURA Control Center
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Your operations dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
              Track automation readiness, savings potential, and recommended workflows from one place.
            </p>
          </div>

          <Button className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700">
            Launch New Workflow
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-slate-200 bg-white">
                <CardContent className="flex items-start justify-between p-5">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">{stat.value}</p>
                  </div>
                  <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 px-6 py-5">
              <CardTitle className="text-xl text-slate-950">Recommended Workflows</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                        <BriefcaseBusiness className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{workflow.name}</p>
                        <p className="text-sm text-slate-500">Impact: {workflow.impact}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700">
                      {workflow.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 px-6 py-5">
              <CardTitle className="text-xl text-slate-950">Executive Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Expected efficiency gain</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">+34%</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Delivery confidence</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">High confidence rollout</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Next milestone</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">Pilot deployment in 2 weeks</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
