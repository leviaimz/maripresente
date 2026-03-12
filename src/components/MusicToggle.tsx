"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio("/audio/music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    const timer = setTimeout(() => setShowHint(true), 4000);
    const hideTimer = setTimeout(() => setShowHint(false), 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);
    setShowHint(false);
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-5 z-30 flex flex-col items-end gap-2">
      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && !hasInteracted && (
          <motion.div
            className="text-white/40 text-xs bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap"
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            🎵 música romântica
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        className="w-11 h-11 rounded-full flex items-center justify-center relative"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.08 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        {/* Pulse ring when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1.5px solid rgba(253,164,175,0.5)" }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.8, 0, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />
        )}

        <AnimatePresence mode="wait">
          {playing ? (
            <motion.div
              key="playing"
              className="flex items-end gap-[2px] h-4"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full bg-rose-300"
                  animate={{ height: ["6px", "14px", "6px"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{ minHeight: "6px" }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
