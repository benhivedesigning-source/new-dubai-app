import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from './HeaderBar';
import { Language } from '../types/safety';
import { User, Globe, Bell, Shield, LogOut, Check, Sliders, Moon, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export const ProfileScreen: React.FC = () => {
  const { 
    userProfile, 
    setIsLoggedIn, 
    setScreen, 
    language, 
    setLanguage, 
    notificationPreferences, 
    updateNotificationPreferences,
    reducedMotion,
    setReducedMotion,
    showToast 
  } = useApp();

  const languages: Language[] = ['English', 'العربية', 'हिन्दी', 'اردو'];

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setScreen('login');
    showToast('Signed out successfully');
  };

  return (
    <div className="min-h-screen pb-28 bg-[#F6F5F0]">
      <HeaderBar title="Employee Profile" subtitle="Account, preferences & safety credentials" />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#DFE3DC] shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#C44724] shadow-md">
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#24624B] text-white flex items-center justify-center text-xs shadow-md">
              ✓
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#172321] font-['Manrope']">{userProfile.name}</h2>
            <p className="text-xs text-[#C44724] font-semibold mt-0.5">{userProfile.role} · {userProfile.id}</p>
            <p className="text-xs text-[#172321]/60 mt-1">{userProfile.location}</p>
          </div>

          <div className="w-full pt-4 border-t border-[#DFE3DC] grid grid-cols-2 gap-3 text-left text-xs">
            <div className="bg-[#F6F5F0] p-3 rounded-2xl">
              <span className="text-[#172321]/60 block text-[10px] uppercase font-bold">Supervisor</span>
              <span className="font-semibold text-[#172321]">{userProfile.supervisor}</span>
            </div>
            <div className="bg-[#F6F5F0] p-3 rounded-2xl">
              <span className="text-[#172321]/60 block text-[10px] uppercase font-bold">Work Email</span>
              <span className="font-semibold text-[#172321] truncate block">{userProfile.email}</span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white p-5 rounded-3xl border border-[#DFE3DC] shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C44724]" />
            <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">Preferred Language</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {languages.map(l => (
              <button
                key={l}
                onClick={() => {
                  setLanguage(l);
                  showToast(`Language updated to ${l}`);
                }}
                className={`p-3 rounded-2xl text-xs font-semibold border text-left flex items-center justify-between transition-all ${
                  language === l ? 'bg-[#C44724]/10 border-[#C44724] text-[#C44724]' : 'bg-[#F6F5F0] border-[#DFE3DC] text-[#172321]'
                }`}
              >
                <span>{l}</span>
                {language === l && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-5 rounded-3xl border border-[#DFE3DC] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C44724]" />
            <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">Notification Preferences</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#172321]/80 font-medium">Training assignments</span>
              <input
                type="checkbox"
                checked={notificationPreferences.trainingAssignments}
                onChange={(e) => updateNotificationPreferences({ trainingAssignments: e.target.checked })}
                className="w-4 h-4 rounded text-[#C44724] focus:ring-[#C44724] border-[#DFE3DC]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#172321]/80 font-medium">Due-date reminders</span>
              <input
                type="checkbox"
                checked={notificationPreferences.dueDateReminders}
                onChange={(e) => updateNotificationPreferences({ dueDateReminders: e.target.checked })}
                className="w-4 h-4 rounded text-[#C44724] focus:ring-[#C44724] border-[#DFE3DC]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#172321]/80 font-medium">Assessment updates</span>
              <input
                type="checkbox"
                checked={notificationPreferences.assessmentUpdates}
                onChange={(e) => updateNotificationPreferences({ assessmentUpdates: e.target.checked })}
                className="w-4 h-4 rounded text-[#C44724] focus:ring-[#C44724] border-[#DFE3DC]"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[#172321]/80 font-medium">Qualification expiry</span>
              <input
                type="checkbox"
                checked={notificationPreferences.qualificationExpiry}
                onChange={(e) => updateNotificationPreferences({ qualificationExpiry: e.target.checked })}
                className="w-4 h-4 rounded text-[#C44724] focus:ring-[#C44724] border-[#DFE3DC]"
              />
            </label>
          </div>
        </div>

        {/* Accessibility & Motion */}
        <div className="bg-white p-5 rounded-3xl border border-[#DFE3DC] shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C44724]" />
            <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">Accessibility & Motion</h3>
          </div>
          <label className="flex items-center justify-between cursor-pointer text-xs">
            <div>
              <span className="text-[#172321] font-semibold block">Reduced Motion</span>
              <span className="text-[#172321]/60 text-[10px]">Minimize animations throughout the app</span>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 rounded text-[#C44724] focus:ring-[#C44724] border-[#DFE3DC]"
            />
          </label>
        </div>

        {/* Sign Out Action */}
        <div className="pt-2">
          <button
            onClick={handleSignOut}
            className="w-full bg-[#172321] hover:bg-[#213431] text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4 text-[#FF734A]" />
            <span>Sign Out of SHIFT</span>
          </button>
        </div>
      </main>
    </div>
  );
};
