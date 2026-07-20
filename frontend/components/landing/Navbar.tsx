"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Assessment", href: "#assessment" },
  { label: "Analysis", href: "#analysis" },
  { label: "Report", href: "#report" },
  { label: "Workflow", href: "#workflow" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12 xl:px-16">
        <Link href="#" className="text-lg font-semibold tracking-tight text-slate-950">
          AURA
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </div>

        <Button className="rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700" onClick={() => router.push("/assessment") }>
          Start Assessment
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </nav>
    </header>
  );
}
