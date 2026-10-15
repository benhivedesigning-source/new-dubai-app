import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types/safety';
import { Shield, Eye, EyeOff, ArrowRight, Sparkles, MapPin, Globe, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginScreen: React.FC = () => {
  const { setIsLoggedIn, language, setLanguage, userProfile, setScreen, showToast, reducedMotion } = useApp();
  const [employeeId, setEmployeeId] = useState(userProfile.id);
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const languages: Language[] = ['English', 'العربية', 'हिन्दी', 'اردو'];
  const isRtl = language === 'العربية' || language === 'اردو';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setScreen('home');
      showToast(`Welcome back, ${userProfile.name}`);
    }, 600);
  };

  const handleDemoExplore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setScreen('home');
      showToast('Signed in as demo employee Alex Morgan');
    }, 400);
  };

  return (
    <div className={`min-h-full bg-[#F6F5F0] text-[#172321] flex flex-col justify-between relative overflow-hidden ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative background grid and animated route lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#172321" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M 0 140 Q 180 240 410 90" fill="none" stroke="#C44724" strokeWidth="2.5" strokeDasharray="8 6" />
          <path d="M -20 320 Q 160 180 430 380" fill="none" stroke="#FF734A" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>

      {/* Upper Hero Visual Area */}
      <div className="relative pt-6 pb-8 px-6 bg-gradient-to-br from-[#172321] via-[#1f302c] to-[#243d37] text-white rounded-b-[40px] shadow-2xl overflow-hidden">
        {/* Glow ambient light */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF734A]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#C44724] flex items-center justify-center shadow-lg ring-2 ring-white/10">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#FF734A] block">Precision in Motion</span>
              <span className="text-xs text-white/70 font-medium">Logistics Training Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium border border-white/15">
            <Globe className="w-3.5 h-3.5 text-[#FF734A]" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-white outline-none cursor-pointer text-xs font-semibold"
            >
              {languages.map(l => (
                <option key={l} value={l} className="bg-[#172321] text-white">{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative z-10 my-3 space-y-2">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight font-['Manrope'] mb-1 text-white">SHIFT</h1>
            <p className="text-sm text-[#DFE3DC] font-light max-w-[280px] italic leading-relaxed">
              “Build safer habits. One shift at a time.”
            </p>
          </motion.div>
        </div>

        {/* Location & Live Sync Banner */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#DFE3DC] relative z-10">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF734A]" />
            <span className="font-medium">Dubai Distribution Centre</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#24624B]/70 px-3 py-1 rounded-full text-[#D9ED96] border border-[#24624B] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9ED96] animate-pulse"></span>
            <span className="font-semibold text-[11px]">Live Sync</span>
          </div>
        </div>
      </div>

      {/* Lower Form & Quick Demo Area */}
      <div className="flex-1 px-6 py-6 max-w-md w-full mx-auto flex flex-col justify-center space-y-6">
        {/* Quick Demo Employee Banner */}
        <div 
          onClick={handleDemoExplore}
          className="bg-white p-4 rounded-3xl border-2 border-[#C44724]/40 shadow-md hover:border-[#C44724] transition-all cursor-pointer flex items-center gap-4 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#C44724] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-bl-xl uppercase tracking-wider">
            Instant Demo
          </div>
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#DFE3DC] shrink-0">
            <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#172321] truncate font-['Manrope']">{userProfile.name}</h3>
              <Sparkles className="w-3.5 h-3.5 text-[#C44724] shrink-0" />
            </div>
            <p className="text-[11px] text-[#172321]/70 truncate">{userProfile.role} · {userProfile.id}</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#C44724] text-white flex items-center justify-center shrink-0 shadow-md group-hover:translate-x-0.5 transition-transform">
            →
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#DFE3DC]"></div>
          <span className="flex-shrink mx-3 text-[11px] uppercase font-bold tracking-wider text-[#172321]/40">or sign in with ID</span>
          <div className="flex-grow border-t border-[#DFE3DC]"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172321]/80 mb-1.5">
              Employee ID or Work Email
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className="w-full relative bg-[#FFFFFF] border border-[#DFE3DC] rounded-2xl px-4 py-3.5 text-xs font-medium text-[#172321] focus:outline-none focus:border-[#C44724] focus:bg-[#FFFFFF] transition-all shadow-xs placeholder-[#172321]/40"
              placeholder="e.g. EMP-89420"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#172321]/80">
                Password
              </label>
              <button 
                type="button" 
                onClick={() => showToast('Password reset link sent to registered supervisor email.')}
                className="text-xs text-[#C44724] font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#FFFFFF] border border-[#DFE3DC] rounded-2xl pl-4 pr-11 py-3.5 text-xs font-medium text-[#172321] focus:outline-none focus:border-[#C44724] focus:bg-[#FFFFFF] transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#172321]/50 hover:text-[#172321]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#C44724] focus:ring-[#C44724] border-[#DFE3DC]"
              />
              <span className="text-[#172321]/80 font-medium">Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C44724] hover:bg-[#a83b1d] text-white font-bold py-4 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="text-sm">Sign in to SHIFT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-[#172321]/60">
            SECURE INDUSTRIAL COMPLIANCE PLATFORM · VERSION 4.2
          </p>
        </div>
      </div>
    </div>
  );
};
