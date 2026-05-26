"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HOW_IT_WORKS_STEPS } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const router = useRouter();
  const [tab, setTab] = useState<"buying" | "selling">("buying");

  const steps = HOW_IT_WORKS_STEPS[tab];

  return (
    <section className="py-10 px-4 md:px-8 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">
          HOW IT WORKS
        </p>
        <h2 className="font-display font-black text-2xl text-zinc-50 leading-tight">
          Simple. Fast.
          <br />
          Transparent.
        </h2>
      </div>

      {/* tabs */}
      <div className="flex bg-zinc-900 rounded-2xl p-1 mb-6 border border-zinc-800">
        {(["buying", "selling"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-200",
              tab === t
                ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            I&apos;m {t === "buying" ? "Buying" : "Selling"}
          </button>
        ))}
      </div>

      {/* steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800 h-full"
          >
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center shrink-0">
              <span className="font-display font-black text-amber-400 text-sm">
                {step.number}
              </span>
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-zinc-100 mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* cta */}
      <Button
        onClick={() => router.push(tab === "buying" ? "/browse" : "/sell")}
        className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl h-12 transition-all duration-200 active:scale-[0.98]"
      >
        {tab === "buying" ? "Browse Vehicles" : "List My Vehicle"}
      </Button>
    </section>
  );
}
