"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import moment from "moment-timezone";

import { cn } from "@/lib/utils";
import BauhausGenerator from "@/components/portfolio/bauhaus-generator";
import { PlusSeparator } from "@/components/ui/plus-separator";

import { cva } from "class-variance-authority";
import { useThemeStore } from "@/lib/store/hero-theme";

const backgroundImageVariants = cva("", {
  variants: {
    variant: {
      contour:
        "bg-[url(/static/images/hero-background/contour_dark.svg)] bg-no-repeat bg-cover bg-position-[center_top_30svh] dark:bg-[url(/static/images/hero-background/contour_light.svg)]",
      blackhole:
        "bg-[url(/static/images/hero-background/blackhole_dark.png)] bg-no-repeat bg-cover bg-position-[center_top_3svh] dark:bg-[url(/static/images/hero-background/blackhole_light.png)]",
    },
  },
  defaultVariants: {
    variant: "contour",
  },
});

export default function HeroSection() {
  const { themes, currentThemeIndex, cycleTheme } = useThemeStore();
  const currentTheme = themes[currentThemeIndex];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background via-amber-50/25 to-background dark:via-slate-900/30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[64px_64px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

      <div
        className={cn(
          "inner relative grid min-h-[82vh] grid-cols-1 border-separator/10 border-x border-t bg-white/70 px-5 pb-10 pt-12 shadow-lg shadow-orange-500/10 backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-900/70 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8",
          backgroundImageVariants({ variant: currentTheme }),
        )}
      >
        <PlusSeparator position={["top-left", "top-right"]} />

        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-orange-600 dark:text-amber-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.6)]" />
            v1.0.0 initialized
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Engineering
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500 bg-clip-text text-transparent">
              digital systems.
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-200/80">
            Curious junior developer focused on building real-world mobile and
            web applications, designing clean systems, working with databases,
            and exploring data scraping to solve practical problems through
            code.
          </p>

          <div className="grid w-fit grid-cols-3 gap-2 text-xs font-mono text-slate-600 dark:text-slate-200">
            {["Systems design", "Full-stack", "Data tooling"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 text-center dark:border-slate-800/70 dark:bg-slate-800/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-4 rounded-3xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <Link
              href="https://time.is/Surabaya"
              target="_blank"
              className="rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs font-mono text-slate-600 shadow-sm dark:border-slate-800/60 dark:bg-slate-800/70 dark:text-slate-200"
            >
              [<LocalTime />]
            </Link>
            <button
              type="button"
              onClick={cycleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 text-xs font-mono text-slate-700 transition hover:-translate-y-[1px] hover:border-orange-500/60 hover:text-orange-600 dark:border-slate-800/70 dark:bg-slate-800/70 dark:text-slate-100"
            >
              <BauhausGenerator />
              shuffle scene
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-orange-500/10 via-amber-200/15 to-rose-500/10 p-6 text-right shadow-inner dark:border-slate-800/60 dark:from-amber-400/10 dark:via-slate-900/60 dark:to-rose-500/10">
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-200/80">
              "what began as curiosity slowly shaped how i think, build, and
              execute ideas."
            </p>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.35),transparent_40%)]" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
            <span className="rounded border border-white/30 bg-white/70 px-3 py-2 text-left dark:border-slate-800/60 dark:bg-slate-800/70">
              Jakarta live time
            </span>
            <span className="rounded border border-white/30 bg-white/70 px-3 py-2 text-left dark:border-slate-800/60 dark:bg-slate-800/70">
              adaptive themes
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-separator/10">
        <div className="inner relative m-auto border-x border-separator/10 px-4 py-3">
          <span className="flex items-center justify-between font-montreal-mono text-xs text-slate-600 dark:text-slate-300">
            stitched grid • live from Jakarta
            <span className="text-orange-600 dark:text-amber-200">
              plus‑separators aligned
            </span>
          </span>
          <PlusSeparator position={["top-left", "top-right"]} />
        </div>
      </div>
    </section>
  );
}

const LocalTime = dynamic(
  () =>
    Promise.resolve(() => {
      const [localTime, setLocalTime] = useState<string>(
        moment.tz("Asia/Jakarta").format("h:mm A"),
      );

      useEffect(() => {
        const timeInterval = setInterval(() => {
          setLocalTime(moment.tz("Asia/Jakarta").format("h:mm A"));
        }, 5000);

      return () => clearInterval(timeInterval);
      }, []);

      return <>{localTime}</>;
    }),
  { ssr: false },
);
