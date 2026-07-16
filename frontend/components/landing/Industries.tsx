"use client";

import { motion } from "framer-motion";
import { Building2, Factory, HeartPulse, PackageOpen, ShoppingBag, Warehouse } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  { name: "Construction", icon: Building2 },
  { name: "Manufacturing", icon: Factory },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Logistics", icon: Warehouse },
  { name: "Retail", icon: ShoppingBag },
  { name: "Hospitality", icon: PackageOpen },
];

export function Industries() {
  return (
    <section className="bg-white px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Industries</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Built for complex, growth-oriented teams
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            AURA adapts to fast-moving operations in regulated, multi-site, and service-heavy environments.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className="h-full border-slate-200 bg-slate-50/70">
                  <CardContent className="flex items-center gap-3 p-6">
                    <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-950">{industry.name}</h3>
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
