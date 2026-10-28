import React from 'react';
import type { SceneId } from '../../types';
import { useLanguage } from '../../hooks/useLanguageContext';

interface JourneyProgressProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  unlockedScenes: Set<SceneId>;
}

export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  currentScene,
  onSelectScene,
  unlockedScenes,
}) => {
  const { t } = useLanguage();

  const scenes: { id: SceneId; label: string }[] = [
    { id: 'hero', label: t.nav.hero },
    { id: 'gift', label: t.nav.gift },
    { id: 'letter', label: t.nav.letter },
    { id: 'universe', label: t.nav.universe },
    { id: 'polaroid', label: t.nav.polaroids },
    { id: 'cake', label: t.nav.cake },
    { id: 'celebration', label: t.nav.celebration },
  ];

  const currentIndex = scenes.findIndex((s) => s.id === currentScene);

  return (
    <div className="fixed top-5 left-5 z-40 hidden md:flex items-center">
      <div className="glass-panel rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-lg shadow-black/30 border border-[#B9A4E8]/15">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-[#B9A4E8]/80">
          {currentIndex + 1}/{scenes.length}
        </span>
        <div className="h-2.5 w-px bg-[#B9A4E8]/20" />
        <div className="flex items-center gap-1.5">
          {scenes.map((s) => {
            const isCurrent = s.id === currentScene;
            const isUnlocked = unlockedScenes.has(s.id);

            return (
              <button
                key={s.id}
                onClick={() => isUnlocked && onSelectScene(s.id)}
                disabled={!isUnlocked}
                title={s.label}
                aria-label={s.label}
                className={`relative group transition-all duration-300 rounded-full cursor-pointer ${
                  isCurrent
                    ? 'w-6 h-2 bg-gradient-to-r from-[#B9A4E8] to-[#F8D98D]'
                    : isUnlocked
                    ? 'w-2 h-2 bg-[#B9A4E8]/40 hover:bg-[#F8D98D]'
                    : 'w-1.5 h-1.5 bg-[#222139] opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Hover label tooltip */}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] bg-[#17172B]/95 text-[#FFF5F0] border border-[#B9A4E8]/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-50">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
