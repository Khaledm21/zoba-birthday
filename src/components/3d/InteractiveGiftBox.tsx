import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../hooks/useLanguageContext';

interface InteractiveGiftBoxProps {
  onOpenLetter: () => void;
}

export const InteractiveGiftBox: React.FC<InteractiveGiftBoxProps> = ({ onOpenLetter }) => {
  const { t, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleOpenBox = () => {
    if (!isOpen) {
      setIsOpen(true);

      // Trigger burst of gold, lavender, blush and celebratory confetti
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#F8D98D', '#B9A4E8', '#F1B8C8', '#FFF5F0', '#E70013'],
        ticks: 200,
        gravity: 0.9,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-8 select-none">
      {/* 3D Box Container with Perspective */}
      <div
        className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer perspective-1000 flex items-center justify-center"
        onClick={handleOpenBox}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow behind the box */}
        <div
          className={`absolute inset-4 rounded-full transition-all duration-700 pointer-events-none ${
            isOpen
              ? 'bg-radial from-[#F8D98D]/40 via-[#B9A4E8]/20 to-transparent blur-3xl scale-150 animate-pulse'
              : isHovered
              ? 'bg-radial from-[#B9A4E8]/30 via-[#F8D98D]/15 to-transparent blur-2xl scale-120'
              : 'bg-radial from-[#B9A4E8]/15 via-[#222139]/30 to-transparent blur-xl scale-100'
          }`}
        />

        {/* Realistic Floor Shadow */}
        <div
          className={`absolute bottom-3 w-48 sm:w-56 h-8 rounded-full bg-black/50 blur-md transition-all duration-500 transform ${
            isOpen ? 'scale-110 opacity-70' : isHovered ? 'scale-90 opacity-40' : 'scale-100 opacity-60'
          }`}
        />

        {/* 3D Gift Box Body & Lid */}
        <div
          className={`relative w-44 sm:w-52 h-44 sm:h-52 preserve-3d transition-all duration-700 ease-out ${
            !isOpen ? (isHovered ? '-translate-y-3 rotate-y-6 rotate-x-6' : 'animate-float') : '-translate-y-2'
          }`}
        >
          {/* Box Bottom Base */}
          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-38 rounded-2xl bg-gradient-to-br from-[#2a244d] via-[#222139] to-[#17172B] border-2 border-[#B9A4E8]/40 shadow-2xl overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />

            {/* Vertical Golden Ribbon */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-[#e5c46e] via-[#F8D98D] to-[#d8b55c] shadow-md border-x border-[#F8D98D]/60 flex items-center justify-center">
              <div className="w-1 h-full bg-[#FFF5F0]/40" />
            </div>

            {/* Horizontal Golden Ribbon */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-b from-[#e5c46e] via-[#F8D98D] to-[#d8b55c] shadow-md border-y border-[#F8D98D]/60 flex items-center justify-center">
              <div className="h-1 w-full bg-[#FFF5F0]/40" />
            </div>

            {/* Light beam shooting out if open */}
            {isOpen && (
              <div className="absolute inset-x-4 top-0 h-28 bg-gradient-to-t from-transparent via-[#F8D98D]/40 to-[#FFF5F0] blur-sm animate-pulse z-20 pointer-events-none" />
            )}
          </div>

          {/* Box Lid with 3D Flip Open Animation */}
          <div
            className={`absolute -top-1 -inset-x-2 h-14 sm:h-16 rounded-2xl bg-gradient-to-br from-[#382b61] via-[#2a244d] to-[#1f1a3a] border-2 border-[#F8D98D]/60 shadow-xl transition-all duration-700 ease-out preserve-3d origin-top-right z-30 ${
              isOpen
                ? '-translate-y-20 -translate-x-12 -rotate-45 rotate-x-45 opacity-90'
                : 'hover:-translate-y-1'
            }`}
          >
            {/* Lid Vertical Ribbon */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-[#e5c46e] via-[#F8D98D] to-[#d8b55c] shadow-inner" />

            {/* Bow / Ribbon Knot on Top */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
              {/* Left loop */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 border-[#F8D98D] bg-gradient-to-br from-[#F8D98D] to-[#d8b55c] shadow-md rotate-[-35deg] transform -mr-2" />
              {/* Central Knot */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#e5c46e] via-[#FFF5F0] to-[#F8D98D] shadow-lg border border-[#FFF5F0]/80 z-10" />
              {/* Right loop */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-4 border-[#F8D98D] bg-gradient-to-bl from-[#F8D98D] to-[#d8b55c] shadow-md rotate-[35deg] transform -ml-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Secret Message Reveal & Next Step Button */}
      <div className="mt-6 flex flex-col items-center text-center max-w-md px-4 min-h-[110px]">
        {!isOpen ? (
          <p className="text-xs sm:text-sm text-[#B9A4E8] animate-pulse">
            {t.gift.hint}
          </p>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8D98D]/15 border border-[#F8D98D]/40 text-[#F8D98D] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{t.gift.revealedTitle}</span>
            </div>

            <p className="text-base sm:text-lg font-serif italic text-[#FFF5F0] drop-shadow-md">
              "{t.gift.revealedText}"
            </p>

            <button
              onClick={onOpenLetter}
              className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-semibold text-sm shadow-xl shadow-[#F8D98D]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span>{t.gift.openLetterBtn}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateY(0deg);
          }
          50% {
            transform: translateY(-10px) rotateY(3deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
