import { useState, useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, ZoomIn, ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenImageLightbox: (imageSrc: string, altText: string) => void;
}

export function ProjectModal({ project, onClose, onOpenImageLightbox }: ProjectModalProps) {
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
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-4xl bg-[#0e0e0e] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800 bg-[#070707]">
          <div>
            <p className="text-xs font-mono text-red-500 font-semibold mb-1">
              {project.categoryLabel} · {project.date}
            </p>
            <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800 ml-4 shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Screenshot Viewer */}
          <div className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-neutral-800">
              <img
                src={currentImage}
                alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                className="w-full h-full object-contain bg-black"
                referrerPolicy="no-referrer"
              />

              <button
                type="button"
                onClick={() => onOpenImageLightbox(currentImage, project.title)}
                className="absolute bottom-3 right-3 bg-neutral-950/90 hover:bg-red-600 border border-neutral-700 text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </button>

              {project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? project.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-950/90 hover:bg-red-600 text-white rounded-full border border-neutral-700 cursor-pointer"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === project.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-950/90 hover:bg-red-600 text-white rounded-full border border-neutral-700 cursor-pointer"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {project.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-red-600'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Problem / Action / Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-[#070707] border border-neutral-800 rounded-lg p-4">
              <div className="text-xs font-mono text-red-500 font-semibold uppercase mb-1.5">
                Problem
              </div>
              <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
                {project.problem}
              </p>
            </div>

            <div className="bg-[#070707] border border-neutral-800 rounded-lg p-4">
              <div className="text-xs font-mono text-white font-semibold uppercase mb-1.5">
                What I Did
              </div>
              <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
                {project.whatIDid}
              </p>
            </div>

            <div className="bg-[#070707] border border-neutral-800 rounded-lg p-4">
              <div className="text-xs font-mono text-red-400 font-semibold uppercase mb-1.5">
                Result
              </div>
              <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
                {project.result}
              </p>
            </div>
          </div>

          {/* Tools */}
          <div className="text-xs font-mono text-neutral-400">
            <span className="text-white font-semibold">Tools: </span>
            {project.toolsUsed.join(' · ')}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#070707] flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-mono font-semibold"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
