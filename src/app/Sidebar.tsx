"use client";

import React from 'react';

interface SidebarProps {
  activeTab: string;
  onNavigate: (link: string) => void;
  setCursorHovered: (hovered: boolean) => void;
}

export default function Sidebar({ activeTab, onNavigate, setCursorHovered }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 border-r border-white/[0.02] bg-[#03030c]/30 backdrop-blur-xl flex flex-col items-center justify-between py-10 z-50 hidden lg:flex">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-[#00ff66]/30 flex items-center justify-center font-black text-[#00ff66] text-base shadow-[0_0_15px_rgba(0,255,102,0.2)]">MR</div>
      <div className="flex flex-col space-y-8 text-lg font-bold text-zinc-600">
        <span 
          onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} 
          className={`cursor-pointer transition-colors ${activeTab === 'Home' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`}
          onClick={() => onNavigate('Home')}
        >
          ⚡
        </span>
        <span 
          onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} 
          className={`cursor-pointer transition-colors ${activeTab === 'About' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`}
          onClick={() => onNavigate('About')}
        >
          📂
        </span>
        <span 
          onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} 
          className={`cursor-pointer transition-colors ${activeTab === 'Blog' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`}
          onClick={() => onNavigate('Blog')}
        >
          📝
        </span>
      </div>
    </aside>
  );
}