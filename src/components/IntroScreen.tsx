"use client";

import { motion } from "framer-motion";

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative top line */}
      <motion.div
        className="line-romantic w-32 mb-10"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />

      {/* Heart icon */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="glow-rose"
        >
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <path
            d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
            fill="url(#heartGrad)"
          />
        </svg>
      </motion.div>

      {/* Main title */}
      <motion.h1
        className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 text-gradient-gold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Um pequeno presente
        <br />
        para você, Mariana
      </motion.h1>

      {/* Decorative separator */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="w-10 h-px bg-gradient-to-r from-transparent to-rose-400/50" />
        <span className="text-rose-300/70 text-xs tracking-[0.3em] uppercase">para você</span>
        <div className="w-10 h-px bg-gradient-to-l from-transparent to-purple-400/50" />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-white/50 text-base sm:text-lg font-light tracking-wide mb-14 max-w-xs"
        style={{ fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        Eu fiz isso pensando em você.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        className="btn-romantic group"
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="relative z-10 flex items-center gap-3">
          <span>Começar</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
        </span>
      </motion.button>

      {/* Decorative bottom line */}
      <motion.div
        className="line-romantic w-32 mt-10"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />

      {/* Floating decoration */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.4em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        feito com carinho ❤️
      </motion.div>
    </motion.div>
  );
}
