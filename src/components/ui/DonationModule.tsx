import React, { useState } from "react";
import { Mail, CreditCard, Lock } from "lucide-react";

export function DonationModule() {
  const [amount, setAmount] = useState<string>("1000");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const presetAmounts = ["500", "1000", "2000", "5000"];

  /**
   * Note: 'FormEvent' from React is replaced with 'React.FormEvent<HTMLFormElement>' 
   * to resolve the deprecation warning for the generic 'FormEvent' type.
   */
  const handlePesaPalPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Payment disabled until credentials are wired up
    return;
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Our Mission</h2>
        <p className="text-white/80 text-lg mb-8">
          Every contribution helps us expand climate education, establish more forest gardens, and equip young people to lead sustainable change in their communities.
        </p>

        {/* Progress Bar Container */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Funding Progress</span>
            <span>15% / 100%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-brand-gold h-3 rounded-full transition-all duration-1000" 
              style={{ width: "15%" }}
            ></div>
          </div>
        </div>

        {/* PesaPal Interactive Options Grid - DISABLED FOR SAFETY */}
        <form onSubmit={handlePesaPalPayment} className="space-y-4 max-w-md opacity-60 pointer-events-none relative">
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-brand-green/10 backdrop-blur-[1px] rounded-xl">
            <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-brand-green font-bold text-sm border border-brand-green/20">
              <Lock className="h-4 w-4" />
              Payment Setup in Progress
            </div>
          </div>

          <label className="block text-sm font-medium text-white/90">Select Donation Amount (KES)</label>
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                disabled
                className={`py-2 text-center rounded-lg text-sm font-bold border transition-all ${
                  amount === preset && !isCustom
                    ? "bg-brand-gold border-brand-gold text-slate-900 shadow-md"
                    : "bg-white/10 border-white/20 text-white"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-lg text-xs font-semibold border bg-white/5 border-white/20"
            >
              Custom Amount
            </button>
          </div>

          <button
            type="submit"
            disabled
            className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3.5 text-base font-semibold text-slate-900 shadow-lg opacity-50 cursor-not-allowed"
          >
            <CreditCard className="h-5 w-5" />
            Donate KES {parseFloat(amount || "0").toLocaleString()}
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-white/10">
        <a 
          href="mailto:ambrose@greenimpactinnovators.works" 
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-3 text-base font-medium text-white hover:bg-white hover:text-brand-green transition-colors"
        >
          <Mail className="h-5 w-5" />
          Partner With Us (Corporate / NGO)
        </a>
      </div>
    </div>
  );
}
