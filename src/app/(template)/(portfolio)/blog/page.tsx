import { PathUtils } from "fumadocs-core/source";
import { blog } from "@/lib/source";

import { PlusSeparator } from "@/components/ui/plus-separator";
import Link from "next/link";
import { HeaderBanner } from "./banner.client";
import Image from "next/image";
import { getBlogPageImage } from "@/lib/metadata";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const posts = [...blog.getPages()]
    .filter((blog) => !blog.data.subpage)
    .sort(
      (a, b) =>
        new Date(b.data.date ?? getName(b.path)).getTime() -
        new Date(a.data.date ?? getName(a.path)).getTime(),
    );

  return (
    <main className="bg-gradient-to-b from-background via-amber-50/25 to-background dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <section className="border-y border-separator/10">
        <div className="inner relative flex h-16 gap-2 border-x border-separator/10" />
      </section>
      <HeaderBanner />
      <section className="border-b border-separator/10">
        <div className="inner relative grid grid-cols-1 gap-4 border-x border-separator/10 px-3 py-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.url}
              href={post.url}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-lg transition hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-amber-300/20 dark:border-slate-800/60 dark:bg-slate-900/70"
            >
              <span className="relative h-52 w-full overflow-hidden">
                <Image
                  src={post.data.image || getBlogPageImage(post).url}
                  alt={post.data.title}
                  fill
                  className={cn(
                    "object-cover transition duration-500 group-hover:scale-105",
                    !post.data.image && "invert-100 dark:invert-0",
                  )}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent" />
              </span>
              <div className="space-y-2 px-6 pb-6 pt-4">
                <p className="text-lg font-semibold leading-5">
                  {post.data.title}
                </p>
                <p className="text-sm leading-5 text-fd-muted-foreground">
                  {post.data.description}
                </p>
                <span className="mt-3 flex items-center justify-between">
                  <span className="inline-flex text-brand text-xs">
                    {(post.data.hashtags ?? []).map((tag, idx) => (
                      <span key={tag} className="inline-flex h-4 items-center">
                        <p>{tag}</p>
                        {idx !== (post.data.hashtags?.length ?? 0) - 1 && (
                          <Separator orientation="vertical" className="mx-2" />
                        )}
                      </span>
                    ))}
                  </span>
                  <p className="text-brand text-xs">
                    {new Date(
                      post.data.date ?? getName(post.path),
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </span>
              </div>
            </Link>
          ))}
          <PlusSeparator
            position={["bottom-left", "bottom-right"]}
            main={{ className: "z-20" }}
          />
        </div>
      </section>
    </main>
  );
}

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}
