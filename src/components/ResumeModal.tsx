import { useEffect } from 'react';
import { X, Printer, Download, Mail, MapPin, Award, CheckCircle, Shield, Briefcase, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, CV_DATA, PROJECTS, CERTIFICATES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-emerald-950/80 bg-[#070a08]/90 print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm sm:text-base">
              {t('Curriculum Vitae / Resume Viewer', 'Penampil Curriculum Vitae / Resume')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('Print / Save PDF', 'Cetak / Simpan PDF')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-[#0e1612] hover:bg-emerald-950 rounded-lg border border-emerald-950 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#050807] text-slate-200 font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Header */}
          <div className="border-b border-emerald-950/80 pb-6 print:border-black">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black">
              {PERSONAL_INFO.fullName}
            </h1>
            <p className="text-base sm:text-lg font-semibold text-emerald-400 mt-1 print:text-emerald-800">
              {PERSONAL_INFO.role}
            </p>
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400 mt-3 font-mono print:text-gray-700">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold print:text-emerald-900">
              {t('Executive Summary', 'Ringkasan Eksekutif')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed print:text-gray-800">
              {CV_DATA.summary}
            </p>
          </div>

          {/* Core Competencies */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold print:text-emerald-900">
              {t('Core Technical Competencies', 'Kompetensi Teknis Utama')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {CV_DATA.coreCompetencies.map((comp, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300 print:text-gray-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects & Case Studies */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold print:text-emerald-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{t('Selected Security Projects & Implementations', 'Proyek & Implementasi Keamanan Terpilih')}</span>
            </h2>

            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-[#0b100d] p-4 rounded-xl border border-emerald-950/80 print:border-gray-300 print:bg-transparent">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-white print:text-black">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 print:text-emerald-800">{proj.badge}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2 print:text-gray-800">{proj.description}</p>
                  <div className="text-[11px] font-mono text-slate-400 flex flex-wrap gap-2">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="bg-[#050807] px-2 py-0.5 rounded border border-emerald-950 print:border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold print:text-emerald-900 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{t('Verified Certifications & Accreditations', 'Sertifikasi & Akreditasi Terverifikasi')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="p-3 rounded-lg bg-[#0b100d] border border-emerald-950/80 print:border-gray-200">
                  <div className="text-xs font-bold text-white print:text-black">{cert.title}</div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-0.5 print:text-emerald-800">
                    {cert.issuer} · {cert.date}
                  </div>
                  {cert.credentialId && (
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">{cert.credentialId}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Training */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold print:text-emerald-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>{t('Education & Specialized Training', 'Pendidikan & Pelatihan Khusus')}</span>
            </h2>

            <div className="space-y-2">
              {CV_DATA.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-white print:text-black">{edu.degree}</span>
                    <span className="text-slate-400 print:text-gray-600"> — {edu.institution}</span>
                  </div>
                  <span className="font-mono text-emerald-400 print:text-emerald-800">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-emerald-950/80 bg-[#070a08]/90 flex items-center justify-between print:hidden">
          <span className="text-xs font-mono text-emerald-500/80">
            {PERSONAL_INFO.email} · Verified Credentials Available
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-[#0e1612] hover:bg-emerald-950 border border-emerald-900/60 rounded-lg transition-colors cursor-pointer"
          >
            {t('Close', 'Tutup')}
          </button>
        </div>

      </div>
    </div>
  );
}
