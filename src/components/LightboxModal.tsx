import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  imageSrc: string | null;
  altText: string;
  onClose: () => void;
}

export function LightboxModal({ imageSrc, altText, onClose }: LightboxModalProps) {
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
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-5xl max-h-[95vh] flex flex-col z-10 bg-[#070707] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#0e0e0e] border-b border-neutral-800 text-xs font-mono">
          <div className="text-white truncate max-w-md font-semibold">
            {altText}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(s + 0.25, 3))}
              className="p-1.5 text-neutral-300 hover:text-white bg-neutral-900 rounded border border-neutral-800 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))}
              className="p-1.5 text-neutral-300 hover:text-white bg-neutral-900 rounded border border-neutral-800 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setScale(1)}
              className="p-1.5 text-neutral-300 hover:text-white bg-neutral-900 rounded border border-neutral-800 cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-neutral-300 hover:text-red-500 bg-neutral-900 rounded border border-neutral-800"
              title="Open image"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-300 hover:text-white bg-red-600 rounded cursor-pointer ml-1"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black min-h-[50vh]">
          <img
            src={imageSrc}
            alt={altText}
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
            className="max-h-[80vh] w-auto max-w-full object-contain select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
