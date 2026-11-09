import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LightboxModalProps {
  imageSrc: string | null;
  altText: string;
  onClose: () => void;
}

export function LightboxModal({ imageSrc, altText, onClose }: LightboxModalProps) {
  const { t } = useLanguage();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (imageSrc) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageSrc, onClose]);

  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
      />

      {/* Lightbox Container */}
      <div className="relative w-full max-w-5xl max-h-[95vh] flex flex-col z-10 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono">
          <div className="text-slate-300 truncate max-w-md font-semibold">
            {altText}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.min(s + 0.25, 3))}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale(1)}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              title="Open raw image"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700 rounded transition-colors ml-2"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image viewport with pan/zoom */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60 min-h-[50vh]">
          <img
            src={imageSrc}
            alt={altText}
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
            className="max-h-[80vh] w-auto max-w-full object-contain transition-transform duration-200 select-none shadow-2xl rounded"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Bottom indicator */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-center text-[11px] font-mono text-slate-400">
          {t(
            'High-Resolution Credential Proof — Verified Official Document',
            'Bukti Kredensial Resolusi Tinggi — Dokumen Resmi Terverifikasi'
          )}
        </div>
      </div>
    </div>
  );
}
