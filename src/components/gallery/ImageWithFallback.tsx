import React, { useState } from 'react';
import { Sparkles, Camera, Play } from 'lucide-react';
import type { MemoryItem } from '../../types';
import { useLanguage } from '../../hooks/useLanguageContext';

interface ImageWithFallbackProps {
  memory: MemoryItem;
  className?: string;
  alt?: string;
  onClick?: () => void;
  priority?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  memory,
  className = '',
  alt,
  onClick,
  priority = false,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const { getText, isBoth } = useLanguage();

  const isVideo = memory.mediaType === 'video' || memory.imageUrl.endsWith('.mp4');
  const titleText = getText(memory.title);
  const tagText = memory.tag ? getText(memory.tag) : undefined;

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full overflow-hidden bg-[#222139] select-none ${className}`}
    >
      {!hasError ? (
        isVideo ? (
          <div className="relative w-full h-full group/video">
            <video
              src={memory.imageUrl}
              muted
              loop
              playsInline
              preload="none"
              draggable={false}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
            />
            {/* Play badge overlay for video */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none group-hover/video:bg-black/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#17172B]/80 border border-[#F8D98D]/60 flex items-center justify-center shadow-lg backdrop-blur-sm">
                <Play className="w-4 h-4 text-[#F8D98D] fill-[#F8D98D] ml-0.5" />
              </div>
            </div>
          </div>
        ) : (
          <img
            src={memory.imageUrl}
            alt={alt || titleText.primary}
            loading={priority ? 'eager' : 'lazy'}
            draggable={false}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
          />
        )
      ) : null}

      {/* Aesthetic Artistic Fallback if media file is not present */}
      {hasError && (
        <div
          className={`w-full h-full bg-gradient-to-br ${
            memory.fallbackGradient || 'from-[#222139] via-[#3a2d54] to-[#17172B]'
          } flex flex-col items-center justify-between p-6 relative`}
        >
          {/* Ambient Starlight Pattern */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#F8D98D_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Tag */}
          <div className="w-full flex items-center justify-between z-10">
            {tagText && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#17172B]/60 text-[#F8D98D] border border-[#F8D98D]/25 backdrop-blur-sm">
                {tagText.primary}
              </span>
            )}
            <Sparkles className="w-4 h-4 text-[#F8D98D]/80 animate-pulse" />
          </div>

          {/* Central Artistic Constellation */}
          <div className="flex flex-col items-center justify-center text-center my-auto z-10 py-4">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#B9A4E8]/20 to-[#F8D98D]/20 border border-[#F8D98D]/40 flex items-center justify-center mb-3 shadow-inner shadow-[#F8D98D]/20">
              <Camera className="w-7 h-7 text-[#F8D98D]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F8D98D] rounded-full animate-ping opacity-60" />
            </div>
            <h4 className="text-sm font-semibold text-[#FFF5F0] tracking-wide max-w-[200px]">
              {titleText.primary}
            </h4>
            {isBoth && titleText.secondary && (
              <p className="text-xs text-[#B9A4E8] mt-0.5 max-w-[200px]">
                {titleText.secondary}
              </p>
            )}
            <span className="text-[10px] text-[#C5BFD8]/70 mt-2">
              {memory.imageUrl.split('/').pop()}
            </span>
          </div>

          {/* Bottom ambient bar */}
          <div className="w-full text-center z-10">
            <span className="text-[9px] text-[#F8D98D]/60 tracking-wider">
              ✨ Cherished Memory
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
