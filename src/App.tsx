import React, { useState, useRef } from 'react';
import { LanguageProvider, useLanguage } from './hooks/useLanguageContext';
import { AudioPlayerProvider } from './hooks/useAudioPlayer';
import { StarryBackground } from './components/animations/StarryBackground';
import { JourneyProgress } from './components/ui/JourneyProgress';
import { MusicPlayer } from './components/audio/MusicPlayer';
import { CinematicLightbox } from './components/gallery/CinematicLightbox';
import { HeroSection } from './sections/HeroSection';
import { InteractiveGiftBox } from './components/3d/InteractiveGiftBox';
import { PersonalLetterCard } from './components/gallery/PersonalLetterCard';
import { Universe3DCarousel } from './components/gallery/Universe3DCarousel';
import { FloatingPolaroidGallery } from './components/gallery/FloatingPolaroidGallery';
import { InteractiveCake } from './components/3d/InteractiveCake';
import { BirthdayCelebration } from './components/gallery/BirthdayCelebration';
import { memoriesData, universeMemories, polaroidMemories } from './data/memories';
import type { MemoryItem, SceneId } from './types';
import { Sparkles } from 'lucide-react';

const MainExperience: React.FC = () => {
  const { t } = useLanguage();
  const [currentScene, setCurrentScene] = useState<SceneId>('hero');
  const [unlockedScenes, setUnlockedScenes] = useState<Set<SceneId>>(
    new Set<SceneId>(['hero', 'gift'])
  );

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [lightboxList, setLightboxList] = useState<MemoryItem[]>(universeMemories);

  // Section Refs for smooth scrolling
  const giftRef = useRef<HTMLDivElement | null>(null);
  const letterRef = useRef<HTMLDivElement | null>(null);
  const universeRef = useRef<HTMLDivElement | null>(null);
  const polaroidRef = useRef<HTMLDivElement | null>(null);
  const cakeRef = useRef<HTMLDivElement | null>(null);
  const celebrationRef = useRef<HTMLDivElement | null>(null);

  const unlockAndScroll = (scene: SceneId, targetRef?: React.RefObject<HTMLDivElement | null>) => {
    setUnlockedScenes((prev) => new Set([...prev, scene]));
    setCurrentScene(scene);
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenLightbox = (memory: MemoryItem, list: MemoryItem[] = memoriesData) => {
    setSelectedMemory(memory);
    setLightboxList(list);
    setLightboxOpen(true);
  };

  const handleNextLightbox = () => {
    if (!selectedMemory) return;
    const currentIndex = lightboxList.findIndex((m) => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % lightboxList.length;
    setSelectedMemory(lightboxList[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!selectedMemory) return;
    const currentIndex = lightboxList.findIndex((m) => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + lightboxList.length) % lightboxList.length;
    setSelectedMemory(lightboxList[prevIndex]);
  };

  const handleReplay = () => {
    setCurrentScene('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMemories = () => {
    unlockAndScroll('universe', universeRef);
  };

  return (
    <div className="relative min-h-screen text-[#FFF5F0] selection:bg-[#B9A4E8]/30 selection:text-[#F8D98D]">
      {/* Background Ambience */}
      <StarryBackground />

      {/* Floating UI Elements */}
      <JourneyProgress
        currentScene={currentScene}
        onSelectScene={(scene) => {
          setCurrentScene(scene);
          const map: Record<SceneId, React.RefObject<HTMLDivElement | null> | null> = {
            hero: null,
            gift: giftRef,
            letter: letterRef,
            universe: universeRef,
            polaroid: polaroidRef,
            timeline: null,
            cake: cakeRef,
            celebration: celebrationRef,
          };
          const ref = map[scene];
          if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (scene === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        unlockedScenes={unlockedScenes}
      />
      <MusicPlayer />

      {/* Main Container */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Scene 1: Hero */}
        <section id="hero" className="w-full">
          <HeroSection
            onStartSurprise={() => unlockAndScroll('gift', giftRef)}
          />
        </section>

        {/* Scene 2: Interactive 3D Gift Box */}
        <section
          id="gift"
          ref={giftRef}
          className="w-full min-h-[85vh] flex flex-col items-center justify-center py-16"
        >
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9A4E8]/15 border border-[#B9A4E8]/30 text-xs font-semibold text-[#F8D98D] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.gift.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#FFF5F0]">
              {t.gift.title}
            </h2>
          </div>
          <InteractiveGiftBox
            onOpenLetter={() => unlockAndScroll('letter', letterRef)}
          />
        </section>

        {/* Scene 3: Personal Birthday Letter */}
        <section
          id="letter"
          ref={letterRef}
          className="w-full min-h-[85vh] flex flex-col items-center justify-center py-16"
        >
          <PersonalLetterCard
            onContinue={() => unlockAndScroll('universe', universeRef)}
          />
        </section>

        {/* Scene 4: Our Little Universe (3D Photo Carousel) */}
        <section
          id="universe"
          ref={universeRef}
          className="w-full min-h-[90vh] flex flex-col items-center justify-center py-16"
        >
          <div className="text-center mb-6 max-w-2xl px-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9A4E8]/15 border border-[#B9A4E8]/30 text-xs font-semibold text-[#F8D98D] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.universe.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#FFF5F0]">
              {t.universe.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#C5BFD8] mt-2">
              {t.universe.subtitle}
            </p>
          </div>

          <Universe3DCarousel
            memories={universeMemories}
            onOpenLightbox={(m) => handleOpenLightbox(m, universeMemories)}
          />

          <button
            onClick={() => unlockAndScroll('polaroid', polaroidRef)}
            className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-bold text-sm sm:text-base shadow-xl shadow-[#F8D98D]/20 hover:scale-105 active:scale-95 transition-all"
          >
            {t.universe.cta}
          </button>
        </section>

        {/* Scene 5: Floating Polaroid Gallery */}
        <section
          id="polaroids"
          ref={polaroidRef}
          className="w-full min-h-[85vh] flex flex-col items-center justify-center py-16"
        >
          <div className="text-center mb-8 max-w-xl px-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9A4E8]/15 border border-[#B9A4E8]/30 text-xs font-semibold text-[#F8D98D] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.polaroids.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#FFF5F0]">
              {t.polaroids.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#C5BFD8] mt-2">
              {t.polaroids.subtitle}
            </p>
          </div>

          <FloatingPolaroidGallery
            memories={polaroidMemories}
            onOpenLightbox={(m) => handleOpenLightbox(m, polaroidMemories)}
          />

          <button
            onClick={() => unlockAndScroll('cake', cakeRef)}
            className="mt-10 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-bold text-sm sm:text-base shadow-xl shadow-[#F8D98D]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {t.cake.title} 🎂
          </button>
        </section>

        {/* Scene 6: Interactive Birthday Cake & Candles */}
        <section
          id="cake"
          ref={cakeRef}
          className="w-full min-h-[85vh] flex flex-col items-center justify-center py-16"
        >
          <InteractiveCake
            onContinue={() => unlockAndScroll('celebration', celebrationRef)}
          />
        </section>

        {/* Scene 8: Birthday Celebration Finale */}
        <section
          id="celebration"
          ref={celebrationRef}
          className="w-full min-h-[90vh] flex flex-col items-center justify-center py-16"
        >
          <BirthdayCelebration
            onReplay={handleReplay}
            onBackToMemories={handleBackToMemories}
          />
        </section>
      </main>

      {/* Cinematic Lightbox Modal */}
      <CinematicLightbox
        isOpen={lightboxOpen}
        activeMemory={selectedMemory}
        memories={lightboxList}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AudioPlayerProvider>
        <MainExperience />
      </AudioPlayerProvider>
    </LanguageProvider>
  );
}

export default App;
