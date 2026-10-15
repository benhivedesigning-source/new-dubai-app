import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, Volume2, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { motion } from 'motion/react';

export const LearningPlayerScreen: React.FC = () => {
  const { courses, selectedCourseId, setScreen, completeLesson, acknowledgeLessonPolicy, showToast, t, isRtl, language } = useApp();
  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
    const firstIncomplete = course.lessons.findIndex(l => !l.completed);
    return firstIncomplete !== -1 ? firstIncomplete : 0;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [policyAcknowledged, setPolicyAcknowledged] = useState(false);

  const currentLesson = course.lessons[currentLessonIndex] || course.lessons[0];

  const handleNextLesson = () => {
    // Complete current lesson first if not completed
    if (!currentLesson.completed) {
      if (currentLesson.requiresAcknowledgment && !policyAcknowledged) {
        showToast('Please acknowledge the safety policy checkbox before proceeding.');
        return;
      }
      if (currentLesson.requiresAcknowledgment && policyAcknowledged) {
        acknowledgeLessonPolicy(course.id, currentLesson.id);
      } else {
        completeLesson(course.id, currentLesson.id);
      }
    }

    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setPolicyAcknowledged(false);
    } else {
      // Reached end of lessons -> go to assessment
      setScreen('assessment');
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setPolicyAcknowledged(currentLesson.requiresAcknowledgment ? true : false);
    } else {
      setScreen('course_details');
    }
  };

  return (
    <div className="min-h-screen bg-[#172321] text-white flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => setScreen('course_details')}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-[10px] text-[#FF734A] uppercase tracking-widest font-bold">Lesson {currentLessonIndex + 1} of {course.lessons.length}</span>
          <h3 className="text-xs font-bold text-white truncate max-w-[200px]">{course.title}</h3>
        </div>
        <div className="text-xs font-semibold text-[#D9ED96]">
          {Math.round(((currentLessonIndex + 1) / course.lessons.length) * 100)}%
        </div>
      </div>

      {/* Immersive Media / Illustrated Area */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-4 py-6 space-y-6">
        <div className="relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl aspect-video flex items-center justify-center">
          {currentLesson.illustrationUrl ? (
            <img src={currentLesson.illustrationUrl} alt={currentLesson.title} className="w-full h-full object-cover opacity-80" />
          ) : (
            <div className="p-8 text-center">
              <ShieldCheck className="w-16 h-16 text-[#FF734A] mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-white/90">Interactive Scenario Simulator</p>
            </div>
          )}

          {/* Media overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#C44724] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-white/80">{currentLesson.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content & Transcript */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-['Manrope'] text-white">{currentLesson.title}</h2>
          <p className="text-sm text-[#DFE3DC] leading-relaxed">{currentLesson.content}</p>

          {/* Policy Acknowledgement Requirement */}
          {currentLesson.requiresAcknowledgment && (
            <div className="bg-white/10 border border-[#FF734A]/40 p-4 rounded-2xl space-y-2 mt-4">
              <div className="flex items-center gap-2 text-[#FF734A] text-xs font-bold uppercase tracking-wider">
                Mandatory Policy Sign-off
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={policyAcknowledged}
                  onChange={(e) => setPolicyAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#C44724] bg-transparent border-white/30 focus:ring-[#C44724]"
                />
                <span className="text-xs text-white/90 leading-tight">
                  I confirm that I have read, understood, and will comply with this safety policy procedure during my shift.
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation / Controls */}
      <div className="p-4 bg-[#172321] border-t border-white/10 flex items-center justify-between">
        <button
          onClick={handlePrevLesson}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{t.back}</span>
        </button>

        <button
          onClick={handleNextLesson}
          className="px-6 py-2.5 rounded-xl bg-[#C44724] hover:bg-[#b03d1c] text-white text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <span>{currentLessonIndex === course.lessons.length - 1 ? (language === 'العربية' ? 'بدء الاختبار' : language === 'हिन्दी' ? 'मूल्यांकन शुरू करें' : language === 'اردو' ? 'امتحان شروع کریں' : 'Take Assessment') : (language === 'العربية' ? 'الدرس التالي' : language === 'हिन्दी' ? 'अगला पाठ' : language === 'اردو' ? 'اگلا سبق' : 'Next Lesson')}</span>
          <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
