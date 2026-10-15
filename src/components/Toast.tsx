import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, reducedMotion } = useApp();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#172321] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 max-w-[90vw]"
        >
          <CheckCircle2 className="w-5 h-5 text-[#FF734A] shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
