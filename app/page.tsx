'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { Send, Database, Bot, User } from 'lucide-react';

export default function MyBot() {
  const [kb, setKb] = useState('');
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { data: { knowledgeBase: kb } },
  });

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-100 font-sans">
      {/* LEFT SIDEBAR: Knowledge Base */}
      <aside className="w-80 border-r border-zinc-800 flex flex-col p-6 bg-[#0d0d0d]">
        <div className="flex items-center gap-2 mb-6">
          <Database className="text-emerald-500 w-5 h-5" />
          <h2 className="font-bold tracking-tight text-sm uppercase">Knowledge Base</h2>
        </div>
        
        <p className="text-xs text-zinc-500 mb-2">Configure system context:</p>
        <textarea
          value={kb}
          onChange={(e) => setKb(e.target.value)}
          placeholder="Paste documentation, rules, or facts here..."
          className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
        />
        
        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
          <p className="text-[10px] text-emerald-400 leading-tight">
            SYSTEM ACTIVE: Your bot will now prioritize the data entered above.
          </p>
        </div>
      </aside>

      {/* RIGHT CONTENT: Chat Window */}
      <main className="flex-1 flex flex-col relative">
        <header className="p-4 border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-center font-semibold text-zinc-400">MyBot Preview</h1>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600">
              <Bot size={48} className="mb-4 opacity-20" />
              <p>Type a message to start testing your prompt.</p>
            </div>
          )}
          
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-zinc-900 border border-zinc-800 rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] font-bold uppercase">
                  {m.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                  {m.role}
                </div>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask MyBot anything..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black p-3 rounded-full transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
