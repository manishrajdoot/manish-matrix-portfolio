"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function AIChatbubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: '📡 SYSTEM ONLINE: I am Matrix-AI. Ask me anything about Manish Rajdoot\'s tech infrastructure, skills, or projects.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '// ERROR: Interface uplink execution timeout.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-mono select-text text-xs">
      {/* 🤖 ADVANCED ANIMATED CYBER BUTTON */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center w-14 h-14 focus:outline-none cursor-pointer"
        >
          {/* Cyber Neon Pulse Field */}
          <div className="absolute inset-0 bg-[#00ff66]/10 rounded-full blur-md group-hover:bg-[#00ff66]/30 transition-all duration-500 animate-pulse" />
          
          {/* Outer Ring: Fast Clockwise Green Tech Loop */}
          <div className="absolute inset-0 border border-dashed border-[#00ff66]/50 rounded-full animate-[spin_8s_linear_infinite] group-hover:border-[#00ff66] transition-colors duration-500" />
          
          {/* Inner Ring: Slow Counter-Clockwise Dotted Mesh */}
          <div className="absolute inset-1 border border-dotted border-[#00ff66]/30 rounded-full animate-[spin_14s_linear_reverse_infinite]" />

          {/* Center Hub Core */}
          <div className="relative w-10 h-10 bg-[#03030c] border border-[#00ff66]/60 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,102,0.2)] group-hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] group-hover:border-[#00ff66] transition-all duration-500">
            {/* Blinking Central Data Node */}
            <div className="absolute w-1.5 h-1.5 bg-[#00ff66] rounded-full animate-ping opacity-75" />
            
            {/* Minimalist Tech Vector Bot Head */}
            <svg 
              className="w-5 h-5 text-[#00ff66] group-hover:scale-110 transition-transform duration-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
        </button>
      )}

      {/* Chat Terminal Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[400px] bg-[#03030c] border border-[#00ff66] rounded-2xl shadow-[0_0_30px_rgba(0,255,102,0.2)] flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-zinc-950 p-3 border-b border-white/[0.05] flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
              <span className="font-black text-[#00ff66] tracking-wider text-[10px]">// MATRIX CORE ASSISTANT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white text-[10px] font-bold">[ ESC ]</button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 scrollbar-none bg-[#020206]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-zinc-900 border-white/[0.08] text-white' 
                    : 'bg-emerald-950/20 border-[#00ff66]/20 text-[#00ff66]'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-emerald-950/10 border border-[#00ff66]/10 text-[#00ff66] p-2 rounded-xl text-[10px] animate-pulse">
                  Syncing AI brain synapses...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Interface */}
          <form onSubmit={handleSendMessage} className="p-2 bg-zinc-950 border-t border-white/[0.05] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about system protocols..."
              className="flex-1 bg-[#050512] border border-white/[0.05] focus:border-[#00ff66] outline-none rounded-xl px-3 py-2 text-white font-mono text-[11px]"
            />
            <button type="submit" className="px-3 bg-zinc-900 border border-[#00ff66]/40 hover:border-[#00ff66] text-[#00ff66] rounded-xl text-[11px] font-bold transition-all">
              SEND
            </button>
          </form>
        </div>
      )}
    </div>
  );
}