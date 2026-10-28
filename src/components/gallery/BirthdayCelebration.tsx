import React, { useEffect, useState } from 'react';
import { Sparkles, RotateCcw, Heart, Compass, Music, Maximize2, X, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../hooks/useLanguageContext';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface BirthdayCelebrationProps {
  onReplay: () => void;
  onBackToMemories: () => void;
}

export const BirthdayCelebration: React.FC<BirthdayCelebrationProps> = ({
  onReplay,
  onBackToMemories,
}) => {
  const { t } = useLanguage();
  const { selectTrack, pause, currentTrackIndex, isPlaying } = useAudioPlayer();
  const [isPhotoZoomed, setIsPhotoZoomed] = useState<boolean>(false);
  const [isHugging, setIsHugging] = useState<boolean>(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState<boolean>(false);

  const handleSendWarmHug = () => {
    setIsHugging(true);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([120, 80, 150]);
    }

    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#F1B8C8', '#FF6B8B', '#F8D98D', '#FFF5F0'],
    });

    setTimeout(() => {
      setIsHugging(false);
    }, 4500);
  };

  const handleDownloadKeepsake = () => {
    setIsGeneratingCard(true);

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGeneratingCard(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/images/memories/memory-012-me.jpeg';

    img.onload = () => {
      // 1. Luxury cosmic gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1440);
      bgGrad.addColorStop(0, '#121124');
      bgGrad.addColorStop(0.5, '#1e1c38');
      bgGrad.addColorStop(1, '#100f1c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1440);

      // 2. Golden borders & corner accents
      ctx.strokeStyle = '#F8D98D';
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, 1008, 1368);

      ctx.strokeStyle = 'rgba(185, 164, 232, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(48, 48, 984, 1344);

      const corners = [
        [36, 36], [1044, 36], [36, 1404], [1044, 1404]
      ];
      ctx.fillStyle = '#F8D98D';
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Top Title
      ctx.fillStyle = '#F8D98D';
      ctx.font = 'bold 26px "Georgia", serif';
      ctx.textAlign = 'center';
      ctx.fillText('A SPECIAL BIRTHDAY KEEPSAKE ✨', 540, 115);

      ctx.fillStyle = '#FFF5F0';
      ctx.font = 'bold 50px "Georgia", serif';
      ctx.fillText('HAPPY BIRTHDAY, ZOBA 🎂', 540, 180);

      // 4. Centerpiece Photo (dest: 720x900) with object-top crop
      const destX = 180;
      const destY = 225;
      const destW = 720;
      const destH = 900;

      ctx.fillStyle = '#222139';
      ctx.fillRect(destX - 10, destY - 10, destW + 20, destH + 20);
      ctx.strokeStyle = '#F8D98D';
      ctx.lineWidth = 3;
      ctx.strokeRect(destX - 10, destY - 10, destW + 20, destH + 20);

      ctx.drawImage(img, 0, 0, 900, 1200, destX, destY, destW, destH);

      // 5. Dedication texts below photo
      ctx.fillStyle = '#F8D98D';
      ctx.font = 'italic 26px "Georgia", serif';
      ctx.fillText('“Distance means so little when someone means so much...”', 540, 1180);

      ctx.fillStyle = '#FFF5F0';
      ctx.font = 'bold 36px "Georgia", serif';
      ctx.fillText('Miss you so much, Zoba! 💗', 540, 1235);

      ctx.fillStyle = 'rgba(197, 191, 216, 0.9)';
      ctx.font = 'bold 28px "Segoe UI", Tahoma, sans-serif';
      ctx.fillText('كل سنة وانتي طيبة يا بهنوووسة 💗', 540, 1285);

      ctx.fillStyle = 'rgba(248, 217, 141, 0.6)';
      ctx.font = '16px monospace';
      ctx.fillText('MADE WITH LOVE • ALWAYS CHERISHED', 540, 1335);

      // 6. Trigger Download
      try {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'Zoba-Birthday-Keepsake.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Canvas download error:', err);
      } finally {
        setIsGeneratingCard(false);
      }
    };

    img.onerror = () => {
      setIsGeneratingCard(false);
    };
  };

  const fireGrandConfetti = () => {
    // Left burst
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.65 },
      colors: ['#F8D98D', '#B9A4E8', '#F1B8C8', '#FFF5F0'],
    });
    // Right burst
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.65 },
      colors: ['#F8D98D', '#B9A4E8', '#F1B8C8', '#FFF5F0'],
    });
  };

  useEffect(() => {
    fireGrandConfetti();
    const timer = setTimeout(fireGrandConfetti, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto py-10 px-4 flex flex-col items-center text-center select-none">
      {/* Radiant celebratory glow */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#B9A4E8]/20 via-[#F8D98D]/25 to-[#F1B8C8]/20 blur-3xl pointer-events-none -top-12 animate-pulse" />

      {/* Golden Celebration Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8D98D]/15 border border-[#F8D98D]/40 text-[#F8D98D] text-xs font-semibold mb-6 shadow-md shadow-[#F8D98D]/10">
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>A Special Day • An Extraordinary Soul</span>
        <Sparkles className="w-4 h-4 animate-spin" />
      </div>

      {/* Grand Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif text-[#FFF5F0] tracking-tight leading-tight drop-shadow-xl mb-2">
        {t.celebration.title}
      </h1>
      <p className="text-lg sm:text-2xl font-serif text-[#F8D98D] font-bold mb-4">
        كل سنة وانتي طيبة يا بهنوووسة ✨
      </p>

      {/* 🌟 Grand Finale Centerpiece Photo: You & Zoba Together */}
      <div className="my-6 relative w-full max-w-[300px] sm:max-w-sm mx-auto group">
        {/* Ambient golden aura behind the photo */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] rounded-3xl blur-xl opacity-45 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />

        <div className="relative rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-[#222139]/95 border-2 border-[#F8D98D]/70 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Photo Frame with portrait 3:4 aspect ratio & object-top so faces are fully visible */}
          <div
            onClick={() => setIsPhotoZoomed(true)}
            className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#B9A4E8]/30 shadow-inner bg-[#17172B] cursor-pointer group/frame"
            title="Click to view full photo"
          >
            <img
              src="/images/memories/memory-012-me.jpeg"
              alt="You & Zoba"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle tap-to-zoom badge */}
            <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#17172B]/80 border border-[#F8D98D]/50 text-[#F8D98D] flex items-center justify-center shadow-md opacity-80 sm:opacity-0 group-hover/frame:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Sweet Distance Dedication */}
          <div className="mt-3 pt-2 border-t border-[#B9A4E8]/20 flex flex-col items-center gap-1 text-center">
            <p className="text-xs sm:text-sm font-medium text-[#F8D98D] italic">
              Distance means so little when someone means so much...
            </p>
            <span className="text-[11px] sm:text-xs text-[#FFF5F0]/90 font-semibold flex items-center gap-1">
              Miss you so much, Zoba! 💗
            </span>
          </div>
        </div>
      </div>

      {/* Heartfelt Closing Message Card */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-2xl border border-[#B9A4E8]/30 shadow-2xl shadow-black/50 my-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8]" />

        <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#FFF5F0]/95">
          “{t.celebration.message}”
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-[#F8D98D]">
          <Heart className="w-4 h-4 fill-[#F1B8C8] text-[#F1B8C8]" />
          <span>كل سنة وانتي طيبة يا بهنوووسة 💗</span>
        </div>
      </div>

      {/* Organized Celebration Action Dashboard */}
      <div className="w-full max-w-xl mx-auto flex flex-col gap-4 mt-4 z-20 px-2 pb-28">
        {/* 1. Dedicated Music Box: Celebration Tracks in their own neat section */}
        <div className="rounded-2xl bg-[#222139]/80 border border-[#B9A4E8]/30 p-4 sm:p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F8D98D] uppercase tracking-wider">
              <Music className="w-4 h-4 text-[#F8D98D]" />
              <span>Songs For You 💗</span>
            </div>
            {/* Quick Confetti Popper Button */}
            <button
              onClick={fireGrandConfetti}
              title="Celebrate with Confetti"
              className="px-2.5 py-1 rounded-full bg-[#F8D98D]/20 hover:bg-[#F8D98D]/30 border border-[#F8D98D]/40 text-xs text-[#F8D98D] font-medium flex items-center gap-1 transition-all cursor-pointer active:scale-95"
            >
              <span>🎉</span>
              <span className="text-[11px] font-semibold">Confetti</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Sidi Mansour Track */}
            <button
              onClick={() => {
                if (currentTrackIndex === 2 && isPlaying) {
                  pause();
                } else {
                  selectTrack(2);
                  fireGrandConfetti();
                }
              }}
              className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                currentTrackIndex === 2 && isPlaying
                  ? 'bg-gradient-to-r from-[#8b2435] to-[#a82d42] border-[#F8D98D] shadow-lg shadow-red-950/40 text-[#FFF5F0]'
                  : 'bg-[#17172B]/70 hover:bg-[#17172B] border-[#B9A4E8]/20 text-[#C5BFD8] hover:text-[#FFF5F0]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 text-left">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  currentTrackIndex === 2 && isPlaying ? 'bg-white/20' : 'bg-[#222139]'
                }`}>
                  <Music className="w-4 h-4 text-[#F8D98D]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate text-[#FFF5F0]">Sidi Mansour</p>
                  <p className="text-[10px] text-[#C5BFD8]/70 truncate">Saber Rebai 🇹🇳</p>
                </div>
              </div>
              <span className="text-xs shrink-0 font-medium px-2 py-0.5 rounded-full bg-white/10 text-[#F8D98D]">
                {currentTrackIndex === 2 && isPlaying ? 'Playing ♪' : 'Play ▶'}
              </span>
            </button>

            {/* Kelma Track */}
            <button
              onClick={() => {
                if (currentTrackIndex === 1 && isPlaying) {
                  pause();
                } else {
                  selectTrack(1);
                  fireGrandConfetti();
                }
              }}
              className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                currentTrackIndex === 1 && isPlaying
                  ? 'bg-gradient-to-r from-[#382b61] to-[#4c3b82] border-[#F8D98D] shadow-lg shadow-purple-950/40 text-[#FFF5F0]'
                  : 'bg-[#17172B]/70 hover:bg-[#17172B] border-[#B9A4E8]/20 text-[#C5BFD8] hover:text-[#FFF5F0]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 text-left">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  currentTrackIndex === 1 && isPlaying ? 'bg-white/20' : 'bg-[#222139]'
                }`}>
                  <Music className="w-4 h-4 text-[#B9A4E8]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate text-[#FFF5F0]">Kelma</p>
                  <p className="text-[10px] text-[#C5BFD8]/70 truncate">Ramy Sabry</p>
                </div>
              </div>
              <span className="text-xs shrink-0 font-medium px-2 py-0.5 rounded-full bg-white/10 text-[#F8D98D]">
                {currentTrackIndex === 1 && isPlaying ? 'Playing ♪' : 'Play ▶'}
              </span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Highlights: Warm Hug & Keepsake Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Virtual Hug Button */}
          <button
            onClick={handleSendWarmHug}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F1B8C8] via-[#FF8EAA] to-[#F8D98D] text-[#17172B] font-bold text-sm shadow-xl shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-[#17172B]" />
            <span>Send a Warm Hug 🤗</span>
          </button>

          {/* Download Keepsake Card */}
          <button
            onClick={handleDownloadKeepsake}
            disabled={isGeneratingCard}
            className="w-full py-3.5 px-4 rounded-xl bg-[#222139] hover:bg-[#2b2947] text-[#FFF5F0] border border-[#F8D98D]/60 font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#F8D98D]" />
            <span>{isGeneratingCard ? 'Creating Card... ✨' : 'Save Keepsake Card 📸'}</span>
          </button>
        </div>

        {/* 3. Navigation & Replay: Compact & Aligned */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={onBackToMemories}
            className="w-full py-2.5 px-3 rounded-xl bg-[#17172B]/80 hover:bg-[#222139] text-[#C5BFD8] hover:text-[#FFF5F0] border border-[#B9A4E8]/20 font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#B9A4E8]" />
            <span className="truncate">{t.celebration.backToMemories}</span>
          </button>

          <button
            onClick={onReplay}
            className="w-full py-2.5 px-3 rounded-xl bg-[#17172B]/80 hover:bg-[#222139] text-[#C5BFD8] hover:text-[#FFF5F0] border border-[#B9A4E8]/20 font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5BFD8]" />
            <span className="truncate">{t.celebration.replay}</span>
          </button>
        </div>
      </div>

      {/* Full Uncropped Photo Zoom Modal */}
      {isPhotoZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsPhotoZoomed(false)}
        >
          <div
            className="relative max-w-sm w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPhotoZoomed(false)}
              aria-label="Close"
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src="/images/memories/memory-012-me.jpeg"
              alt="You & Zoba Full"
              className="w-auto h-auto max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain border-2 border-[#F8D98D]/60"
            />
          </div>
        </div>
      )}
      {/* Virtual Hug Across the Miles Modal */}
      {isHugging && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsHugging(false)}
        >
          <div
            className="relative glass-panel rounded-3xl p-7 sm:p-9 max-w-sm w-full text-center border-2 border-[#F1B8C8]/60 shadow-2xl shadow-pink-500/30 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-3 animate-bounce">🤗💗</div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#FFF5F0] mb-2">
              Warm Hug Received!
            </h3>
            <p className="text-sm sm:text-base text-[#F8D98D] italic font-medium leading-relaxed">
              “A warm hug received across the miles! You are never too far 💗”
            </p>
            <p className="text-xs text-[#C5BFD8] mt-2">
              Sent with love, gratitude & warmest wishes ✨
            </p>
            <button
              onClick={() => setIsHugging(false)}
              className="mt-5 px-6 py-2 rounded-full bg-gradient-to-r from-[#F1B8C8] to-[#F8D98D] text-[#17172B] font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              Close with love 💕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
