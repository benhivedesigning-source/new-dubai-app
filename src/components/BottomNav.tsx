import React from 'react';
import { useApp, BottomNavTab, ScreenType } from '../context/AppContext';
import { Home, BookOpen, Bot, User } from 'lucide-react';
import { motion } from 'motion/react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setScreen, screen, reducedMotion } = useApp();

  // Hide bottom nav during login, learning player, assessment, or results
  const hiddenScreens: ScreenType[] = ['login', 'learning_player', 'assessment', 'results'];
  if (hiddenScreens.includes(screen)) {
    return null;
  }

  const navItems: Array<{ id: BottomNavTab; label: string; icon: React.FC<{ className?: string }>; targetScreen: ScreenType }> = [
    { id: 'home', label: 'Home', icon: Home, targetScreen: 'home' },
    { id: 'my_training', label: 'My Training', icon: BookOpen, targetScreen: 'my_training' },
    { id: 'safety_assistant', label: 'Safety Assistant', icon: Bot, targetScreen: 'safety_assistant' },
    { id: 'profile', label: 'Profile', icon: User, targetScreen: 'profile' },
  ];

  const handleTabClick = (tab: BottomNavTab, target: ScreenType) => {
    setActiveTab(tab);
    setScreen(target);
  };

  return (
    <nav aria-label="Main Navigation" className="sticky bottom-0 left-0 right-0 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#DFE3DC] px-4 py-2.5 z-50 shadow-2xl mt-auto">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.targetScreen)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive ? 'text-[#C44724]' : 'text-[#172321]/60 hover:text-[#172321]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive && !reducedMotion ? 'scale-110' : ''}`} />
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FF734A] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[11px] font-medium mt-1 tracking-tight ${isActive ? 'font-semibold text-[#172321]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
