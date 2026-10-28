  import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ListMusic,
  Sparkles,
  X,
} from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export const MusicPlayer: React.FC = () => {
  const {
    currentTrackIndex,
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    audioSource,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
    toggleMute,
    playlist,
    showPlaylistModal,
    setShowPlaylistModal,
  } = useAudioPlayer();

  const [showVolume, setShowVolume] = useState<boolean>(false);

  return (
    <>
      {/* Floating Music Jukebox Bar */}
      <div
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 select-none"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <div className="glass-panel rounded-full px-3 py-2 flex items-center gap-2.5 transition-all duration-300 hover:border-[#F8D98D]/40 shadow-2xl shadow-black/60">
          {/* Previous Track */}
          <button
            onClick={prevTrack}
            title="Previous Track"
            aria-label="Previous Track"
            className="w-7 h-7 rounded-full text-[#B9A4E8] hover:text-[#FFF5F0] hover:bg-[#222139] flex items-center justify-center transition-all"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B9A4E8] to-[#F8D98D] text-[#17172B] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-md shadow-[#B9A4E8]/20 focus:outline-none"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-[#17172B]" />
            ) : (
              <Play className="w-4 h-4 fill-[#17172B] ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={nextTrack}
            title="Next Track"
            aria-label="Next Track"
            className="w-7 h-7 rounded-full text-[#B9A4E8] hover:text-[#FFF5F0] hover:bg-[#222139] flex items-center justify-center transition-all"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Track Details & Sound Waves */}
          <div
            onClick={() => setShowPlaylistModal(!showPlaylistModal)}
            className="flex items-center gap-2 cursor-pointer group px-1"
          >
            {/* Animated Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-4 w-4 justify-center shrink-0">
              <span
                className={`w-1 bg-[#F8D98D] rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-4 animate-pulse' : 'h-1.5'
                }`}
              />
              <span
                className={`w-1 bg-[#B9A4E8] rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-3 animate-bounce' : 'h-2'
                }`}
              />
              <span
                className={`w-1 bg-[#F1B8C8] rounded-full transition-all duration-300 ${
                  isPlaying ? 'h-4 animate-pulse' : 'h-1'
                }`}
              />
            </div>

            <div className="hidden sm:flex flex-col text-xs leading-tight max-w-[130px]">
              <span className="font-semibold text-[#FFF5F0] text-[11px] truncate group-hover:text-[#F8D98D] transition-colors">
                {currentTrack.title}
              </span>
              <span className="text-[9px] text-[#B9A4E8]/80 truncate">
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Playlist Open Button */}
          <button
            onClick={() => setShowPlaylistModal(!showPlaylistModal)}
            title="Playlist"
            aria-label="Playlist"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              showPlaylistModal
                ? 'bg-[#F8D98D] text-[#17172B]'
                : 'text-[#B9A4E8] hover:text-[#FFF5F0] hover:bg-[#222139]'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
          </button>

          {/* Volume controls */}
          <div
            className={`flex items-center gap-1.5 transition-all duration-300 ${
              showVolume ? 'opacity-100 max-w-[110px]' : 'opacity-0 max-w-0 overflow-hidden'
            }`}
          >
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="text-[#B9A4E8] hover:text-[#F8D98D] p-1 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume Slider"
              className="w-14 h-1 accent-[#F8D98D] bg-[#222139] rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Playlist Selector Modal / Popup */}
      {showPlaylistModal && (
        <div
          className="fixed bottom-20 left-4 sm:left-5 z-50 w-[calc(100vw-32px)] max-w-80 glass-panel rounded-2xl p-4 shadow-2xl shadow-black/80 border border-[#F8D98D]/30 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-[#B9A4E8]/20 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FFF5F0]">
              <Sparkles className="w-3.5 h-3.5 text-[#F8D98D]" />
              <span>Zoba's Birthday Playlist</span>
            </div>
            <button
              onClick={() => setShowPlaylistModal(false)}
              className="text-[#C5BFD8] hover:text-[#FFF5F0] p-1 rounded-full hover:bg-[#17172B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {playlist.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    selectTrack(idx);
                  }}
                  className={`w-full text-start p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#B9A4E8]/30 via-[#F8D98D]/20 to-[#222139] border border-[#F8D98D]/50 text-[#FFF5F0]'
                      : 'hover:bg-[#222139]/80 text-[#C5BFD8] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? 'bg-[#F8D98D] text-[#17172B]'
                          : 'bg-[#17172B] text-[#B9A4E8] border border-[#B9A4E8]/20'
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <Pause className="w-3 h-3 fill-current" />
                      ) : (
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold truncate text-[#FFF5F0]">
                        {track.title}
                      </p>
                      <p className="text-[10px] text-[#B9A4E8] truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  {track.sectionHint && (
                    <span className="text-[9px] text-[#F8D98D]/80 shrink-0 hidden sm:inline">
                      {track.sectionHint.split(' ')[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#B9A4E8]/15 text-[10px] text-[#C5BFD8]/70 flex items-center justify-between">
            <span>
              {audioSource === 'file' ? 'Original MP3 Audio' : 'Acoustic Melody'}
            </span>
            <span className="text-[#F8D98D]">
              Click any track to play
            </span>
          </div>
        </div>
      )}
    </>
  );
};
