import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-04-29T18:30:00");

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = Math.max(0, TARGET.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Días", value: time.days, color: "bg-pocoyo-blue" },
    { label: "Horas", value: time.hours, color: "bg-pocoyo-red" },
    { label: "Min", value: time.minutes, color: "bg-pocoyo-yellow" },
    { label: "Seg", value: time.seconds, color: "bg-pocoyo-green" },
  ];

  return (
    <section className="relative z-10 py-12 px-4">
      <motion.h2
        className="text-2xl sm:text-3xl font-display font-bold text-center text-foreground mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        ⏰ ¡Faltan...!
      </motion.h2>
      <div className="flex justify-center gap-3 sm:gap-5">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            className={`${u.color} text-primary-foreground rounded-2xl p-4 sm:p-6 min-w-[70px] sm:min-w-[90px] text-center shadow-lg`}
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.span
              key={u.value}
              className="text-3xl sm:text-5xl font-display font-extrabold block"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {u.value}
            </motion.span>
            <span className="text-xs sm:text-sm font-body font-semibold opacity-90">{u.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CountdownTimer;
