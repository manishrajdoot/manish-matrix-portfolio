"use client";

import React, { useState, useEffect } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 📡 Fetching live repositories using GitHub REST API endpoint
    async function fetchGitHubData() {
      try {
        const res = await fetch('https://api.github.com/users/manishrajdoot/repos?sort=updated&per_page=6');
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("// EXCEPTION: GitHub API handshake dropped.", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-12 text-xs font-mono tracking-widest text-[#00ff66] animate-pulse">
        // INGESTING REAL-TIME REPOSITORY GRID METRICS...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) => (
        <a 
          key={repo.id} 
          href={repo.html_url} 
          target="_blank" 
          rel="noreferrer"
          className="p-5 bg-[#04040e]/90 border border-white/[0.03] hover:border-[#00ff66]/30 rounded-xl transition-all flex flex-col justify-between group cursor-none"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center text-zinc-600">
              <span className="text-[8px] font-mono bg-white/[0.02] border border-white/[0.05] rounded px-2 py-0.5 uppercase tracking-wider">GitHub Live Node</span>
              <span className="text-xs group-hover:text-[#00ff66] transition-colors">📦</span>
            </div>
            <h4 className="text-sm font-black text-white group-hover:text-[#00ff66] transition-colors uppercase tracking-wide truncate">{repo.name}</h4>
            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed line-clamp-2 h-8">{repo.description || '// No documentation summary provided.'}</p>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-white/[0.02] mt-3 text-[10px] font-mono font-bold text-zinc-500">
            <span className="text-[#00ff66] bg-emerald-950/20 px-2 py-0.5 rounded text-[8px] uppercase">{repo.language || 'Markdown'}</span>
            <div className="flex space-x-3">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}