import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCircle, Clock, BookOpen, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, setScreen, setSelectedCourseId } = useApp();

  if (!isOpen) return null;

  const handleNotificationClick = (n: typeof notifications[0]) => {
    markNotificationRead(n.id);
    if (n.courseId) {
      setSelectedCourseId(n.courseId);
    }
    if (n.linkScreen) {
      setScreen(n.linkScreen as any);
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end overflow-hidden">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-sm bg-[#F6F5F0] h-full shadow-2xl flex flex-col border-l border-[#DFE3DC]"
      >
        <div className="p-4 bg-[#172321] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#FF734A]" />
            <h3 className="font-bold font-['Manrope']">Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-[#172321]/50 text-sm">
              No notifications at this time.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  n.read ? 'bg-white/60 border-[#DFE3DC]' : 'bg-white border-[#C44724]/30 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${
                    n.type === 'assignment' ? 'bg-[#C44724]/10 text-[#C44724]' :
                    n.type === 'reminder' ? 'bg-[#FF734A]/10 text-[#FF734A]' :
                    n.type === 'expiry' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-[#24624B]'
                  }`}>
                    {n.type === 'assignment' ? <BookOpen className="w-4 h-4" /> :
                     n.type === 'reminder' ? <Clock className="w-4 h-4" /> :
                     n.type === 'expiry' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#172321]">{n.title}</h4>
                      <span className="text-[10px] text-[#172321]/50">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#172321]/80 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
