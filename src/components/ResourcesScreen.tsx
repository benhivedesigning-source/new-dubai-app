import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from './HeaderBar';
import { Search, FileText, Download, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

type CategoryType = 'All' | 'SOPs' | 'Emergency Contacts' | 'Quick Guides' | 'Policies';

export const ResourcesScreen: React.FC = () => {
  const { resources, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');

  const categories: CategoryType[] = ['All', 'SOPs', 'Emergency Contacts', 'Quick Guides', 'Policies'];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeCategory === 'All') return true;
    return res.category === activeCategory;
  });

  const handleDownload = (title: string) => {
    showToast(`Downloading resource: ${title}`);
  };

  const handleCall = (number: string, role?: string) => {
    showToast(`Connecting to ${role || 'Safety Contact'} at ${number}...`);
  };

  return (
    <div className="min-h-screen pb-28 bg-[#F6F5F0]">
      <HeaderBar title="Safety Resources" subtitle="Standard operating procedures & emergency contacts" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#172321]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SOPs, emergency contacts, policies..."
            className="w-full bg-white border border-[#DFE3DC] rounded-xl pl-10 pr-4 py-3 text-xs font-medium text-[#172321] focus:outline-none focus:border-[#C44724] shadow-xs"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#172321] text-white shadow-sm'
                  : 'bg-white text-[#172321]/80 border border-[#DFE3DC] hover:bg-[#F0EEE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources List */}
        <div className="space-y-3">
          {filteredResources.map(res => (
            <div
              key={res.id}
              className="bg-white p-4 rounded-2xl border border-[#DFE3DC] shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl mt-0.5 ${
                    res.category === 'Emergency Contacts' ? 'bg-[#C44724]/10 text-[#C44724]' : 'bg-[#406B85]/10 text-[#406B85]'
                  }`}>
                    {res.category === 'Emergency Contacts' ? <Phone className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold bg-[#172321]/10 text-[#172321] px-2 py-0.5 rounded uppercase tracking-wider">
                        {res.category}
                      </span>
                      <span className="text-[10px] text-[#172321]/60 font-medium">{res.version} · {res.updatedDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">{res.title}</h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#172321]/70 leading-relaxed">{res.description}</p>

              <div className="pt-2 border-t border-[#DFE3DC] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#172321]/60">{res.fileSize || res.role}</span>
                {res.contactNumber ? (
                  <button
                    onClick={() => handleCall(res.contactNumber!, res.role)}
                    className="bg-[#C44724] hover:bg-[#b03d1c] text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Contact</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleDownload(res.title)}
                    className="bg-white hover:bg-[#F0EEE6] text-[#172321] border border-[#DFE3DC] font-semibold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download ({res.fileSize})</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
