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
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F8D98D', '#B9A4E8', '#F1B8C8', '#FFF5F0', '#E70013'],
        ticks: 220,
        gravity: 0.85,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
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
          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-38 rounded-2xl bg-gradient-to-br from-[#2a244d] via-[#222139] to-[#17172B] border-2 border-[#B9A4E8]/40 shadow-2xl overflow-hidden z-20">
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

            {/* Warm light beam shooting out when open */}
            {isOpen && (
              <div className="absolute inset-x-3 top-0 h-28 bg-gradient-to-t from-transparent via-[#F8D98D]/40 to-[#FFF5F0] blur-sm animate-pulse z-20 pointer-events-none" />
            )}
          </div>

          {/* Box Lid - Slides away to the bottom-left side so it NEVER blocks the envelope */}
          <div
            className={`absolute -top-1 -inset-x-2 h-14 sm:h-16 rounded-2xl bg-gradient-to-br from-[#382b61] via-[#2a244d] to-[#1f1a3a] border-2 border-[#F8D98D]/60 shadow-xl transition-all duration-700 ease-out preserve-3d origin-top-left ${
              isOpen
                ? '-translate-x-28 sm:-translate-x-36 translate-y-16 sm:translate-y-20 rotate-[-22deg] rotate-x-20 z-10 scale-85 opacity-85 pointer-events-none'
                : 'hover:-translate-y-1 z-30'
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

          {/* Floating Royal Wax-Sealed Envelope - Positioned at highest z-index (z-40) */}
          <div
            onClick={(e) => {
              if (isOpen) {
                e.stopPropagation();
                onOpenLetter();
              }
            }}
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out z-40 group cursor-pointer ${
              isOpen
                ? 'scale-100 opacity-100 pointer-events-auto animate-float-envelope'
                : 'translate-y-8 scale-50 opacity-0 pointer-events-none'
            }`}
            style={{
              transitionDelay: isOpen ? '280ms' : '0ms',
            }}
            title="Open Your Special Letter 💌"
          >
            {/* Golden Aura Glow behind envelope */}
            <div className="absolute -inset-4 bg-radial from-[#F8D98D]/60 via-[#B9A4E8]/25 to-transparent blur-2xl rounded-2xl animate-pulse pointer-events-none" />

            {/* Interactive "Tap to Open" pill floating above envelope */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-[#17172B]/95 border border-[#F8D98D] text-[#F8D98D] text-[11px] font-bold shadow-xl flex items-center gap-1.5 group-hover:scale-105 group-hover:bg-[#F8D98D] group-hover:text-[#17172B] transition-all">
              <Sparkles className="w-3 h-3 text-[#F8D98D] group-hover:text-[#17172B]" />
              <span>Open Letter ✨</span>
            </div>

            {/* Premium Parchment Envelope Body */}
            <div className="relative w-40 sm:w-48 h-26 sm:h-32 rounded-xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF1E4] to-[#EEDCC9] border-2 border-[#F8D98D] shadow-2xl shadow-black/70 group-hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col justify-between">
              {/* Letter Card Peeking out from inside envelope */}
              <div className="absolute top-1.5 inset-x-3 h-8 bg-[#FFF5F0] rounded-t-md border-t border-x border-[#d8c7b8]/60 shadow-xs flex items-center justify-center px-2">
                <span className="text-[10px] font-serif italic font-bold text-[#b92c42] tracking-wide">
                  For Zoba 💗
                </span>
              </div>

              {/* Envelope Flap Fold (V-Shape triangular fold) */}
              <div className="absolute top-0 inset-x-0 h-13 bg-gradient-to-b from-[#eedecf] to-[#FFFDF9] border-b border-[#F8D98D]/70 [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-sm z-10 pointer-events-none" />

              {/* 3D Royal Crimson Wax Seal in Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#771524] via-[#b92c42] to-[#992233] shadow-xl shadow-black/50 border-2 border-[#F8D98D] flex items-center justify-center rotate-[-6deg] group-hover:rotate-0 group-hover:scale-110 transition-transform select-none">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-dashed border-[#F8D98D]/80 flex items-center justify-center text-center">
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-tight text-[#F8D98D] uppercase leading-none drop-shadow-sm">
                    FOR ZOBA
                  </span>
                </div>
              </div>

              {/* Classic bottom envelope fold shadows */}
              <div className="absolute bottom-0 inset-x-0 h-14 [clip-path:polygon(0_100%,100%_100%,50%_35%)] bg-gradient-to-t from-[#dfc0ad]/60 to-transparent pointer-events-none" />

              {/* Corner Star Sparkles */}
              <Sparkles className="absolute bottom-2 left-2.5 w-3.5 h-3.5 text-[#F8D98D] animate-spin z-20 pointer-events-none" style={{ animationDuration: '6s' }} />
              <Sparkles className="absolute top-2 right-2.5 w-3 h-3 text-[#F8D98D] z-20 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Secret Message Reveal & Next Step Button */}
      <div className="mt-8 flex flex-col items-center text-center max-w-md px-4 min-h-[110px]">
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
              className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-semibold text-sm shadow-xl shadow-[#F8D98D]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
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
        @keyframes floatEnvelope {
          0%, 100% {
            transform: translate(-50%, -60px) rotate(-2deg);
          }
          50% {
            transform: translate(-50%, -70px) rotate(1deg);
          }
        }
        .animate-float-envelope {
          animation: floatEnvelope 3.5s ease-in-out infinite;
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
