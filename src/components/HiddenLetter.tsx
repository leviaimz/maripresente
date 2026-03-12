"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HiddenLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiddenLetter({ isOpen, onClose }: HiddenLetterProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Letter modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="letter-paper relative w-full max-w-sm rounded-2xl px-7 py-9 overflow-y-auto max-h-[85vh]"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors duration-300 p-1"
                onClick={onClose}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>

              {/* Envelope icon */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(244,63,94,0.2) 0%, transparent 70%)",
                      filter: "blur(12px)",
                    }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  />
                  <span className="text-4xl relative z-10">💌</span>
                </div>
              </motion.div>

              {/* Decorative line */}
              <div className="line-romantic mb-7" />

              {/* Letter heading */}
              <motion.p
                className="font-serif text-xl text-gradient-gold mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Mariana,
              </motion.p>

              {/* Letter body */}
              {[
                "Talvez esse site seja simples...",
                "mas cada parte dele foi feita pensando em você.",
                "Porque você merece coisas especiais.",
                "Mesmo com a distância,\nvocê conseguiu ocupar um espaço enorme no meu coração.",
                "E esse vídeo é só uma pequena forma\nde mostrar o quanto você significa para mim.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  className={`mb-4 leading-relaxed whitespace-pre-line ${
                    i === 2
                      ? "text-rose-300/80 font-medium"
                      : "text-white/60 font-light"
                  }`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: "1.75",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.6 }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Signature */}
              <motion.div
                className="mt-7 flex flex-col gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <div className="line-romantic mb-4" />
                <p className="text-white/40 text-xs tracking-[0.25em] uppercase">
                  Com carinho,
                </p>
                <p
                  className="font-serif text-xl text-gradient mt-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Vitor ❤️
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
