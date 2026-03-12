"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoRevealProps {
  onEnd: () => void;
}

export default function VideoReveal({ onEnd }: VideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [cinemaReady, setCinemaReady] = useState(false);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCinemaReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().catch(() => {});
      setPlaying(true);
      startControlsTimer();
    }
  };

  const startControlsTimer = () => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleVideoTap = () => {
    setShowControls(true);
    startControlsTimer();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleEnded = () => {
    setPlaying(false);
    setEnded(true);
    setShowControls(true);
    setTimeout(() => onEnd(), 2000);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    setPlaying(true);
    setEnded(false);
    setProgress(0);
    startControlsTimer();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cinematic bars */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-12 sm:h-16 bg-black z-20"
        initial={{ y: -80 }}
        animate={{ y: cinemaReady ? 0 : -80 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-12 sm:h-16 bg-black z-20"
        initial={{ y: 80 }}
        animate={{ y: cinemaReady ? 0 : 80 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Subtitle above video */}
      <motion.p
        className="text-center text-white/55 text-sm sm:text-base font-light tracking-wide mb-6 max-w-xs"
        style={{ fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Esse vídeo é apenas uma pequena forma de mostrar o quanto você é especial para mim.
      </motion.p>

      {/* Video wrapper */}
      <motion.div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 80 }}
        style={{
          boxShadow: "0 0 60px rgba(244,63,94,0.18), 0 0 120px rgba(168,85,247,0.1), 0 30px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-0 pointer-events-none"
          style={{
            padding: "1.5px",
            background: "linear-gradient(135deg, rgba(253,164,175,0.6), rgba(192,132,252,0.6), rgba(253,164,175,0.6))",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 bg-black rounded-2xl overflow-hidden" onClick={handleVideoTap}>
          <video
            ref={videoRef}
            className="w-full aspect-[9/16] sm:aspect-video object-cover"
            src="/video/presente.mp4"
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* Play overlay */}
          <AnimatePresence>
            {(!playing || showControls) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Play/Pause/Replay button */}
                <motion.button
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    ended ? handleReplay() : handlePlay();
                  }}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.06 }}
                >
                  {ended ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    </svg>
                  ) : playing ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3">
            <div
              className="w-full h-1 rounded-full bg-white/20 cursor-pointer"
              onClick={handleSeek}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #fda4af, #c084fc)",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA to replay or skip */}
      <AnimatePresence>
        {ended && (
          <motion.div
            className="flex flex-col items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-white/40 text-xs tracking-widest uppercase">
              continuando...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap hint */}
      <AnimatePresence>
        {!playing && !ended && (
          <motion.p
            className="text-white/30 text-xs mt-5 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            toque para assistir ▶
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
