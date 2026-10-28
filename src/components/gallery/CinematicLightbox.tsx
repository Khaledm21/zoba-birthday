import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { MemoryItem } from '../../types';
import { useLanguage } from '../../hooks/useLanguageContext';
import { ImageWithFallback } from './ImageWithFallback';

interface CinematicLightboxProps {
  isOpen: boolean;
  activeMemory: MemoryItem | null;
  memories: MemoryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const CinematicLightbox: React.FC<CinematicLightboxProps> = ({
  isOpen,
  activeMemory,
  memories,
  onClose,
  onNext,
  onPrev,
}) => {
  const { t } = useLanguage();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  // Lock scroll when open & attach keyboard listeners
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !activeMemory) return null;

  const currentIndex = memories.findIndex((m) => m.id === activeMemory.id);
  const isVideo = activeMemory.mediaType === 'video' || activeMemory.imageUrl.endsWith('.mp4');

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#17172B]/90 backdrop-blur-2xl transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-center bg-[#222139]/80 border border-[#B9A4E8]/25 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="w-full px-5 py-3 flex items-center justify-between border-b border-[#B9A4E8]/15 bg-[#17172B]/60 z-10">
          <div className="flex items-center gap-2 text-xs text-[#B9A4E8]">
            <Sparkles className="w-4 h-4 text-[#F8D98D]" />
            <span className="font-medium text-[#FFF5F0]">
              {t.lightbox.imageCounter
                .replace('{current}', String(currentIndex + 1))
                .replace('{total}', String(memories.length))}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label={t.lightbox.close}
            className="w-8 h-8 rounded-full bg-[#222139] border border-[#B9A4E8]/30 flex items-center justify-center text-[#FFF5F0] hover:bg-[#F8D98D] hover:text-[#17172B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Frame — Pure Photo / Video Display */}
        <div className="relative w-full flex-1 min-h-[300px] max-h-[75vh] flex items-center justify-center bg-[#17172B]/60 p-3 sm:p-5 overflow-hidden">
          <div className="relative max-h-full max-w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-[#B9A4E8]/20 flex items-center justify-center">
            {isVideo ? (
              <video
                src={activeMemory.imageUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain max-h-[72vh]"
              />
            ) : (
              <ImageWithFallback
                memory={activeMemory}
                className="w-full h-full object-contain max-h-[72vh]"
                priority
              />
            )}
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label={t.lightbox.prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#17172B]/85 hover:bg-[#F8D98D] text-[#FFF5F0] hover:text-[#17172B] border border-[#B9A4E8]/30 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label={t.lightbox.next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#17172B]/85 hover:bg-[#F8D98D] text-[#FFF5F0] hover:text-[#17172B] border border-[#B9A4E8]/30 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
