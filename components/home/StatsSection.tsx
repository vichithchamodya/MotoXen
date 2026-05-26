import { appconfig } from "@/constants/config";

export function StatsSection() {
  return (
    <section className="mx-4 md:mx-auto my-2 rounded-3xl bg-linear-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 p-6 md:p-10 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl">
      <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
        TRUSTED ACROSS SRI LANKA
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {appconfig.stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-900/60 rounded-2xl p-4 border border-zinc-800/60"
          >
            <div className="font-display font-black text-3xl text-zinc-50">
              {stat.value}
              <span className="text-amber-400 text-xl">{stat.suffix}</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
