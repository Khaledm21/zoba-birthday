import React, { useState, useEffect } from 'react';
import { Mail, FastForward, RotateCcw, ArrowRight, ArrowLeft, Music } from 'lucide-react';
import { letterData } from '../../data/letter';
import { useLanguage } from '../../hooks/useLanguageContext';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface PersonalLetterCardProps {
  onContinue: () => void;
}

export const PersonalLetterCard: React.FC<PersonalLetterCardProps> = ({ onContinue }) => {
  const { t, isRtl } = useLanguage();
  const { selectTrack, pause, currentTrackIndex, isPlaying } = useAudioPlayer();
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(0);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);

  // Progressive reveal of paragraphs
  useEffect(() => {
    if (isSkipped) {
      setRevealedParagraphs(letterData.paragraphs.length + 3); // all revealed
      return;
    }

    setRevealedParagraphs(0);
    const intervals: number[] = [];

    // Greeting at 400ms
    intervals.push(window.setTimeout(() => setRevealedParagraphs(1), 400));

    // Paragraphs staggered by 1.2s
    letterData.paragraphs.forEach((_, idx) => {
      intervals.push(
        window.setTimeout(() => {
          setRevealedParagraphs(idx + 2);
        }, 1200 + idx * 1200)
      );
    });

    // Closing & signature at end
    intervals.push(
      window.setTimeout(() => {
        setRevealedParagraphs(letterData.paragraphs.length + 3);
      }, 1200 + letterData.paragraphs.length * 1200)
    );

    return () => {
      intervals.forEach((timer) => clearTimeout(timer));
    };
  }, [isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    setRevealedParagraphs(letterData.paragraphs.length + 3);
  };

  const handleReplay = () => {
    setIsSkipped(false);
    setRevealedParagraphs(0);
  };

  const getGreeting = () => letterData.greeting.ar;
  const getClosing = () => letterData.closing.ar;

  return (
    <div className="relative w-full max-w-2xl mx-auto py-6 px-4 flex flex-col items-center">
      {/* Top Action Toolbar (From The Heart / Song Switcher / Skip-Replay) */}
      <div className="w-full flex items-center justify-between mb-4 px-1 gap-2 text-xs">
        <span className="text-[#B9A4E8] flex items-center gap-1.5 font-medium shrink-0">
          <Mail className="w-3.5 h-3.5 text-[#F8D98D] shrink-0" />
          <span className="whitespace-nowrap">{t.letter.badge}</span>
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Song Switcher for this section: Kelma - Ramy Sabry */}
          <button
            onClick={() => {
              if (currentTrackIndex === 1 && isPlaying) {
                pause();
              } else {
                selectTrack(1); // Song 2: Kelma - Ramy Sabry
              }
            }}
            className={`px-2.5 py-1 rounded-full border flex items-center gap-1.5 transition-all text-[11px] whitespace-nowrap cursor-pointer ${
              currentTrackIndex === 1 && isPlaying
                ? 'bg-[#F8D98D]/20 text-[#F8D98D] border-[#F8D98D]/50'
                : 'bg-[#222139] text-[#C5BFD8] hover:text-[#FFF5F0] border-[#B9A4E8]/20'
            }`}
            title="Play Kelma - Ramy Sabry"
          >
            <Music className="w-3 h-3 text-[#F8D98D] shrink-0" />
            <span className="font-medium">Kelma (Ramy Sabry)</span>
          </button>

          {!isSkipped && revealedParagraphs < letterData.paragraphs.length + 2 && (
            <button
              onClick={handleSkip}
              className="px-2.5 py-1 rounded-full bg-[#222139] hover:bg-[#B9A4E8]/20 text-[#F8D98D] border border-[#F8D98D]/30 flex items-center gap-1 transition-all duration-200 text-[11px] whitespace-nowrap cursor-pointer"
            >
              <FastForward className="w-3 h-3" />
              <span>{t.letter.skip}</span>
            </button>
          )}

          {(isSkipped || revealedParagraphs >= letterData.paragraphs.length + 2) && (
            <button
              onClick={handleReplay}
              className="px-2.5 py-1 rounded-full bg-[#222139] hover:bg-[#B9A4E8]/20 text-[#C5BFD8] border border-[#B9A4E8]/20 flex items-center gap-1 transition-all duration-200 text-[11px] whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.letter.replay}</span>
            </button>
          )}
        </div>
      </div>

      {/* Realistic Paper Card Container */}
      <div className="relative w-full bg-[#FFF5F0] text-[#17172B] rounded-2xl sm:rounded-3xl p-5 sm:p-9 shadow-2xl shadow-black/60 border border-[#F8D98D]/40 transition-all duration-500 overflow-hidden">
        {/* Paper texture overlay and subtle vintage border */}
        <div className="absolute inset-0 bg-[radial-gradient(#d8c7b8_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        <div className="absolute inset-2 sm:inset-3 border border-[#d8c7b8]/50 rounded-xl pointer-events-none" />

        {/* Letter Content */}
        <div className="relative z-10 flex flex-col space-y-5">
          {/* Header Row: Title & Dedication on Left + Wax Seal on Right in Dedicated Space */}
          <div className="flex items-start justify-between gap-3 pb-1 border-b border-[#d8c7b8]/40">
            <div
              className={`flex-1 min-w-0 transition-all duration-700 ${
                revealedParagraphs >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17172B] tracking-tight">
                {getGreeting()}
              </h2>
              <p className="text-sm sm:text-base font-bold text-[#b92c42] mt-1 font-serif">
                كل سنة وانتِ طيبة يا قطووووسة ✨
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#B9A4E8] to-[#F8D98D] rounded-full mt-2.5" />
            </div>

            {/* Wax Seal Badge - Guaranteed NEVER to overlap because of flexbox layout */}
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#992233] via-[#b92c42] to-[#771524] shadow-lg shadow-black/25 border-2 border-[#F8D98D]/60 flex items-center justify-center rotate-[-10deg] select-none">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-dashed border-[#F8D98D]/70 flex items-center justify-center text-center">
                <span className="text-[7px] sm:text-[8px] font-bold tracking-tighter text-[#F8D98D] leading-none uppercase">
                  {t.letter.waxSeal}
                </span>
              </div>
            </div>
          </div>

          {/* Letter Body Paragraphs (Reduced & concise) */}
          <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-[#222139]/90 font-normal">
            {letterData.paragraphs.map((p, idx) => {
              const isVisible = isSkipped || revealedParagraphs >= idx + 2;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'
                  }`}
                >
                  <p>{p.ar}</p>
                </div>
              );
            })}
          </div>

          {/* Closing & Warm Signature */}
          <div
            className={`pt-3 border-t border-[#d8c7b8]/60 flex flex-col gap-1 transition-all duration-700 ${
              isSkipped || revealedParagraphs >= letterData.paragraphs.length + 2
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-sm sm:text-base font-semibold font-serif text-[#17172B]">
              {getClosing()}
            </p>
            <p className="text-xs text-[#222139]/60 font-medium mt-0.5">
              {letterData.signature.ar}
            </p>
          </div>
        </div>
      </div>

      {/* Button to Next Scene */}
      <button
        onClick={onContinue}
        className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-bold text-sm sm:text-base shadow-xl shadow-[#F8D98D]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 z-20 cursor-pointer"
      >
        <span>{t.letter.cta}</span>
        {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </button>
    </div>
  );
};
