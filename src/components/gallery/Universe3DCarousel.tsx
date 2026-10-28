import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { MemoryItem } from '../../types';
import { useLanguage } from '../../hooks/useLanguageContext';
import { ImageWithFallback } from './ImageWithFallback';

interface Universe3DCarouselProps {
  memories: MemoryItem[];
  onOpenLightbox: (memory: MemoryItem) => void;
}

export const Universe3DCarousel: React.FC<Universe3DCarouselProps> = ({
  memories,
  onOpenLightbox,
}) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const autoPlayRef = useRef<number | null>(null);
  const startXRef = useRef<number>(0);
  const currentDragOffsetRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const wheelLockRef = useRef<boolean>(false);

  const total = memories.length;

  // Window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? 220 : 300;
  const cardHeight = isMobile ? 320 : 420;
  const spacing = isMobile ? 135 : 210;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotation when not hovered or dragged
  useEffect(() => {
    if (isPaused || isDragging) return;

    autoPlayRef.current = window.setInterval(() => {
      goToNext();
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, isDragging, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Mouse wheel & trackpad swipe navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 25) {
      wheelLockRef.current = true;
      if (delta > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 350);
    }
  };

  // Drag handlers
  const handleStartDrag = (clientX: number) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    startXRef.current = clientX;
    currentDragOffsetRef.current = 0;
    setDragOffset(0);
  };

  const handleMoveDrag = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const diff = clientX - startXRef.current;
    currentDragOffsetRef.current = diff;
    setDragOffset(diff);
  };

  const handleEndDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const diff = currentDragOffsetRef.current;
    if (diff > 35) {
      goToPrev();
    } else if (diff < -35) {
      goToNext();
    }
    currentDragOffsetRef.current = 0;
    setDragOffset(0);
  };

  // Global mouse event listeners for smooth drag outside container
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        handleMoveDrag(e.clientX);
      }
    };

    const onMouseUp = () => {
      if (isDraggingRef.current) {
        handleEndDrag();
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: false });
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [goToNext, goToPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    handleStartDrag(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMoveDrag(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleEndDrag();
  };

  return (
    <div
      className="relative w-full py-8 flex flex-col items-center justify-center select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={handleWheel}
    >
      {/* 3D Scene Stage Container */}
      <div
        className="relative w-full max-w-5xl h-[460px] sm:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1200"
        onMouseDown={(e) => {
          e.preventDefault();
          handleStartDrag(e.clientX);
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Central ambient light orb */}
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#B9A4E8]/20 to-[#F8D98D]/20 blur-3xl pointer-events-none transform -translate-y-6" />

        {/* 3D Cover Flow Stage */}
        <div className="relative w-full h-full flex items-center justify-center preserve-3d">
          {memories.map((memory, index) => {
            const isActive = index === activeIndex;

            // Compute relative distance to active card
            let diff = (index - activeIndex) % total;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            const absDiff = Math.abs(diff);

            // Cover Flow Position Calculations:
            // Snug horizontal spacing so side cards sit directly next to the active card
            const dragInfluence = isDragging ? dragOffset * 0.45 : 0;
            const xOffset = diff * spacing + dragInfluence;
            const yRotation = -diff * (isMobile ? 22 : 26);
            const zOffset = isActive ? 50 : -absDiff * 55;
            const scale = isActive ? 1.05 : Math.max(0.74, 0.88 - absDiff * 0.08);
            const opacity = isActive ? 1 : Math.max(0.35, 0.9 - absDiff * 0.25);
            const zIndex = 30 - absDiff * 5;

            return (
              <div
                key={memory.id}
                onClick={(e) => {
                  e.stopPropagation();
                  // Clicking side card smoothly brings it to front!
                  if (!isActive) {
                    setActiveIndex(index);
                  } else {
                    onOpenLightbox(memory);
                  }
                }}
                className={`absolute rounded-2xl overflow-hidden cursor-pointer transition-all ${
                  isDragging ? 'duration-100' : 'duration-600 cubic-bezier(0.25, 1, 0.5, 1)'
                } preserve-3d backface-hidden ${
                  isActive
                    ? 'ring-2 ring-[#F8D98D] shadow-2xl shadow-[#F8D98D]/40'
                    : 'ring-1 ring-[#B9A4E8]/30 shadow-xl shadow-black/80 hover:ring-[#F8D98D]/60 hover:opacity-100'
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${yRotation}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                {/* Pure Clean Image Frame */}
                <div className="relative w-full h-full bg-[#222139] flex flex-col justify-between">
                  <ImageWithFallback
                    memory={memory}
                    className="w-full h-full object-cover"
                    priority={isActive}
                  />

                  {/* Top-Right Cinema Mode trigger button */}
                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLightbox(memory);
                      }}
                      title={t.universe.cinemaMode}
                      aria-label={t.universe.cinemaMode}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#17172B]/85 hover:bg-[#F8D98D] text-[#FFF5F0] hover:text-[#17172B] border border-[#F8D98D]/40 flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Indicators */}
      <div className="mt-6 flex flex-col items-center gap-3 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPrev}
            aria-label={t.universe.prev}
            className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#FFF5F0] hover:text-[#17172B] hover:bg-[#F8D98D] hover:border-[#F8D98D] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#222139]/70 border border-[#B9A4E8]/20 backdrop-blur-md">
            {memories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Jump to memory ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-7 h-2 bg-gradient-to-r from-[#B9A4E8] to-[#F8D98D]'
                    : 'w-2 h-2 bg-[#C5BFD8]/40 hover:bg-[#FFF5F0]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            aria-label={t.universe.next}
            className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#FFF5F0] hover:text-[#17172B] hover:bg-[#F8D98D] hover:border-[#F8D98D] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <span className="text-[11px] text-[#C5BFD8]/70 flex items-center gap-1.5 mt-1">
          Drag or scroll with mouse to explore memories 💫
        </span>
      </div>
    </div>
  );
};
