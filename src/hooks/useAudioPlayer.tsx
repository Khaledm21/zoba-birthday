import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { SongTrack } from '../types';
import { playlist } from '../data/music';
import { birthdaySynth } from '../utils/audioSynthesizer';

interface AudioPlayerContextType {
  currentTrackIndex: number;
  currentTrack: SongTrack;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  audioSource: 'file' | 'synth';
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  playlist: SongTrack[];
  showPlaylistModal: boolean;
  setShowPlaylistModal: (show: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const currentTrackIndexRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<'file' | 'synth'>('file');
  const [showPlaylistModal, setShowPlaylistModal] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize single persistent audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audio.src = playlist[0].src;
    audioRef.current = audio;

    const handleError = () => {
      console.warn('Audio element error, falling back to synthesizer');
      setAudioSource('synth');
      birthdaySynth.setVolume(isMuted ? 0 : volume);
      if (isPlaying) {
        birthdaySynth.play();
      }
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('error', handleError);
      birthdaySynth.stop();
    };
  }, []);

  const play = () => {
    setIsPlaying(true);
    birthdaySynth.stop();

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = isMuted ? 0 : volume;

      const targetSrc = playlist[currentTrackIndexRef.current].src;
      if (!audio.src.includes(targetSrc)) {
        audio.src = targetSrc;
      }

      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setAudioSource('file');
        }).catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Audio play restricted or failed, falling back to synth:', err);
            setAudioSource('synth');
            birthdaySynth.setVolume(isMuted ? 0 : volume);
            birthdaySynth.play();
          }
        });
      }
    } else {
      birthdaySynth.setVolume(isMuted ? 0 : volume);
      birthdaySynth.play();
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    birthdaySynth.stop();
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const selectTrack = (index: number) => {
    const safeIndex = (index + playlist.length) % playlist.length;
    currentTrackIndexRef.current = safeIndex;
    setCurrentTrackIndex(safeIndex);
    setIsPlaying(true);
    birthdaySynth.stop();

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.pause();
      audio.src = playlist[safeIndex].src;
      audio.currentTime = 0;
      audio.volume = isMuted ? 0 : volume;

      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setAudioSource('file');
        }).catch((err) => {
          if (err.name !== 'AbortError') {
            console.warn('Audio play error, falling back to synth:', err);
            setAudioSource('synth');
            birthdaySynth.setVolume(isMuted ? 0 : volume);
            birthdaySynth.play();
          }
        });
      }
    } else {
      play();
    }
  };

  const nextTrack = () => {
    selectTrack(currentTrackIndexRef.current + 1);
  };

  const prevTrack = () => {
    selectTrack(currentTrackIndexRef.current - 1);
  };

  const setVolume = (newVol: number) => {
    setVolumeState(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    birthdaySynth.setVolume(newVol);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume;
      birthdaySynth.setVolume(volume);
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
      birthdaySynth.setVolume(0);
    }
  };

  const currentTrack = playlist[currentTrackIndex];

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrackIndex,
        currentTrack,
        isPlaying,
        volume,
        isMuted,
        audioSource,
        play,
        pause,
        togglePlay,
        nextTrack,
        prevTrack,
        selectTrack,
        setVolume,
        toggleMute,
        playlist,
        showPlaylistModal,
        setShowPlaylistModal,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
