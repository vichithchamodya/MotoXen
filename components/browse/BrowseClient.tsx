"use client";

import { useState, useMemo } from "react";
import { Search, LayoutGrid, List, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "./VehicleCard";
import { FilterSheet } from "./FilterSheet";
import { VEHICLES } from "@/data/vehicles";
import { SORT_OPTIONS, DEFAULT_FILTERS } from "@/constants/filters";
import { FilterState, Vehicle, SortOption } from "@/types";
import { cn } from "@/lib/utils";

export function BrowseClient() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...VEHICLES];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.title.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q),
      );
    }

    if (filters.make.length)
      result = result.filter((v) => filters.make.includes(v.make));
    if (filters.bodyType.length)
      result = result.filter((v) => filters.bodyType.includes(v.bodyType));
    if (filters.fuel.length)
      result = result.filter((v) => filters.fuel.includes(v.fuel));
    if (filters.transmission.length)
      result = result.filter((v) =>
        filters.transmission.includes(v.transmission),
      );
    if (filters.condition.length)
      result = result.filter((v) => filters.condition.includes(v.condition));

    result = result.filter(
      (v) => v.price >= filters.priceMin && v.price <= filters.priceMax,
    );

    const sortFns: Record<SortOption, (a: Vehicle, b: Vehicle) => number> = {
      newest: (a, b) =>
        new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
      price_asc: (a, b) => a.price - b.price,
      price_desc: (a, b) => b.price - a.price,
      mileage_asc: (a, b) => a.mileage - b.mileage,
      popular: (a, b) => b.views - a.views,
    };

    result.sort(sortFns[filters.sortBy]);
    return result;
  }, [query, filters]);

  const activeFilterCount = [
    ...filters.make,
    ...filters.bodyType,
    ...filters.fuel,
    ...filters.transmission,
    ...filters.condition,
  ].length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* search */}
      <div className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/60 px-4 py-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <Input
            placeholder="Search make, model, location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-10 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl focus-visible:ring-amber-500/30"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          )}
        </div>

        {/* filters */}
        <div className="flex items-center gap-2">
          <FilterSheet
            filters={filters}
            onFiltersChange={setFilters}
            resultCount={filtered.length}
          />

          {/* sort */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setFilters((f) => ({ ...f, sortBy: opt.value }))
                  }
                  className={cn(
                    "shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all duration-150",
                    filters.sortBy === opt.value
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/40"
                      : "text-zinc-500 hover:text-zinc-300",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* view toggle */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "grid" ? "bg-zinc-700" : "",
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-zinc-400" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "list" ? "bg-zinc-700" : "",
              )}
            >
              <List className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* active filters */}
        {activeFilterCount > 0 && (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {[
              ...filters.make,
              ...filters.bodyType,
              ...filters.fuel,
              ...filters.transmission,
              ...filters.condition,
            ].map((f) => (
              <span
                key={f}
                className="shrink-0 flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              >
                {f}
                <button
                  onClick={() => {
                    const keys: (keyof FilterState)[] = [
                      "make",
                      "bodyType",
                      "fuel",
                      "transmission",
                      "condition",
                    ];
                    for (const key of keys) {
                      if ((filters[key] as string[]).includes(f)) {
                        setFilters((prev) => ({
                          ...prev,
                          [key]: (prev[key] as string[]).filter((v) => v !== f),
                        }));
                        break;
                      }
                    }
                  }}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* results */}
      <div className="px-4 py-4">
        <p className="text-xs text-zinc-500 font-medium mb-3">
          {filtered.length} vehicles found
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <h3 className="font-display font-bold text-lg text-zinc-300 mb-2">
              No vehicles found
            </h3>
            <p className="text-sm text-zinc-500">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setQuery("");
                setFilters(DEFAULT_FILTERS);
              }}
              variant="outline"
              className="mt-4 border-zinc-700 text-zinc-400 hover:bg-zinc-800 rounded-xl"
            >
              Clear All
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((v) => (
              <VehicleCard key={v.id} vehicle={v} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((v) => (
              <VehicleCard key={v.id} vehicle={v} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
