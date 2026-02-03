import React, { useState, useRef, useEffect } from "react";
import { 
  Plus, MessageSquare, User, Settings, 
  CreditCard, ShieldCheck, FileText, LogIn, LogOut,
  PanelLeftClose, PanelLeftOpen 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ user, onLogout, setView, setActiveModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar toggle state
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className={`${isCollapsed ? "w-20" : "w-64"} border-r border-zinc-800 flex flex-col p-4 relative bg-zinc-950/20 backdrop-blur-sm transition-all duration-300 ease-in-out`}>
      
      {/* --- Toggle Button --- */}
      <div className={`flex items-center mb-6 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && <span className="font-bold text-white text-lg tracking-tighter ml-2">RUNE</span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* New Chat Button */}
      <button className={`flex items-center gap-2 p-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all mb-4 text-sm font-medium ${isCollapsed ? "justify-center" : ""}`}>
        <Plus size={18} /> 
        {!isCollapsed && <span>New Chat</span>}
      </button>

      {/* Navigation / History */}
      <nav className="flex-1 overflow-y-auto space-y-1 text-sm text-zinc-500 scrollbar-hide">
        <div className={`flex items-center gap-2 p-2 hover:bg-zinc-900 rounded-lg cursor-pointer transition-colors group ${isCollapsed ? "justify-center" : ""}`}>
          <MessageSquare size={16} className="group-hover:text-indigo-400 shrink-0" /> 
          {!isCollapsed && <span className="truncate">Analysis of data...</span>}
        </div>
      </nav>

      {/* Settings Popup Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className={`absolute ${isCollapsed ? "left-20" : "left-4"} bottom-20 w-56 bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-xl`}>
          <div className="space-y-0.5 px-2">
            <button onClick={() => { setActiveModal('profile'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-xl transition-all">
              <User size={16} /> Profile
            </button>
            <button onClick={() => { setActiveModal('pricing'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-xl transition-all">
              <CreditCard size={16} /> Pricing
            </button>
            <button onClick={() => { setView('privacy'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-xl transition-all">
              <ShieldCheck size={16} /> Privacy Policy
            </button>
            <button onClick={() => { setActiveModal('terms'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-xl transition-all">
              <FileText size={16} /> Terms & Conditions
            </button>
            <div className="h-[1px] bg-zinc-900 my-2 mx-2" />
            {user.isGuest ? (
              <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 text-sm text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all font-semibold">
                <LogIn size={16} /> Sign In
              </Link>
            ) : (
              <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-semibold">
                <LogOut size={16} /> Log Out
              </button>
            )}
          </div>
        </div>
      )}

      {/* User Profile Section */}
      <div className="pt-4 border-t border-zinc-800">
        <div 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={`group flex items-center gap-3 p-2.5 rounded-2xl transition-all cursor-pointer ${isMenuOpen ? 'bg-zinc-900 ring-1 ring-white/10' : 'hover:bg-zinc-900/50'} ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <User size={20} />
            </div>
            {!isCollapsed && (
              <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-[3px] border-black rounded-full ${user.isGuest ? 'bg-zinc-500' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}></div>
            )}
          </div>
          
          {!isCollapsed && (
            <>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold text-zinc-100 truncate tracking-tight">{user.fullname?.firstName}</span>
                <span className="text-[11px] text-zinc-500 truncate font-medium">{user.email}</span>
              </div>
              <Settings size={14} className={`text-zinc-600 transition-all duration-500 ${isMenuOpen ? 'rotate-180 text-white' : 'group-hover:rotate-90'}`} />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}