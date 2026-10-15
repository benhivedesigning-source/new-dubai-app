import React from 'react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from './HeaderBar';
import { Play, Clock, ArrowRight, ShieldCheck, Award, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const HomeScreen: React.FC = () => {
  const { userProfile, courses, setScreen, setSelectedCourseId, certificates, resources } = useApp();

  const featuredCourse = courses.find(c => c.id === 'course-1') || courses[0];
  const nextUpCourses = courses.filter(c => c.id !== featuredCourse.id && c.status !== 'completed').slice(0, 3);
  
  const inProgressCount = courses.filter(c => c.status === 'in_progress').length;
  const dueThisWeekCount = courses.filter(c => c.status === 'overdue' || c.dueDate === 'Tomorrow' || c.dueDate === 'Today').length;
  const completedCount = courses.filter(c => c.status === 'completed').length + 8; // Including historical completions

  const handleResumeCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setScreen('course_details');
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F6F5F0]">
      <HeaderBar />

      <main className="w-full max-w-full px-4 py-4 space-y-5 flex flex-col box-border">
        {/* Featured "Continue Learning" Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#172321] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden"
        >
          {/* Background route motif decoration */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-[#FF734A]/10 pointer-events-none blur-2xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-2">
              <path d="M 0 50 Q 50 0 100 50 Q 50 100 0 50" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-widest uppercase bg-[#C44724] px-2.5 py-1 rounded-full text-white">
                Continue Learning
              </span>
              <span className="text-xs text-[#DFE3DC] font-medium">Lesson {featuredCourse.completedLessonsCount + 1} of {featuredCourse.lessonsCount}</span>
            </div>

            <h2 className="text-xl font-extrabold font-['Manrope'] mb-1.5 leading-snug">{featuredCourse.title}</h2>
            <p className="text-xs text-[#DFE3DC] mb-5 line-clamp-2">{featuredCourse.description}</p>

            {/* Progress Bar */}
            <div className="space-y-1.5 mb-5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#DFE3DC]">Progress</span>
                <span className="text-[#D9ED96]">{featuredCourse.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF734A] to-[#D9ED96] rounded-full transition-all duration-500"
                  style={{ width: `${featuredCourse.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-[#DFE3DC]">
                <Clock className="w-3.5 h-3.5 text-[#FF734A]" />
                <span>8 min remaining</span>
              </div>
              <button
                onClick={() => handleResumeCourse(featuredCourse.id)}
                className="bg-[#C44724] hover:bg-[#b03d1c] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Resume training</span>
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Value Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div 
            onClick={() => setScreen('my_training')}
            className="bg-white p-3.5 rounded-2xl border border-[#DFE3DC] shadow-xs text-center cursor-pointer hover:border-[#C44724]/40 transition-all"
          >
            <div className="text-xl font-extrabold text-[#C44724] font-['Manrope'] mb-0.5">{inProgressCount}</div>
            <div className="text-[11px] font-semibold text-[#172321]/70 leading-tight">In Progress</div>
          </div>
          <div 
            onClick={() => setScreen('my_training')}
            className="bg-white p-3.5 rounded-2xl border border-[#DFE3DC] shadow-xs text-center cursor-pointer hover:border-[#C44724]/40 transition-all"
          >
            <div className="text-xl font-extrabold text-[#FF734A] font-['Manrope'] mb-0.5">{dueThisWeekCount}</div>
            <div className="text-[11px] font-semibold text-[#172321]/70 leading-tight">Due This Week</div>
          </div>
          <div 
            onClick={() => setScreen('certificates')}
            className="bg-white p-3.5 rounded-2xl border border-[#DFE3DC] shadow-xs text-center cursor-pointer hover:border-[#C44724]/40 transition-all"
          >
            <div className="text-xl font-extrabold text-[#24624B] font-['Manrope'] mb-0.5">{completedCount}</div>
            <div className="text-[11px] font-semibold text-[#172321]/70 leading-tight">Completed</div>
          </div>
        </div>

        {/* Next Up Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">Next Up & Outstanding</h3>
            <button 
              onClick={() => setScreen('my_training')}
              className="text-xs font-semibold text-[#C44724] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {nextUpCourses.map(course => (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setScreen('course_details');
                }}
                className="bg-white p-4 rounded-2xl border border-[#DFE3DC] shadow-xs hover:border-[#C44724]/50 transition-all cursor-pointer flex items-center justify-between gap-3 group min-h-[72px]"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    course.status === 'overdue' ? 'bg-[#C44724]/10 text-[#C44724]' : 'bg-[#406B85]/10 text-[#406B85]'
                  }`}>
                    {course.status === 'overdue' ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#172321] group-hover:text-[#C44724] transition-colors truncate">
                        {course.title}
                      </h4>
                      {course.isMandatory && (
                        <span className="text-[9px] font-bold bg-[#172321]/10 text-[#172321] px-1.5 py-0.5 rounded shrink-0 ml-auto">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#172321]/60 mt-0.5 truncate">
                      Due: {course.dueDate} · {course.duration}
                    </p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#F6F5F0] flex items-center justify-center text-[#172321]/60 group-hover:bg-[#C44724] group-hover:text-white transition-all shrink-0">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tip of the Day */}
        <div className="bg-[#D9ED96]/30 border border-[#D9ED96] p-4 rounded-2xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#24624B] text-[#D9ED96] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#172321]">Safety Tip of the Shift</h4>
            <p className="text-xs text-[#172321]/80 mt-1 leading-relaxed">
              Always maintain a strict 3-meter safety buffer around operating reach trucks and forklifts. Never cross behind a reversing vehicle without eye contact.
            </p>
          </div>
        </div>

        {/* Quick Access Shortcuts */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => setScreen('certificates')}
            className="bg-white p-4 rounded-2xl border border-[#DFE3DC] hover:border-[#C44724]/40 shadow-xs flex items-center gap-3 text-left transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#24624B]/10 text-[#24624B] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#172321]">My Certificates</h4>
              <p className="text-[10px] text-[#172321]/60">{certificates.length} credentials</p>
            </div>
          </button>

          <button
            onClick={() => setScreen('resources')}
            className="bg-white p-4 rounded-2xl border border-[#DFE3DC] hover:border-[#C44724]/40 shadow-xs flex items-center gap-3 text-left transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#406B85]/10 text-[#406B85] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#172321]">Safety Resources</h4>
              <p className="text-[10px] text-[#172321]/60">{resources.length} SOPs & guides</p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};
