import { ProjectCard } from "@/components/portfolio/project-card";
import { PlusSeparator } from "@/components/ui/plus-separator";
import { getProjectsData } from "@/constants/portfolio/projects";

import Link from "next/link";
import { CloudflareImage } from "@/components/image";

export default async function ProjectSection() {
  const projectsData = await getProjectsData();
  return (
    <main className="w-full border-separator/10 border-t">
      <div className="inner relative flex border-separator/10 border-x">
        <div className="hidden flex-col lg:flex">
          <div className="size-8 border-separator/10 border-r border-b sm:size-14"></div>
          <div className="grow border-separator/10 border-r"></div>
          <div className="size-8 border-separator/10 border-t border-r sm:size-14"></div>
        </div>
        <div className="flex grow flex-col">
          <div className="flex w-full">
            <div className="size-8 border-separator/10 border-r border-b sm:size-14"></div>
            <div className="hidden size-8 border-separator/10 border-r border-b sm:size-14 lg:block"></div>
            <div className="grow border-separator/10 border-b"></div>
            <div className="hidden size-8 border-separator/10 border-b border-l sm:size-14 lg:block"></div>
            <div className="size-8 border-separator/10 border-b border-l sm:size-14"></div>
          </div>
          <div className="group relative flex flex-col justify-center gap-4 overflow-hidden px-5 py-8 sm:px-10 md:px-18">
            <h1 className="absolute top-0 left-0 font-mono text-xs text-sys-accent border border-sys-accent/30 bg-sys-accent/10 px-2 py-1">
              <span className="text-sys-accent">./PORTFOLIO/PROJECTS.MD</span>
            </h1>
            <CloudflareImage
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Dither"
              category="assets"
              height={400}
              width={1000}
              className="-z-10 absolute top-0 left-0 h-full w-full object-cover object-right opacity-30 invert dark:invert-0"
              fetchPriority="low"
            />
            <h2 className="bg-linear-to-b from-foreground to-foreground/50 bg-clip-text font-montreal font-semibold text-transparent text-xl sm:text-2xl lg:text-3xl">
              the projects i've built
            </h2>
            <p className="max-w-[600px] text-xs leading-3.5 sm:text-sm sm:leading-6 md:text-base">
              here are some of the projects I&apos;ve worked on, showcasing my
              skills and passion for software development. each project reflects
              my commitment to creating impactful solutions and continuous
              learning.
            </p>
          </div>
          <div className="flex w-full">
            <div className="size-8 border-separator/10 border-t border-r sm:size-14"></div>
            <div className="hidden size-8 border-separator/10 border-t border-r sm:size-14 lg:block"></div>
            <div className="grow border-separator/10 border-t"></div>
            <div className="hidden size-8 border-separator/10 border-t border-l sm:size-14 lg:block"></div>
            <div className="size-8 border-separator/10 border-t border-l sm:size-14"></div>
          </div>
        </div>
        <div className="hidden flex-col lg:flex">
          <div className="size-8 border-separator/10 border-b border-l sm:size-14"></div>
          <div className="grow border-separator/10 border-l"></div>
          <div className="size-8 border-separator/10 border-t border-l sm:size-14"></div>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[70%] w-full bg-linear-to-b from-transparent to-background"></div>
        <PlusSeparator position={["top-left", "top-right"]} />
      </div>
      <div className="inner relative border-separator/10 border-x p-2">
        <section className="relative grid grid-cols-1 gap-2 md:grid-cols-2">
          {projectsData.slice(0, 4).map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              classNames={{
                container:
                  idx === 2
                    ? "md:max-h-full md:-mb-[30%] md:pointer-events-none md:overflow-h-hidden md:border-b-transparent"
                    : idx === 3
                      ? "max-h-full -mb-[30%] pointer-events-none overflow-h-hidden border-b-transparent"
                      : "",
              }}
            />
          ))}
          <div className="absolute right-0 bottom-0 left-0 h-64 w-full bg-linear-to-b from-transparent to-background"></div>
        </section>
        <section className="flex flex-col items-center justify-center py-8">
          <p>check out more projects at</p>
          <Link
            href="/projects"
            className="font-mono text-blue-600 hover:underline dark:text-blue-400"
          >
            [/projects]
          </Link>
        </section>
      </div>
    </main>
  );
}
