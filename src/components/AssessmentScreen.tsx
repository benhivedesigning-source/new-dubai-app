import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const AssessmentScreen: React.FC = () => {
  const { courses, selectedCourseId, setScreen, submitAssessment, showToast } = useApp();
  const course = courses.find(c => c.id === selectedCourseId) || courses[0];

  const questions = course.assessment && course.assessment.length > 0 ? course.assessment : [
    {
      id: 'default-q1',
      question: 'What is the standard mandatory footwear requirement in all operational warehouse sectors?',
      options: ['Running shoes', 'CSA-approved steel-toe safety boots', 'Casual leather loafers', 'Slippers'],
      correctAnswerIndex: 1,
      explanation: 'Steel-toe safety footwear protects against falling inventory and heavy equipment impacts.'
    }
  ];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isReviewing, setIsReviewing] = useState(false);

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (selectedAnswers[currentQIndex] === undefined) {
      showToast('Please select an answer before continuing.');
      return;
    }
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handlePrev = () => {
    if (isReviewing) {
      setIsReviewing(false);
    } else if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    } else {
      setScreen('course_details');
    }
  };

  const handleSubmitFinal = () => {
    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 80;

    submitAssessment(course.id, score, passed);
    setScreen('results');
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] flex flex-col justify-between">
      {/* Top Header */}
      <div className="bg-white border-b border-[#DFE3DC] px-4 py-3 sticky top-0 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-xl bg-[#F6F5F0] border border-[#DFE3DC] flex items-center justify-center text-[#172321]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h3 className="text-xs font-bold text-[#172321] font-['Manrope']">{course.title}</h3>
            <span className="text-[10px] text-[#C44724] font-semibold">Knowledge Assessment</span>
          </div>
          <div className="text-xs font-bold text-[#172321]">
            {isReviewing ? 'Review' : `${currentQIndex + 1} / ${questions.length}`}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 flex-1 w-full flex flex-col justify-center">
        {!isReviewing ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#172321]/60">
                <span>Question {currentQIndex + 1} of {questions.length}</span>
                <span>Passing threshold: 80%</span>
              </div>
              <div className="w-full h-1.5 bg-[#DFE3DC] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C44724] rounded-full transition-all"
                  style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {currentQ.scenario && (
              <div className="bg-[#172321] text-white p-4 rounded-2xl text-xs leading-relaxed border border-white/10">
                <span className="text-[#FF734A] font-bold block mb-1">Scenario:</span>
                {currentQ.scenario}
              </div>
            )}

            <div>
              <h2 className="text-base font-bold text-[#172321] font-['Manrope'] leading-snug">{currentQ.question}</h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                      isSelected 
                        ? 'bg-[#C44724]/10 border-[#C44724] text-[#172321] shadow-sm font-semibold' 
                        : 'bg-white border-[#DFE3DC] text-[#172321]/90 hover:border-[#C44724]/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#C44724] bg-[#C44724] text-white' : 'border-[#DFE3DC]'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-xs">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-[#172321] font-['Manrope']">Review Your Answers</h2>
              <p className="text-xs text-[#172321]/70">Verify your selections before final submission.</p>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={q.id} className="bg-white p-4 rounded-2xl border border-[#DFE3DC] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-[#C44724]">Question {idx + 1}</span>
                    <button 
                      onClick={() => {
                        setCurrentQIndex(idx);
                        setIsReviewing(false);
                      }}
                      className="text-xs text-[#C44724] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-[#172321]">{q.question}</h4>
                  <p className="text-xs text-[#24624B] font-medium bg-[#24624B]/5 p-2 rounded-xl">
                    Selected: {q.options[selectedAnswers[idx]] ?? 'Not answered'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Controls */}
      <div className="bg-white border-t border-[#DFE3DC] p-4 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl bg-[#F6F5F0] border border-[#DFE3DC] text-xs font-semibold text-[#172321]"
          >
            {isReviewing ? 'Back to Questions' : 'Previous'}
          </button>

          {!isReviewing ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#C44724] hover:bg-[#b03d1c] text-white text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <span>{currentQIndex === questions.length - 1 ? 'Review Answers' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitFinal}
              className="px-6 py-2.5 rounded-xl bg-[#24624B] hover:bg-[#1b4a38] text-white text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <span>Submit Assessment</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
