"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const countryDatabase = [
    { name: 'India', flag: '🇮🇳', code: '+91' },
    { name: 'United States', flag: '🇺🇸', code: '+1' },
    { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
    { name: 'Germany', flag: '🇩🇪', code: '+49' },
    { name: 'Canada', flag: '🇨🇦', code: '+1' },
    { name: 'Australia', flag: '🇦🇺', code: '+61' },
    { name: 'Japan', flag: '🇯🇵', code: '+81' }
  ];

  const [formStatus, setFormStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [statusMessage, setStatusMessage] = useState('');
  const [formDataState, setFormDataState] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [selectedCountry, setSelectedCountry] = useState({ name: 'India', flag: '🇮🇳', code: '+91' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [captchaChallenge, setCaptchaChallenge] = useState({ token: '', answer: '' });
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 2;
    const num2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaChallenge({ token: `${num1} + ${num2} = ?`, answer: String(num1 + num2) });
    setUserCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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
    setStatusMessage('Syncing network vectors...');

    const submissionPayload = new FormData();
    submissionPayload.append('firstName', formDataState.firstName);
    submissionPayload.append('lastName', formDataState.lastName);
    submissionPayload.append('email', formDataState.email);
    submissionPayload.append('countryName', selectedCountry.name);
    submissionPayload.append('countryCode', selectedCountry.code);
    submissionPayload.append('phone', formDataState.phone);
    submissionPayload.append('message', formDataState.message);
    attachedFiles.forEach(file => submissionPayload.append('attachments', file));

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: submissionPayload });
      if (res.ok) {
        setFormStatus('SUCCESS');
        setStatusMessage('// LIVE TRANSFER ACCURATE: Mail packets dispatched.');
        setFormDataState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
        setAttachedFiles([]);
        generateCaptcha();
        if (onClose) setTimeout(onClose, 2000);
      } else {
        setFormStatus('ERROR');
        setStatusMessage('// EXCEPTION: Server gateway rejected frame formats.');
      }
    } catch {
      setFormStatus('ERROR');
      setStatusMessage('// PIPELINE FAULT: API channel drop or network failure.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-[#03030c]/95 border border-[#00ff66]/20 rounded-2xl shadow-2xl relative z-10">
      
      {/* ✕ CLOSE BUTTON ON TOP RIGHT CORNER */}
      {onClose && (
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white border border-white/[0.05] hover:border-[#00ff66]/40 rounded-lg px-3 py-1 bg-zinc-950/60 text-[10px] font-mono font-bold tracking-wider transition-all z-20"
        >
          [ ✕ CLOSE_GATEWAY ]
        </button>
      )}

      <div className="mb-6 space-y-1 pr-24">
        <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] bg-emerald-950/40 px-3 py-1 rounded-full uppercase inline-block">// TRANSMISSION TERMINAL</span>
        <h3 className="text-2xl font-black uppercase tracking-wider text-white">Establish Direct Interface Gateway</h3>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" encType="multipart/form-data">
        <div className="flex flex-col space-y-1">
          <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">First Name *</label>
          <input required name="firstName" type="text" value={formDataState.firstName} onChange={handleInputChange} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3.5 rounded-xl outline-none text-white font-sans" placeholder="Manish" />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Last Name *</label>
          <input required name="lastName" type="text" value={formDataState.lastName} onChange={handleInputChange} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3.5 rounded-xl outline-none text-white font-sans" placeholder="Rajdoot" />
        </div>

        <div className="flex flex-col space-y-1 col-span-2">
          <div className="flex justify-between items-center">
            <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Verified Email Signature *</label>
            {emailValid !== null && (
              <span className={`text-[8px] font-mono font-bold ${emailValid ? 'text-[#00ff66]' : 'text-red-400 animate-pulse'}`}>
                {emailValid ? '// CRYPTO_OK' : '// MALFORMED_BLOCK'}
              </span>
            )}
          </div>
          <input required name="email" type="email" value={formDataState.email} onChange={handleInputChange} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3.5 rounded-xl outline-none text-white font-sans" placeholder="name@domain.com" />
        </div>

        <div className="flex flex-col col-span-2 space-y-1 relative">
          <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Phone Signature Matrix *</label>
          <div className="flex gap-2">
            <div 
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center space-x-1.5 px-3 bg-[#03030c]/90 border border-white/[0.05] rounded-xl text-xs text-white cursor-pointer select-none min-w-[75px]"
            >
              <span>{selectedCountry.flag}</span>
              <span className="text-[10px] text-zinc-400 font-mono font-bold">{selectedCountry.code}</span>
            </div>
            <input required name="phone" type="text" value={formDataState.phone} onChange={handleInputChange} className="w-full bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3.5 rounded-xl outline-none text-white font-sans" placeholder="98765-43210" />

            {showCountryDropdown && (
              <div className="absolute top-12 left-0 w-64 max-h-48 overflow-y-auto bg-[#04040e] border border-white/[0.08] rounded-xl z-[60] p-1.5">
                {countryDatabase.map((c, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setSelectedCountry(c); setShowCountryDropdown(false); }}
                    className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg text-xs text-zinc-300 cursor-pointer"
                  >
                    <span>{c.flag} {c.name}</span>
                    <span className="text-[10px] font-mono text-[#00ff66] font-bold">{c.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-1 col-span-2">
          <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Transmission Node Message *</label>
          <textarea required name="message" value={formDataState.message} onChange={handleInputChange} rows={3} className="bg-[#03030c]/90 border border-white/[0.05] focus:border-[#00ff66] text-xs p-3 rounded-xl text-white outline-none resize-none" placeholder="Elaborate project specifications or code blocks here..." />
        </div>

        <div className="col-span-2 bg-black/40 border border-white/[0.02] p-4 rounded-xl flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase font-bold text-zinc-500">📁 Attached Payload Buffers Staging Rack</span>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[9px] font-bold px-2.5 py-1 bg-zinc-900 border border-white/[0.05] text-[#00ff66] rounded-lg">+ Add Files</button>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => e.target.files && setAttachedFiles(prev => [...prev, ...Array.from(e.target.files!)])} />
          </div>
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 max-h-20 overflow-y-auto">
              {attachedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-[#060614] border border-white/[0.05] px-2.5 py-1 rounded-lg text-[9px]">
                  <span className="text-zinc-400 truncate max-w-[120px]">{file.name}</span>
                  <button type="button" onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-white font-bold ml-1">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2 bg-[#050512] border border-white/[0.04] p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-[9px] font-mono font-bold text-[#00ff66] tracking-wider">🛡️ SHIELD SECURE KEY:</span>
            <span className="bg-zinc-950 text-[#00ff66] font-mono font-black text-xs px-3 py-1.5 rounded border border-[#00ff66]/20 tracking-widest uppercase">
              {captchaChallenge.token}
            </span>
          </div>
          <input required type="text" value={userCaptchaInput} onChange={(e) => userCaptchaInput(e.target.value)} placeholder="Decrypt Key" className="bg-[#03030c] border border-white/[0.08] focus:border-[#00ff66] text-xs p-2 rounded-lg text-white font-mono w-full sm:w-44 text-center uppercase tracking-widest" />
        </div>

        <div className="col-span-2 pt-2 space-y-2">
          <button 
            type="submit" 
            disabled={formStatus === 'SENDING'}
            className="w-full py-3.5 rounded-xl bg-zinc-950 border border-[#00ff66]/40 text-[#00ff66] font-black text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(0,255,102,0.1)] transition-all disabled:opacity-40"
          >
            {formStatus === 'SENDING' ? 'Syncing Network Vectors...' : 'EXECUTE SYSTEM NODE UPLINK 📡'}
          </button>

          {formStatus !== 'IDLE' && (
            <div className={`p-3 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-widest ${formStatus === 'SUCCESS' ? 'bg-green-950/20 border-green-500/20 text-green-400' : 'bg-red-950/20 border-red-500/20 text-red-400'}`}>
              {statusMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}