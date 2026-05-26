"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Fuel, Gauge } from "lucide-react";
import { getFeaturedVehicles } from "@/data/vehicles";
import { Vehicle } from "@/types";
import { cn } from "@/lib/utils";

const BADGE_CLASS: Record<string, string> = {
  hot: "badge-hot",
  new: "badge-new",
  reduced: "badge-reduced",
  certified: "badge-certified",
  electric: "badge-electric",
};

function FeaturedCard({ vehicle }: { vehicle: Vehicle }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative w-64 sm:w-72 shrink-0">
      <Link
        href={`/listing/${vehicle.id}`}
        className="block bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden card-hover"
      >
        <div className="relative h-44 overflow-hidden bg-zinc-800">
          <Image
            src={vehicle.images[0]}
            alt={vehicle.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="288px"
          />
          {vehicle.badge && (
            <span
              className={cn(
                "absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest text-white px-2.5 py-1 rounded-full",
                BADGE_CLASS[vehicle.badge],
              )}
            >
              {vehicle.badge}
            </span>
          )}
          <span className="absolute bottom-3 right-3 bg-zinc-900/80 text-[10px] font-semibold text-zinc-300 uppercase tracking-wider px-2 py-1 rounded-full">
            {vehicle.condition}
          </span>
        </div>

        <div className="p-4 pr-10">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-500 font-medium">
              {vehicle.year} · {vehicle.make}
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 leading-tight truncate">
              {vehicle.model}
            </h3>
          </div>

          <div className="text-amber-400 font-display font-black text-xl mt-1 mb-3">
            ${vehicle.price.toLocaleString()}
            {vehicle.originalPrice && (
              <span className="text-zinc-600 text-sm font-medium line-through ml-2">
                ${vehicle.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Fuel className="w-3 h-3 text-zinc-600" />
              <span className="capitalize">{vehicle.fuel}</span>
            </span>
            <span className="w-px h-3 bg-zinc-800" />
            <span className="flex items-center gap-1">
              <Gauge className="w-3 h-3 text-zinc-600" />
              {vehicle.mileage.toLocaleString()} mi
            </span>
            <span className="w-px h-3 bg-zinc-800" />
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-600" />
              {vehicle.location}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => setSaved((s) => !s)}
        className="touch-manipulation absolute top-3 right-3 w-8 h-8 bg-zinc-900/80 rounded-full flex items-center justify-center"
        aria-label={saved ? "Remove from saved" : "Save vehicle"}
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors",
            saved ? "fill-red-500 text-red-500" : "text-zinc-400",
          )}
        />
      </button>
    </div>
  );
}

export function FeaturedListings() {
  return (
    <section className="py-6 px-4 md:px-8 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-display font-bold text-lg text-zinc-100">
            Featured Rides
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Handpicked premium vehicles
          </p>
        </div>
        <Link
          href="/browse?featured=true"
          className="text-xs text-amber-500 hover:text-amber-400 font-semibold touch-manipulation"
        >
          See All
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 pb-2 max-w-full">
        {getFeaturedVehicles().map((vehicle) => (
          <FeaturedCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
