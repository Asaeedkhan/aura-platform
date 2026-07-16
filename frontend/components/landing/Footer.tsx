import Link from "next/link";
import { ArrowRight, Building2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-950 px-6 py-16 text-slate-300 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
            <Building2 className="h-4 w-4" />
            Enterprise AI Platform
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Build a more intelligent operating model.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            AURA helps enterprise teams uncover automation opportunities, model ROI, and deploy AI at scale with confidence.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button className="rounded-full bg-white px-5 text-slate-950 hover:bg-slate-100">
            Contact Sales
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Link href="mailto:hello@aura.ai" className="flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white">
            <Mail className="h-4 w-4" />
            hello@aura.ai
          </Link>
        </div>
      </div>
    </footer>
  );
}
