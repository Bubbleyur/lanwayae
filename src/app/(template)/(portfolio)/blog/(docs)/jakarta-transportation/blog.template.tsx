import path from "node:path";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { InlineTOC } from "@/components/markdown/inline-toc";
import { getMDXComponents } from "@/components/markdown/mdx-components";
import { blog } from "@/lib/source";
import { cn } from "@/lib/utils";
import { ShareButton } from "../(template)/[slug]/page.client";

export type JakartaTransportBlogTemplateProps = Omit<
  ComponentProps<"article">,
  "children"
> & {
  currentLine: string;
  components: MDXComponents;
};

export async function JakartaTransportBlogTemplate({
  currentLine,
  components,
  className,
  ...props
}: JakartaTransportBlogTemplateProps) {
  const page = blog.getPage(
    currentLine
      ? ["jakarta-transportation", currentLine]
      : ["jakarta-transportation"],
  );

  // just type checking, should not be possible to reach here
  if (!page) {
    return null;
  }

  const { body, toc } = await page.data.load();

  return (
    <article
      className={cn(
        "prose prose-slate dark:prose-invert mx-auto max-w-4xl px-6 py-10 rounded-3xl border border-slate-200/60 bg-white/85 shadow-xl backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-900/70",
        className,
      )}
      {...props}
    >
      {!currentLine && (
        <>
          <section className="not-prose mb-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 via-amber-400 to-rose-500 shadow-md" />
              <div className="leading-tight">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Jakarta Transit Log
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Notes on moving through the city
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2 rounded-full border border-slate-200/70 bg-slate-50/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live Route
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="text-right text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  <p>Written by</p>
                  <p>At</p>
                </div>
                <div className="font-medium text-slate-900 dark:text-slate-50">
                  <p>{page.data.author}</p>
                  <p>
                    {new Date(
                      page.data.date ??
                        path.basename(page.path, path.extname(page.path)),
                    ).toDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-800/60">
                <ShareButton
                  url={`/blog/jakarta-transportation?line=${page.url
                    .split("/")
                    .pop()}`}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                  Share
                </span>
              </div>
            </div>
          </section>

          <h1 className="not-prose mb-4 text-4xl font-semibold leading-tight text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500 bg-clip-text text-transparent">
              {page.data.title}
            </span>
          </h1>

          <InlineTOC
            items={toc}
            className="not-prose mt-2 mb-6 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/60 lg:sticky lg:top-6"
          />
        </>
      )}
      {body({ components: getMDXComponents(components) })}
    </article>
  );
}
