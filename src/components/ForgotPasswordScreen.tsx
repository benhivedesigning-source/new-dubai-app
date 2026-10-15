import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types/safety';
import { Shield, KeyRound, ArrowRight, ArrowLeft, CheckCircle2, UserCheck, MessageSquare, PhoneCall, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ForgotPasswordScreen: React.FC = () => {
  const { setScreen, language, setLanguage, userProfile, showToast, t, isRtl } = useApp();
  const [employeeInput, setEmployeeInput] = useState(userProfile.id);
  const [recoveryMethod, setRecoveryMethod] = useState<'supervisor' | 'sms'>('supervisor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const languages: Language[] = ['English', 'العربية', 'हिन्दी', 'اردو'];

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeInput.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCodeSent(true);
      showToast(recoveryMethod === 'supervisor' 
        ? 'Password reset request dispatched to Supervisor Marcus Vance' 
        : '6-digit SMS verification code dispatched to +971 50 492 8810');
    }, 700);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      showToast('Temporary credentials generated. Please sign in with your new PIN.');
      setScreen('login');
    }, 600);
  };

  return (
    <div className={`min-h-full bg-[#F6F5F0] text-[#172321] flex flex-col justify-between relative overflow-hidden ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Upper Hero Visual Area */}
      <div className="relative pt-6 pb-8 px-6 bg-gradient-to-br from-[#172321] via-[#1f302c] to-[#243d37] text-white rounded-b-[40px] shadow-2xl overflow-hidden">
        {/* Glow ambient light */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF734A]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <button
            onClick={() => setScreen('login')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            <span>{t.back}</span>
          </button>

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

        <div className="relative z-10 space-y-2 mt-2">
          <div className="w-12 h-12 rounded-2xl bg-[#C44724] flex items-center justify-center shadow-lg ring-2 ring-white/10 mb-3">
            <KeyRound className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight font-['Manrope'] text-white">
            {t.forgot_pw_title}
          </h1>
          <p className="text-xs text-[#DFE3DC] leading-relaxed max-w-[300px]">
            {t.forgot_pw_subtitle}
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 px-6 py-6 max-w-md w-full mx-auto flex flex-col justify-center space-y-5">
        <AnimatePresence mode="wait">
          {!isCodeSent ? (
            <motion.form 
              key="request-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSendCode} 
              className="space-y-4"
            >
              {/* Employee ID Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172321]/80 mb-1.5">
                  {t.employee_id_label}
                </label>
                <input
                  type="text"
                  value={employeeInput}
                  onChange={(e) => setEmployeeInput(e.target.value)}
                  required
                  placeholder={t.employee_id_placeholder}
                  className="w-full bg-[#FFFFFF] border border-[#DFE3DC] rounded-2xl px-4 py-3.5 text-xs font-medium text-[#172321] focus:outline-none focus:border-[#C44724] focus:bg-[#FFFFFF] transition-all shadow-xs"
                />
              </div>

              {/* Recovery Method Selection */}
              <div className="space-y-2 pt-1">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#172321]/80 mb-1.5">
                  {t.reset_method_label}
                </span>

                {/* Supervisor Method */}
                <div 
                  onClick={() => setRecoveryMethod('supervisor')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    recoveryMethod === 'supervisor' 
                      ? 'bg-white border-[#C44724] shadow-sm ring-1 ring-[#C44724]/20' 
                      : 'bg-white/80 border-[#DFE3DC] hover:border-[#172321]/30'
                  }`}
                >
                  <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${recoveryMethod === 'supervisor' ? 'bg-[#C44724] text-white' : 'bg-[#F6F5F0] text-[#172321]/60'}`}>
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#172321] mb-0.5">{t.reset_method_supervisor}</h4>
                    <p className="text-[11px] text-[#172321]/60">Shift Lead · Marcus Vance</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${recoveryMethod === 'supervisor' ? 'border-[#C44724]' : 'border-[#DFE3DC]'}`}>
                    {recoveryMethod === 'supervisor' && <div className="w-2 h-2 rounded-full bg-[#C44724]"></div>}
                  </div>
                </div>

                {/* SMS OTP Method */}
                <div 
                  onClick={() => setRecoveryMethod('sms')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    recoveryMethod === 'sms' 
                      ? 'bg-white border-[#C44724] shadow-sm ring-1 ring-[#C44724]/20' 
                      : 'bg-white/80 border-[#DFE3DC] hover:border-[#172321]/30'
                  }`}
                >
                  <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${recoveryMethod === 'sms' ? 'bg-[#C44724] text-white' : 'bg-[#F6F5F0] text-[#172321]/60'}`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#172321] mb-0.5">{t.reset_method_sms}</h4>
                    <p className="text-[11px] text-[#172321]/60">Registered phone · +971 50 *** **10</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${recoveryMethod === 'sms' ? 'border-[#C44724]' : 'border-[#DFE3DC]'}`}>
                    {recoveryMethod === 'sms' && <div className="w-2 h-2 rounded-full bg-[#C44724]"></div>}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C44724] hover:bg-[#a83b1d] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98] mt-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="text-xs">{t.send_reset_code}</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="verification-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleVerifyCode} 
              className="space-y-4"
            >
              {/* Sent Confirmation Banner */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#24624B] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#172321]">{t.reset_sent_title}</h4>
                  <p className="text-xs text-[#172321]/70 mt-1 leading-relaxed">
                    {t.reset_sent_desc}
                  </p>
                </div>
              </div>

              {/* Code Input Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172321]/80 mb-1.5">
                  Verification Code (PIN)
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder={t.enter_code_placeholder}
                  className="w-full bg-[#FFFFFF] border border-[#DFE3DC] rounded-2xl px-4 py-3.5 text-xs font-medium text-[#172321] focus:outline-none focus:border-[#C44724] focus:bg-[#FFFFFF] transition-all shadow-xs"
                />
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#24624B] hover:bg-[#1c4e3c] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                {isVerifying ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="text-xs">{t.verify_code}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsCodeSent(false)}
                className="w-full text-center text-xs text-[#172321]/60 hover:text-[#172321] py-1 font-semibold"
              >
                Change verification method
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Back to Sign In Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setScreen('login')}
            className="text-xs font-bold text-[#C44724] hover:underline"
          >
            {t.return_to_login}
          </button>
        </div>
      </div>
    </div>
  );
};
