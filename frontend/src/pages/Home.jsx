import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, Plus, BarChart3, Terminal, Code, Search, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";


// Components
import Sidebar from "../components/Sidebar";
import ProfileModal from "../components/Profile"; 
import PricingModal from "../components/Pricing";
import PersonalizationModal from "../components/Personalization";

export default function AssistantUI() {
  const [user, setUser] = useState({ fullname: { firstName: "Guest" }, email: "guest@rune.ai", isGuest: true });
  const [activeModal, setActiveModal] = useState(null); 
  const [currentView, setCurrentView] = useState("main");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null); // Direct reference for Plus button

  const quickActions = [
    { label: "Analyze Data", icon: <BarChart3 size={14}/> },
    { label: "Debug Code", icon: <Terminal size={14}/> },
    { label: "Write Code", icon: <Code size={14}/> },
    { label: "Compare", icon: <Search size={14}/> },
    { label: "Surprise me", icon: <Wand2 size={14}/> },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser({ ...JSON.parse(storedUser), isGuest: false });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // LOGOUT LOGIC
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({ fullname: { firstName: "Guest" }, email: "guest@rune.ai", isGuest: true });
    navigate("/login");
    setCurrentView("main");
    setActiveModal(null);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: "Rune is processing..." }]);
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File selected: ${file.name}`);
    }
  };


  return (
    <div className="flex h-screen bg-[#080808] text-zinc-300 font-sans overflow-hidden">
      
      {/* Sidebar with Logout prop */}
      <Sidebar user={user} setView={setCurrentView} setActiveModal={setActiveModal} onLogout={handleLogout} />

      <ProfileModal isOpen={activeModal === 'profile'} onClose={() => setActiveModal(null)} user={user} />
      <PricingModal isOpen={activeModal === 'pricing'} onClose={() => setActiveModal(null)} />
      <PersonalizationModal isOpen={activeModal === 'personalization'} onClose={() => setActiveModal(null)} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="absolute top-0 w-full p-6 z-20 font-medium text-white opacity-80 text-xl">Rune</header>

        <div className="flex-1 overflow-y-auto scrollbar-hide pt-20">
          <div className="max-w-3xl mx-auto w-full px-6">
            {messages.length === 0 ? (
              <div className="h-[70vh] flex flex-col justify-center space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-orange-500 font-bold">
                    <Sparkles size={24} fill="currentColor" />
                    <span className="text-2xl">Hi there</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">I'm Rune, Your Intelligent AI Assistant.</h1>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {quickActions.map((action, i) => (
                    <button key={i} className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/40 border border-zinc-800/60 rounded-xl text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">{action.icon} {action.label}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8 pb-32">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[85%] px-6 py-4 rounded-2xl ${msg.role === 'user' ? 'bg-zinc-800 text-white' : 'text-zinc-300 bg-zinc-900/30 border border-white/5'}`}>{msg.content}</div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 bg-linear-to-t from-[#080808] via-[#080808] to-transparent">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center bg-[#121212] border border-zinc-800 rounded-2xl p-2 shadow-2xl focus-within:border-zinc-700 transition-all">
              
              {/* HIDDEN INPUT */}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*, .pdf" className="hidden" />

              <button onClick={() => fileInputRef.current.click()} className="p-3 text-zinc-600 hover:text-zinc-400">
                <Plus size={20} />
              </button>
              
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask Rune anything..." className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-zinc-700 py-3 text-lg" />
              
              <div className="flex items-center gap-3 pr-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f1711] border border-emerald-900/30 rounded-full text-[10px] font-bold text-emerald-500 uppercase">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Fast
                </div>
                <button onClick={handleSendMessage} className={`p-2.5 rounded-xl transition-all ${input.trim() ? 'bg-indigo-600 text-white' : 'bg-zinc-800/50 text-zinc-500'}`}><Send size={18} /></button>
              </div>
            </div>
            {messages.length > 0 && <p className="text-center text-[9px] font-bold text-zinc-700 uppercase tracking-widest mt-4">Rune AI can provide inaccurate info.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}