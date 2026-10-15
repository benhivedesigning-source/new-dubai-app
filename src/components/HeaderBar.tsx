import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Shield } from 'lucide-react';

interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ title, subtitle, showBack, onBack }) => {
  const { userProfile, notifications, setScreen } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#F6F5F0]/95 backdrop-blur-md border-b border-[#DFE3DC] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={onBack}
                className="w-9 h-9 rounded-xl bg-white border border-[#DFE3DC] flex items-center justify-center text-[#172321] hover:bg-[#F0EEE6] transition-all shadow-xs"
              >
                ←
              </button>
            ) : (
              <div 
                tabIndex={0}
                aria-label="SHIFT app logo"
                className="w-9 h-9 rounded-xl bg-[#172321] flex items-center justify-center text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C44724]"
              >
                <Shield className="w-5 h-5 text-[#FF734A]" />
              </div>
            )}
            <div>
              {title ? (
                <h1 className="text-base font-bold text-[#172321] font-['Manrope'] tracking-tight">{title}</h1>
              ) : (
                <h1 className="text-base font-bold text-[#172321] font-['Manrope'] tracking-tight">Good morning, {userProfile.name.split(' ')[0]}.</h1>
              )}
              {subtitle ? (
                <p className="text-xs text-[#172321]/70">{subtitle}</p>
              ) : (
                <p className="text-[11px] text-[#172321]/60 font-medium">{userProfile.location}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen('notifications')}
              className="relative p-2.5 rounded-xl bg-white border border-[#DFE3DC] hover:bg-[#F0EEE6] text-[#172321] transition-all shadow-xs active:scale-95"
              aria-label="Open notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C44724] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            <div 
              tabIndex={0}
              aria-label="User profile avatar"
              className="w-9 h-9 rounded-xl overflow-hidden border border-[#DFE3DC] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C44724]"
            >
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
