import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useState } from "react";
import pocoyoBalloons from "@/assets/pocoyo-balloons.png";

const HeroSection = () => {
  const [popped, setPopped] = useState(false);

  const fireConfetti = () => {
    setPopped(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#0ea5e9", "#ef4444", "#eab308", "#22c55e", "#ec4899", "#f97316"],
    });
    setTimeout(() => setPopped(false), 1000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-10">

      {/* Pocoyo image */}
      <motion.img
        src={pocoyoBalloons}
        alt="Pocoyo con globos"
        className="w-40 sm:w-52 mb-4 drop-shadow-xl"
        initial={{ opacity: 0, y: -40, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
      />

      {/* Texto arriba */}
      <motion.p
        className="text-lg sm:text-xl text-muted-foreground font-body font-medium mb-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        🎉 ¡Estoy cumpliendo!
      </motion.p>

      {/* Big number 3 */}
      <motion.div
        className="cursor-pointer select-none"
        onClick={fireConfetti}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.6 }}
      >
        <div className="relative">
          <span className="text-[10rem] sm:text-[14rem] font-display font-extrabold leading-none bg-gradient-to-br from-pocoyo-blue via-pocoyo-green to-pocoyo-yellow bg-clip-text text-transparent drop-shadow-lg">
            3
          </span>

          <motion.span
            className="absolute -top-4 -right-6 text-4xl"
            animate={{ rotate: [0, 15, -15, 0], y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎈
          </motion.span>

          <motion.span
            className="absolute bottom-2 -left-8 text-3xl"
            animate={{ rotate: [0, -10, 10, 0], y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            🎉
          </motion.span>
        </div>
      </motion.div>

      {/* Añitos debajo del 3 */}
      <motion.p
        className="text-base sm:text-lg text-muted-foreground font-body mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        añitos! 🥳
      </motion.p>

      {/* Nombre Emilio */}
      <motion.h1
        className="text-5xl sm:text-7xl font-display font-extrabold text-foreground leading-tight text-center mt-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, type: "spring" }}
      >
        <span className="text-pocoyo-blue">E</span>
        <span className="text-pocoyo-red">m</span>
        <span className="text-pocoyo-yellow">i</span>
        <span className="text-pocoyo-green">l</span>
        <span className="text-pocoyo-pink">i</span>
        <span className="text-pocoyo-orange">o</span>
      </motion.h1>

      {/* Texto inferior */}
      <motion.p
        className="text-sm text-muted-foreground/70 mt-8 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        👆 ¡Toca el número para una sorpresa!
      </motion.p>
    </section>
  );
};

export default HeroSection;
