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
        if (onClose) setTimeout(onClose, 1800);
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
    <div 
      className="w-full bg-[#03030c] border border-[#00ff66] rounded-2xl p-5 md:p-6 shadow-[0_0_35px_rgba(0,255,102,0.25)] relative mx-auto select-text !cursor-default"
      style={{ maxWidth: '600px', cursor: 'default' }} // Strict override for standard arrow cursor pointer fallback
    >
      <div className="flex justify-between items-center border-b border-white/[0.05] pb-3 mb-4 !cursor-default" style={{ cursor: 'default' }}>
        <div className="space-y-0.5">
          <span className="text-[9px] font-black tracking-[0.3em] text-[#00ff66] bg-emerald-950/50 px-2.5 py-0.5 rounded-full uppercase inline-block">// TRANSMISSION TERMINAL</span>
          <h3 className="text-lg font-black uppercase tracking-wider text-white">Establish Direct Interface</h3>
        </div>
        {onClose && (
          <button 
            type="button" 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white font-mono font-bold text-[10px] border border-white/[0.08] hover:border-[#00ff66]/40 rounded-md px-2.5 py-1 bg-zinc-950 transition-all shadow-[0_0_10px_rgba(0,255,102,0.05)] !cursor-pointer"
            style={{ cursor: 'pointer' }}
          >
            [ ESC_CLOSE ]
          </button>
        )}
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-3.5 text-left !cursor-default" style={{ cursor: 'default' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">First Name *</label>
            <input required name="firstName" type="text" value={formDataState.firstName} onChange={handleInputChange} className="bg-[#050512] border border-white/[0.05] focus:border-[#00ff66] text-xs p-3 rounded-xl outline-none text-white w-full font-mono !cursor-text" style={{ cursor: 'text' }} placeholder="Manish" />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Last Name *</label>
            <input required name="lastName" type="text" value={formDataState.lastName} onChange={handleInputChange} className="bg-[#050512] border border-white/[0.05] focus:border-[#00ff66] text-xs p-3 rounded-xl outline-none text-white w-full font-mono !cursor-text" style={{ cursor: 'text' }} placeholder="Rajdoot" />
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Verified Email Signature *</label>
            {emailValid !== null && (
              <span className={`text-[8px] font-mono font-bold ${emailValid ? 'text-[#00ff66]' : 'text-red-400 animate-pulse'}`}>
                {emailValid ? '// CRYPTO_OK' : '// MALFORMED_BLOCK'}
              </span>
            )}
          </div>
          <input required name="email" type="email" value={formDataState.email} onChange={handleInputChange} className="w-full bg-[#050512] border border-white/[0.05] focus:border-[#00ff66] text-xs p-3 rounded-xl outline-none text-white font-mono !cursor-text" style={{ cursor: 'text' }} placeholder="name@domain.com" />
        </div>

        <div className="flex flex-col space-y-1 relative">
          <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Phone Signature Matrix *</label>
          <div className="flex gap-2">
            <div 
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center space-x-1.5 px-3 bg-[#050512] border border-white/[0.05] rounded-xl text-xs text-white select-none min-w-[75px] justify-center !cursor-pointer"
              style={{ cursor: 'pointer' }}
            >
              <span>{selectedCountry.flag}</span>
              <span className="text-[10px] text-zinc-400 font-mono font-bold">{selectedCountry.code}</span>
            </div>
            <input required name="phone" type="text" value={formDataState.phone} onChange={handleInputChange} className="w-full bg-[#050512] border border-white/[0.05] focus:border-[#00ff66] text-xs p-3 rounded-xl outline-none text-white font-mono !cursor-text" style={{ cursor: 'text' }} placeholder="98765-43210" />

            {showCountryDropdown && (
              <div className="absolute top-[62px] left-0 w-full sm:w-64 max-h-36 overflow-y-auto bg-[#04040e] border border-[#00ff66]/40 rounded-xl z-[60] p-1.5 shadow-[0_0_15px_rgba(0,255,102,0.2)] !cursor-default" style={{ cursor: 'default' }}>
                {countryDatabase.map((c, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setSelectedCountry(c); setShowCountryDropdown(false); }}
                    className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg text-xs text-zinc-300 font-mono !cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    <span>{c.flag} {c.name}</span>
                    <span className="text-[10px] font-mono text-[#00ff66] font-bold">{c.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Transmission Node Message *</label>
          <textarea required name="message" value={formDataState.message} onChange={handleInputChange} rows={2} className="w-full bg-[#050512] border border-white/[0.05] focus:border-[#00ff66] text-xs p-3 rounded-xl text-white outline-none resize-none font-mono !cursor-text" style={{ cursor: 'text' }} placeholder="Elaborate project specifications..." />
        </div>

        <div className="bg-black/40 border border-white/[0.02] p-2.5 rounded-xl flex flex-col space-y-2 !cursor-default" style={{ cursor: 'default' }}>
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase font-bold text-zinc-500 font-mono">📁 Payload Buffers Staging Rack</span>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[9px] font-bold px-2.5 py-1 bg-zinc-900 border border-white/[0.05] text-[#00ff66] rounded-lg hover:bg-[#00ff66]/10 transition-all !cursor-pointer" style={{ cursor: 'pointer' }}>+ Add Files</button>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => e.target.files && setAttachedFiles(prev => [...prev, ...Array.from(e.target.files!)])} />
          </div>
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 max-h-12 overflow-y-auto">
              {attachedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-[#060614] border border-white/[0.05] px-2.5 py-1 rounded-lg text-[9px]">
                  <span className="text-zinc-400 truncate max-w-[120px] font-mono">{file.name}</span>
                  <button type="button" onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-white font-bold ml-1 !cursor-pointer" style={{ cursor: 'pointer' }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-[#050512] border border-white/[0.04] p-2.5 rounded-xl flex items-center justify-between gap-4 !cursor-default" style={{ cursor: 'default' }}>
          <span className="text-[9px] text-[#00ff66] font-mono font-bold uppercase tracking-wider">🛡️ KEY CHALLENGE: {captchaChallenge.token}</span>
          <input required type="text" value={userCaptchaInput} onChange={(e) => userCaptchaInput(e.target.value)} placeholder="Decrypt" className="bg-[#03030c] border border-white/[0.08] focus:border-[#00ff66] text-xs p-2 rounded-lg text-white w-24 text-center font-mono !cursor-text" style={{ cursor: 'text' }} />
        </div>

        <div className="space-y-2 pt-1">
          <button type="submit" className="w-full py-3 rounded-xl bg-zinc-950 border border-[#00ff66]/60 hover:border-[#00ff66] text-[#00ff66] font-black text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(0,255,102,0.15)] hover:shadow-[0_0_25px_rgba(0,255,102,0.35)] transition-all !cursor-pointer" style={{ cursor: 'pointer' }}>
            {formStatus === 'SENDING' ? 'SYNCING VECTORS...' : 'EXECUTE SYSTEM NODE UPLINK 📡'}
          </button>

          {formStatus !== 'IDLE' && (
            <div className={`p-2 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-widest ${formStatus === 'SUCCESS' ? 'bg-green-950/30 border-green-500/30 text-green-400' : 'bg-red-950/30 border-red-500/30 text-red-400'}`}>
              {statusMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}