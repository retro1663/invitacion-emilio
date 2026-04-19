import { motion } from "framer-motion";
import { useState } from "react";

const details = [
  { emoji: "📅", label: "Fecha", value: "30 de Abril, 2026", color: "border-pocoyo-blue" },
  { emoji: "🕐", label: "Hora", value: "7:00 PM", color: "border-pocoyo-red" },
  { emoji: "📍", label: "Lugar", value: "Restaurante Señora Bella (Frente a Nascamotors)", color: "border-pocoyo-yellow" },
  { emoji: "🎨", label: "Temática", value: "¡Pocoyo!", color: "border-pocoyo-green" },
  { emoji: "🎁", label: "Regalos", value: "¿No sabes qué regalarme?", color: "border-pocoyo-pink" },
];

const EventDetails = () => {
  const [revealed, setRevealed] = useState<boolean[]>(new Array(details.length).fill(false));

  const reveal = (i: number) => {
    setRevealed((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  return (
    <section className="relative z-10 py-16 px-4 max-w-lg mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl font-display font-bold text-center text-foreground mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🎁 ¡Detalles de la Fiesta!
      </motion.h2>

      <div className="space-y-4">
        {details.map((d, i) => (
          <motion.div
            key={d.label}
            className={`bg-card rounded-2xl border-l-4 ${d.color} p-5 shadow-md cursor-pointer select-none`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: "spring" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => reveal(i)}
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="text-3xl"
                animate={revealed[i] ? { rotate: [0, 20, -20, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {d.emoji}
              </motion.span>

              <div>
                <p className="text-sm font-body font-semibold text-muted-foreground">
                  {d.label}
                </p>

                {revealed[i] ? (
                  <>
                    <motion.p
                      className="text-lg font-display font-bold text-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {d.value}
                    </motion.p>

                    {/* 📍 BOTÓN GOOGLE MAPS */}
                    {d.label === "Lugar" && (
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Restaurante+Señora+Bella+Nazca"
                        target="_blank"
                        className="mt-2 inline-block bg-pocoyo-blue text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
                      >
                        📍 Ver ubicación
                      </a>
                    )}

                    {/* 🎁 LISTA DE REGALOS */}
                    {d.label === "Regalos" && (
                      <ul className="mt-3 bg-white/50 rounded-lg p-3 shadow-inner space-y-1 text-sm">
                        <li>⚽ Pelotas de fútbol</li>
                        <li>🧩 Masitas moldeables</li>
                        <li>🚗 Pistas de autos</li>
                        <li>👕 Ropa talla 6</li>
                        <li>🧸 Juguetes de Pocoyo</li>
                        <li>🎲 Juegos didácticos</li>
                      </ul>
                    )}
                  </>
                ) : (
                  <p className="text-sm font-body text-muted-foreground italic">
                    ¡Toca para descubrir! ✨
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventDetails;