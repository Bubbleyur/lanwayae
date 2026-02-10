import HeroSection from "./hero";
import AboutSection from "./about";
import ProjectSection from "./projects";
import { PlusSeparator } from "@/components/ui/plus-separator";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-background via-amber-50/30 to-background dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <section className="border-t border-separator/10">
        <div className="inner relative flex h-24 items-center justify-center border-x border-separator/10 text-xs text-slate-500 dark:text-slate-400">
          stitched for exploration
          <PlusSeparator position={["top-left", "top-right"]} />
        </div>
      </section>
    </main>
  );
}
