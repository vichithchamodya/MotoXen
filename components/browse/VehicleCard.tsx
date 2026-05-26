"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Fuel, Zap } from "lucide-react";
import { Vehicle } from "@/types";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  variant?: "grid" | "list";
}

const BADGE_CLASS: Record<string, string> = {
  hot: "badge-hot",
  new: "badge-new",
  reduced: "badge-reduced",
  certified: "badge-certified",
  electric: "badge-electric",
};

export function VehicleCard({ vehicle, variant = "grid" }: VehicleCardProps) {
  const [saved, setSaved] = useState(false);

  if (variant === "list") {
    return (
      <div className="relative">
        <Link
          href={`/listing/${vehicle.id}`}
          className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden card-hover p-3 pr-10"
        >
          <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
            <Image
              src={vehicle.images[0]}
              alt={vehicle.title}
              fill
              className="object-cover"
              sizes="112px"
            />
            {vehicle.badge && (
              <span
                className={cn(
                  "absolute top-1.5 left-1.5 text-[9px] font-black uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full",
                  BADGE_CLASS[vehicle.badge],
                )}
              >
                {vehicle.badge}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-zinc-500">
              {vehicle.year} · {vehicle.make}
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 truncate">
              {vehicle.model}
            </h3>
            <p className="text-amber-400 font-display font-black text-base mt-0.5">
              ${vehicle.price.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-600">
              <span className="capitalize">{vehicle.fuel}</span>
              <span>·</span>
              <span>{vehicle.mileage.toLocaleString()} mi</span>
              <span>·</span>
              <span>{vehicle.location}</span>
            </div>
          </div>
        </Link>

        <button
          onClick={() => setSaved((s) => !s)}
          className="touch-manipulation absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
          aria-label={saved ? "Remove from saved" : "Save vehicle"}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              saved ? "fill-red-500 text-red-500" : "text-zinc-500",
            )}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Link
        href={`/listing/${vehicle.id}`}
        className="block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden card-hover"
      >
        <div className="relative h-40 bg-zinc-800 overflow-hidden">
          <Image
            src={vehicle.images[0]}
            alt={vehicle.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
          {vehicle.badge && (
            <span
              className={cn(
                "absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded-full",
                BADGE_CLASS[vehicle.badge],
              )}
            >
              {vehicle.badge}
            </span>
          )}
        </div>

        <div className="p-3 pr-9">
          <p className="text-[10px] text-zinc-500">
            {vehicle.year} · {vehicle.make}
          </p>
          <h3 className="font-display font-bold text-xs text-zinc-100 leading-tight truncate">
            {vehicle.model}
          </h3>
          <p className="text-amber-400 font-display font-black text-base mt-1">
            ${vehicle.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-600">
            <span className="capitalize flex items-center gap-0.5">
              {vehicle.fuel === "electric" ? (
                <Zap className="w-2.5 h-2.5" />
              ) : (
                <Fuel className="w-2.5 h-2.5" />
              )}
              {vehicle.fuel}
            </span>
            <span>·</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5" />
              {vehicle.location}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => setSaved((s) => !s)}
        className="touch-manipulation absolute top-2 right-2 w-7 h-7 bg-zinc-900/80 rounded-full flex items-center justify-center"
        aria-label={saved ? "Remove from saved" : "Save vehicle"}
      >
        <Heart
          className={cn(
            "w-3.5 h-3.5 transition-colors",
            saved ? "fill-red-500 text-red-500" : "text-zinc-400",
          )}
        />
      </button>
    </div>
  );
}
