import { Card, CardContent } from "@/components/ui/card";
import type { BusinessReport } from "@/types/assessment";
import { cn } from "@/lib/utils";

type OpportunityMatrixProps = {
  opportunities: BusinessReport["opportunities"];
  className?: string;
  title?: string;
};

const priorityTone: Record<BusinessReport["opportunities"][number]["priority"], string> = {
  Critical: "border-rose-500/30 bg-rose-500/10 text-rose-200",
  High: "border-orange-500/30 bg-orange-500/10 text-orange-200",
  Medium: "border-blue-500/30 bg-blue-500/10 text-blue-200",
  Low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

const headers = ["Opportunity", "Business Impact", "Implementation Effort", "Priority", "Estimated ROI"];

function PriorityPill({ priority }: { priority: BusinessReport["opportunities"][number]["priority"] }) {
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em]", priorityTone[priority])}>{priority}</span>;
}

export function OpportunityMatrix({ opportunities, className, title = "Opportunity Matrix" }: OpportunityMatrixProps) {
  if (!opportunities.length) {
    return null;
  }

  return (
    <Card className={cn("border-slate-800 bg-slate-950/70 shadow-none", className)}>
      <CardContent className="px-5 py-4">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
          <p className="mt-2 text-sm text-slate-300">Prioritized opportunities based on impact, effort, and expected returns.</p>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-[0.2em] text-slate-500">
                {headers.map((header) => (
                  <th key={header} className="px-3 py-2 font-medium first:pl-0 last:pr-0">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {opportunities.map((item) => (
                <tr key={item.opportunity} className="border-b border-slate-800/70 align-top last:border-b-0">
                  <td className="px-3 py-3 font-medium text-slate-100 first:pl-0">{item.opportunity}</td>
                  <td className="px-3 py-3 text-slate-300">{item.businessImpact}</td>
                  <td className="px-3 py-3 text-slate-200">{item.implementationEffort}</td>
                  <td className="px-3 py-3">
                    <PriorityPill priority={item.priority} />
                  </td>
                  <td className="px-3 py-3 font-medium text-emerald-300 last:pr-0">{item.estimatedRoi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:hidden">
          {opportunities.map((item) => (
            <div key={item.opportunity} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{item.opportunity}</p>
                <PriorityPill priority={item.priority} />
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Business Impact</p>
                  <p className="mt-1 text-slate-300">{item.businessImpact}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Effort</p>
                    <p className="mt-1 text-slate-200">{item.implementationEffort}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Estimated ROI</p>
                    <p className="mt-1 font-medium text-emerald-300">{item.estimatedRoi}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
