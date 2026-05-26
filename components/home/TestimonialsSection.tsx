import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-8 px-4 md:px-8 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto">
      <div className="mb-5">
        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1.5">
          REVIEWS
        </p>
        <h2 className="font-display font-black text-2xl text-zinc-50">
          Real People.
          <br />
          Real Results.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 h-full flex flex-col"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-sm text-amber-400">
                  {t.initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-zinc-100">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-zinc-600">{t.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mt-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.text}
                </p>
                <p className="text-[10px] text-amber-500/70 font-semibold mt-2">
                  {t.type === "buyer" ? "Bought" : "Sold"}: {t.vehicle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
