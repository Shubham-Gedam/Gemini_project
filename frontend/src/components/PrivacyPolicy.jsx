import React from "react";
import { 
  Shield, Lock, Eye, FileText, ArrowLeft, 
  ShieldCheck, Globe, Trash2, Bell, Smartphone 
} from "lucide-react";

export default function PrivacyPolicy({ onBack }) {
  const categories = [
    {
      icon: <Eye className="text-blue-400" />,
      title: "Data We Collect",
      points: ["Prompts & Queries", "Account Metadata", "Usage Patterns"],
      content: "Hum sirf wahi data access karte hain jo service quality improve karne ke liye zaroori ho. Aapka personal identity data hamesha encrypted rehta hai."
    },
    {
      icon: <Lock className="text-emerald-400" />,
      title: "Security Infrastructure",
      points: ["AES-256 Encryption", "SSL/TLS Protocols", "Secure Cloud"],
      content: "Rune AI enterprise-grade security use karta hai. Aapki chats hamare server par end-to-end secure zone mein store hoti hain."
    },
    {
      icon: <Globe className="text-purple-400" />,
      title: "Third-party Policy",
      points: ["No Data Selling", "No Ad Tracking", "Strict Audits"],
      content: "Hum aapka data kisi bhi ad-agency ya third-party ko nahi bechte. Partnerships sirf technical infrastructure (like hosting) tak limited hain."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* --- Ambient Background Glow --- */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-all"
          >
            <div className="p-2 rounded-full group-hover:bg-zinc-900 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-semibold tracking-wide uppercase">Back</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-white/5">
            <ShieldCheck className="text-indigo-500" size={18} />
            <span className="text-xs font-bold text-white uppercase tracking-tighter">Verified Secure</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20 relative">
        {/* Header */}
        <header className="mb-24 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Privacy Framework 2.1
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Trust & <span className="text-zinc-600">Privacy.</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">
            Rune AI par aapka data aapki property hai. Humne apni policies ko itna simple banaya hai ki koi bhi ise 2 minute mein samajh sake.
          </p>
        </header>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-20">
            {[
                { label: "End-to-End Secure", icon: <Lock size={14}/> },
                { label: "GDPR Compliant", icon: <Shield size={14}/> },
                { label: "User Controlled", icon: <Trash2 size={14}/> }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-zinc-900/20 border border-white/5 rounded-2xl">
                    <div className="text-indigo-500">{item.icon}</div>
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{item.label}</span>
                </div>
            ))}
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          {categories.map((cat, index) => (
            <div 
              key={index}
              className="group relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/5 to-transparent hover:from-indigo-500/20 transition-all duration-500"
            >
              <div className="bg-zinc-950 p-8 md:p-12 rounded-[2.4rem] flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0 p-4 bg-zinc-900 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                  {cat.icon}
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                    <p className="text-zinc-500 leading-relaxed">{cat.content}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.points.map((p, pi) => (
                      <span key={pi} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        • {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info - Detailed Clauses */}
        <div className="mt-32 grid md:grid-cols-2 gap-12 border-t border-zinc-900 pt-20">
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-white font-bold">
                <Trash2 size={20} className="text-red-500" /> 
                <h4>Right to Erasure</h4>
             </div>
             <p className="text-sm leading-relaxed">
                Aap jab chahein settings mein ja kar apna account aur sari chat history permanently delete kar sakte hain. Delete dabate hi hamare servers se data 24 ghante mein erase ho jata hai.
             </p>
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-white font-bold">
                <Bell size={20} className="text-orange-500" /> 
                <h4>Policy Updates</h4>
             </div>
             <p className="text-sm leading-relaxed">
                Agar hum apni policy mein koi bada badlav karte hain, toh hum aapko email ya app notification ke zariye inform karenge taaki aap hamesha updated rahein.
             </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-24 p-10 rounded-[3rem] bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl font-black tracking-tighter mb-2">Privacy par koi sawal?</h2>
                <p className="text-indigo-100 font-medium">Humari legal team aapki help ke liye hamesha ready hai.</p>
            </div>
            <button className="relative z-10 px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-zinc-100 transition-all shadow-xl active:scale-95">
                Contact Privacy Team
            </button>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-20 -mt-20 rounded-full" />
        </div>
      </main>

      <footer className="py-20 border-t border-zinc-900/50 text-center">
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
          Rune AI • Privacy First Intelligence • 2026
        </p>
      </footer>
    </div>
  );
}