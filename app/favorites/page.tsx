"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { VehicleCard } from "@/components/browse/VehicleCard";
import { VEHICLES } from "@/data/vehicles";
import { Button } from "@/components/ui/button";

const savedVehicles = VEHICLES.slice(0, 4);

export default function FavoritesPage() {
  const router = useRouter();

  return (
    <>
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-5">
          <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h1 className="font-display font-black text-xl text-zinc-50">
            Saved Vehicles
          </h1>
          <span className="ml-auto text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-full px-2.5 py-0.5 font-semibold">
            {savedVehicles.length}
          </span>
        </div>

        {savedVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="w-12 h-12 text-zinc-700 mb-4" />
            <h3 className="font-display font-bold text-lg text-zinc-300 mb-2">
              Nothing saved yet
            </h3>
            <p className="text-sm text-zinc-500 mb-5">
              Tap the heart icon on any listing to save it here.
            </p>
            <Button
              onClick={() => router.push("/browse")}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl"
            >
              Browse Vehicles
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {savedVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
