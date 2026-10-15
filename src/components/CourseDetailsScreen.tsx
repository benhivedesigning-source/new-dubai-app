import React from 'react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from './HeaderBar';
import { Clock, BookOpen, CheckCircle2, Play, Globe, Award, ShieldAlert, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const CourseDetailsScreen: React.FC = () => {
  const { courses, selectedCourseId, setScreen } = useApp();

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleStartOrResume = () => {
    // Find first incomplete lesson or start assessment if all lessons complete
    const firstIncomplete = course.lessons.find(l => !l.completed);
    if (firstIncomplete || course.lessons.length === 0) {
      setScreen('learning_player');
    } else {
      setScreen('assessment');
    }
  };

  return (
    <div className="min-h-screen pb-28 bg-[#F6F5F0]">
      <HeaderBar title="Course Overview" showBack onBack={() => setScreen('my_training')} />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        {/* Course Header Hero Card */}
        <div className="bg-white rounded-3xl border border-[#DFE3DC] overflow-hidden shadow-sm">
          {course.lessons[0]?.illustrationUrl && (
            <div className="h-44 w-full relative overflow-hidden bg-[#172321]">
              <img 
                src={course.lessons[0].illustrationUrl} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172321] via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-[11px] font-bold bg-[#C44724] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {course.duration} · {course.lessonsCount} lessons
                </span>
              </div>
            </div>
          )}

          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {course.isMandatory && (
                  <span className="text-[10px] font-bold bg-[#C44724]/10 text-[#C44724] px-2 py-0.5 rounded uppercase">
                    Mandatory Compliance
                  </span>
                )}
                <span className="text-[10px] font-semibold text-[#172321]/60">Due: {course.dueDate}</span>
              </div>
              <h2 className="text-xl font-bold text-[#172321] font-['Manrope']">{course.title}</h2>
              <p className="text-xs text-[#172321]/70 mt-1 leading-relaxed">{course.description}</p>
            </div>

            {/* Progress */}
            <div className="bg-[#F6F5F0] p-3.5 rounded-2xl space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#172321]/80">Course Completion</span>
                <span className="text-[#C44724]">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#DFE3DC] rounded-full overflow-hidden">
                <div className="h-full bg-[#C44724] rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-[#172321]/80 bg-[#F6F5F0] p-2.5 rounded-xl">
                <Globe className="w-4 h-4 text-[#406B85]" />
                <span className="truncate">{course.languages.join(' · ')}</span>
              </div>
              <div className="flex items-center gap-2 text-[#172321]/80 bg-[#F6F5F0] p-2.5 rounded-xl">
                <Award className="w-4 h-4 text-[#24624B]" />
                <span>Certificate on Pass</span>
              </div>
            </div>
          </div>
        </div>

        {/* Topics & Learning Path */}
        <div className="bg-white rounded-3xl border border-[#DFE3DC] p-5 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">Learning Path & Lessons</h3>
          
          <div className="space-y-2.5">
            {course.lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                onClick={() => {
                  setScreen('learning_player');
                }}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  lesson.completed ? 'bg-[#24624B]/5 border-[#24624B]/30' : 'bg-[#F6F5F0] border-[#DFE3DC] hover:border-[#C44724]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    lesson.completed ? 'bg-[#24624B] text-white' : 'bg-[#172321] text-white'
                  }`}>
                    {lesson.completed ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172321]">{lesson.title}</h4>
                    <p className="text-[10px] text-[#172321]/60">{lesson.duration} · {lesson.type}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#C44724]">
                  {lesson.completed ? 'Completed' : 'Start →'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Requirements */}
        <div className="bg-white rounded-3xl border border-[#DFE3DC] p-5 space-y-3 shadow-sm">
          <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">Completion Requirements</h3>
          <ul className="space-y-2 text-xs text-[#172321]/80">
            {course.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#24624B] shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

    </div>
  );
};
