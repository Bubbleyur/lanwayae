import Link from "next/link";

import { LightRays } from "@/components/ui/light-rays";
import { PlusSeparator } from "@/components/ui/plus-separator";

export default function SoonSection() {
  return (
    <main className="w-full border-separator/10 border-y">
      <div className="inner relative flex flex-col items-center border-separator/10 border-x p-4">
        <LightRays />
        <img
          src="https://res.cloudinary.com/drrleg8t2/image/upload/c_auto,h_500,w_500/WhatsApp_Image_2026-02-08_at_18.09.29_e0caxm.jpg"
          alt="Soon"
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg border border-separator/10 shadow-lg"
        />
        <p className="mx-2 mt-1 max-w-2xl text-center text-muted-foreground text-xs sm:text-sm">
          whenever you feel alone, check out my fishes, it's charming, i swear.{" "}
          <Link href="/aquarium" className="underline">
            Aquarium
          </Link>
          !
        </p>
        <PlusSeparator
          main={{
            className: "-top-[4px]",
          }}
          position={["top-left", "top-right"]}
        />
        <PlusSeparator
          main={{
            className: "-bottom-[4px]",
          }}
          position={["bottom-left", "bottom-right"]}
        />
      </div>
    </main>
  );
}
