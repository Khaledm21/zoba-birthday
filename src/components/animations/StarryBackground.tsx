import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface BokehParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

interface FloatingCelebrationEmoji {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spinSpeed: number;
  swayFactor: number;
  alpha: number;
  emoji: string;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const starColors = ['#FFF5F0', '#B9A4E8', '#F8D98D', '#C5BFD8', '#F1B8C8'];
    const bokehColors = [
      'rgba(185, 164, 232, 0.08)',
      'rgba(248, 217, 141, 0.06)',
      'rgba(241, 184, 200, 0.07)',
      'rgba(82, 51, 92, 0.12)',
    ];

    const birthdayEmojis = ['🎂', '💖', '💗', '💕', '🎂', '💖', '🍰', '💓'];

    let stars: Star[] = [];
    let bokehList: BokehParticle[] = [];
    let floatingEmojis: FloatingCelebrationEmoji[] = [];

    const initStars = () => {
      const count = Math.min(Math.floor((width * height) / 10000), 80);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.5,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      }));
    };

    const initBokeh = () => {
      const count = Math.min(Math.floor(width / 200), 5);
      bokehList = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 140 + 70,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        color: bokehColors[Math.floor(Math.random() * bokehColors.length)],
      }));
    };

    // Floating Birthday Cakes 🎂 & Hearts 💖
    const initFloatingEmojis = () => {
      const count = Math.min(Math.floor(width / 80), 22);
      floatingEmojis = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 16, // 16px - 26px
        speedY: -(Math.random() * 0.45 + 0.25), // Float gently upwards
        speedX: (Math.random() - 0.5) * 0.2,
        angle: (Math.random() - 0.5) * 0.25,
        spinSpeed: (Math.random() - 0.5) * 0.005,
        swayFactor: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.45,
        emoji: birthdayEmojis[Math.floor(Math.random() * birthdayEmojis.length)],
      }));
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initBokeh();
      initFloatingEmojis();
    };

    window.addEventListener('resize', handleResize);
    initStars();
    initBokeh();
    initFloatingEmojis();

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render Soft Bokeh Orbs
      for (let i = 0; i < bokehList.length; i++) {
        const b = bokehList[i];
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(23, 23, 43, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Twinkling Dust Points (Ultra-fast, zero GPU lag)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = Math.max(
          0.1,
          Math.min(1, s.baseAlpha + Math.sin(time * s.twinkleSpeed * 100 + s.twinkleOffset) * 0.4)
        );

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Floating Birthday Cakes 🎂 & Hearts 💖
      for (let i = 0; i < floatingEmojis.length; i++) {
        const item = floatingEmojis[i];
        item.y += item.speedY;
        item.x += Math.sin(time * item.swayFactor) * 0.35 + item.speedX;
        item.angle += item.spinSpeed;

        // Wrap around smoothly when leaving top or sides
        if (item.y < -40) {
          item.y = height + 40;
          item.x = Math.random() * width;
        }
        if (item.x < -40) item.x = width + 40;
        if (item.x > width + 40) item.x = -40;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.angle);
        ctx.globalAlpha = item.alpha;
        ctx.font = `${item.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji, 0, 0);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep gradient background layers */}
      <div className="absolute inset-0 bg-[#17172B]" />
      <div className="absolute inset-0 bg-radial-[at_50%_20%] from-[#222139]/80 via-[#17172B]/90 to-[#121222]" />
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#B9A4E8]/10 blur-[130px] animate-pulse-glow" />
      <div
        className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full bg-[#F8D98D]/8 blur-[150px] animate-pulse-glow"
        style={{ animationDelay: '3s' }}
      />

      {/* Dynamic Birthday Cake 🎂 & Hearts 💖 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
