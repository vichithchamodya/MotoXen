import { SellForm } from "@/components/sell/SellForm";

export const metadata = {
  title: "Sell Your Vehicle — VELOCE",
};

export default function SellPage() {
  return (
    <>
      <div className="px-0 pt-2 pb-8">
        <div className="px-4 py-4">
          <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">
            SELL ON VELOCE
          </p>
          <h1 className="font-display font-black text-2xl text-zinc-50 leading-tight">
            List Your Vehicle.
            <br />
            <span className="gradient-text">Free & Fast.</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Takes less than 5 minutes. Reach thousands of verified buyers.
          </p>
        </div>
        <SellForm />
      </div>
    </>
  );
}
