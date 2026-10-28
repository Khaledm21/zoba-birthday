import type { SongTrack } from '../types';

export const playlist: SongTrack[] = [
  {
    id: 'track-1',
    title: 'Kol Sana Wenta Albi',
    artist: 'Birthday Melody',
    src: '/audio/kol-sana-wenta-albi.mp3',
    sectionHint: 'Opening Scene 🎂',
  },
  {
    id: 'track-2',
    title: 'Kelma',
    artist: 'Ramy Sabry',
    src: '/audio/kelma-ramy-sabry.mp3',
    sectionHint: 'Personal Letter 💌',
  },
  {
    id: 'track-3',
    title: 'Sidi Mansour (Allah Allah Ya Baba)',
    artist: 'Saber Rebai',
    src: '/audio/sidi-mansour-saber-rebai.mp3',
    sectionHint: 'Grand Finale Celebration 🎉',
  },
];
