import React from "react";
import { User, Mail, ShieldCheck, X, Camera, Sparkles, Check } from "lucide-react";

export default function ProfileModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800/50 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="relative h-40 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-zinc-950 border-b border-zinc-800/50 p-8 flex items-end">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-zinc-400 hover:text-white transition-all z-10"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-6 translate-y-4">
            {/* Avatar with Camera Icon */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-1 shadow-2xl">
                <div className="w-full h-full bg-zinc-900 rounded-xl flex items-center justify-center text-white">
                  <User size={40} className="text-indigo-400" />
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all shadow-xl">
                <Camera size={14} />
              </button>
            </div>

            {/* Name Input Side-by-Side with Camera */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="First Name"
                  defaultValue={user.fullname?.firstName} 
                  className="bg-transparent text-2xl font-bold text-white border-b border-transparent focus:border-indigo-500 outline-none w-32 pb-1"
                />
                <input 
                  type="text" 
                  placeholder="Last Name"
                  defaultValue={user.fullname?.lastName} 
                  className="bg-transparent text-2xl font-bold text-white border-b border-transparent focus:border-indigo-500 outline-none w-32 pb-1"
                />
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Mail size={14} />
                <span>{user.email}</span>
                <div className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-tighter">Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="pt-12 p-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Account Details Label */}
            <div className="flex items-center gap-2 mb-2">
               <div className="h-px flex-1 bg-zinc-800"></div>
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Secondary Info</span>
               <div className="h-px flex-1 bg-zinc-800"></div>
            </div>

            {/* Email Field (Disabled) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest ml-1">Login Email</label>
              <div className="relative group">
                <ShieldCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input 
                  type="email" 
                  value={user.email} 
                  readOnly
                  className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-xl py-3 pl-10 pr-4 text-zinc-600 cursor-not-allowed outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex items-center justify-between border-t border-zinc-900 pt-6">
            <p className="text-[10px] text-zinc-600 max-w-[200px]">
              By saving, you agree to Rune AI's updated terms and conditions.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-zinc-400 hover:text-white transition-all text-sm font-medium"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                <Check size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}