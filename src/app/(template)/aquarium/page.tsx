import Star8 from "@/components/stars/s8";
import { Button } from "@/labs-registry/components-v1/button";
import { PlusSeparator } from "@/components/ui/plus-separator";
import { ScrollText } from "@/components/ui/scroll-text";
import Link from "next/link";
import { StackedCards } from "@/components/stack-cards";
import { LightRays } from "@/components/ui/light-rays";

export default function LabsPage() {
  return (
    <main className="bg-gradient-to-b from-background via-amber-50/25 to-background dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
      <section className="relative flex h-screen max-h-208 flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.14),transparent_30%)]" />
        <h1 className="font-bold text-5xl sm:text-7xl">
          Lan&apos;s{" "}
          <b className="font-montreal bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            Aquari
          </b>
          <b className="font-serif">um</b>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-slate-700 dark:text-slate-200/80 sm:text-3xl">
          get a{" "}
          <span className="relative bg-gradient-to-br from-primary/15 to-primary/5 px-2">
            peek
            <Star8 className="-top-4 -left-4 absolute z-30" size={32} />
            <Star8 className="-bottom-3 -right-3 absolute z-30" size={24} />
          </span>{" "}
          into my aquarium. yet still in progress.
        </p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Button size="lg" variant="default" asChild>
            <Link href="/aquarium/setup">[view docs]</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/aquarium">[view aquarium]</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-separator/10">
        <div className="inner relative flex border-x border-separator/10">
          <div className="relative w-full overflow-clip px-6 py-8">
            <div className="absolute top-0 mx-auto h-12 w-2/3 rounded-2xl bg-primary blur-[18rem]" />
            <header className="font-normal leading-tight text-slate-700 dark:text-slate-200">
              <ScrollText text="Welcome to aquarium, yet still in progress." />
            </header>
          </div>
          <PlusSeparator position={["top-left", "top-right"]} />
        </div>
      </section>

      <section className="border-t border-separator/10">
        <div className="inner relative flex border-x border-separator/10">
          <div className="w-full px-6 py-12 text-slate-500 dark:text-slate-400">
            WIP
          </div>
          <PlusSeparator position={["top-left", "top-right"]} />
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="inner relative flex flex-col items-center justify-center border-x border-white/10 py-24">
          <LightRays className="-z-10 absolute inset-0 flex items-center justify-center bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-position-[center_center] bg-size-[70px_70px]" />
          <div className="space-y-6 px-6 text-center">
            <h2 className="font-inter font-semibold text-3xl md:text-4xl">
              Make your space of code{" "}
              <b className="font-bold italic underline decoration-wavy">
                more alive
              </b>
              .
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-700 dark:text-slate-200/80">
              Create your own setup for your aquarium.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button size="lg" variant="default" asChild>
              <Link href="/aquarium/setup">[view docs]</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/aquarium">[view aquarium]</Link>
            </Button>
          </div>
          <PlusSeparator position={["top-left", "top-right"]} />
        </div>
      </section>
    </main>
  );
}
