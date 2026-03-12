"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface GiftBoxProps {
  onOpen: () => void;
}

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [opened, setOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 2200;
    const end = Date.now() + duration;

    const colors = ["#fda4af", "#c084fc", "#f9a8d4", "#e9d5ff", "#ffffff"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors,
        ticks: 120,
        gravity: 1.2,
        scalar: 0.8,
        drift: 0,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors,
        ticks: 120,
        gravity: 1.2,
        scalar: 0.8,
        drift: 0,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      ticks: 200,
      gravity: 0.9,
      scalar: 1,
      shapes: ["circle", "square"],
    });

    requestAnimationFrame(frame);
  }, []);

  const handleOpen = useCallback(() => {
    if (isAnimating || opened) return;
    setIsAnimating(true);
    setOpened(true);
    fireConfetti();
    setTimeout(() => {
      onOpen();
    }, 2400);
  }, [isAnimating, opened, fireConfetti, onOpen]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.7 }}
    >
      {/* Title */}
      <motion.p
        className="text-white/50 text-sm tracking-[0.3em] uppercase mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        seu presente
      </motion.p>

      <motion.h2
        className="font-serif text-2xl sm:text-3xl text-gradient-gold mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Abra o seu presente, Mariana.
      </motion.h2>

      {/* Gift Box SVG */}
      <motion.div
        className="relative mb-12 cursor-pointer select-none"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 100, damping: 12 }}
        onClick={handleOpen}
        whileHover={{ scale: opened ? 1 : 1.05 }}
        whileTap={{ scale: opened ? 1 : 0.97 }}
      >
        <div className="relative w-44 h-44">
          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={!opened ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : { opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />

          {/* Box base */}
          <motion.svg
            viewBox="0 0 140 140"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="50%" stopColor="#e879a0" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Box body */}
            <rect x="15" y="65" width="110" height="65" rx="6" fill="url(#boxGrad)" stroke="rgba(253,164,175,0.35)" strokeWidth="1.5" />

            {/* Vertical ribbon on box */}
            <rect x="62" y="65" width="16" height="65" fill="url(#ribbonGrad)" opacity="0.6" />

            {/* Lid */}
            <motion.g
              animate={opened ? { y: -55, rotate: -12, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: "70px 65px" }}
            >
              <rect x="10" y="48" width="120" height="22" rx="5" fill="url(#lidGrad)" stroke="rgba(253,164,175,0.4)" strokeWidth="1.5" />
              <rect x="62" y="48" width="16" height="22" fill="url(#ribbonGrad)" opacity="0.6" />

              {/* Bow */}
              <motion.g
                animate={opened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "70px 48px" }}
              >
                {/* Left bow loop */}
                <path d="M55 48 C40 35, 35 20, 55 22 C65 23, 62 38, 70 38" fill="url(#ribbonGrad)" opacity="0.85" />
                {/* Right bow loop */}
                <path d="M85 48 C100 35, 105 20, 85 22 C75 23, 78 38, 70 38" fill="url(#ribbonGrad)" opacity="0.85" />
                {/* Bow knot */}
                <circle cx="70" cy="44" r="5" fill="#e879a0" />
              </motion.g>
            </motion.g>

            {/* Sparkles around box */}
            {!opened && (
              <>
                <motion.text x="8" y="30" fontSize="10" textAnchor="middle"
                  animate={{ opacity: [0, 1, 0], y: [30, 22, 30] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0 }}>✨</motion.text>
                <motion.text x="130" y="55" fontSize="8" textAnchor="middle"
                  animate={{ opacity: [0, 1, 0], y: [55, 47, 55] }}
                  transition={{ repeat: Infinity, duration: 2.3, delay: 0.5 }}>✨</motion.text>
                <motion.text x="20" y="100" fontSize="8" textAnchor="middle"
                  animate={{ opacity: [0, 1, 0], y: [100, 92, 100] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 1 }}>✨</motion.text>
              </>
            )}

            {/* Open state: hearts floating out */}
            <AnimatePresence>
              {opened && (
                <>
                  {[
                    { x: 50, delay: 0, scale: 1.2 },
                    { x: 70, delay: 0.15, scale: 0.9 },
                    { x: 90, delay: 0.3, scale: 1.1 },
                    { x: 35, delay: 0.25, scale: 0.8 },
                    { x: 105, delay: 0.1, scale: 1 },
                  ].map((h, i) => (
                    <motion.text
                      key={i}
                      x={h.x}
                      y="60"
                      fontSize={14 * h.scale}
                      textAnchor="middle"
                      initial={{ y: 60, opacity: 1, scale: 0 }}
                      animate={{ y: -20, opacity: 0, scale: h.scale }}
                      transition={{ delay: h.delay, duration: 1.2, ease: "easeOut" }}
                    >
                      ❤️
                    </motion.text>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.svg>
        </div>
      </motion.div>

      {/* Button */}
      <AnimatePresence>
        {!opened && (
          <motion.button
            className="btn-romantic"
            onClick={handleOpen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="flex items-center gap-2">
              Abrir presente
              <span>🎁</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Opening message */}
      <AnimatePresence>
        {opened && (
          <motion.p
            className="text-rose-300/80 text-lg font-serif italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Com muito carinho... ❤️
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
