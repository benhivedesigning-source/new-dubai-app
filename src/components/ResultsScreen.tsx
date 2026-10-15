import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Award, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export const ResultsScreen: React.FC = () => {
  const { courses, selectedCourseId, setScreen, resetCourseProgress } = useApp();
  const course = courses.find(c => c.id === selectedCourseId) || courses[0];

  const score = course.score ?? 80;
  const passed = course.passed ?? true;

  const handleRetry = () => {
    resetCourseProgress(course.id);
    setScreen('course_details');
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] flex flex-col justify-between pb-10">
      {/* Top Banner */}
      <div className={`p-8 text-white rounded-b-[36px] shadow-xl ${
        passed ? 'bg-gradient-to-b from-[#24624B] to-[#1b4a38]' : 'bg-gradient-to-b from-[#C44724] to-[#a0381b]'
      }`}>
        <div className="max-w-md mx-auto text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-inner">
            {passed ? <CheckCircle2 className="w-8 h-8 text-[#D9ED96]" /> : <AlertTriangle className="w-8 h-8 text-white" />}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Assessment Results
            </span>
            <h1 className="text-2xl font-extrabold font-['Manrope'] mt-2">
              {passed ? 'Knowledge Assessment Passed' : 'Assessment Not Passed'}
            </h1>
            <p className="text-xs text-white/80 mt-1">
              {passed ? 'You have successfully satisfied the knowledge criteria.' : 'Review required topics and try again.'}
            </p>
          </div>

          <div className="pt-2">
            <div className="text-4xl font-extrabold font-['Manrope'] tracking-tight">
              {score}%
            </div>
            <p className="text-[11px] text-white/70">Minimum passing threshold: 80%</p>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-md mx-auto px-4 py-6 flex-1 w-full space-y-5">
        {/* Practical Sign-off Status */}
        {passed && (
          <div className="bg-white p-4 rounded-2xl border border-[#DFE3DC] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#172321]">Practical Supervisor Sign-off</h3>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                Pending Verification
              </span>
            </div>
            <p className="text-xs text-[#172321]/70 leading-relaxed">
              Your supervisor (Marcus Vance) must confirm your practical assessment on the warehouse floor before this qualification is fully finalized.
            </p>
          </div>
        )}

        {/* Topic-Level Feedback */}
        <div className="bg-white p-5 rounded-3xl border border-[#DFE3DC] shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">Topic-Level Summary</h3>
          <div className="space-y-2 text-xs text-[#172321]/80">
            {course.topics.map((topic, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6F5F0]">
                <span>{topic}</span>
                <span className="text-[#24624B] font-bold">Passed</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Actions */}
        <div className="space-y-3">
          {passed ? (
            <button
              onClick={() => setScreen('certificates')}
              className="w-full bg-[#24624B] hover:bg-[#1b4a38] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Award className="w-4 h-4" />
              <span>View Certificates & Qualifications</span>
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="w-full bg-[#C44724] hover:bg-[#b03d1c] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review Lessons & Retry Assessment</span>
            </button>
          )}

          <button
            onClick={() => setScreen('home')}
            className="w-full bg-white hover:bg-[#F0EEE6] text-[#172321] border border-[#DFE3DC] font-semibold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
