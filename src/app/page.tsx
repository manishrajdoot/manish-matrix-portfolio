"use client";

import React, { useState, useEffect, useRef } from 'react';
import ContactForm from '@/components/ContactForm';
import BlogModule from '@/components/BlogModule';
import AIChatbubble from '@/components/AIChatbubble';
import SqlTerminal from '@/components/SqlTerminal'; // Successfully Linked Terminal

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export default function Home() {
  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Blog', 'Contact'];

  const toolkit = [
    { name: "Data Science & Analytics", type: "Expert / Python", desc: "Advanced data compilation pipelines, predictive modeling, machine learning clustering, structural dataset tuning, and analytics manipulation with Pandas, NumPy, and Scikit-Learn." },
    { name: "Next.js 15 & React 19", type: "Advanced / Meta", desc: "Serverless web orchestration, React Server Components (RSC) isolation, advanced state routing layers, performance optimization, and fluid client hydration patterns." },
    { name: "Relational DB (PL/SQL)", type: "Expert / Database", desc: "Designing automated transaction blocks, custom sequential packages, complex database mutations triggers shield, indices tuning, and structural relational querying logic." },
    { name: "Node.js & Express Stack", type: "Backend / Automation", desc: "Building secure asynchronous REST API layers, parsing multi-part payload streams, microservice endpoint engineering, and strong gateway encryption logic rows." },
    { name: "TypeScript & Python Core", type: "Languages / Stable", desc: "Deploying strict compiler type safety models, parallel data sorting, multi-threaded script automation routines, and deep system ledger validation scripts." },
    { name: "Tailwind CSS & Canvas Architecture", type: "Design Systems", desc: "Structuring intricate responsive grids, premium neon cyber glassmorphic frames components, interactive tracking filters, and raw matrix stream blending shaders." }
  ];

  const fallbackRepos: Repo[] = [
    { id: 1, name: "MicroStart Platform", description: "A robust micro SaaS automation ecosystem generating continuous daily startup business formulations, integrated programmatic toolkits, and dynamic token checkout frameworks with Stripe billing APIs.", html_url: "https://github.com/manishrajdoot?tab=repositories", stargazers_count: 5, forks_count: 2, language: "Next.js" },
    { id: 2, name: "WallShift Manager", description: "A professional low-latency wallpaper application for Windows architectures featuring system-level customization layers and responsive graphical user interface blocks.", html_url: "https://github.com/manishrajdoot?tab=repositories", stargazers_count: 3, forks_count: 1, language: "Electron" },
    { id: 3, name: "Phonebook Diary PWA", description: "Progressive Web Application platform enabling users to encrypt, manipulate, search, and store contact node parameters securely through cloud synchronized pipelines.", html_url: "https://github.com/manishrajdoot?tab=repositories", stargazers_count: 4, forks_count: 0, language: "React" },
    { id: 4, name: "AI Image Stream Engine", description: "Generative cloud workspace solution executing complex background pipelines to ingest Stability AI and OpenAI configurations for processing live high-res image download arrays.", html_url: "https://github.com/manishrajdoot?tab=repositories", stargazers_count: 6, forks_count: 1, language: "Next.js" }
  ];

  const experienceTimeline = [
    { role: "Full Stack Developer Intern", company: "Zeetron Network, Jaipur", duration: "Jan 2024 — Apr 2024", lines: "Directed the development of robust data processing backend engines and integrated stateful frontend interface views to scale web app workflows under custom corporate MERN deployments." },
    { role: "Python Developer Intern", company: "Zeetron Network, Jaipur", duration: "Sep 2023 — Dec 2023", lines: "Formulated highly optimized data parser scripts and designed restful synchronization middleware hooks using Python, Flask, and customized asynchronous thread scheduling protocols." },
    { role: "PL/SQL Database Engineer Intern", company: "Wipro TechAdemy", duration: "May 2024 — Aug 2025", lines: "Architected structured relational trigger sequences, engineered database audit schemas, and drastically decreased transaction load execution bottlenecks via deep query optimization passes." }
  ];

  const [activeTab, setActiveTab] = useState('Home');
  const [showContactModal, setShowContactModal] = useState(false);
  const [githubRepos, setGithubRepos] = useState<Repo[]>([]);
  const [githubLoading, setGithubLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const matrixChars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1023456789";
    const charArray = matrixChars.split("");
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const rainDrops = new Array(columns).fill(1);

    const drawMatrixRain = () => {
      ctx.fillStyle = "rgba(2, 2, 8, 0.06)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00ff66";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
      animationId = requestAnimationFrame(drawMatrixRain);
    };

    drawMatrixRain();
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    let isMounted = true;
    async function fetchGitHubData() {
      try {
        const res = await fetch('https://api.github.com/users/manishrajdoot/repos?sort=updated&per_page=6');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setGithubRepos(data);
            return;
          }
        }
        if (isMounted) setGithubRepos(fallbackRepos);
      } catch {
        if (isMounted) setGithubRepos(fallbackRepos);
      } finally {
        if (isMounted) setGithubLoading(false);
      }
    }
    fetchGitHubData();
    return () => { isMounted = false; };
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen bg-[#020208]" />;

  const handleTabNavigation = (link: string) => {
    setActiveTab(link);
    if (link === 'Contact') { setShowContactModal(true); return; }
    setShowContactModal(false);

    const targets: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
      Home: homeRef, About: aboutRef, Skills: skillsRef, Projects: projectsRef, Experience: experienceRef, Blog: blogRef
    };
    const element = targets[link]?.current;
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen bg-[#020208] text-[#b4b4b4] font-mono lg:[cursor:none] select-none overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30" />
      
      <div 
        className="fixed pointer-events-none rounded-full z-[99999] transition-transform duration-75 mix-blend-difference hidden lg:block"
        style={{
          left: `${mousePos.x}px`, top: `${mousePos.y}px`,
          width: cursorHovered ? '48px' : '11px', height: cursorHovered ? '48px' : '11px',
          border: cursorHovered ? '2px solid #00ff66' : 'none',
          backgroundColor: cursorHovered ? 'rgba(0,255,102,0.1)' : '#00ff66',
          boxShadow: cursorHovered ? '0 0 20px #00ff66' : '0 0 10px #00ff66',
          transform: 'translate(-50%, -50%)'
        }}
      />

      <aside className="fixed left-0 top-0 h-full w-20 border-r border-white/[0.02] bg-[#03030c]/30 backdrop-blur-xl flex flex-col items-center justify-between py-10 z-50 hidden lg:flex">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-[#00ff66]/30 flex items-center justify-center font-black text-[#00ff66] text-base shadow-[0_0_15px_rgba(0,255,102,0.2)]">MR</div>
        <div className="flex flex-col space-y-8 text-lg font-bold text-zinc-600">
          <span onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} className={`cursor-pointer transition-colors ${activeTab === 'Home' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`} onClick={() => handleTabNavigation('Home')}>⚡</span>
          <span onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} className={`cursor-pointer transition-colors ${activeTab === 'About' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`} onClick={() => handleTabNavigation('About')}>📂</span>
          <span onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} className={`cursor-pointer transition-colors ${activeTab === 'Blog' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`} onClick={() => handleTabNavigation('Blog')}>📝</span>
        </div>
      </aside>

      <div className={`lg:pl-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 relative z-10 space-y-32 transition-all duration-700 ${showContactModal ? 'blur-3xl opacity-10 scale-[0.98] pointer-events-none' : ''}`}>
        <nav className="w-full flex justify-between items-center border-b border-white/[0.02] pb-4">
          <div className="flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 hidden md:flex">
            {navLinks.map((link) => (
              <span 
                key={link} onClick={() => handleTabNavigation(link)}
                onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)}
                className={`cursor-pointer transition-all duration-300 ${activeTab === link ? 'text-white border-b-2 border-[#00ff66] pb-2' : 'hover:text-white'}`}
              >
                {link}
              </span>
            ))}
          </div>
          <button onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} onClick={() => handleTabNavigation('Contact')} className="ml-auto px-6 py-2.5 rounded-xl bg-zinc-950 border border-[#00ff66]/40 text-[#00ff66] font-extrabold text-[10px] tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,102,0.15)]">Let's Talk</button>
        </nav>

        {/* HERO */}
        <div ref={homeRef} className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/20 text-[9px] font-black text-[#00ff66] tracking-widest uppercase animate-pulse">// SECURITY ENCLAVE COGNITIVE NODES: SECURE</div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-white">Manish Rajdoot.</h2>
              <p className="text-xs text-zinc-400 max-w-md leading-relaxed font-sans font-medium">Data Scientist & Programmer specializing in algorithmic database sequences and high-fidelity modular system architectures.</p>
            </div>
            
            {/* 🟢 ADVANCED MECHANICAL ROBOT PART DECONSTRUCTION PORTAL (REFERENCING image_0.png) */}
            <div className="relative shrink-0 select-none">
              <div className="relative w-48 h-48 rounded-full border-2 border-[#00ff66]/60 bg-[#03030c] shadow-[0_0_40px_rgba(0,255,102,0.25)] overflow-hidden flex items-center justify-center group">
                
                {/* Definitive Matrix Green Grid Scanning Overlay inside circle boundary */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff66]/5 to-transparent animate-[pulse_3s_infinite] pointer-events-none z-10" />

                {/* FULL CUSTOM EMBEDDED MECHANICS SVG */}
                <svg 
                  className="w-40 h-40 select-none" 
                  viewBox="0 0 200 200" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* DEFINITIONS FOR TIME-SYNCED MATRIX BREAKDOWN KEYFRAMES */}
                  <defs>
                    <style>{`
                      /* 
                        ANIMATION TIMING MAP:
                        0% - 25%: Full assembled face (Static Stable State)
                        25% - 40%: Exploding/Disassembling apart into pieces
                        40% - 60%: Disassembled state (Frozen separated pieces inside boundary)
                        60% - 80%: Reassembling/Snapping back together smoothly
                        80% - 100%: Full assembled face again (Stable loop) 
                      */

                      /* 1. Face Brain Shell Outline - Drops heavily down/right and scales slightly */
                      .bot-face-shell {
                        animation: disassembleShell 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                        transform-origin: 100px 115px;
                      }
                      @keyframes disassembleShell {
                        0%, 25%, 80%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
                        40%, 60% { transform: translate(8px, 18px) scale(0.96); opacity: 0.9; }
                      }

                      /* 2. Top Antennas Nodes - Blast upwards and tilt sharply outwards */
                      .bot-antennas {
                        animation: disassembleAntennas 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                        transform-origin: 100px 65px;
                      }
                      @keyframes disassembleAntennas {
                        0%, 25%, 80%, 100% { transform: translate(0, 0) rotate(0deg); }
                        40%, 60% { transform: translate(-10px, -32px) rotate(-20deg); }
                      }

                      /* 3. Left Audio Sensor/Ear - Blasts heavily to the deep left boundary limit */
                      .bot-left-ear {
                        animation: disassembleLeftEar 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                      }
                      @keyframes disassembleLeftEar {
                        0%, 25%, 80%, 100% { transform: translate(0, 0); }
                        40%, 60% { transform: translate(-28px, 10px); }
                      }

                      /* 4. Right Audio Sensor/Ear - Blasts heavily to the deep right boundary limit */
                      .bot-right-ear {
                        animation: disassembleRightEar 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                      }
                      @keyframes disassembleRightEar {
                        0%, 25%, 80%, 100% { transform: translate(0, 0); }
                        40%, 60% { transform: translate(28px, 10px); }
                      }

                      /* 5. Left Heart Eye - Floating towards upper-left inside face radius */
                      .bot-left-heart {
                        animation: disassembleLeftHeart 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                        transform-origin: 75px 115px;
                      }
                      @keyframes disassembleLeftHeart {
                        0%, 25%, 80%, 100% { transform: translate(0, 0) scale(1); filter: drop-shadow(0 0 2px rgba(239,68,68,0.4)); }
                        40%, 60% { transform: translate(-18px, -18px) scale(0.85); filter: drop-shadow(0 0 8px rgba(239,68,68,0.8)); }
                      }

                      /* 6. Right Heart Eye - Floating towards upper-right inside face radius */
                      .bot-right-heart {
                        animation: disassembleRightHeart 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                        transform-origin: 125px 115px;
                      }
                      @keyframes disassembleRightHeart {
                        0%, 25%, 80%, 100% { transform: translate(0, 0) scale(1); filter: drop-shadow(0 0 2px rgba(239,68,68,0.4)); }
                        40%, 60% { transform: translate(18px, -18px) scale(0.85); filter: drop-shadow(0 0 8px rgba(239,68,68,0.8)); }
                      }

                      /* 7. Cyber Grid Mouth - Drops down heavily towards bottom boundary and fades slightly */
                      .bot-mouth {
                        animation: disassembleMouth 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                      }
                      @keyframes disassembleMouth {
                        0%, 25%, 80%, 100% { transform: translate(0, 0); opacity: 1; }
                        40%, 60% { transform: translate(0, 22px); opacity: 0.7; }
                      }
                    `}</style>
                  </defs>

                  {/* GROUP 1: LEFT EAR ASSEMBLY */}
                  <g className="bot-left-ear">
                    <rect x="22" y="103" width="16" height="24" rx="4" fill="#8E8E93" />
                    <rect x="34" y="93" width="6" height="44" rx="2" fill="#AEAEB2" />
                  </g>

                  {/* GROUP 2: RIGHT EAR ASSEMBLY */}
                  <g className="bot-right-ear">
                    <rect x="162" y="103" width="16" height="24" rx="4" fill="#8E8E93" />
                    <rect x="160" y="107" width="4" height="16" rx="1" fill="#AEAEB2" />
                  </g>

                  {/* GROUP 3: TOP ANTENNAS ASSEMBLY */}
                  <g className="bot-antennas">
                    <rect x="93" y="65" width="14" height="8" fill="#AEAEB2" />
                    <path d="M100 65l-8-22h10l-6-14" stroke="#AEAEB2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="96" cy="25" r="8" fill="#FFE600" />
                  </g>

                  {/* GROUP 4: MAIN HEAD SHELL (REFERENCES image_0.png shape) */}
                  <g className="bot-face-shell">
                    <path d="M40 115c0-35.346 26.852-64 60-64s60 28.654 60 64v5c0 22.091-17.909 40-40 40H80c-22.091 0-40-17.909-40-40v-5z" fill="#747478" />
                    {/* Internal Depth Layer or Overlay */}
                    <path d="M46 115c0-32 23-58 54-58s54 26 54 58v4c0 19-15 34-34 34H80c-19 0-34-15-34-34v-4z" fill="#636366" opacity="0.4" />
                  </g>

                  {/* GROUP 5: LEFT HEART EYE (REFERENCES image_0.png) */}
                  <g className="bot-left-heart">
                    <path d="M75 102c-3.5-4-9-4-12.5 0-3.5 4-3.5 10 0 14l12.5 12 12.5-12c3.5-4 3.5-10 0-14-3.5-4-9-4-12.5 0z" fill="#FF453A" />
                  </g>

                  {/* GROUP 6: RIGHT HEART EYE (REFERENCES image_0.png) */}
                  <g className="bot-right-heart">
                    <path d="M125 102c-3.5-4-9-4-12.5 0-3.5 4-3.5 10 0 14l12.5 12 12.5-12c3.5-4 3.5-10 0-14-3.5-4-9-4-12.5 0z" fill="#FF453A" />
                  </g>

                  {/* GROUP 7: CYBER RECTANGLE TOOTH MOUTH (REFERENCES image_0.png mouth) */}
                  <g className="bot-mouth">
                    <rect x="76" y="142" width="48" height="18" rx="9" fill="#1C1C1E" />
                    <rect x="94" y="142" width="12" height="7" rx="1" fill="#FFFFFF" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div ref={aboutRef} className="scroll-mt-24">
          <section className="p-8 rounded-2xl bg-[#04040c]/80 border border-white/[0.03] max-w-4xl space-y-4 shadow-xl">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// SYSTEM_BIOGRAPHY_CORE</span>
            <h3 className="text-2xl font-black text-white uppercase tracking-wide">Bypassing Latency Matrix Barriers</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans font-medium">
              I am a data scientist and programmer deeply involved in performance engineering. My core competency lies in optimizing complex dataset structures, large matrix manipulations, and developing high-velocity data stream orchestration models. Whether it's structural backend query adjustments under PL/SQL trigger routines or developing Next.js modular frontend enclaves, I construct absolute invincible foundations for tech layouts.
            </p>
          </section>
        </div>

        {/* SKILLS */}
        <div ref={skillsRef} className="scroll-mt-24">
          <section className="space-y-6">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// INTEL_CAPABILITIES</span>
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
          </section>
        </div>

        {/* REPOSITORIES GRID LAYER */}
        <div ref={projectsRef} className="scroll-mt-24">
          <section className="space-y-6">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// PRODUCTION_BLUEPRINTS</span>
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">Live Repositories Portal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(githubLoading ? fallbackRepos : githubRepos).map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="p-5 bg-[#04040e]/90 border border-white/[0.03] hover:border-[#00ff66]/30 rounded-xl flex flex-col justify-between group transition-all">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-zinc-600">
                      <span className="text-[8px] font-mono bg-white/[0.02] border border-white/[0.05] rounded px-2 py-0.5 uppercase tracking-wider">GitHub Live Asset</span>
                      <span className="text-xs group-hover:text-[#00ff66] transition-colors">📦</span>
                    </div>
                    <h4 className="text-sm font-black text-white group-hover:text-[#00ff66] truncate uppercase tracking-wide">{repo.name}</h4>
                    <p className="text-[11px] text-zinc-500 line-clamp-2 h-8 leading-relaxed font-sans">{repo.description || '// Active codebase repository link / automated system node.'}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.02] mt-3 text-[10px] text-zinc-500 font-mono font-bold">
                    <span className="text-[#00ff66] text-[8px] uppercase bg-emerald-950/20 px-2 py-0.5 rounded">{repo.language || 'Code'}</span>
                    <div className="flex space-x-3"><span>⭐ {repo.stargazers_count}</span><span>🍴 {repo.forks_count}</span></div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* EXPERIENCE TIMELINE */}
        <div ref={experienceRef} className="scroll-mt-24">
          <section className="space-y-6">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// TIMELINE_LOGS</span>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {experienceTimeline.map((exp, idx) => (
                <div key={idx} className="bg-[#04040c]/40 border border-white/[0.02] p-6 rounded-xl space-y-2 hover:border-[#00ff66]/20 transition-all">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-zinc-600 mb-1">
                    <span className="text-[#00ff66]">⚡ INFRASTRUCTURE_NODE_0{idx+1}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wide">{exp.role}</h4>
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-wide">{exp.company}</p>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-2 border-t border-white/[0.02] mt-2">{exp.lines}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* NEW ADDITION NODE: SQL TERMINAL METRIC PROFILER SECTION */}
        <div className="scroll-mt-24 bg-[#04040c]/50 p-6 border border-white/[0.02] rounded-2xl shadow-xl">
          <div className="mb-6">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// LIVE_DATABASE_METRIC_PROFILER</span>
            <p className="text-[11px] text-zinc-500 font-sans mt-1">Execute active queries to profile server latency maps and index scans.</p>
          </div>
          <SqlTerminal />
        </div>

        {/* BLOG MODULE */}
        <div ref={blogRef} className="scroll-mt-24">
          <BlogModule />
        </div>
      </div>

      {/* OVERLAY WITH AUTO MOUSE VALUE OVERRIDE FORCE */}
      {showContactModal && (
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-hidden">
          <div className="relative w-full max-w-xl my-auto block">
            <ContactForm onClose={() => setShowContactModal(false)} />
          </div>
        </div>
      )}

      <AIChatbubble />

      <footer className="w-full border-t border-white/[0.02] bg-[#020206] py-6 flex justify-between items-center px-8 text-[9px] text-zinc-600 font-bold tracking-widest uppercase relative z-40 mt-16 select-none">
        <span>Framework Compiled Stable // 2026</span>
        <span>© Manish Rajdoot. All networks secured.</span>
      </footer>
    </div>
  );
}