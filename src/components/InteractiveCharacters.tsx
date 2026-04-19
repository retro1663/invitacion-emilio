import { motion } from "framer-motion";
import { useState } from "react";
import pocoyoPato from "@/assets/pocoyo-pato.png";
import pocoyoGroup from "@/assets/pocoyo-group.png";

const characters = [
  { name: "Pocoyo", img: "/pocoyo.png", color: "bg-blue-400" },
  { name: "Pato", img: "/pato.png", color: "bg-yellow-400" },
  { name: "Elly", img: "/elly.png", color: "bg-pink-400" },
  { name: "Loula", img: "/loula.png", color: "bg-orange-400" },
];

const InteractiveCharacters = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-16 px-4">
      {/* Imagen grupo */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring" }}
      >
        <img
          src={pocoyoGroup}
          alt="Pocoyo y sus amigos"
          className="w-56 sm:w-72 drop-shadow-lg"
        />
      </motion.div>

      <motion.h2
        className="text-2xl sm:text-3xl font-display font-bold text-center text-foreground mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🌟 ¡Los amigos de Emilio!
      </motion.h2>

      <div className="flex justify-center gap-4 sm:gap-6 flex-wrap max-w-md mx-auto">
        {characters.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, type: "spring" }}
            onClick={() => setActive(active === i ? null : i)}
          >
            <motion.div
              className={`${c.color} w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.85 }}
              animate={active === i ? { y: [0, -15, 0], rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* 🔥 IMAGEN EN VEZ DE EMOJI */}
              <img
                src={c.img}
                alt={c.name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
              />
            </motion.div>

            <p className="mt-2 font-display font-bold text-sm text-foreground">
              {c.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Imagen Pocoyo y Pato */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: 0.3 }}
      >
        <img
          src="/pocoyo.gif"
          alt="Pocoyo animado"
          className="w-72 sm:w-96 md:w-[28rem] drop-shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default InteractiveCharacters;
