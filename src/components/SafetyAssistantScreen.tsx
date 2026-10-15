import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles, FileText, AlertCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export const SafetyAssistantScreen: React.FC = () => {
  const { chatMessages, sendChatMessage, isChatLoading, language, setScreen, setSelectedCourseId, t, isRtl } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isChatLoading]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isChatLoading) return;
    const msg = inputText;
    setInputText('');
    sendChatMessage(msg);
  };

  return (
    <div className="h-full flex flex-col bg-[#F6F5F0] pb-0">
      {/* Chat Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-4">
        {/* Conversation History */}
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.role === 'user' ? (isRtl ? 'items-start' : 'items-end') : (isRtl ? 'items-end' : 'items-start')}`}
          >
            <div className={`max-w-[85%] p-4 rounded-3xl text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#C44724] text-white rounded-br-xs shadow-sm'
                : 'bg-white text-[#172321] rounded-bl-xs border border-[#DFE3DC] shadow-xs space-y-3'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Source Cards */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-2 border-t border-[#DFE3DC] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#172321]/60">{t.approved_sources}</span>
                  <div className="space-y-1">
                    {msg.sources.map((src, sIdx) => (
                      <div key={sIdx} className="bg-[#F6F5F0] p-2 rounded-xl flex items-center gap-2 text-[11px] text-[#172321]">
                        <FileText className="w-3.5 h-3.5 text-[#C44724] shrink-0" />
                        <div className="truncate flex-1">
                          <span className="font-semibold">{src.title}</span>
                          <span className="text-[#172321]/60 ml-1.5">({src.section} · {src.version})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isChatLoading && (
          <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-[#DFE3DC] max-w-[120px] shadow-xs">
            <div className="w-2 h-2 rounded-full bg-[#C44724] animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-[#FF734A] animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-[#24624B] animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Message Composer & Emergency Note Area at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full shrink-0 bg-white/95 backdrop-blur-md border-t border-[#DFE3DC] shadow-lg z-30 mb-0 pb-0">
        {/* Emergency Context Footer Note */}
        <div className="px-6 py-1.5 bg-[#C44724]/10 border-b border-[#C44724]/20 text-center">
          <p className="text-[10px] text-[#172321]/80 font-medium">
            {t.emergency_note}
          </p>
        </div>

        <div className="p-3">
          <form onSubmit={handleSend} className="max-w-md mx-auto flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.ask_placeholder}
              className={`flex-1 bg-[#F6F5F0] border border-[#DFE3DC] rounded-xl px-4 py-3 text-xs font-medium text-[#172321] focus:outline-none focus:border-[#C44724] ${isRtl ? 'text-right' : 'text-left'}`}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isChatLoading}
              className="w-11 h-11 rounded-xl bg-[#C44724] hover:bg-[#b03d1c] disabled:opacity-50 text-white flex items-center justify-center shadow-md transition-all shrink-0 active:scale-95"
            >
              <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
