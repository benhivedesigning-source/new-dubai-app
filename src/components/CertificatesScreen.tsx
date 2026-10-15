import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from './HeaderBar';
import { Certificate } from '../types/safety';
import { Award, Download, CheckCircle2, AlertTriangle, Clock, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CertificatesScreen: React.FC = () => {
  const { certificates, showToast } = useApp();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleDownload = (cert: Certificate) => {
    showToast(`Downloading official certificate credential: ${cert.credentialNumber}`);
  };

  return (
    <div className="min-h-screen pb-28 bg-[#F6F5F0]">
      <HeaderBar title="Certificates & Qualifications" subtitle="Earned credentials and compliance status" />

      <main className="max-w-md mx-auto px-4 py-5 space-y-4">
        {certificates.map(cert => (
          <motion.div
            key={cert.id}
            whileTap={{ scale: 0.99 }}
            onClick={() => cert.status !== 'pending_verification' && setSelectedCert(cert)}
            className={`bg-white p-4 rounded-2xl border transition-all shadow-xs cursor-pointer space-y-3 ${
              cert.status === 'valid' ? 'border-[#DFE3DC] hover:border-[#24624B]' :
              cert.status === 'expiring_soon' ? 'border-amber-300 bg-amber-50/30' :
              cert.status === 'pending_verification' ? 'border-dashed border-[#DFE3DC] opacity-80' : 'border-[#C44724]/40 bg-red-50/30'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl mt-0.5 ${
                  cert.status === 'valid' ? 'bg-[#24624B]/10 text-[#24624B]' :
                  cert.status === 'expiring_soon' ? 'bg-amber-100 text-amber-700' :
                  cert.status === 'pending_verification' ? 'bg-[#406B85]/10 text-[#406B85]' : 'bg-[#C44724]/10 text-[#C44724]'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      cert.status === 'valid' ? 'bg-emerald-100 text-[#24624B]' :
                      cert.status === 'expiring_soon' ? 'bg-amber-100 text-amber-800' :
                      cert.status === 'pending_verification' ? 'bg-[#406B85]/10 text-[#406B85]' : 'bg-[#C44724]/10 text-[#C44724]'
                    }`}>
                      {cert.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-[#172321]/60 font-mono">{cert.credentialNumber}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#172321] font-['Manrope']">{cert.title}</h3>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DFE3DC] flex items-center justify-between text-xs text-[#172321]/70">
              <span>Issued: {cert.issueDate}</span>
              <span className={cert.status === 'expiring_soon' ? 'text-amber-700 font-bold' : ''}>Expires: {cert.expiryDate}</span>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#DFE3DC] space-y-5 relative"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#F6F5F0] hover:bg-[#DFE3DC] text-[#172321]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-2 pt-2">
                <div className="w-12 h-12 bg-[#24624B]/10 text-[#24624B] rounded-2xl flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C44724]">Official Certificate</span>
                <h3 className="text-lg font-extrabold text-[#172321] font-['Manrope']">{selectedCert.title}</h3>
                <p className="text-xs text-[#172321]/70">Issued by {selectedCert.issuer}</p>
              </div>

              <div className="bg-[#F6F5F0] p-4 rounded-2xl space-y-2 text-xs text-[#172321]">
                <div className="flex justify-between">
                  <span className="text-[#172321]/60">Credential ID:</span>
                  <span className="font-mono font-bold">{selectedCert.credentialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#172321]/60">Issue Date:</span>
                  <span className="font-semibold">{selectedCert.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#172321]/60">Expiry Date:</span>
                  <span className="font-semibold">{selectedCert.expiryDate}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  handleDownload(selectedCert);
                  setSelectedCert(null);
                }}
                className="w-full bg-[#C44724] hover:bg-[#b03d1c] text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Certificate</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
