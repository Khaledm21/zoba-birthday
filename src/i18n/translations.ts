import type { Language } from '../types';

export interface TranslationDictionary {
  nav: {
    hero: string;
    gift: string;
    letter: string;
    universe: string;
    polaroids: string;
    timeline: string;
    cake: string;
    celebration: string;
    progress: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    scrollHint: string;
  };
  gift: {
    badge: string;
    title: string;
    hint: string;
    revealedTitle: string;
    revealedText: string;
    openLetterBtn: string;
    recloseBtn: string;
  };
  letter: {
    badge: string;
    title: string;
    waxSeal: string;
    skip: string;
    replay: string;
    cta: string;
  };
  universe: {
    badge: string;
    title: string;
    subtitle: string;
    hint: string;
    cinemaMode: string;
    activeOf: string;
    prev: string;
    next: string;
    cta: string;
  };
  polaroids: {
    badge: string;
    title: string;
    subtitle: string;
    hint: string;
    cta: string;
  };
  timeline: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  cake: {
    badge: string;
    title: string;
    instruction: string;
    blowAction: string;
    micAction: string;
    micListening: string;
    micError: string;
    wishMadeText: string;
    relight: string;
    cta: string;
  };
  celebration: {
    title: string;
    message: string;
    confettiMore: string;
    replay: string;
    backToMemories: string;
    photoGuideTitle: string;
    photoGuideText: string;
  };
  lightbox: {
    close: string;
    prev: string;
    next: string;
    imageCounter: string;
    customPhotoHint: string;
  };
  audio: {
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    synthesizedLabel: string;
    trackTitle: string;
  };
  languageSwitcher: {
    en: string;
    ar: string;
    both: string;
  };
}

const unifiedTranslation: TranslationDictionary = {
  nav: {
    hero: 'Welcome',
    gift: 'The Gift',
    letter: 'Personal Letter',
    universe: 'Our Universe',
    polaroids: 'Polaroids',
    timeline: 'Journey',
    cake: 'Birthday Cake 🎂',
    celebration: 'Celebration ✨',
    progress: 'Journey Progress',
  },
  hero: {
    badge: 'A Special Birthday Surprise ✨',
    title: 'A Little Birthday Magic 🎂',
    subtitle: 'Made with love, just for you, Zoba ✨ يا محلاها ليلتك وسنتك الجديدة',
    cta: 'Open Your Surprise 🎁',
    scrollHint: 'Scroll gently to begin the journey',
  },
  gift: {
    badge: 'A Gift From The Heart 🎁',
    title: 'Something Special Awaits',
    hint: 'Tap the gift box to open ✨',
    revealedTitle: 'Happy Birthday, Zoba! 💖',
    revealedText: 'Something very special is waiting for you…',
    openLetterBtn: 'Read Your Letter 💌',
    recloseBtn: 'Close Box',
  },
  letter: {
    badge: 'From The Heart 💌',
    title: 'A Special Letter for Zoba',
    waxSeal: 'FOR ZOBA',
    skip: 'Read Full Letter',
    replay: 'Replay',
    cta: 'Enter Our Universe 🌌',
  },
  universe: {
    badge: 'Constellation of Memories 🌌',
    title: 'Our Little Universe 🌌',
    subtitle: 'Every memory is a glowing star orbiting the happiness you bring ✨',
    hint: 'Drag with mouse or use scroll wheel to explore • Click card for cinema view',
    cinemaMode: 'Cinema View 🔍',
    activeOf: '{current} / {total}',
    prev: 'Prev',
    next: 'Next',
    cta: 'View Polaroids & Videos 📸',
  },
  polaroids: {
    badge: 'Vintage Keepsakes 📸',
    title: 'Floating Polaroids & Live Videos 📸',
    subtitle: 'Cherished memories captured across time',
    hint: 'Hover to straighten • Tap to view in high definition 🎬',
    cta: 'Time for Birthday Cake 🎂',
  },
  timeline: {
    badge: 'Step by Step ⏳',
    title: 'Little Moments, Big Memories',
    subtitle: 'The chapters that made this journey so special',
    cta: 'Time for Birthday Cake 🎂',
  },
  cake: {
    badge: 'The Sweetest Moment 🎂',
    title: 'The Birthday Cake & Candles 🎂',
    instruction: 'Make a wish, Zoba! ✨',
    blowAction: 'اعملي هووووف 🎙️',
    micAction: 'اعملي هووووف 🎙️',
    micListening: 'Listening to your breath... اعملي هووووف! 💨',
    micError: 'Mic unavailable. Tap the cake directly to blow out the candles! 🎂',
    wishMadeText: 'Wish made? 💫 May every quiet hope come true!',
    relight: 'Relight Candles 🕯️',
    cta: 'Celebrate the Big Finale! 🎉',
  },
  celebration: {
    title: 'Happy Birthday, Zoba! 🎂 كل عام وإنتِ حية بخير.. يا محلاها ليلتك',
    message:
      'May this year bring you endless happiness, delightful surprises, true peace of mind, and more reasons to smile than you can imagine. May all your days be filled with genuine love and joy! 💗',
    confettiMore: 'More Confetti & Sparkles ✨',
    replay: 'Replay Experience ↺',
    backToMemories: 'Back to Universe 🌌',
    photoGuideTitle: 'Personalize Memories',
    photoGuideText: 'Personalized memories for Zoba',
  },
  lightbox: {
    close: 'Close (Esc)',
    prev: 'Prev',
    next: 'Next',
    imageCounter: '{current} / {total}',
    customPhotoHint: 'Memory Keepsake',
  },
  audio: {
    play: 'Play Melody',
    pause: 'Pause',
    mute: 'Mute',
    unmute: 'Unmute',
    synthesizedLabel: 'Acoustic Melody',
    trackTitle: 'Zoba’s Playlist 🎵',
  },
  languageSwitcher: {
    en: 'English',
    ar: 'English',
    both: 'English',
  },
};

export const translations: Record<'en' | 'ar', TranslationDictionary> = {
  en: unifiedTranslation,
  ar: unifiedTranslation,
};

export function getLocalizedText(
  localized: { en: string; ar: string },
  _lang?: Language
): { primary: string; secondary?: string } {
  return {
    primary: localized.en || localized.ar,
  };
}
