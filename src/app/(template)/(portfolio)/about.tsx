"use client";
import { useEffect, useState } from "react";
import useSWR from "swr/immutable";

import { PlusSeparator } from "@/components/ui/plus-separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { wakaTimeData } from "@/lib/actions/wakatime";
import { getLanyardData } from "@/lib/actions/lanyard";
import { cn } from "@/lib/utils";

import Link from "next/link";
import dynamic from "next/dynamic";
import { CloudflareImage } from "@/components/image";

const SkillsSection = dynamic(() => import("./about-skills"), { ssr: false });

export default function AboutSection() {
  const wakatimeStats = useSWR("wakatime", wakaTimeData);
  const lanyard = useSWR("lanyard", () => getLanyardData("632142872577048577"), {
    refreshInterval: 5000,
  });

  const [age, setAge] = useState(ageCalc());

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(ageCalc());
    }, 75);

    return () => clearInterval(interval);
  }, []);

  const getBirthdayCountdown = () => {
    const nextBirthdayAge = Math.ceil(age);
    const timeLeftInYears = nextBirthdayAge - age;
    const timeLeftInMs = timeLeftInYears * (1000 * 60 * 60 * 24 * 365.25);

    const days = Math.floor(timeLeftInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeftInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeLeftInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeftInMs % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <main className="w-full border-separator/10 border-t">
        <div className="inner relative flex h-full flex-col border-separator/10 border-x px-2 text-sm sm:px-4 sm:text-base xl:flex-row xl:justify-between xl:px-8">
          <div className="py-24 xl:max-w-7/11">
            <h1 className="absolute top-0 left-0 font-mono text-xs text-sys-accent border border-sys-accent/30 bg-sys-accent/10 px-2 py-1">
              <span className="text-sys-accent">./PORTFOLIO/ABOUT.MD</span>
            </h1>
            <p>
              i'm LanWayae — real name Alan. i'm a{" "}
              <Tooltip>
                <TooltipTrigger className="underline decoration-dashed">
                  {Math.floor(age)}-year-old
                </TooltipTrigger>
                <TooltipContent>
                  <p>{age.toFixed(9)}</p>
                </TooltipContent>
              </Tooltip>{" "}
              student who learned software engineering on my own. i've been messing around
              with computers since i was younger, mostly out of curiosity, and it slowly
              turned into something i really enjoy. now, i like building things purely with
              code, experimenting, breaking stuff, and learning from it. i'm always trying
              to improve and pick up new technologies along the way.
            </p>
            <br />
            <p>
              I started coding by experimenting with Node.js and tweaking small projects
              until they worked. Over time, coding became a habit — a way to structure ideas
              and turn abstract thoughts into something real.
              <br />
              <br />
              Even now, I keep coming back to it. Execution is where ideas stop being just
              ideas.
              <br />
              <br />
              since then, i've spent over{" "}
              <Tooltip open={wakatimeStats.isLoading ? false : undefined}>
                <TooltipTrigger
                  className={cn(
                    "cursor-pointer underline decoration-dashed",
                    wakatimeStats.isLoading &&
                      "animate-pulse rounded-md bg-accent text-accent",
                  )}
                  onClick={() => {
                    window.open("https://wakatime.com/@hexaaagon", "_blank");
                  }}
                >
                  {wakatimeStats.isLoading
                    ? "xxxx"
                    : (
                        Math.floor(
                          (wakatimeStats.data?.total_seconds || 0) / 60 / 60,
                        ) / 1000
                      ).toFixed(3)}{" "}
                  hours
                  <span className="sr-only">WakaTime profile</span>
                </TooltipTrigger>
                <TooltipContent className="text-center">
                  <p>{wakatimeStats.data?.human_readable_total}</p>
                  <p>click to open my wakatime profile</p>
                </TooltipContent>
              </Tooltip>{" "}
              coding, experimenting, and solving problems. coming from a gaming background,
              coding felt like a way to “hack the world” — slowly shifting my hobby from
              playing games into building systems, apps, and solutions to real problems.
            </p>
          </div>
          <div className="relative my-2 mx-auto flex flex-col gap-2 w-full max-w-sm items-center justify-center md:mb-6 lg:mb-12 xl:mb-0">
            <div className="flex flex-col justify-between rounded-xs border bg-muted/50 p-4 shadow-sm dark:bg-muted/20">
              <h2 className="font-semibold text-lg">philosophy</h2>
              <p className="mt-1 leading-tight">
                I believe ideas matter only when they’re executed.
                I explore by breaking things, tweaking systems, and rebuilding them cleaner.
                Coding is how I turn curiosity into structure, and thoughts into something real.
              </p>
              <Link
                href="/about"
                className="mt-2 font-mono text-blue-600 text-sm hover:underline dark:text-blue-400"
              >
                [/about]
              </Link>
            </div>
            <div className="flex flex-col w-full justify-between rounded-xs border bg-muted/50 p-4 shadow-sm dark:bg-muted/20">
              <h2 className="font-semibold text-lg">personality</h2>
              <p className="mt-1 leading-tight">
                ENTP-A
                <br />
                curious, expressive, idea-driven
                <br />
                likes exploring systems & possibilities
                <br />
                sometimes chaotic, but always learning
              </p>
              <Link
                href="https://www.16personalities.com/entp-personality"
                className="mt-2 font-mono text-blue-600 text-sm hover:underline dark:text-blue-400"
              >
                [/16personalities]
              </Link>
            </div>
            <div className="flex flex-col w-full justify-between rounded-xs border bg-muted/50 p-4 shadow-sm dark:bg-muted/20">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">activity</h2>
                {lanyard.data && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        lanyard.data.data.discord_status === "online" &&
                          "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
                        lanyard.data.data.discord_status === "idle" &&
                          "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]",
                        lanyard.data.data.discord_status === "dnd" &&
                          "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
                        lanyard.data.data.discord_status === "offline" && "bg-gray-500",
                      )}
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {lanyard.data.data.discord_status}
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-1">
                shows what i'm currently focused on
                <br />
                mostly dev tools, editors, or projects
              </p>
              <div className="mt-1 flex flex-col gap-2">
                {lanyard.isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded bg-muted-foreground/10" />
                    <div className="flex flex-col gap-1">
                      <div className="h-3 w-20 animate-pulse rounded bg-muted-foreground/10" />
                      <div className="h-3 w-28 animate-pulse rounded bg-muted-foreground/10" />
                    </div>
                  </div>
                ) : lanyard.data?.data.listening_to_spotify ? (
                  <div className="flex items-center gap-3">
                    {lanyard.data.data.spotify?.album_art_url ? (
                      <img
                        src={lanyard.data.data.spotify.album_art_url}
                        alt={lanyard.data.data.spotify.album}
                        className="h-10 w-10 rounded shadow-sm"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted-foreground/10" />
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <p className="truncate font-medium text-sm leading-none">
                        listening to spotify
                      </p>
                      <p className="mt-1 truncate text-muted-foreground text-xs leading-none">
                        {lanyard.data.data.spotify?.song}
                      </p>
                      <p className="mt-1 truncate text-muted-foreground/80 text-[10px] leading-none">
                        by {lanyard.data.data.spotify?.artist}
                      </p>
                    </div>
                  </div>
                ) : lanyard.data?.data.activities.find((a) => a.type === 0) ? (
                  (() => {
                    const game = lanyard.data.data.activities.find((a) => a.type === 0);
                    return (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted-foreground/10">
                          <span className="text-xl">👾</span>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <p className="truncate font-medium text-sm leading-none">
                            playing {game?.name}
                          </p>
                          {game?.details && (
                            <p className="mt-1 truncate text-muted-foreground text-xs leading-none">
                              {game.details}
                            </p>
                          )}
                          {game?.state && (
                            <p className="mt-1 truncate text-muted-foreground/80 text-[10px] leading-none">
                              {game.state}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-2 w-2 rounded-full border border-muted-foreground/30" />
                    <p className="text-muted-foreground text-xs italic">
                      staring at the screen...
                    </p>
                  </div>
                )}
              </div>
              <Link
                href="https://discord.com/users/632142872577048577"
                className="mt-2 font-mono text-blue-600 text-sm hover:underline dark:text-blue-400"
              >
                [/discord]
              </Link>
            </div>
          </div>
          <PlusSeparator position={["top-left", "top-right"]} />
        </div>
      </main>

      <div className="border-separator/10 border-t">
        <div className="inner relative m-auto border-separator/10 border-x p-4">
          <span className="relative flex items-center justify-between font-montreal-mono text-xs opacity-90 transition-opacity duration-300 dark:opacity-75">
            left until birthday
            <p>{getBirthdayCountdown()}</p>
          </span>
          <PlusSeparator position={["top-left", "top-right"]} />
        </div>
      </div>

      <SkillsSection />
    </>
  );
}

export function ageCalc() {
  const birthDate = new Date("2007-07-18T00:00:00+07:00");
  const now = new Date();

  const ageInMilliseconds = now.getTime() - birthDate.getTime();
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return ageInYears;
}
