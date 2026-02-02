import React, { useState, useEffect } from 'react';
import { Send, Plus, MessageSquare, User, Settings } from 'lucide-react';

export default function AssistantUI() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex h-screen bg-black text-zinc-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col p-4">
        <button className="flex items-center gap-2 p-2 rounded-lg border border-zinc-700 hover:bg-zinc-900 transition mb-4">
          <Plus size={18} /> New Chat
        </button>
        
        <nav className="flex-1 overflow-y-auto space-y-2 text-sm text-zinc-400">
          <div className="flex items-center gap-2 p-2 hover:bg-zinc-900 rounded cursor-pointer">
            <MessageSquare size={16} /> Analysis of data...
          </div>
        </nav>

        {/* --- USER PROFILE SECTION START --- */}
        <div className="pt-4 border-t border-zinc-800">
          <div className="group flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-900/50 transition-all cursor-pointer">
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full from-indigo-600 to-purple-500 flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full"></div>
            </div>

            {/* Name & Email */}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-zinc-100 truncate">
                {user
                  ? `${user.fullname?.firstName || ""} ${user.fullname?.lastName || ""}`
                  : "Loading..."}
              </span>

              <span className="text-xs text-zinc-500 truncate opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {user?.email || ""}
              </span>
            </div>

            <Settings
              size={14}
              className="ml-auto text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
        {/* --- USER PROFILE SECTION END --- */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <header className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="font-semibold text-zinc-100">Rune AI Assistant</h2>
          <div className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">
            v4.0.2
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-indigo-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
              AI
            </div>
            <p className="leading-relaxed">
              How can I help you build your application today?
            </p>
          </div>
        </section>

        <footer className="p-4 bg-black">
          <div className="max-w-3xl mx-auto relative">
            <textarea
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 pr-12 focus:outline-none focus:ring-1 focus:ring-zinc-700 resize-none text-sm"
              placeholder="Ask anything..."
              rows={2}
            />
            <button className="absolute right-3 bottom-3 p-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition">
              <Send size={18} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
