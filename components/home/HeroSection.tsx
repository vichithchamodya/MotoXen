"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appconfig } from "@/constants/config";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/browse?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden hero-bg grid-pattern w-full">
      {/* Decorative amber orb */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-8 pt-8 pb-12 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto">
        {/* Label */}
        <div
          className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 mb-6 animate-fade-up"
          style={{ opacity: 0 }}
        >
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-zinc-300 tracking-wide">
            12,000+ vehicles available now
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-4 animate-fade-up delay-100"
          style={{ opacity: 0 }}
        >
          <span className="text-zinc-50">FIND</span>
          <br />
          <span className="text-zinc-50">YOUR</span>
          <br />
          <span className="gradient-text">PERFECT</span>
          <br />
          <span className="text-zinc-50">RIDE.</span>
        </h1>

        <p
          className="text-zinc-400 text-base sm:text-lg md:text-xl mb-8 leading-relaxed animate-fade-up delay-200"
          style={{ opacity: 0 }}
        >
          Buy & sell premium vehicles with verified sellers,
          <br className="hidden sm:block" />
          transparent pricing, and zero compromises.
        </p>

        {/* Search Bar */}
        <div
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2 md:p-4 shadow-2xl shadow-black/50 animate-fade-up delay-300"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <Input
                placeholder="Search make, model, keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-transparent border-0 focus-visible:ring-0 text-zinc-100 placeholder:text-zinc-600 h-11"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl h-11 px-5 shrink-0 transition-all duration-200 active:scale-95"
            >
              Search
            </Button>
          </div>

          {/* Quick filters */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-800 overflow-x-auto scrollbar-hide">
            <span className="text-xs text-zinc-600 shrink-0">Quick:</span>
            {["BMW", "Tesla", "Porsche", "SUV", "Electric"].map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/browse?q=${tag}`)}
                className="text-xs text-zinc-400 hover:text-amber-400 bg-zinc-800 hover:bg-zinc-700 rounded-lg px-2.5 py-1 shrink-0 transition-all duration-150 font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 mt-5 animate-fade-up delay-400"
          style={{ opacity: 0 }}
        >
          <Button
            variant="outline"
            onClick={() => router.push("/browse")}
            className="flex-1 bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 rounded-xl h-11 font-semibold"
          >
            Browse All
          </Button>
          <Button
            onClick={() => router.push("/sell")}
            variant="outline"
            className="flex-1 bg-transparent border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 rounded-xl h-11 font-semibold"
          >
            Sell Your Car
          </Button>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 mt-8 animate-fade-up delay-400 max-w-3xl md:max-w-5xl xl:max-w-6xl mx-auto"
          style={{ opacity: 0 }}
        >
          {appconfig.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-xl text-amber-400">
                {stat.value}
                <span className="text-sm">{stat.suffix}</span>
              </div>
              <div className="text-[10px] text-zinc-600 leading-tight mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 animate-bounce">
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
