import { motion } from "framer-motion";
import { useState, useEffect } from "react";

let audio: HTMLAudioElement | null = null; // 🔥 GLOBAL

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audio) {
      audio = new Audio(window.location.origin + "/music.mp3");
      audio.loop = true;
      audio.volume = 0.4;
    }

    // 🔥 PRIMER CLICK EN TODA LA PANTALLA
    const handleFirstClick = () => {
      if (audio && audio.paused) {
        audio.play();
      }
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    // 🔥 sincronizar estado
    audio.onplay = () => setPlaying(true);
    audio.onpause = () => setPlaying(false);

    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, []);

  const toggle = () => {
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-pocoyo-blue text-primary-foreground shadow-xl flex items-center justify-center text-2xl"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      title={playing ? "Pausar música" : "Reproducir música"}
    >
      <motion.span
        animate={playing ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {playing ? "🔊" : "🎵"}
      </motion.span>
    </motion.button>
  );
};

export default MusicPlayer;