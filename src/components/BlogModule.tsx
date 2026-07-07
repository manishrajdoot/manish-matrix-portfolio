"use client";

import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
}

export default function BlogModule() {
  const blogDatabase: BlogPost[] = [
    {
      id: 1,
      title: "Optimizing Next.js App Router for Quantum Scale",
      date: "June 24, 2026",
      readTime: "5 min read",
      category: "ARCHITECTURE",
      summary: "Deep dive into structural layouts validation, dynamic asset rendering loops, state management isolation, and high-velocity server rendering route paths.",
      content: `
        <h4>1. THE RUNTIME ARCHITECTURAL PARADIGM</h4>
        <p>Next.js 15 App Router introduces critical execution rules by moving layout processing to React Server Components (RSC). This removes heavy core packages dependency weights from the client bundle pipeline stream entirely.</p>
        <h4>2. PARALLEL ROUTING MATRIX ENTRIES</h4>
        <p>By implementing parallel intercept layouts, background nodes can safely execute heavy metadata passes async without triggering hydration state drops or unnecessary DOM repaint cycles.</p>
        <pre>// Advanced Route Generation Vector\nexport async function generateStaticParams() {\n  return [{ nodeEnclave: 'stable-core-matrix' }];\n}</pre>
        <h4>3. HYDRATION METRICS AUDIT</h4>
        <p>Enabling strict layout isolation mechanisms drops time-to-first-byte (TTFB) intervals by up to 45%, providing near-instantaneous navigation routines across complex client views grids.</p>
      `
    },
    {
      id: 2,
      title: "The Relational Power of PL/SQL in Modern Enterprise Stacks",
      date: "May 18, 2026",
      readTime: "4 min read",
      category: "DATABASE",
      summary: "Analyzing performance proximity loops, kernel-level atomic triggers, and schema sequence data optimization scripts.",
      content: `
        <h4>1. DATA PROXIMITY AND SPEED RADIALS</h4>
        <p>Executing data calculations directly inside the relational database engine core kernel eliminates massive data packet traveling lags. Procedural blocks compile natively right where memory structures sit.</p>
        <h4>2. DATA INTEGRITY PACKAGES AND MUTATION GUARDS</h4>
        <p>Relational triggers act as invincible cryptographic shield vectors, ensuring that complex data compliance verification blocks execute reliably before any row serialization commits to disks.</p>
        <pre>CREATE OR REPLACE TRIGGER Matrix_Uplink_Guard\nBEFORE INSERT ON Network_Log_Stream\nFOR EACH ROW\nBEGIN\n  :NEW.synchronized_at := SYSTIMESTAMP;\nEND;</pre>
      `
    }
  ];

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <div className="w-full space-y-6">
      <div>
        <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block animate-pulse">// PREMIUM_LOGS_MAGAZINE</span>
        <h3 className="text-2xl font-black text-white uppercase tracking-wider mt-1">Terminal Publications</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogDatabase.map((post) => (
          <div 
            key={post.id} 
            onClick={() => setSelectedBlog(post)}
            className="group relative bg-[#04040e]/90 border border-white/[0.03] hover:border-[#00ff66]/30 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between min-h-[200px]"
          >
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center text-[9px] font-bold tracking-widest">
                <span className="text-[#00ff66] bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-0.5 rounded-md uppercase">{post.category}</span>
                <span className="text-zinc-500">{post.readTime}</span>
              </div>
              <h4 className="text-base font-black text-white group-hover:text-[#00ff66] transition-colors uppercase tracking-wide leading-snug">{post.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans font-medium line-clamp-2">{post.summary}</p>
            </div>
            <div className="pt-4 border-t border-white/[0.03] flex justify-between items-center text-[9px] font-bold text-zinc-500 relative z-10 group-hover:text-zinc-300 transition-colors">
              <span>{post.date}</span>
              <span className="text-[#00ff66] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">READ NODE <span className="text-xs">→</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* DETACHED POPUP MODAL ENCLAVE */}
      {selectedBlog && (
        <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl p-6 md:p-10 relative my-auto bg-[#03030d]/95 border border-[#00ff66]/20 rounded-2xl backdrop-blur-2xl shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/[0.05] pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setSelectedBlog(null)} />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="text-[9px] text-zinc-500 pl-2 tracking-widest uppercase font-bold">// ARCHIVE_PREVIEW: {selectedBlog.category}</span>
              </div>
              <button onClick={() => setSelectedBlog(null)} className="text-zinc-500 hover:text-white font-mono font-bold text-[10px] border border-white/[0.05] rounded-md px-2 py-0.5 bg-zinc-950/40">[ CLOSE_STREAM ]</button>
            </div>
            <article className="space-y-4 text-zinc-300 font-mono max-h-[60vh] overflow-y-auto pr-2">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">{selectedBlog.title}</h2>
              <div 
                className="prose prose-invert text-xs md:text-sm font-sans leading-relaxed text-zinc-400 pt-4 border-t border-white/[0.03] space-y-4
                [&>h4]:font-mono [&>h4]:text-[#00ff66] [&>h4]:text-xs [&>h4]:font-black [&>h4]:uppercase [&>h4]:mt-6
                [&>pre]:bg-black/60 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:font-mono [&>pre]:text-[11px] [&>pre]:text-emerald-400 [&>pre]:border [&>pre]:border-white/[0.03] [&>pre]:overflow-x-auto [&>pre]:whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }} 
              />
            </article>
          </div>
        </div>
      )}
    </div>
  );
}