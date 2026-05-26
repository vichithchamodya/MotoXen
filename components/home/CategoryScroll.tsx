"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";
import { cn } from "@/lib/utils";

export function CategoryScroll() {
  const router = useRouter();
  const [active, setActive] = useState("all");

  const handleSelect = (category: (typeof CATEGORIES)[0]) => {
    setActive(category.id);
    if (category.id === "all") {
      router.push("/browse");
    } else if (category.id === "electric") {
      router.push("/browse?fuel=electric");
    } else {
      router.push(`/browse?bodyType=${category.bodyType}`);
    }
  };

  return (
    <section className="py-6 px-4 md:px-8 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-lg text-zinc-100">
          Browse by Type
        </h2>
        <button
          onClick={() => router.push("/browse")}
          className="text-xs text-amber-500 hover:text-amber-400 font-semibold touch-manipulation"
        >
          View All
        </button>
      </div>

      <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 pb-1 max-w-full">
        {CATEGORIES.map((cat) => {
          const sharpImage = cat.image.replace("w=80", "w=400");

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat)}
              className={cn(
                "relative w-20 h-24 md:w-56 md:h-44 shrink-0 rounded-xl md:rounded-2xl overflow-hidden border transition-all duration-200 active:scale-95 touch-manipulation",
                active === cat.id
                  ? "border-amber-500/70 ring-1 ring-amber-500/40"
                  : "border-zinc-800 hover:border-zinc-600",
              )}
            >
              <Image
                src={sharpImage}
                alt={cat.label}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 144px, 80px"
              />

              <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 bg-linear-to-t from-black via-zinc-950/70 to-transparent" />

              {active === cat.id && (
                <div className="absolute inset-0 bg-amber-500/10" />
              )}

              <div className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5 md:px-3 md:pb-3 flex flex-col gap-0 md:gap-0.5">
                <span
                  className={cn(
                    "text-[10px] md:text-sm font-bold leading-tight text-left truncate",
                    active === cat.id ? "text-amber-400" : "text-zinc-100",
                  )}
                >
                  {cat.label}
                </span>
                <span className="text-[9px] md:text-xs text-zinc-400 font-medium text-left">
                  {cat.count} listed
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
