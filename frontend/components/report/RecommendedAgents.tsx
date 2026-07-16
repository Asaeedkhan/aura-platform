import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { BusinessReport } from "@/types/assessment";

type RecommendedAgentsProps = {
  report: BusinessReport;
};

export function RecommendedAgents({ report }: RecommendedAgentsProps) {
  return (
    <Card className="border-slate-800 bg-slate-950/70 shadow-none">
      <CardContent className="px-5 py-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recommended AI Workforce</p>
        <div className="mt-4 space-y-3">
          {report.recommendations.priority.map((item, index) => (
            <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="font-medium text-slate-100">{item}</span>
              </div>
              <span className="text-sm text-slate-400">{index === 0 ? "Priority" : "High impact"}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
