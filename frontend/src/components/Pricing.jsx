import React from "react";
import { X, Check, Zap, Crown, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function PricingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Ideal for beginners exploring AI.",
      features: ["1,000 Tokens/day", "Standard Speed", "Community Support"],
      buttonText: "Current Plan",
      premium: false,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Power tools for professionals.",
      features: ["Unlimited Tokens", "Turbo Speed", "Priority Support", "Advanced Analytics"],
      buttonText: "Upgrade Now",
      premium: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 overflow-y-auto scrollbar-hide">
      
      {/* Dynamic Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800/50 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,1)] flex flex-col my-auto overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-8 p-2 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-full transition-all z-50"
        >
          <X size={20} />
        </button>

        {/* Scrollable Area - 100% Zoom Optimized */}
        <div className="overflow-y-auto max-h-[85vh] scrollbar-hide">
          <div className="p-8 md:p-14">
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">
                <Sparkles size={10} /> Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                Choose your power
              </h2>
              <p className="text-zinc-500 mt-3 text-sm md:text-lg font-medium">No hidden fees. Cancel anytime.</p>
            </div>

            {/* Pricing Grid */}
            <div className="grid md:grid-cols-2 gap-8 relative">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative p-8 rounded-[2rem] border transition-all duration-500 flex flex-col ${
                    plan.premium 
                    ? "bg-gradient-to-b from-indigo-500/10 to-transparent border-indigo-500/40 shadow-2xl" 
                    : "bg-zinc-900/20 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {plan.premium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Recommended
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className={`text-lg font-bold ${plan.premium ? 'text-indigo-400' : 'text-zinc-500'}`}>{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-5xl font-black text-white">{plan.price}</span>
                        {plan.premium && <span className="text-zinc-600 font-bold">/mo</span>}
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl ${plan.premium ? 'bg-indigo-500 text-white shadow-indigo-500/20 shadow-lg' : 'bg-zinc-800 text-zinc-500'}`}>
                      {plan.premium ? <Crown size={22} /> : <Zap size={22} />}
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium">{plan.description}</p>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm font-semibold group">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.premium ? 'bg-indigo-500/20' : 'bg-zinc-800'}`}>
                           <Check size={12} className={plan.premium ? 'text-indigo-400' : 'text-zinc-500'} />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-5 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl ${
                    plan.premium 
                    ? "bg-white text-black hover:bg-zinc-200" 
                    : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                  }`}>
                    {plan.buttonText}
                    {plan.premium && <ArrowRight size={18} />}
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-zinc-600">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">PCI Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Sparkles key={i} size={10} className="text-indigo-900 fill-indigo-900" />)}
                <span className="text-[10px] text-zinc-700 font-bold ml-2 uppercase">5/5 User Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}