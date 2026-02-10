import { PathUtils } from "fumadocs-core/source";

import { HeaderBanner } from "./banner.client";
import { getProjectsData } from "@/constants/portfolio/projects";
import { ProjectCard } from "@/components/portfolio/project-card";

export default async function ProjectsPage() {
  const projectsData = await getProjectsData();
  return (
    <main className="bg-gradient-to-b from-background via-amber-50/30 to-background dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <section className="border-b border-separator/10">
        <div className="inner relative flex h-16 gap-2 border-x border-separator/10 p-2" />
      </section>
      <HeaderBanner />
      <section className="border-t border-separator/10">
        <div className="inner relative grid grid-cols-1 gap-3 border-x border-separator/10 p-3 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}

function _getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}
