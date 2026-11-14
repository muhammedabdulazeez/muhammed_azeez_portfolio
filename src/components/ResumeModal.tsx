import { useEffect } from 'react';
import { X, Printer, Mail, MapPin, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO, CV_DATA, PROJECTS, CERTIFICATES, TEACHING_TOPICS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-4xl bg-[#0e0e0e] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-[#070707] print:hidden">
          <span className="font-display font-bold text-white text-sm sm:text-base">
            Curriculum Vitae — {PERSONAL_INFO.name}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 rounded-lg border border-neutral-800 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 bg-[#070707] text-neutral-200 print:p-0 print:bg-white print:text-black">
          <div className="border-b border-neutral-800 pb-5 print:border-black">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white print:text-black">
              {PERSONAL_INFO.fullName}
            </h1>
            <p className="text-base font-semibold text-red-500 mt-1 print:text-red-700">
              {PERSONAL_INFO.role}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-neutral-400 mt-3 font-mono print:text-gray-700">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-2">
              Summary
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed print:text-gray-800">
              {CV_DATA.summary}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-2">
              Core Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {CV_DATA.coreCompetencies.map((comp, idx) => (
                <div key={idx} className="flex items-center gap-2 text-neutral-300 print:text-gray-800">
                  <CheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-3">
              Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-[#101010] p-3.5 rounded-lg border border-neutral-800 print:border-gray-300 print:bg-transparent">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-white print:text-black">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-mono text-red-500">{proj.date}</span>
                  </div>
                  <p className="text-xs text-neutral-300 print:text-gray-800">{proj.whatIDid}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-2">
              Teaching & Mentorship
            </h2>
            <p className="text-xs text-neutral-300 print:text-gray-800">
              Instructing and mentoring students in: {TEACHING_TOPICS.join(', ')}.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-3">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-lg bg-[#101010] border border-neutral-800 print:border-gray-200">
                  <div className="text-xs font-bold text-white print:text-black">{cert.title}</div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    {cert.issuer} · {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-2">
              Education & Training
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {CV_DATA.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <span className="font-bold text-white print:text-black">{edu.degree}</span>
                    <span className="text-neutral-400 print:text-gray-600"> — {edu.institution}</span>
                  </div>
                  <span className="font-mono text-red-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
