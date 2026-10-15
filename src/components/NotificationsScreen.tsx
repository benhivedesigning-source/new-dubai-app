import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from './HeaderBar';
import { Bell, BookOpen, Clock, AlertTriangle, CheckCircle, CheckCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

type FilterType = 'all' | 'unread' | 'assignment' | 'reminder';

export const NotificationsScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    setScreen, 
    setSelectedCourseId,
    reducedMotion,
    t,
    isRtl
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'assignment') return n.type === 'assignment';
    if (activeFilter === 'reminder') return n.type === 'reminder' || n.type === 'expiry';
    return true;
  });

  const handleNotificationClick = (n: typeof notifications[0]) => {
    markNotificationRead(n.id);
    if (n.courseId) {
      setSelectedCourseId(n.courseId);
    }
    if (n.linkScreen) {
      setScreen(n.linkScreen as any);
    }
  };

  return (
    <div className="min-h-full pb-24 bg-[#F6F5F0] flex flex-col">
      <HeaderBar 
        title={t.notifications} 
        subtitle={t.alerts_sub} 
        showBack 
        onBack={() => setScreen('home')} 
      />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4 w-full flex-1">
        {/* Controls Bar: Unread summary and Mark all as read */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#DFE3DC] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#172321]">{t.activity_feed}</span>
            {unreadCount > 0 ? (
              <span className="bg-[#C44724] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {t.new_badge(unreadCount)}
              </span>
            ) : (
              <span className="bg-[#24624B]/10 text-[#24624B] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {t.all_caught_up}
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-semibold text-[#C44724] hover:underline flex items-center gap-1 active:scale-95 transition-transform"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{t.mark_all_read}</span>
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(
            [
              { id: 'all', label: t.all },
              { id: 'unread', label: `${t.not_started} (${unreadCount})` },
              { id: 'assignment', label: t.pref_assignments },
              { id: 'reminder', label: t.pref_due_reminders },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#172321] text-white shadow-sm'
                  : 'bg-white text-[#172321]/80 border border-[#DFE3DC] hover:bg-[#F0EEE6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#DFE3DC] p-6 shadow-xs">
              <div className="w-12 h-12 bg-[#F6F5F0] rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#172321]/40">
                <Bell className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#172321]">{t.no_notifications}</h4>
              <p className="text-xs text-[#172321]/60 mt-1">
                {t.no_notifications_sub}
              </p>
            </div>
          ) : (
            filteredNotifications.map((n, idx) => {
              const isUnread = !n.read;
              return (
                <motion.div
                  key={n.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isUnread
                      ? 'bg-white border-[#C44724]/40 shadow-sm hover:border-[#C44724]'
                      : 'bg-white/80 border-[#DFE3DC] hover:border-[#172321]/30 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Icon Badge */}
                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      n.type === 'assignment' ? 'bg-[#C44724]/10 text-[#C44724]' :
                      n.type === 'reminder' ? 'bg-[#FF734A]/10 text-[#FF734A]' :
                      n.type === 'expiry' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-[#24624B]'
                    }`}>
                      {n.type === 'assignment' ? <BookOpen className="w-4 h-4" /> :
                       n.type === 'reminder' ? <Clock className="w-4 h-4" /> :
                       n.type === 'expiry' ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 truncate">
                          <h4 className={`text-xs truncate ${isUnread ? 'font-extrabold text-[#172321]' : 'font-semibold text-[#172321]/80'}`}>
                            {n.title}
                          </h4>
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-[#C44724] shrink-0 animate-pulse"></span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#172321]/50 shrink-0 font-medium">{n.time}</span>
                      </div>

                      <p className="text-xs text-[#172321]/70 leading-relaxed">
                        {n.message}
                      </p>

                      {/* Action callout if clickable link exists */}
                      {n.linkScreen && (
                        <div className="mt-2.5 pt-2 border-t border-[#DFE3DC]/60 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#C44724] flex items-center gap-1 group">
                            <span>{n.type === 'assignment' ? t.start_training : n.type === 'expiry' ? t.my_certificates : t.view_all}</span>
                            <ArrowRight className={`w-3 h-3 group-hover:translate-x-0.5 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                          </span>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[#172321]/40">
                            {n.type}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};
