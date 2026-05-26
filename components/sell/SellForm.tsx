"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Camera, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MAKES,
  BODY_TYPES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  CONDITION_TYPES,
} from "@/constants/filters";
import { cn } from "@/lib/utils";

const STEPS = ["Vehicle Info", "Details", "Pricing", "Review"];

interface FormData {
  make: string;
  model: string;
  year: string;
  bodyType: string;
  fuel: string;
  transmission: string;
  condition: string;
  mileage: string;
  color: string;
  location: string;
  price: string;
  description: string;
  features: string;
}

const INITIAL: FormData = {
  make: "",
  model: "",
  year: "",
  bodyType: "",
  fuel: "",
  transmission: "",
  condition: "",
  mileage: "",
  color: "",
  location: "",
  price: "",
  description: "",
  features: "",
};

function PickerGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
        {label}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150",
              value === opt.value
                ? "bg-amber-500/15 border-amber-500/60 text-amber-400"
                : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SellForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/"), 2500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-20 h-20 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mb-5">
          <Check className="w-10 h-10 text-amber-400" />
        </div>
        <h2 className="font-display font-black text-2xl text-zinc-50 mb-2">
          Listing Submitted!
        </h2>
        <p className="text-zinc-400 text-sm">
          Your vehicle will be live shortly after review.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 transition-all",
                i < step
                  ? "bg-amber-500 text-zinc-950"
                  : i === step
                    ? "bg-amber-500/20 border border-amber-500/60 text-amber-400"
                    : "bg-zinc-800 text-zinc-600",
              )}
            >
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 transition-all",
                  i < step ? "bg-amber-500" : "bg-zinc-800",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <h2 className="font-display font-black text-xl text-zinc-50 mb-1">
        {STEPS[step]}
      </h2>
      <p className="text-xs text-zinc-500 mb-5">
        Step {step + 1} of {STEPS.length}
      </p>

      {/* Step 0: Vehicle Info */}
      {step === 0 && (
        <div className="space-y-4">
          <PickerGroup
            label="Make"
            options={MAKES}
            value={form.make}
            onChange={(v) => set("make", v)}
          />
          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Model
            </Label>
            <Input
              placeholder="e.g. M4 Competition"
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl focus-visible:ring-amber-500/30"
            />
          </div>
          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Year
            </Label>
            <Input
              type="number"
              placeholder="e.g. 2022"
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
              min={2000}
              max={2025}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl focus-visible:ring-amber-500/30"
            />
          </div>
          <PickerGroup
            label="Body Type"
            options={BODY_TYPES}
            value={form.bodyType}
            onChange={(v) => set("bodyType", v)}
          />
        </div>
      )}

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="space-y-4">
          <PickerGroup
            label="Fuel Type"
            options={FUEL_TYPES}
            value={form.fuel}
            onChange={(v) => set("fuel", v)}
          />
          <PickerGroup
            label="Transmission"
            options={TRANSMISSION_TYPES}
            value={form.transmission}
            onChange={(v) => set("transmission", v)}
          />
          <PickerGroup
            label="Condition"
            options={CONDITION_TYPES}
            value={form.condition}
            onChange={(v) => set("condition", v)}
          />
          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Mileage (miles)
            </Label>
            <Input
              type="number"
              placeholder="e.g. 25000"
              value={form.mileage}
              onChange={(e) => set("mileage", e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl focus-visible:ring-amber-500/30"
            />
          </div>
          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Color
            </Label>
            <Input
              placeholder="e.g. Midnight Blue"
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl focus-visible:ring-amber-500/30"
            />
          </div>
          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Location
            </Label>
            <Input
              placeholder="City / District"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl focus-visible:ring-amber-500/30"
            />
          </div>
        </div>
      )}

      {/* Step 2: Pricing & Photos */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Asking Price (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
                $
              </span>
              <Input
                type="number"
                placeholder="e.g. 45000"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="pl-7 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl focus-visible:ring-amber-500/30"
              />
            </div>
          </div>

          {/* Photo upload placeholder */}
          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Photos
            </Label>
            <button className="w-full h-32 bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all">
              <Camera className="w-8 h-8 text-zinc-600" />
              <span className="text-sm text-zinc-500 font-medium">
                Tap to add photos
              </span>
              <span className="text-xs text-zinc-600">
                Up to 20 photos • Max 10MB each
              </span>
            </button>
          </div>

          <div>
            <Label className="text-xs text-zinc-400 font-semibold mb-2 block">
              Description
            </Label>
            <textarea
              placeholder="Describe your vehicle — condition, history, upgrades..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl divide-y divide-zinc-800">
            {[
              { label: "Make", value: form.make || "—" },
              { label: "Model", value: form.model || "—" },
              { label: "Year", value: form.year || "—" },
              { label: "Body Type", value: form.bodyType || "—" },
              { label: "Fuel", value: form.fuel || "—" },
              { label: "Transmission", value: form.transmission || "—" },
              { label: "Condition", value: form.condition || "—" },
              {
                label: "Mileage",
                value: form.mileage
                  ? `${Number(form.mileage).toLocaleString()} mi`
                  : "—",
              },
              {
                label: "Price",
                value: form.price
                  ? `$${Number(form.price).toLocaleString()}`
                  : "—",
              },
              { label: "Location", value: form.location || "—" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-xs text-zinc-500">{label}</span>
                <span className="text-xs font-semibold text-zinc-200 capitalize">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/70 leading-relaxed">
              Your listing will be reviewed within 2 hours. Once approved, it
              goes live to thousands of buyers instantly.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 bg-transparent border-zinc-700 text-zinc-400 hover:bg-zinc-900 rounded-xl h-12 font-semibold"
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={
            step < STEPS.length - 1 ? () => setStep((s) => s + 1) : handleSubmit
          }
          className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl h-12 gap-2 transition-all active:scale-[0.98]"
        >
          {step < STEPS.length - 1 ? (
            <>
              Next <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            "Submit Listing"
          )}
        </Button>
      </div>
    </div>
  );
}
