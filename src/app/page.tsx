"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export default function CompleteProductionPortfolio() {
  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Blog', 'Contact'];

  const countryDatabase = [
    { name: 'India', flag: '🇮🇳', code: '+91' },
    { name: 'United States', flag: '🇺🇸', code: '+1' },
    { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
    { name: 'Germany', flag: '🇩🇪', code: '+49' },
    { name: 'Canada', flag: '🇨🇦', code: '+1' }
  ];

  const toolkit = [
    { name: "Data Science & Analytics", type: "Expert / Python", desc: "Advanced data compilation pipelines, predictive modeling, machine learning clustering, structural dataset tuning, and analytics manipulation with Pandas, NumPy, and Scikit-Learn." },
    { name: "Next.js 15 & React 19", type: "Advanced / Meta", desc: "Serverless web orchestration, React Server Components (RSC) isolation, advanced state routing layers, performance optimization, and fluid client hydration patterns." },
    { name: "Relational DB (PL/SQL)", type: "Expert / Database", desc: "Designing automated transaction blocks, custom sequential packages, complex database mutations triggers shield, indices tuning, and structural relational querying logic." },
    { name: "Node.js & Express Stack", type: "Backend / Automation", desc: "Building secure asynchronous REST API layers, parsing multi-part payload streams, microservice endpoint engineering, and strong gateway encryption logic rows." },
    { name: "TypeScript & Python Core", type: "Languages / Stable", desc: "Deploying strict compiler type safety models, parallel data sorting, multi-threaded script automation routines, and deep system ledger validation scripts." },
    { name: "Tailwind CSS & Canvas Architecture", type: "Design Systems", desc: "Structuring intricate responsive grids, premium neon cyber glassmorphic frames components, interactive tracking filters, and raw matrix stream blending shaders." }
  ];

  const experienceTimeline = [
    { role: "Full Stack Developer Intern", company: "Zeetron Network, Jaipur", duration: "Jan 2024 — Apr 2024", lines: "Directed the development of robust data processing backend engines and integrated stateful frontend interface views to scale web app workflows under custom corporate MERN deployments." },
    { role: "Python Developer Intern", company: "Zeetron Network, Jaipur", duration: "Sep 2023 — Dec 2023", lines: "Formulated highly optimized data parser scripts and designed restful synchronization middleware hooks using Python, Flask, and customized asynchronous thread scheduling protocols." },
    { role: "PL/SQL Database Engineer Intern", company: "Wipro TechAdemy", duration: "May 2023 — Aug 2023", lines: "Architected structured relational trigger sequences, engineered database audit schemas, and drastically decreased transaction load execution bottlenecks via deep query optimization passes." }
  ];

  const fallbackRepos: Repo[] = [
    { id: 1, name: "MicroStart Platform", description: "A robust micro SaaS automation ecosystem generating continuous daily startup business formulations, integrated programmatic toolkits, and dynamic token checkout frameworks with Stripe billing APIs.", html_url: "https://github.com/manishrajdoot?tab=repositories", stargazers_count: 5, forks_count: 2, language: "Next.js" },
    { id: 2, name: "WallShift Manager", description: "A professional low-latency wallpaper application for Windows architectures featuring system-level customization layers and responsive graphical user interface blocks.", html_url: "https://github.com/manishrajdoot?tab=repositories", stargazers_count: 3, forks_count: 1, language: "Electron" },
    { id: 3, name: "Phonebook Diary PWA", description: "Progressive Web Application platform enabling users to encrypt, manipulate, search, and store contact node parameters securely through cloud synchronized pipelines.", html_url: "https://github.com/manishrajdoot?tab=repositories", stargazers_count: 4, forks_count: 0, language: "React" }
  ];

  // 📝 FULL EXTENDED MARKDOWN BLOG ENCLAVE DATA ENGINE
  const blogDatabase = [
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
        <pre>// Advanced Route Generation Vector\\nexport async function generateStaticParams() {\\n  return [{ nodeEnclave: 'stable-core-matrix' }];\\n}</pre>
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
        <pre>CREATE OR REPLACE TRIGGER Matrix_Uplink_Guard\\nBEFORE INSERT ON Network_Log_Stream\\nFOR EACH ROW\\nBEGIN\\n  :NEW.synchronized_at := SYSTIMESTAMP;\\nEND;</pre>
      `
    }
  ];

  const [activeTab, setActiveTab] = useState('Home');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<typeof blogDatabase[0] | null>(null);
  const [formStatus, setFormStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [statusMessage, setStatusMessage] = useState('');

  const [formDataState, setFormDataState] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [selectedCountry, setSelectedCountry] = useState({ name: 'India', flag: '🇮🇳', code: '+91' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [captchaChallenge, setCaptchaChallenge] = useState({ token: '', answer: '' });
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  const [githubRepos, setGithubRepos] = useState<Repo[]>([]);
  const [githubLoading, setGithubLoading] = useState(true);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isViewObscured = showContactModal || selectedBlog !== null;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const matrixChars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1023456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = matrixChars.split("");
    
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const rainDrops = new Array(columns).fill(1);

    const drawMatrixRain = () => {
      ctx.fillStyle = "rgba(2, 2, 8, 0.06)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.975 ? "#fff" : "#00ff66";
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
      animationId = requestAnimationFrame(drawMatrixRain);
    };

    drawMatrixRain();
    const handleResize = () => { if (canvas) { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; } };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchGitHubData() {
      try {
        const res = await fetch('https://api.github.com/users/manishrajdoot/repos?sort=updated&per_page=6');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
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
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 2;
    const num2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaChallenge({ token: `${num1} + ${num2} = ?`, answer: String(num1 + num2) });
    setUserCaptchaInput('');
  };

  useEffect(() => { generateCaptcha(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataState(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userCaptchaInput !== captchaChallenge.answer) {
      setFormStatus('ERROR');
      setStatusMessage('// REJECTION: CAPTCHA validation key mismatch.');
      return;
    }

    setFormStatus('SENDING');
    const submissionPayload = new FormData();
    submissionPayload.append('firstName', formDataState.firstName);
    submissionPayload.append('lastName', formDataState.lastName);
    submissionPayload.append('email', formDataState.email);
    submissionPayload.append('message', formDataState.message);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: submissionPayload });
      if (res.ok) {
        setFormStatus('SUCCESS');
        setFormDataState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
        setTimeout(() => { setShowContactModal(false); setFormStatus('IDLE'); }, 2500);
      } else {
        setFormStatus('ERROR');
      }
    } catch {
      setFormStatus('ERROR');
    }
  };

  const handleTabNavigation = (link: string) => {
    setActiveTab(link);
    if (link === 'Contact') { setShowContactModal(true); return; }
    setShowContactModal(false);
    setSelectedBlog(null);

    const targets: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
      Home: homeRef, About: aboutRef, Skills: skillsRef, Projects: projectsRef, Experience: experienceRef, Blog: blogRef
    };
    const element = targets[link]?.current;
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen bg-[#020208] text-[#b4b4b4] font-mono [cursor:none] select-none">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40" />
      <div className="fixed pointer-events-none rounded-full z-[9999] transition-transform duration-75 mix-blend-difference hidden lg:block" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, width: cursorHovered ? '48px' : '11px', height: cursorHovered ? '48px' : '11px', border: cursorHovered ? '2px solid #00ff66' : 'none', backgroundColor: cursorHovered ? 'rgba(0,255,102,0.1)' : '#00ff66', boxShadow: cursorHovered ? '0 0 20px #00ff66' : '0 0 10px #00ff66', transform: 'translate(-50%, -50%)' }} />
      
      <aside className="fixed left-0 top-0 h-full w-20 border-r border-white/[0.02] bg-[#03030c]/30 backdrop-blur-xl flex flex-col items-center justify-between py-10 z-50 hidden lg:flex">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-[#00ff66]/30 flex items-center justify-center font-black text-[#00ff66] text-base">MR</div>
        <div className="flex flex-col space-y-8 text-lg font-bold text-zinc-600">
          <span className={`cursor-pointer transition-colors ${activeTab === 'Home' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`} onClick={() => handleTabNavigation('Home')}>⚡</span>
          <span className={`cursor-pointer transition-colors ${activeTab === 'About' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`} onClick={() => handleTabNavigation('About')}>📂</span>
          <span className={`cursor-pointer transition-colors ${activeTab === 'Blog' ? 'text-[#00ff66]' : 'hover:text-[#00ff66]'}`} onClick={() => handleTabNavigation('Blog')}>📝</span>
        </div>
      </aside>

      <div className={`lg:pl-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 relative z-10 space-y-32 transition-all duration-700 ${isViewObscured ? 'blur-3xl opacity-10 scale-[0.98] pointer-events-none' : ''}`}>
        <nav className="w-full flex justify-between items-center border-b border-white/[0.02] pb-4">
          <div className="flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 hidden md:flex">
            {navLinks.map((link) => <span key={link} onClick={() => handleTabNavigation(link)} className={`cursor-pointer transition-all duration-300 ${activeTab === link ? 'text-white border-b-2 border-[#00ff66] pb-2' : 'hover:text-white'}`}>{link}</span>)}
          </div>
          <button onClick={() => handleTabNavigation('Contact')} className="ml-auto px-6 py-2.5 rounded-xl bg-zinc-950 border border-[#00ff66]/40 text-[#00ff66] font-extrabold text-[10px] tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,102,0.15)]">Let's Talk</button>
        </nav>

        {/* HERO */}
        <div ref={homeRef} className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/20 text-[9px] font-black text-[#00ff66] tracking-widest uppercase animate-pulse">// SECURITY ENCLAVE COGNITIVE NODES: SECURE</div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-white">Manish Rajdoot.</h2>
              <p className="text-xs text-zinc-400 max-w-md leading-relaxed font-sans font-medium">Data Scientist & Programmer specializing in algorithmic database sequences and high-fidelity modular system architectures.</p>
            </div>
            <div className="relative shrink-0 select-none">
              <div className="w-48 h-48 rounded-full border-2 border-[#00ff66]/40 bg-cover bg-center shadow-[0_0_40px_rgba(0,255,102,0.25)]" style={{ backgroundImage: "url('https://api.dicebear.com/7.x/bottts/svg?seed=Ninja&backgroundColor=03030c')" }} />
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div ref={aboutRef} className="scroll-mt-24">
          <section className="p-8 rounded-2xl bg-[#04040c]/80 border border-white/[0.03] max-w-4xl space-y-4">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// SYSTEM_BIOGRAPHY_CORE</span>
            <h3 className="text-2xl font-black text-white uppercase tracking-wide">Bypassing Latency Matrix Barriers</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans font-medium">I am a data scientist and programmer optimizing complex database models and Next.js interfaces.</p>
          </section>
        </div>

        {/* SKILLS */}
        <div ref={skillsRef} className="scroll-mt-24">
          <section className="space-y-6">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// INTEL_CAPABILITIES</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolkit.map((item, idx) => (
                <div key={idx} className="p-5 bg-[#04040e]/90 border border-white/[0.03] rounded-xl">
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

        {/* REPOSITORIES */}
        <div ref={projectsRef} className="scroll-mt-24">
          <section className="space-y-6">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] uppercase block">// PRODUCTION_BLUEPRINTS</span>
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">Live GitHub Repositories</h3>
            
            {githubLoading ? (
              <div className="w-full text-center py-12 text-xs font-mono text-[#00ff66] animate-pulse">// STREAMING LIVE NODES...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(githubRepos.length > 0 ? githubRepos : fallbackRepos).map((repo) => (
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="p-5 bg-[#04040e]/90 border border-white/[0.03] hover:border-[#00ff66]/30 rounded-xl flex flex-col justify-between group">
                    <div className="space-y-2">
                      <h4 className="text-sm font-black text-white group-hover:text-[#00ff66] truncate uppercase">{repo.name}</h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-2 h-8">{repo.description || '// Active codebase repository link.'}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/[0.02] mt-3 text-[10px] text-zinc-500">
                      <span className="text-[#00ff66] text-[8px] uppercase">{repo.language || 'Code'}</span>
                      <div className="flex space-x-3"><span>⭐ {repo.stargazers_count}</span><span>🍴 {repo.forks_count}</span></div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* TIMELINE */}
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
                  <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wide">{exp.company}</p>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-2 border-t border-white/[0.02] mt-2">{exp.lines}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* BLOG SYSTEM */}
        <div ref={blogRef} className="scroll-mt-24">
          <section className="space-y-6">
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
          </section>
        </div>
      </div>

      {/* POPUP PREVIEW CONTAINER */}
      {selectedBlog && (
        <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl p-6 md:p-10 relative my-auto bg-[#03030d]/90 border border-[#00ff66]/20 rounded-2xl backdrop-blur-2xl shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/[0.05] pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setSelectedBlog(null)} />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="text-[9px] text-zinc-500 pl-2 tracking-widest uppercase font-bold">// STORAGE_NODE_PREVIEW: {selectedBlog.category}</span>
              </div>
              <button onClick={() => setSelectedBlog(null)} className="text-zinc-500 hover:text-white font-mono font-bold text-[10px] border border-white/[0.05] rounded-md px-2 py-0.5 bg-zinc-950/40">[ CLOSE_STREAM ]</button>
            </div>
            <article className="space-y-4 text-zinc-300 font-mono">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">{selectedBlog.title}</h2>
              <div 
                className="prose prose-invert text-xs md:text-sm font-sans leading-relaxed text-zinc-400 pt-4 border-t border-white/[0.03] space-y-4
                [&>h4]:font-mono [&>h4]:text-[#00ff66] [&>h4]:text-xs [&>h4]:font-black [&>h4]:uppercase [&>h4]:mt-6
                [&>pre]:bg-black/60 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:font-mono [&>pre]:text-[11px] [&>pre]:text-emerald-400 [&>pre]:border [&>pre]:border-white/[0.03] [&>pre]:overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }} 
              />
            </article>
          </div>
        </div>
      )}

      {/* CONTACT TERM TERMINAL */}
      {showContactModal && (
        <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl p-6 md:p-10 relative my-auto bg-[#03030c]/95 border border-[#00ff66]/20 rounded-2xl shadow-2xl">
            <button onClick={() => setShowContactModal(false)} className="absolute top-5 right-6 text-zinc-500 hover:text-white font-mono font-black text-xs border border-white/[0.05] rounded-lg px-2.5 py-1 bg-zinc-950/40">[ ESC_CLOSE ]</button>
            <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-6">Establish Direct Transmission</h3>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required name="firstName" type="text" value={formDataState.firstName} onChange={handleInputChange} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3.5 rounded-xl outline-none text-white" placeholder="First Name" />
              <input required name="lastName" type="text" value={formDataState.lastName} onChange={handleInputChange} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3.5 rounded-xl outline-none text-white" placeholder="Last Name" />
              <input required name="email" type="email" value={formDataState.email} onChange={handleInputChange} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3.5 rounded-xl outline-none text-white col-span-2" placeholder="Email Signature" />
              <textarea name="message" value={formDataState.message} onChange={handleInputChange} rows={3} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3 rounded-xl text-white outline-none resize-none col-span-2" placeholder="Transmission Node Message..." />
              
              <div className="col-span-2 bg-[#050512] border border-white/[0.04] p-3.5 rounded-xl flex items-center justify-between gap-4">
                <span className="text-[9px] text-[#00ff66]">🛡️ KEY: {captchaChallenge.token}</span>
                <input required type="text" value={userCaptchaInput} onChange={(e) => setUserCaptchaInput(e.target.value)} placeholder="Decrypt" className="bg-[#03030c] border border-white/[0.08] text-xs p-2 rounded-lg text-white w-24 text-center" />
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-zinc-950 border border-[#00ff66]/40 text-[#00ff66] font-black text-xs tracking-widest uppercase col-span-2 shadow-[0_0_20px_rgba(0,255,102,0.1)]">EXECUTE NODE UPLINK 📡</button>
            </form>
          </div>
        </div>
      )}

      <footer className="w-full border-t border-white/[0.02] bg-[#020206] py-6 flex justify-between items-center px-8 text-[9px] text-zinc-600 font-bold tracking-widest relative z-40 mt-16 uppercase">
        <span>Framework Compiled Stable // 2026</span>
        <span>© Manish Rajdoot. All networks secured.</span>
      </footer>
    </div>
  );
}