import { Card, CardContent } from "@/components/ui/card";
import type { BusinessReport } from "@/types/assessment";

type RoadmapTimelineProps = {
  report: BusinessReport;
};

const stepWidths = ["w-3/4", "w-2/3", "w-1/2", "w-1/3"];
const stepTones = ["bg-blue-500", "bg-cyan-500", "bg-emerald-500", "bg-violet-500"];

export function RoadmapTimeline({ report }: RoadmapTimelineProps) {
  return (
    <Card className="border-slate-800 bg-slate-950/70 shadow-none">
      <CardContent className="px-5 py-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Implementation Roadmap</p>
        <div className="mt-4 space-y-4 text-sm text-slate-200">
          {report.recommendations.roadmap.map((item, index) => (
            <div key={`${item.phase}-${item.title}`}>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.phase}</div>
              <div className="mt-1 font-medium text-white">{item.title}</div>
              <div className="mt-1 h-1 rounded-full bg-slate-800">
                <div className={`h-1 rounded-full ${stepWidths[index] ?? "w-full"} ${stepTones[index] ?? "bg-slate-500"}`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
