"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import IntroScreen from "@/components/IntroScreen";
import MessageSequence from "@/components/MessageSequence";
import GiftBox from "@/components/GiftBox";
import VideoReveal from "@/components/VideoReveal";
import FinalMessage from "@/components/FinalMessage";
import HiddenLetter from "@/components/HiddenLetter";

const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), {
  ssr: false,
});
const MusicToggle = dynamic(() => import("@/components/MusicToggle"), {
  ssr: false,
});

type Scene = "intro" | "messages" | "gift" | "video" | "final";

const BG_GRADIENT: Record<Scene, string> = {
  intro: "radial-gradient(ellipse at 30% 20%, rgba(168,85,247,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(244,63,94,0.08) 0%, transparent 60%)",
  messages: "radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.06) 0%, transparent 70%)",
  gift: "radial-gradient(ellipse at 50% 40%, rgba(253,164,175,0.1) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(192,132,252,0.08) 0%, transparent 50%)",
  video: "radial-gradient(ellipse at 50% 50%, rgba(10,5,20,0.9) 0%, transparent 100%)",
  final: "radial-gradient(ellipse at 50% 30%, rgba(244,63,94,0.1) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.08) 0%, transparent 60%)",
};

export default function Home() {
  const [scene, setScene] = useState<Scene>("intro");
  const [letterOpen, setLetterOpen] = useState(false);

  const goToMessages = useCallback(() => setScene("messages"), []);
  const goToGift = useCallback(() => setScene("gift"), []);
  const goToVideo = useCallback(() => setScene("video"), []);
  const goToFinal = useCallback(() => setScene("final"), []);
  const goBackToVideo = useCallback(() => {
    setScene("video");
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0a14] overflow-hidden">
      {/* Particles */}
      <ParticlesBackground />

      {/* Dynamic ambient gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{ background: BG_GRADIENT[scene] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Scenes */}
      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <motion.div key="intro" className="relative">
            <IntroScreen onStart={goToMessages} />
          </motion.div>
        )}

        {scene === "messages" && (
          <motion.div key="messages" className="relative">
            <MessageSequence onComplete={goToGift} />
          </motion.div>
        )}

        {scene === "gift" && (
          <motion.div key="gift" className="relative">
            <GiftBox onOpen={goToVideo} />
          </motion.div>
        )}

        {scene === "video" && (
          <motion.div key="video" className="relative">
            <VideoReveal onEnd={goToFinal} />
          </motion.div>
        )}

        {scene === "final" && (
          <motion.div key="final" className="relative">
            <FinalMessage
              onReplay={goBackToVideo}
              onOpenLetter={() => setLetterOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Letter overlay */}
      <HiddenLetter isOpen={letterOpen} onClose={() => setLetterOpen(false)} />

      {/* Music toggle — always visible */}
      <MusicToggle />
    </main>
  );
}
