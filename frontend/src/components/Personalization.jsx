import React, { useState } from "react";
import { X, Sparkles, Moon, Sun, MessageSquare, Volume2, Shield, Zap } from "lucide-react";

export default function PersonalizationModal({ isOpen, onClose }) {
  const [theme, setTheme] = useState("dark");
  const [tone, setTone] = useState("Professional");

  if (!isOpen) return null;

  const tones = [
    { name: "Professional", desc: "Formal and precise" },
    { name: "Friendly", desc: "Warm and casual" },
    { name: "Creative", desc: "Imaginative and detailed" },
    { name: "Concise", desc: "Short and direct" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300 scrollbar-hide ">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800/50 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-zinc-900/50 flex justify-between items-center bg-gradient-to-r from-zinc-950 to-indigo-950/20">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Personalization <Sparkles size={20} className="text-indigo-400" />
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Tailor Rune AI to your specific needs.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-900 rounded-full text-zinc-500 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
          
          {/* 1. Appearance Section */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Appearance</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setTheme("dark")}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${theme === 'dark' ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-[0_0_20px_-10px_rgba(99,102,241,0.5)]' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
              >
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-indigo-500 text-white' : 'bg-zinc-800'}`}>
                  <Moon size={18} />
                </div>
                <span className="text-sm font-semibold">Dark Mode</span>
              </button>
              <button 
                onClick={() => setTheme("light")}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${theme === 'light' ? 'bg-indigo-600/10 border-indigo-500 text-white' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
              >
                <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-indigo-500 text-white' : 'bg-zinc-800'}`}>
                  <Sun size={18} />
                </div>
                <span className="text-sm font-semibold">Light Mode</span>
              </button>
            </div>
          </div>

          {/* 2. AI Interaction Tone */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <MessageSquare size={12} /> Interaction Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTone(t.name)}
                  className={`p-3 rounded-xl text-left border transition-all ${tone === t.name ? 'bg-white text-black border-white shadow-lg' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                >
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className={`text-[10px] ${tone === t.name ? 'text-zinc-700' : 'text-zinc-500'}`}>{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. System Preferences (Toggles) */}
          <div className="space-y-3">
             <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Preferences</label>
             
             {/* Toggle 1 */}
             <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 group hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-indigo-400 transition-colors">
                      <Zap size={18} />
                   </div>
                   <div>
                      <p className="text-sm font-medium text-zinc-200">High Speed Mode</p>
                      <p className="text-[10px] text-zinc-500">Prioritize response time</p>
                   </div>
                </div>
                <div className="w-11 h-6 bg-indigo-600 rounded-full flex items-center px-1 cursor-pointer">
                   <div className="w-4 h-4 bg-white rounded-full shadow-md translate-x-5 transition-transform"></div>
                </div>
             </div>

             {/* Toggle 2 */}
             <div className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 group hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-indigo-400 transition-colors">
                      <Shield size={18} />
                   </div>
                   <div>
                      <p className="text-sm font-medium text-zinc-200">Incognito Chat</p>
                      <p className="text-[10px] text-zinc-500">Don't save chat history</p>
                   </div>
                </div>
                <div className="w-11 h-6 bg-zinc-800 rounded-full flex items-center px-1 cursor-pointer">
                   <div className="w-4 h-4 bg-zinc-500 rounded-full shadow-md transition-transform"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-zinc-900/20 border-t border-zinc-900 flex items-center justify-between">
          <button className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4">Reset to Default</button>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white text-black hover:bg-zinc-200 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}