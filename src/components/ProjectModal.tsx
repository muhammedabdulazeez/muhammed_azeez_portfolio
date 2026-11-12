import { useState, useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight, 
  Github, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenImageLightbox: (imageSrc: string, altText: string) => void;
}

export function ProjectModal({ project, onClose, onOpenImageLightbox }: ProjectModalProps) {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.images[selectedImageIndex] || project.thumbnail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#0a120e] border border-emerald-950 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-emerald-950/80 bg-[#070a08]/90">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{project.categoryLabel}</span>
              <span>·</span>
              <span>{project.badge}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-[#0e1612] hover:bg-emerald-950 rounded-lg border border-emerald-950 transition-colors ml-4 shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Screenshot Carousel / Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#050807] border border-emerald-950 group">
              <img
                src={currentImage}
                alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain bg-[#050807]"
                referrerPolicy="no-referrer"
              />

              {/* Lightbox zoom button */}
              <button
                onClick={() => onOpenImageLightbox(currentImage, project.title)}
                className="absolute bottom-3 right-3 bg-[#0b100d]/90 hover:bg-[#14221b] border border-emerald-900/60 text-emerald-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{t('Click to Zoom', 'Perbesar Gambar')}</span>
              </button>

              {/* Navigation arrows if multiple images */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? project.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#0b100d]/90 hover:bg-emerald-950 text-white rounded-full border border-emerald-950 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === project.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0b100d]/90 hover:bg-emerald-950 text-white rounded-full border border-emerald-950 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail selector */}
            {project.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-emerald-400 ring-2 ring-emerald-400/20'
                        : 'border-emerald-950 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4 Deep Case Study Columns: Problem, Tools, What I Did, and Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Problem */}
            <div className="bg-[#050807] border border-emerald-950 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-2 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>{t('1. Problem & Threat Scenario', '1. Masalah & Skenario Ancaman')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* 2. Result & Impact */}
            <div className="bg-[#050807] border border-emerald-950 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('2. Measurable Result & Outcome', '2. Hasil Terukur & Dampak')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.result}
              </p>
            </div>

            {/* 3. What Was Done */}
            <div className="bg-[#050807] border border-emerald-950 rounded-xl p-4 md:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-wider mb-2 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('3. What I Did & Defense Architecture', '3. Implementasi & Arsitektur Pertahanan')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {project.whatIDid}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {project.fullDetails.solution}
              </p>
            </div>

          </div>

          {/* Key Findings / Verification Points */}
          <div className="space-y-3 bg-[#050807] border border-emerald-950 rounded-xl p-4 sm:p-5">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              {t('Verified Findings & Security Takeaways', 'Temuan Terverifikasi & Catatan Keamanan')}
            </h4>
            <div className="space-y-2">
              {project.fullDetails.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Wrench className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('Tools, Runtimes & Frameworks', 'Alat, Runtime & Framework Digunakan')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#0e1612] border border-emerald-900/60 text-xs font-mono text-emerald-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer with GitHub Link and Close */}
        <div className="p-4 border-t border-emerald-950/80 bg-[#070a08]/90 flex items-center justify-between">
          <div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#0e1612] hover:bg-[#14221a] border border-emerald-900/60 hover:border-emerald-500/60 rounded-xl text-xs font-mono text-slate-200 hover:text-white transition-all"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>{t('Open GitHub Repository', 'Buka Repositori GitHub')}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-200 bg-[#0e1612] hover:bg-emerald-950 border border-emerald-900/60 hover:border-emerald-500/50 rounded-xl transition-colors cursor-pointer"
          >
            {t('Close Case Study', 'Tutup Studi Kasus')}
          </button>
        </div>

      </div>
    </div>
  );
}
