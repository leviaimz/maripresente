"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageSequenceProps {
  onComplete: () => void;
}

const MESSAGES = [
  { text: "Entre bilhões de pessoas no mundo...", delay: 0 },
  { text: "De alguma forma...", delay: 0 },
  { text: "Eu encontrei você.", delay: 0, highlight: true },
  { text: "Mesmo com quilômetros entre nós...", delay: 0 },
  { text: "Você conseguiu se tornar uma das pessoas\nmais importantes da minha vida.", delay: 0 },
  { text: "Você me faz querer ser melhor.", delay: 0 },
  { text: "Você me faz sorrir.", delay: 0 },
  { text: "Você me faz sentir que tudo vale a pena.", delay: 0, highlight: true },
  { text: "...", delay: 0, pause: true },
  { text: "Então eu preparei algo\nespecial para você.", delay: 0, final: true },
];

const DISPLAY_DURATION = 2800;
const TRANSITION_DURATION = 700;

export default function MessageSequence({ onComplete }: MessageSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const msg = MESSAGES[currentIndex];
    const displayTime = msg.pause ? 1400 : msg.final ? 3200 : DISPLAY_DURATION;

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (currentIndex < MESSAGES.length - 1) {
          setCurrentIndex((i) => i + 1);
          setVisible(true);
        } else {
          onComplete();
        }
      }, TRANSITION_DURATION);
    }, displayTime);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);

  const msg = MESSAGES[currentIndex];
  const progress = ((currentIndex + 1) / MESSAGES.length) * 100;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-8 text-center relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #fda4af, #c084fc)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={currentIndex}
            className="flex flex-col items-center gap-4 max-w-sm"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          >
            {msg.pause ? (
              <motion.div className="flex gap-2 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-rose-300/60"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <>
                {msg.final && (
                  <motion.div
                    className="w-8 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent mb-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  />
                )}

                <p
                  className={`leading-relaxed whitespace-pre-line ${
                    msg.final
                      ? "text-2xl sm:text-3xl font-serif text-gradient"
                      : msg.highlight
                      ? "text-2xl sm:text-3xl font-serif text-gradient-gold"
                      : "text-xl sm:text-2xl font-light text-white/80"
                  }`}
                  style={{
                    fontFamily: msg.highlight || msg.final ? "'Playfair Display', serif" : "'Inter', sans-serif",
                    letterSpacing: msg.highlight ? "0.01em" : "0.02em",
                  }}
                >
                  {msg.text}
                </p>

                {msg.final && (
                  <motion.div
                    className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent mt-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step counter */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {currentIndex + 1} / {MESSAGES.length}
      </motion.div>
    </motion.div>
  );
}
