"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  color: string;
  type: "star" | "dot" | "sparkle";
}

const COLORS = [
  "rgba(253, 164, 175,",
  "rgba(216, 180, 254,",
  "rgba(255, 255, 255,",
  "rgba(249, 168, 212,",
  "rgba(192, 132, 252,",
];

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 80);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        opacitySpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: (["star", "dot", "sparkle"] as const)[Math.floor(Math.random() * 3)],
      }));
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.beginPath();
      const spikes = 4;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      let rotation = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.moveTo(x, y - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rotation) * outerRadius, y + Math.sin(rotation) * outerRadius);
        rotation += step;
        ctx.lineTo(x + Math.cos(rotation) * innerRadius, y + Math.sin(rotation) * innerRadius);
        rotation += step;
      }
      ctx.lineTo(x, y - outerRadius);
      ctx.closePath();
      ctx.fillStyle = `${color}${opacity})`;
      ctx.shadowBlur = size * 4;
      ctx.shadowColor = `${color}0.8)`;
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.strokeStyle = `${color}${opacity})`;
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = size * 3;
      ctx.shadowColor = `${color}0.6)`;
      const len = size * 2.5;
      ctx.beginPath();
      ctx.moveTo(x - len, y);
      ctx.lineTo(x + len, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y - len);
      ctx.lineTo(x, y + len);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;

        if (p.opacity <= 0.05 || p.opacity >= 0.85) p.opacitySpeed *= -1;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const op = Math.max(0, Math.min(1, p.opacity));
        if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size, p.color, op);
        } else if (p.type === "sparkle") {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, op);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${op})`;
          ctx.shadowBlur = p.size * 5;
          ctx.shadowColor = `${p.color}0.7)`;
          ctx.fill();
          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
