"use client";

import React from 'react';

interface ToolkitItem {
  name: string;
  type: string;
  desc: string;
}

interface TechToolkitProps {
  toolkit: ToolkitItem[];
}

export default function TechToolkit({ toolkit }: TechToolkitProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {toolkit.map((item, idx) => (
        <div key={idx} className="p-5 bg-[#04040e]/90 border border-white/[0.03] hover:border-[#00ff66]/20 rounded-xl transition-all">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black text-white uppercase tracking-wide">{item.name}</span>
            <span className="text-[8px] font-mono font-bold text-[#00ff66] bg-emerald-950/40 px-2 py-0.5 rounded">{item.type}</span>
          </div>
          <p className="text-[11px] text-zinc-500 font-sans leading-relaxed pt-1 border-t border-white/[0.02]">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}