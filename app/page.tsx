'use client';
import { useChat } from 'ai/react';
import { useState } from 'react';
import { Send, XCircle } from 'lucide-react';

export default function MyBot() {
  const [kb, setKb] = useState('');
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    body: { data: { knowledgeBase: kb } },
  });

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-[#e4e4e7] font-sans selection:bg-green-500/30">
      {/* Sidebar */}
      <aside className="w-[320px] border-r border-zinc-800 p-6 flex flex-col bg-[#0c0c0e]">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <h1 className="font-bold tracking-tighter text-xl">MyBot</h1>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Knowledge Base</label>
          <textarea
            value={kb}
            onChange={(e) => setKb(e.target.value)}
            placeholder="Paste your text data here..."
            className="h-[400px] w-full bg-[#141417] border border-zinc-800 rounded-xl p-4 text-sm focus:ring-1 focus:ring-green-500 outline-none resize-none transition-all"
          />
          <button className="w-full bg-[#99ff80] hover:bg-[#b2ff99] text-black font-bold py-3 rounded-xl transition-colors text-xs uppercase tracking-widest">
            Save & Apply
          </button>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col relative">
        <header className="flex justify-end p-4 gap-2">
           <button className="flex items-center gap-1 px-3 py-1 border border-zinc-800 rounded-lg text-[10px] uppercase font-bold hover:bg-zinc-900 transition-colors">
            <span className="text-green-500 text-lg">○</span> Knowledge Base
           </button>
           <button 
            onClick={() => setMessages([])}
            className="flex items-center gap-1 px-3 py-1 border border-red-900/30 text-red-400 rounded-lg text-[10px] uppercase font-bold hover:bg-red-950/20 transition-colors">
            <XCircle size={12} /> Clear Chat
           </button>
        </header>

        <div className="flex-1 overflow-y-auto px-20 py-10 space-y-8">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <div className="w-12 h-12 border border-zinc-700 rotate-45 mb-6" />
              <h2 className="text-2xl font-medium mb-2">Ready to chat</h2>
              <p className="max-w-xs text-sm">Ask me anything. Load your knowledge base on the left to give me custom context.</p>
            </div>
          ) : (
            messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl px-5 py-3 rounded-2xl ${m.role === 'user' ? 'bg-[#18181b] border border-zinc-800' : 'bg-transparent text-lg'}`}>
                  {m.content}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full bg-[#141417] border border-zinc-800 rounded-2xl py-5 px-6 outline-none focus:border-zinc-600 transition-all shadow-2xl"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#99ff80] p-2 rounded-lg text-black hover:scale-105 transition-transform">
              <Send size={20} fill="black" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
