import React from 'react';
import { Sparkles } from 'lucide-react';
import type { MemoryItem } from '../../types';
import { ImageWithFallback } from './ImageWithFallback';

interface FloatingPolaroidGalleryProps {
  memories: MemoryItem[];
  onOpenLightbox: (memory: MemoryItem) => void;
}

export const FloatingPolaroidGallery: React.FC<FloatingPolaroidGalleryProps> = ({
  memories,
  onOpenLightbox,
}) => {
  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto px-4">
        {memories.map((memory, index) => {
          const rotation = memory.rotation || ((index % 3) - 1) * 3;

          return (
            <div
              key={memory.id}
              onClick={() => onOpenLightbox(memory)}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
              className="group relative cursor-pointer transition-all duration-500 ease-out hover:!rotate-0 hover:scale-105 hover:z-30 hover:-translate-y-2"
            >
              {/* Decorative Tape Strip on top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#F8D98D]/40 backdrop-blur-sm border-l border-r border-[#F8D98D]/60 rotate-[-2deg] shadow-sm z-20 pointer-events-none rounded-xs flex items-center justify-center">
                <span className="text-[9px] text-[#17172B]/70 font-mono tracking-tighter">
                  ZOBA ✨ 2026
                </span>
              </div>

              {/* Clean Classic Polaroid Paper Frame — Pure Photo */}
              <div className="bg-[#FFF5F0] p-3 pb-8 rounded-md shadow-xl shadow-black/40 border border-[#FFF5F0]/90 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-[#F8D98D]/20">
                {/* Photo Frame Container */}
                <div className="relative w-full aspect-square bg-[#222139] rounded-xs overflow-hidden border border-black/10">
                  <ImageWithFallback
                    memory={memory}
                    className="w-full h-full object-cover"
                  />

                  {/* Subtle corner sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none" />
                </div>
              </div>

              {/* Floating decorative star */}
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#17172B] border border-[#F8D98D]/40 text-[#F8D98D] shadow-md group-hover:scale-125 transition-transform duration-300 pointer-events-none">
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
