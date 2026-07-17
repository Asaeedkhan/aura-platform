import { Card, CardContent } from "@/components/ui/card";
import type { BusinessReport } from "@/types/assessment";
import { formatCurrency } from "./utils";

type FinancialImpactProps = {
  report: BusinessReport;
};

export function FinancialImpact({ report }: FinancialImpactProps) {
  const annualHoursSaved = Math.round(report.financialImpact.monthlyHoursSaved * 12);

  return (
    <Card className="border-slate-800 bg-slate-950/70 shadow-none">
      <CardContent className="px-5 py-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Financial Impact</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Estimated Savings</p>
            <p className="mt-2 text-xl font-semibold text-white">{formatCurrency(report.financialImpact.estimatedSavings)}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Hours Saved / Year</p>
            <p className="mt-2 text-xl font-semibold text-cyan-300">{annualHoursSaved.toLocaleString("en-AE")}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">ROI</p>
            <p className="mt-2 text-xl font-semibold text-emerald-300">{report.financialImpact.roiMonths} months</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
