import React from 'react';
import { Sparkles, Gift, ArrowDown, Music } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguageContext';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface HeroSectionProps {
  onStartSurprise: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartSurprise }) => {
  const { t } = useLanguage();
  const { isPlaying, selectTrack } = useAudioPlayer();

  const handleStart = () => {
    if (!isPlaying) {
      selectTrack(0); // Starts Track 1: "Kol Sana Wenta Albi"
    }
    onStartSurprise();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-12 select-none">
      {/* Central Ambient Halo Glow */}
      <div className="absolute w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#B9A4E8]/20 via-[#F8D98D]/15 to-[#F1B8C8]/15 blur-3xl pointer-events-none -translate-y-4 animate-pulse-glow" />

      {/* Floating Birthday Elements around Hero */}
      <div className="absolute top-1/4 left-[10%] sm:left-[20%] text-2xl sm:text-3xl animate-float pointer-events-none drop-shadow-lg">
        🎂
      </div>
      <div
        className="absolute bottom-1/3 right-[12%] sm:right-[22%] text-2xl sm:text-3xl animate-float pointer-events-none drop-shadow-lg"
        style={{ animationDelay: '2s' }}
      >
        💖
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#222139]/80 border border-[#B9A4E8]/30 text-xs font-semibold text-[#F8D98D] mb-6 shadow-lg shadow-black/30 backdrop-blur-md animate-fadeIn">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{t.hero.badge}</span>
      </div>

      {/* Main Cinematic Title */}
      <div className="max-w-3xl space-y-3 mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5F0] via-[#FFF5F0] to-[#C5BFD8] drop-shadow-2xl">
          {t.hero.title}
        </h1>

        <p className="text-base sm:text-xl md:text-2xl font-medium text-[#F8D98D] tracking-wide">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Interactive Action Button */}
      <div className="mt-6 flex flex-col items-center gap-4 z-20">
        <button
          onClick={handleStart}
          className="group relative px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-bold text-base sm:text-lg shadow-2xl shadow-[#F8D98D]/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 overflow-hidden cursor-pointer"
        >
          {/* Subtle light sweep animation */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <Gift className="w-5 h-5 text-[#17172B] group-hover:rotate-12 transition-transform duration-300" />
          <span>{t.hero.cta}</span>
          <Sparkles className="w-4 h-4 text-[#17172B]" />
        </button>

        <div className="flex items-center gap-2 text-xs text-[#C5BFD8]/70 mt-1">
          <Music className="w-3.5 h-3.5 text-[#F8D98D]" />
          <span>Kol Sana Wenta Albi 🎵</span>
        </div>

        <span className="text-xs text-[#C5BFD8]/70 flex items-center gap-1.5 mt-2 animate-bounce">
          <ArrowDown className="w-3.5 h-3.5" />
          <span>{t.hero.scrollHint}</span>
        </span>
      </div>
    </div>
  );
};
