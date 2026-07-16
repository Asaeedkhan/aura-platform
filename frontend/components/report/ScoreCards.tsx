import type { BusinessReport } from "@/types/assessment";
import { Card, CardContent } from "@/components/ui/card";

type ScoreCardsProps = {
  report: BusinessReport;
};

type ScoreTileProps = {
  label: string;
  value: string;
  toneClassName: string;
};

function ScoreTile({ label, value, toneClassName }: ScoreTileProps) {
  return (
    <Card className="border-slate-800 bg-slate-950/70 shadow-none">
      <CardContent className="px-5 py-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className={`mt-2 text-2xl font-semibold ${toneClassName}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

export function ScoreCards({ report }: ScoreCardsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <ScoreTile label="Business Health" value={`${report.scores.businessHealth}/100`} toneClassName="text-white" />
      <ScoreTile label="AI Readiness" value={`${report.scores.aiReadiness}`} toneClassName="text-emerald-300" />
      <ScoreTile label="Automation" value={`${report.scores.automationPotential}/100`} toneClassName="text-cyan-300" />
    </div>
  );
}
