"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Eye,
  ShieldCheck,
  MessageCircle,
  Phone,
  Fuel,
  Gauge,
  Calendar,
  Settings2,
  Star,
  Check,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Vehicle } from "@/types";
import { getRelatedVehicles } from "@/data/vehicles";
import { VehicleCard } from "@/components/browse/VehicleCard";
import { cn } from "@/lib/utils";

interface ListingDetailClientProps {
  vehicle: Vehicle;
}

export function ListingDetailClient({ vehicle }: ListingDetailClientProps) {
  const router = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const related = getRelatedVehicles(vehicle);

  const specs = [
    { label: "Year", value: String(vehicle.year), icon: Calendar },
    {
      label: "Mileage",
      value: `${vehicle.mileage.toLocaleString()} mi`,
      icon: Gauge,
    },
    {
      label: "Fuel",
      value: vehicle.fuel,
      icon: vehicle.fuel === "electric" ? Zap : Fuel,
    },
    { label: "Gearbox", value: vehicle.transmission, icon: Settings2 },
    ...(vehicle.horsepower
      ? [{ label: "Power", value: `${vehicle.horsepower} hp`, icon: Zap }]
      : []),
    ...(vehicle.engine
      ? [{ label: "Engine", value: vehicle.engine, icon: Settings2 }]
      : []),
    ...(vehicle.driveType
      ? [{ label: "Drive", value: vehicle.driveType, icon: Settings2 }]
      : []),
    ...(vehicle.seats
      ? [{ label: "Seats", value: String(vehicle.seats), icon: Settings2 }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Image Gallery */}
      <div className="relative h-64 sm:h-80 bg-zinc-900 overflow-hidden">
        <Image
          src={vehicle.images[imgIndex]}
          alt={vehicle.title}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-zinc-950/40" />

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-100" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className="w-9 h-9 bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  saved ? "fill-red-500 text-red-500" : "text-zinc-300",
                )}
              />
            </button>
            <button className="w-9 h-9 bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share2 className="w-4 h-4 text-zinc-300" />
            </button>
          </div>
        </div>

        {/* Image navigation */}
        {vehicle.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setImgIndex(
                  (i) =>
                    (i - 1 + vehicle.images.length) % vehicle.images.length,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900/70 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4 text-zinc-100" />
            </button>
            <button
              onClick={() =>
                setImgIndex((i) => (i + 1) % vehicle.images.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900/70 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 text-zinc-100" />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {vehicle.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === imgIndex ? "w-5 bg-amber-400" : "w-1.5 bg-zinc-500",
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-32">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            {vehicle.badge && (
              <span
                className={cn(
                  "inline-block text-[10px] font-black uppercase tracking-widest text-white px-2.5 py-0.5 rounded-full mb-2",
                  {
                    "badge-hot": vehicle.badge === "hot",
                    "badge-new": vehicle.badge === "new",
                    "badge-reduced": vehicle.badge === "reduced",
                    "badge-certified": vehicle.badge === "certified",
                    "badge-electric": vehicle.badge === "electric",
                  } as Record<string, boolean>,
                )}
              >
                {vehicle.badge}
              </span>
            )}
            <h1 className="font-display font-black text-2xl text-zinc-50 leading-tight">
              {vehicle.year} {vehicle.make}
              <br />
              {vehicle.model}
            </h1>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-2 mb-3">
          <span className="font-display font-black text-3xl text-amber-400">
            ${vehicle.price.toLocaleString()}
          </span>
          {vehicle.originalPrice && (
            <span className="text-zinc-600 text-base font-medium line-through">
              ${vehicle.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {vehicle.location}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {vehicle.views.toLocaleString()} views
          </span>
          <span>·</span>
          <span>Posted {vehicle.postedAt}</span>
        </div>

        <Separator className="bg-zinc-800 my-4" />

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="bg-zinc-900 border border-zinc-800 rounded-xl w-full mb-4 p-1 h-auto">
            {["overview", "features", "seller"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-lg capitalize text-xs font-semibold data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950 data-[state=inactive]:text-zinc-500 h-8"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-sm text-zinc-300 mb-3 uppercase tracking-wider">
                Key Specs
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-xl p-3"
                  >
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                      <spec.icon className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-600 capitalize">
                        {spec.label}
                      </p>
                      <p className="text-xs font-semibold text-zinc-200 capitalize">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-sm text-zinc-300 mb-2 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {vehicle.description}
              </p>
            </div>
          </TabsContent>

          {/* Features */}
          <TabsContent value="features">
            <div className="grid grid-cols-1 gap-2">
              {vehicle.features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 py-2.5 border-b border-zinc-800/60 last:border-0"
                >
                  <div className="w-5 h-5 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-amber-400" />
                  </div>
                  <span className="text-sm text-zinc-300 font-medium">{f}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Seller */}
          <TabsContent value="seller">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center">
                  <span className="font-display font-black text-lg text-amber-400">
                    {vehicle.sellerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-display font-bold text-sm text-zinc-100">
                      {vehicle.sellerName}
                    </p>
                    {vehicle.sellerVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3 h-3",
                          i < Math.floor(vehicle.sellerRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-700",
                        )}
                      />
                    ))}
                    <span className="text-xs text-zinc-500 ml-1">
                      {vehicle.sellerRating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-zinc-800/60 rounded-xl p-2.5 text-center">
                  <p className="font-bold text-zinc-100">
                    {vehicle.sellerListings}
                  </p>
                  <p className="text-zinc-600">Listings</p>
                </div>
                <div className="bg-zinc-800/60 rounded-xl p-2.5 text-center">
                  <p className="font-bold text-zinc-100">
                    {vehicle.sellerResponseTime}
                  </p>
                  <p className="text-zinc-600">Response Time</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-6">
            <h3 className="font-display font-bold text-base text-zinc-100 mb-3">
              Similar Vehicles
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {related.slice(0, 4).map((v) => (
                <VehicleCard key={v.id} vehicle={v} variant="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom actions */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-3 pt-2 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/60 z-40">
        <div className="flex gap-2 max-w-lg mx-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-xl h-11 gap-2 font-semibold"
              >
                <Phone className="w-4 h-4" />
                Call
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 rounded-3xl max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle className="font-display font-black text-zinc-50">
                  Contact Seller
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <p className="text-sm text-zinc-400">
                  Contact{" "}
                  <strong className="text-zinc-200">
                    {vehicle.sellerName}
                  </strong>{" "}
                  about the {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl h-11">
                  <Phone className="w-4 h-4 mr-2" /> +94 77 123 4567
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl h-11 gap-2">
            <MessageCircle className="w-4 h-4" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
}
