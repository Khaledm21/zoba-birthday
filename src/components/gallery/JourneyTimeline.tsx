import React from 'react';
import { Sparkles, Smile, Heart, Compass, ArrowRight, ArrowLeft } from 'lucide-react';
import { timelineMilestones } from '../../data/timeline';
import { useLanguage } from '../../hooks/useLanguageContext';

interface JourneyTimelineProps {
  onContinue: () => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ onContinue }) => {
  const { t, getText, isBoth, isRtl } = useLanguage();

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#F8D98D]" />;
      case 'Smile':
        return <Smile className="w-4 h-4 text-[#F8D98D]" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-[#F1B8C8]" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-[#B9A4E8]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#F8D98D]" />;
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-4 flex flex-col items-center">
      {/* Central Timeline Spine line */}
      <div className="relative w-full flex flex-col space-y-8 sm:space-y-12 before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-[#B9A4E8]/20 before:via-[#F8D98D]/40 before:to-[#F1B8C8]/20">
        {timelineMilestones.map((milestone, idx) => {
          const isEven = idx % 2 === 0;
          const title = getText(milestone.title);
          const desc = getText(milestone.description);
          const date = getText(milestone.date);
          const badge = getText(milestone.badge);

          return (
            <div
              key={milestone.id}
              className={`relative flex items-center justify-between w-full ${
                isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
              } flex-col gap-4`}
            >
              {/* Content Card (Left or Right on desktop) */}
              <div className="w-full sm:w-[45%] glass-panel rounded-2xl p-5 sm:p-6 border border-[#B9A4E8]/20 shadow-xl shadow-black/40 hover:border-[#F8D98D]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[#17172B]/80 text-[#F8D98D] border border-[#F8D98D]/30">
                    {badge.primary}
                  </span>
                  <span className="text-xs text-[#C5BFD8]/70">{date.primary}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#FFF5F0] mb-1">
                  {title.primary}
                </h3>
                {isBoth && title.secondary && (
                  <h4 className="text-xs font-medium text-[#B9A4E8] mb-1.5">
                    {title.secondary}
                  </h4>
                )}

                <p className="text-xs sm:text-sm text-[#C5BFD8] leading-relaxed">
                  {desc.primary}
                </p>
                {isBoth && desc.secondary && (
                  <p className="text-xs text-[#B9A4E8]/80 mt-1 italic">
                    {desc.secondary}
                  </p>
                )}
              </div>

              {/* Central Timeline Milestone Node */}
              <div className="absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#17172B] border-2 border-[#F8D98D] shadow-lg shadow-[#F8D98D]/25 hidden sm:flex items-center justify-center z-10">
                {getIcon(milestone.iconName)}
              </div>

              {/* Spacer on opposite side */}
              <div className="hidden sm:block w-[45%]" />
            </div>
          );
        })}
      </div>

      {/* Button to Advance to Cake */}
      <button
        onClick={onContinue}
        className="mt-12 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B9A4E8] via-[#F8D98D] to-[#F1B8C8] text-[#17172B] font-bold text-sm sm:text-base shadow-xl shadow-[#F8D98D]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 z-20"
      >
        <span>{t.timeline.cta}</span>
        {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
      </button>
    </div>
  );
};

