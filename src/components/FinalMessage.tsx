"use client";

import { motion } from "framer-motion";

interface FinalMessageProps {
  onReplay: () => void;
  onOpenLetter: () => void;
}

const LINES = [
  { text: "Obrigado por existir.", delay: 0.2 },
  { text: "Obrigado por fazer parte da minha vida.", delay: 0.8 },
  { text: "Você é muito especial para mim.", delay: 1.4, highlight: true },
];

export default function FinalMessage({ onReplay, onOpenLetter }: FinalMessageProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* Decorative orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* Heart */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 10 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.12, 1, 1.08, 1],
          }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="finalHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
              fill="url(#finalHeartGrad)"
              filter="drop-shadow(0 0 12px rgba(244,63,94,0.5))"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Lines */}
      <div className="flex flex-col items-center gap-5 mb-10">
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            className={`${
              line.highlight
                ? "font-serif text-2xl sm:text-3xl text-gradient-gold"
                : "text-lg sm:text-xl text-white/75 font-light"
            }`}
            style={{
              fontFamily: line.highlight ? "'Playfair Display', serif" : "'Inter', sans-serif",
            }}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: line.delay, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      {/* Signature */}
      <motion.div
        className="flex flex-col items-center gap-1 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="line-romantic w-24 mb-4" />
        <p className="text-white/40 text-sm tracking-[0.25em] uppercase font-light">
          Com amor,
        </p>
        <p
          className="text-gradient font-serif text-2xl sm:text-3xl mt-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Vitor ❤️
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.7 }}
      >
        <button className="btn-romantic" onClick={onReplay} >
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            Assistir novamente
          </span>
        </button>

        {/* Easter egg button */}
        <motion.button
          className="text-white/25 text-xs tracking-[0.3em] uppercase hover:text-rose-300/60 transition-colors duration-500 mt-2"
          onClick={onOpenLetter}
          whileTap={{ scale: 0.97 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ✉️ Abrir carta
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
