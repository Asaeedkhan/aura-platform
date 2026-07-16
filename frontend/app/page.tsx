import { AssessmentJourney } from "@/components/landing/AssessmentJourney";
import { CTA } from "@/components/landing/CTA";
import { ExecutivePreview } from "@/components/landing/ExecutivePreview";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { AnalysisLoader } from "@/components/landing/AnalysisLoader";
import { InteractiveWorkflow } from "@/components/landing/InteractiveWorkflow";
import { Navbar } from "@/components/landing/Navbar";
import { SprintRoadmap } from "@/components/landing/SprintRoadmap";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <SprintRoadmap />
      <AssessmentJourney />
      <section id="analysis" className="bg-slate-950 px-6 py-20 text-slate-100 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">AI Analysis Animation</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AURA turns your answers into an operating model analysis
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The animation stage shows the system reasoning through the inputs before it produces a clear executive summary.
            </p>
          </div>
          <div className="mt-12">
            <AnalysisLoader />
          </div>
        </div>
      </section>
      <ExecutivePreview />
      <InteractiveWorkflow />
      <CTA />
      <Footer />
    </main>
  );
}
