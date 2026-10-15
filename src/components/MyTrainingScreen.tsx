import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from './HeaderBar';
import { CourseStatus } from '../types/safety';
import { Search, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

type FilterType = 'All' | 'Not started' | 'In progress' | 'Completed' | 'Overdue';

export const MyTrainingScreen: React.FC = () => {
  const { courses, setSelectedCourseId, setScreen, t, isRtl } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filterTabs: Array<{ id: FilterType; label: string }> = [
    { id: 'All', label: t.all },
    { id: 'Not started', label: t.not_started },
    { id: 'In progress', label: t.in_progress },
    { id: 'Completed', label: t.completed },
    { id: 'Overdue', label: t.overdue },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'All') return true;
    if (activeFilter === 'Not started') return course.status === 'not_started';
    if (activeFilter === 'In progress') return course.status === 'in_progress';
    if (activeFilter === 'Completed') return course.status === 'completed';
    if (activeFilter === 'Overdue') return course.status === 'overdue';

    return true;
  });

  const handleSelectCourse = (id: string) => {
    setSelectedCourseId(id);
    setScreen('course_details');
  };

  const getStatusLabel = (status: CourseStatus) => {
    if (status === 'completed') return t.completed;
    if (status === 'in_progress') return t.in_progress;
    if (status === 'not_started') return t.not_started;
    if (status === 'overdue') return t.overdue;
    return status;
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F6F5F0]">
      <HeaderBar title={t.my_training} subtitle={t.assigned_modules_sub} />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#172321]/40`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search_placeholder}
            className={`w-full bg-white border border-[#DFE3DC] rounded-xl ${isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-3 text-xs font-medium text-[#172321] focus:outline-none focus:border-[#C44724] shadow-xs`}
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map(tab => (
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

        {/* Course List */}
        <div className="space-y-3.5">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#DFE3DC] p-6">
              <div className="w-12 h-12 bg-[#F6F5F0] rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#172321]/40">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#172321]">No courses found</h4>
              <p className="text-xs text-[#172321]/60 mt-1">Try adjusting your search query or filter selection.</p>
            </div>
          ) : (
            filteredCourses.map(course => (
              <motion.div
                key={course.id}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectCourse(course.id)}
                className="bg-white p-4 rounded-2xl border border-[#DFE3DC] shadow-xs hover:border-[#C44724]/40 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {course.isMandatory && (
                        <span className="text-[9px] font-bold bg-[#C44724]/10 text-[#C44724] px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {t.mandatory}
                        </span>
                      )}
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        course.status === 'completed' ? 'bg-emerald-100 text-[#24624B]' :
                        course.status === 'overdue' ? 'bg-[#C44724] text-white' :
                        course.status === 'in_progress' ? 'bg-[#FF734A]/10 text-[#FF734A]' : 'bg-[#DFE3DC] text-[#172321]/80'
                      }`}>
                        {getStatusLabel(course.status)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">{course.title}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-bold text-[#172321]/70">{course.progress}%</span>
                  </div>
                </div>

                <p className="text-xs text-[#172321]/70 line-clamp-2">{course.description}</p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#DFE3DC] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${course.status === 'completed' ? 'bg-[#24624B]' : 'bg-[#C44724]'}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-[#172321]/60">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span>{t.due}: {course.dueDate}</span>
                  </div>
                  <span className="font-semibold text-[#C44724] flex items-center gap-1">
                    {course.status === 'completed' ? t.review_course : course.status === 'in_progress' ? t.resume_training : t.start_training}
                    <span className={`${isRtl ? 'rotate-180' : ''}`}>→</span>
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
