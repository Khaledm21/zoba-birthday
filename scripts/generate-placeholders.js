import fs from 'fs';
import path from 'path';

const dir = path.resolve('public/images/memories');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const memories = [
  {
    name: 'memory-01.jpg',
    title: 'A Starlit Beginning',
    titleAr: 'بداية مضيئة كالنجم',
    colors: ['#222139', '#442a5c', '#17172B'],
    accent: '#B9A4E8',
    icon: '✨',
  },
  {
    name: 'memory-02.jpg',
    title: 'Unfiltered Laughter',
    titleAr: 'ضحك من القلب',
    colors: ['#2c2240', '#5c3352', '#1e172e'],
    accent: '#F8D98D',
    icon: '💫',
  },
  {
    name: 'memory-03.jpg',
    title: 'Kindness Everywhere',
    titleAr: 'طيبة في كل تفصيلة',
    colors: ['#1f2038', '#4b3558', '#17172B'],
    accent: '#F1B8C8',
    icon: '🌸',
  },
  {
    name: 'memory-04.jpg',
    title: 'Adventures & Dreams',
    titleAr: 'أحلام وخطوات لبكرة',
    colors: ['#251e3e', '#523a63', '#17172B'],
    accent: '#F8D98D',
    icon: '🌟',
  },
  {
    name: 'memory-05.jpg',
    title: 'Warmth on Quiet Days',
    titleAr: 'دفء وهدوء البال',
    colors: ['#1c233a', '#34456a', '#17172B'],
    accent: '#B9A4E8',
    icon: '🌙',
  },
  {
    name: 'memory-06.jpg',
    title: 'Birthday Magic',
    titleAr: 'سنة جديدة مليانة نور',
    colors: ['#2e1d3d', '#633054', '#17172B'],
    accent: '#F1B8C8',
    icon: '🎂',
  },
];

for (const m of memories) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${m.colors[0]}" />
        <stop offset="50%" stop-color="${m.colors[1]}" />
        <stop offset="100%" stop-color="${m.colors[2]}" />
      </linearGradient>
      <radialGradient id="halo" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${m.accent}" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#17172B" stop-opacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="1000" fill="url(#bg)" />
    <circle cx="400" cy="400" r="350" fill="url(#halo)" />

    <!-- Stars Pattern -->
    <g fill="#FFF5F0" opacity="0.4">
      <circle cx="120" cy="180" r="2" />
      <circle cx="680" cy="150" r="1.5" />
      <circle cx="200" cy="720" r="2.5" />
      <circle cx="710" cy="680" r="1.8" />
      <circle cx="340" cy="110" r="2" />
      <circle cx="580" cy="850" r="2.2" />
      <circle cx="140" cy="500" r="1.5" />
      <circle cx="700" cy="380" r="2" />
    </g>

    <!-- Ornamental Frame -->
    <rect x="50" y="50" width="700" height="900" rx="30" fill="none" stroke="${m.accent}" stroke-width="1.5" stroke-opacity="0.3" />
    <rect x="70" y="70" width="660" height="860" rx="20" fill="none" stroke="${m.accent}" stroke-width="1" stroke-dasharray="8 8" stroke-opacity="0.2" />

    <!-- Center Icon Circle -->
    <circle cx="400" cy="400" r="90" fill="#17172B" fill-opacity="0.6" stroke="${m.accent}" stroke-width="2" filter="url(#glow)" />
    <text x="400" y="425" font-size="64" text-anchor="middle">${m.icon}</text>

    <!-- Typography -->
    <text x="400" y="580" font-family="'Cairo', sans-serif" font-size="34" font-weight="700" fill="#FFF5F0" text-anchor="middle" letter-spacing="1">
      ${m.titleAr}
    </text>
    <text x="400" y="630" font-family="'DM Sans', sans-serif" font-size="22" font-weight="500" fill="${m.accent}" text-anchor="middle" letter-spacing="2">
      ${m.title}
    </text>
    <text x="400" y="720" font-family="'DM Sans', sans-serif" font-size="14" fill="#C5BFD8" text-anchor="middle" opacity="0.7" letter-spacing="1">
      FOR ZOBA • A CHERISHED MEMORY
    </text>

    <!-- Bottom Tag -->
    <rect x="300" y="800" width="200" height="36" rx="18" fill="#17172B" fill-opacity="0.7" stroke="${m.accent}" stroke-width="1" stroke-opacity="0.4" />
    <text x="400" y="823" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" fill="#F8D98D" text-anchor="middle" letter-spacing="1.5">
      ZOBA ✨ 2026
    </text>
  </svg>`;

  fs.writeFileSync(path.join(dir, m.name), svg);
}

console.log('Successfully created all 6 memory placeholders in public/images/memories/');

