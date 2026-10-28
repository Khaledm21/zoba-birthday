import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Mic, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../hooks/useLanguageContext';
import { sendWishToEmail } from '../../services/emailService';

interface InteractiveCakeProps {
  onContinue: () => void;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({ onContinue }) => {
  const { t, isRtl } = useLanguage();
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [showSmoke, setShowSmoke] = useState<boolean>(false);

  // Secret Birthday Wish Jar State
  const [wish, setWish] = useState<string>(() => {
    return localStorage.getItem('zoba_birthday_secret_wish') || '';
  });
  const [wishInput, setWishInput] = useState<string>('');
  const [isWishSaved, setIsWishSaved] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('zoba_birthday_secret_wish'));
  });
  const [isShootingStar, setIsShootingStar] = useState<boolean>(false);

  const handleSaveWish = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!wishInput.trim()) return;

    const trimmed = wishInput.trim();
    setWish(trimmed);
    localStorage.setItem('zoba_birthday_secret_wish', trimmed);
    setIsShootingStar(true);

    // Send wish to Khaled's email via Brevo
    sendWishToEmail(trimmed);

    // Initial launch sparkles
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#F8D98D', '#FFF5F0', '#B9A4E8'],
    });

    // Cosmic stardust explosion when shooting star arrives at upper sky
    setTimeout(() => {
      confetti({
        particleCount: 65,
        spread: 90,
        origin: { x: 0.85, y: 0.15 },
        colors: ['#F8D98D', '#FFF5F0', '#F1B8C8', '#FFE29A'],
      });
    }, 1400);

    setTimeout(() => {
      setIsWishSaved(true);
      setIsShootingStar(false);
    }, 2200);
  };

  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Extinguish candles action
  const extinguishCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setShowSmoke(true);
    stopMicListening();

    // Gentle sparkles confetti burst
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#F8D98D', '#FFF5F0', '#B9A4E8', '#F1B8C8'],
      ticks: 180,
    });

    // Hide smoke after a few seconds
    setTimeout(() => {
      setShowSmoke(false);
    }, 3000);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setShowSmoke(false);
  };

  // Optional Microphone blow detection
  const startMicBlowDetection = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let blowCount = 0;
      const checkBlow = () => {
        if (!candlesLit || !audioStreamRef.current) return;

        analyser.getByteFrequencyData(dataArray);

        // Low-frequency breath turbulence energy detection
        let lowFreqEnergy = 0;
        for (let i = 0; i < 20; i++) {
          lowFreqEnergy += dataArray[i];
        }
        const avg = lowFreqEnergy / 20;

        if (avg > 75) {
          blowCount++;
          if (blowCount > 4) {
            extinguishCandles();
            return;
          }
        } else {
          blowCount = Math.max(0, blowCount - 1);
        }

        requestAnimationFrame(checkBlow);
      };

      requestAnimationFrame(checkBlow);
    } catch {
      setMicError(t.cake.micError);
      setIsListeningMic(false);
    }
  };

  const stopMicListening = () => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsListeningMic(false);
  };

  useEffect(() => {
    return () => {
      stopMicListening();
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto py-8 px-4 flex flex-col items-center select-none">
      {/* Title / Instruction Badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9A4E8]/15 border border-[#B9A4E8]/30 text-xs font-semibold text-[#F8D98D] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cake.badge}</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF5F0]">
          {t.cake.instruction}
        </h2>
      </div>

      {/* Interactive Birthday Cake Illustration Frame */}
      <div
        className="relative w-72 sm:w-80 h-72 sm:h-80 flex flex-col items-center justify-end cursor-pointer group transition-transform duration-300 hover:scale-[1.02] active:scale-98"
        onClick={candlesLit ? extinguishCandles : relightCandles}
        title={candlesLit ? "Tap cake to blow out candles" : "Tap cake to relight"}
      >
        {/* Cake Plate Glow */}
        <div className="absolute bottom-2 w-64 sm:w-72 h-8 rounded-full bg-[#F8D98D]/20 blur-xl pointer-events-none" />

        {/* 3 Candles on top */}
        <div className="relative z-20 flex items-end justify-center gap-6 sm:gap-8 mb-[-4px]">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Flickering Flame */}
              {candlesLit && (
                <div className="relative mb-1">
                  <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-[#f59e0b] via-[#fbbf24] to-[#fef08a] shadow-lg shadow-[#fbbf24]/80 animate-flame origin-bottom" />
                  <div className="absolute inset-1 rounded-full bg-white/70 blur-[1px]" />
                  <div className="absolute -inset-2 rounded-full bg-[#fbbf24]/30 blur-md pointer-events-none animate-pulse" />
                </div>
              )}

              {/* Smoke puff when extinguished */}
              {!candlesLit && showSmoke && (
                <div className="w-2 h-8 bg-gradient-to-t from-gray-400/40 to-transparent blur-[2px] animate-smoke -translate-y-2 pointer-events-none" />
              )}

              {/* Candle Wick */}
              <div className="w-0.5 h-2.5 bg-[#4a3f35]" />

              {/* Candle Body */}
              <div
                className={`w-3.5 h-12 rounded-t-sm shadow-md border-x border-white/20 ${
                  idx === 1
                    ? 'bg-gradient-to-b from-[#F8D98D] to-[#e6be60] h-14'
                    : 'bg-gradient-to-b from-[#B9A4E8] to-[#9a82d1]'
                }`}
              >
                {/* Spiral decorative stripe */}
                <div className="w-full h-1.5 bg-white/40 my-1 rotate-12" />
                <div className="w-full h-1.5 bg-white/40 my-1 rotate-12" />
                <div className="w-full h-1.5 bg-white/40 my-1 rotate-12" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Tier 2 (Top Tier) */}
        <div className="relative z-10 w-44 sm:w-48 h-18 rounded-t-2xl bg-gradient-to-b from-[#FFF5F0] via-[#f7e3d8] to-[#eed0c0] shadow-lg border-t-2 border-white/80 overflow-hidden flex flex-col justify-between">
          {/* Frosting Drips & Jasmine Petal Sprinkles */}
          <div className="w-full h-4 bg-gradient-to-r from-[#B9A4E8] via-[#F1B8C8] to-[#B9A4E8] rounded-b-xl shadow-xs flex items-center justify-around px-2">
            <span className="w-2 h-2 rounded-full bg-[#FFF5F0] shadow-sm" title="Jasmine" />
            <span className="w-2 h-2 rounded-full bg-[#F8D98D]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFF5F0] border border-[#F8D98D]/40" title="Jasmine" />
            <span className="w-2 h-2 rounded-full bg-[#F1B8C8]" />
            <span className="w-2 h-2 rounded-full bg-[#FFF5F0] shadow-sm" title="Jasmine" />
          </div>
          {/* Subtle sponge texture */}
          <div className="w-full h-1.5 bg-[#d6b098]/30 mb-1" />
        </div>

        {/* Cake Tier 1 (Bottom Tier) */}
        <div className="relative z-0 w-60 sm:w-68 h-24 rounded-t-2xl bg-gradient-to-b from-[#2a244d] via-[#222139] to-[#1a192c] shadow-2xl border-t-2 border-[#B9A4E8]/60 overflow-hidden flex flex-col justify-between">
          {/* Frosting Piping Row */}
          <div className="w-full h-5 bg-gradient-to-r from-[#F8D98D] via-[#FFF5F0] to-[#F8D98D] shadow-sm flex items-center justify-around px-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#B9A4E8] shadow-inner" />
            ))}
          </div>

          {/* Golden Lettering on cake body */}
          <div className="w-full flex items-center justify-center py-1">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F8D98D] drop-shadow-md">
              HAPPY BIRTHDAY ZOBA ✨
            </span>
          </div>

          <div className="w-full h-2 bg-[#17172B]/60" />
        </div>

        {/* Cake Stand / Plate */}
        <div className="relative w-68 sm:w-76 h-5 rounded-full bg-gradient-to-r from-[#e5c46e] via-[#F8D98D] to-[#d8b55c] shadow-xl border-t border-white/60 -mt-1 flex items-center justify-center">
          <div className="w-48 h-1 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Controls & Wish Text */}
      <div className="mt-8 flex flex-col items-center text-center gap-4 min-h-[100px]">
        {candlesLit ? (
          <div className="flex flex-col items-center gap-2.5">
            {!isListeningMic ? (
              <button
                onClick={startMicBlowDetection}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F8D98D] via-[#FFE29A] to-[#F1B8C8] text-[#17172B] font-bold text-base sm:text-lg shadow-xl shadow-[#F8D98D]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Mic className="w-5 h-5 text-[#17172B] animate-pulse" />
                <span>{t.cake.micAction}</span>
              </button>
            ) : (
              <div className="px-6 py-3 rounded-full bg-[#222139] border border-[#F8D98D]/50 text-[#F8D98D] text-sm font-semibold animate-pulse flex items-center gap-2 shadow-lg">
                <Mic className="w-4 h-4 animate-bounce text-[#F8D98D]" />
                <span>{t.cake.micListening}</span>
              </div>
            )}

            <span className="text-xs text-[#C5BFD8]/70 flex items-center gap-1.5 mt-0.5">
              (or tap the cake directly 🎂)
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8D98D]/15 border border-[#F8D98D]/40 text-[#F8D98D] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.cake.wishMadeText}</span>
            </div>

            {/* 🌟 Secret Birthday Wish Jar */}
            <div className="w-full max-w-sm my-1">
              {isWishSaved ? (
                <div className="glass-panel rounded-2xl p-4 border border-[#F8D98D]/40 text-center animate-fadeIn shadow-xl shadow-black/40 bg-[#17172B]/85">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#F8D98D] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#F8D98D]" />
                    <span>Your secret wish is sealed in the stars ✨</span>
                  </div>
                  <p className="text-sm font-serif italic text-[#FFF5F0] my-2 break-words">
                    "{wish}"
                  </p>
                  <button
                    onClick={() => {
                      setIsWishSaved(false);
                      setWishInput(wish);
                    }}
                    className="text-[11px] text-[#C5BFD8] hover:text-[#F8D98D] underline transition-colors cursor-pointer"
                  >
                    Edit your wish ✍️
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSaveWish}
                  className="glass-panel rounded-2xl p-4 border border-[#B9A4E8]/30 text-center animate-fadeIn shadow-xl shadow-black/40 bg-[#17172B]/85 flex flex-col items-center gap-2.5"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F8D98D]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Make a secret wish for your new year...</span>
                  </div>
                  <input
                    type="text"
                    value={wishInput}
                    onChange={(e) => setWishInput(e.target.value)}
                    placeholder="Type your secret wish here... 💫"
                    maxLength={100}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#222139] border border-[#B9A4E8]/30 text-xs sm:text-sm text-[#FFF5F0] placeholder-[#C5BFD8]/50 focus:outline-none focus:border-[#F8D98D] text-center"
                  />
                  <button
                    type="submit"
                    disabled={!wishInput.trim() || isShootingStar}
                    className={`px-5 py-2 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      wishInput.trim()
                        ? 'bg-gradient-to-r from-[#F8D98D] via-[#FFE29A] to-[#F1B8C8] text-[#17172B] hover:scale-105 active:scale-95 shadow-[#F8D98D]/20'
                        : 'bg-[#222139] text-[#C5BFD8]/40 border border-[#B9A4E8]/20 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isShootingStar ? 'Flying to the Stars... 🌠' : 'Save to the Stars ✨'}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={onContinue}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-bold text-sm sm:text-base shadow-xl shadow-[#F8D98D]/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{t.cake.cta}</span>
                {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>

              <button
                onClick={relightCandles}
                title={t.cake.relight}
                aria-label={t.cake.relight}
                className="p-3 rounded-full bg-[#222139] hover:bg-[#B9A4E8]/20 text-[#FFF5F0] border border-[#B9A4E8]/30 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {micError && (
          <p className="text-xs text-[#F1B8C8]/80 max-w-sm mt-1">
            {micError}
          </p>
        )}
      </div>

      {/* Real Birthday Cake Keepsake Photo Card */}
      <div className="mt-8 flex flex-col items-center">
        <div className="group relative bg-[#FFF5F0] p-3 pb-4 rounded-xl shadow-2xl shadow-black/50 border border-white/80 max-w-[260px] sm:max-w-[280px] rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
          {/* Decorative Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#F8D98D]/40 backdrop-blur-sm border-l border-r border-[#F8D98D]/60 rotate-[1deg] shadow-sm pointer-events-none rounded-xs flex items-center justify-center">
            <span className="text-[8px] text-[#17172B]/70 font-mono">SWEET MOMENTS</span>
          </div>

          <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#222139] border border-black/10">
            <img
              src="/images/memories/memory-011-cake.jpeg"
              alt="Real Birthday Cake for Zoba"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* 🌠 Cinematic Shooting Star Overlay */}
      {isShootingStar && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center">
          {/* Ambient sky shimmer */}
          <div className="absolute inset-0 bg-radial from-[#F8D98D]/20 via-[#B9A4E8]/10 to-transparent animate-pulse" />

          {/* Shooting Star Vessel (travels from wish box up to the cosmos) */}
          <div className="shooting-star-vessel absolute bottom-[35%] left-[20%] sm:left-[30%]">
            <div className="relative flex items-center">
              {/* Luminous Glowing Comet Tail */}
              <div className="w-56 sm:w-80 h-2.5 rounded-full bg-gradient-to-l from-white via-[#F8D98D] to-transparent shadow-[0_0_25px_#F8D98D] transform rotate-180 -mr-3" />

              {/* Blazing Comet Head Nucleus */}
              <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_0_40px_14px_rgba(248,217,141,1),0_0_70px_25px_rgba(255,255,255,0.9)] flex items-center justify-center animate-spin">
                <span className="text-xl">⭐</span>
              </div>

              {/* The Wish Capsule Message flying with the star */}
              <div className="absolute left-14 -top-12 px-4 py-1.5 rounded-full bg-[#17172B]/95 border-2 border-[#F8D98D] text-xs font-serif text-[#F8D98D] shadow-2xl shadow-black/90 whitespace-nowrap flex items-center gap-2 backdrop-blur-md">
                <span className="animate-pulse">✨</span>
                <span className="italic max-w-[200px] truncate">"{wish}"</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shootingStarFlight {
          0% {
            transform: translate3d(0, 0, 0) scale(0.35) rotate(-38deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
            transform: translate3d(8vw, -12vh, 0) scale(1.15) rotate(-38deg);
          }
          75% {
            opacity: 1;
            transform: translate3d(55vw, -65vh, 0) scale(0.95) rotate(-38deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(80vw, -92vh, 0) scale(0.25) rotate(-38deg);
          }
        }
        .shooting-star-vessel {
          animation: shootingStarFlight 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes flameWiggle {
          0%, 100% {
            transform: scale(1) rotate(-1deg);
          }
          50% {
            transform: scale(1.08, 0.95) rotate(2deg);
          }
        }
        .animate-flame {
          animation: flameWiggle 0.4s ease-in-out infinite alternate;
        }
        @keyframes smokeRise {
          0% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-24px) scale(2);
          }
        }
        .animate-smoke {
          animation: smokeRise 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
