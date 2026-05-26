"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X } from "lucide-react";
import {
  MAKES,
  BODY_TYPES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  CONDITION_TYPES,
  DEFAULT_FILTERS,
} from "@/constants/filters";
import { FilterState } from "@/types";
import { cn } from "@/lib/utils";

interface FilterSheetProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="font-display font-bold text-sm text-zinc-100 mb-3">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150",
                isSelected
                  ? "bg-amber-500/15 border-amber-500/60 text-amber-400"
                  : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FilterSheet({
  filters,
  onFiltersChange,
  resultCount,
}: FilterSheetProps) {
  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const activeFilterCount = [
    ...filters.make,
    ...filters.bodyType,
    ...filters.fuel,
    ...filters.transmission,
    ...filters.condition,
  ].length;

  const resetFilters = () => onFiltersChange(DEFAULT_FILTERS);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 rounded-xl h-9 px-3 gap-2 font-semibold text-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-zinc-950 text-[9px] font-black rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-zinc-900 border-zinc-800 rounded-t-3xl max-h-[85vh] overflow-y-auto"
      >
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display font-black text-lg text-zinc-50">
              Filters
            </SheetTitle>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          <FilterGroup
            title="Make"
            options={MAKES}
            selected={filters.make}
            onToggle={(v) => toggleArrayFilter("make", v)}
          />
          <Separator className="bg-zinc-800" />
          <FilterGroup
            title="Body Type"
            options={BODY_TYPES}
            selected={filters.bodyType}
            onToggle={(v) => toggleArrayFilter("bodyType", v)}
          />
          <Separator className="bg-zinc-800" />
          <FilterGroup
            title="Fuel Type"
            options={FUEL_TYPES}
            selected={filters.fuel}
            onToggle={(v) => toggleArrayFilter("fuel", v)}
          />
          <Separator className="bg-zinc-800" />
          <FilterGroup
            title="Transmission"
            options={TRANSMISSION_TYPES}
            selected={filters.transmission}
            onToggle={(v) => toggleArrayFilter("transmission", v)}
          />
          <Separator className="bg-zinc-800" />
          <FilterGroup
            title="Condition"
            options={CONDITION_TYPES}
            selected={filters.condition}
            onToggle={(v) => toggleArrayFilter("condition", v)}
          />
        </div>

        <div className="sticky bottom-0 pt-4 pb-2 bg-zinc-900 border-t border-zinc-800">
          <SheetTrigger asChild>
            <Button className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl h-12">
              Show {resultCount} Results
            </Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
