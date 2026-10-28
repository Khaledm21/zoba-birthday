export type Language = 'en' | 'ar' | 'both';

export type SceneId = 
  | 'hero'
  | 'gift'
  | 'letter'
  | 'universe'
  | 'polaroid'
  | 'timeline'
  | 'cake'
  | 'celebration';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface MemoryItem {
  id: string;
  title: LocalizedString;
  caption: LocalizedString;
  date?: LocalizedString;
  imageUrl: string;
  mediaType?: 'image' | 'video';
  fallbackGradient?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  rotation?: number;
  tag?: LocalizedString;
  accentColor?: string;
}

export interface TimelineMilestone {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  date: LocalizedString;
  badge: LocalizedString;
  imageUrl?: string;
  iconName?: string;
}

export interface LetterContent {
  greeting: LocalizedString;
  paragraphs: LocalizedString[];
  closing: LocalizedString;
  signature: LocalizedString;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  sectionHint?: string;
}
