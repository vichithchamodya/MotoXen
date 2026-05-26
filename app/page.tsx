import { HeroSection } from "@/components/home/HeroSection";
import { CategoryScroll } from "@/components/home/CategoryScroll";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryScroll />
      <FeaturedListings />
      <StatsSection />
      <HowItWorks />
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="mx-4 md:mx-auto mb-8 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 md:p-10 text-center overflow-hidden relative w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
        <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent pointer-events-none" />
        <p className="font-display font-black text-xl text-zinc-50 relative z-10">
          Ready to sell your car?
        </p>
        <p className="text-sm text-zinc-500 mt-1 mb-4 relative z-10">
          List for free. Reach serious buyers in 24 hours.
        </p>
        <a
          href="/sell"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl px-6 py-3 text-sm transition-all active:scale-95 relative z-10"
        >
          Start Free Listing
        </a>
      </section>
    </>
  );
}
