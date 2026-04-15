import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";

const RSVPSection = () => {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGuests = async () => {
      const { data } = await supabase
        .from("rsvps")
        .select("guest_name")
        .order("created_at", { ascending: true });
      if (data) setGuests(data.map((r) => r.guest_name));
    };
    fetchGuests();
  }, [step]);

  const handleConfirm = async () => {
    if (!name.trim()) return;
    setLoading(true);
    await supabase.from("rsvps").insert({ guest_name: name.trim() });
    setLoading(false);
    setStep("confirmed");
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.7 },
      colors: ["#0ea5e9", "#ef4444", "#eab308", "#22c55e", "#ec4899", "#f97316"],
    });
  };

  return (
    <section className="relative z-10 py-16 px-4 pb-32">
      <div className="max-w-sm mx-auto text-center">
        {step === "form" ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              🎂 ¿Vienes a la fiesta?
            </h2>
            <p className="text-muted-foreground font-body">
              ¡Emilio te espera con muchas ganas!
            </p>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 rounded-full border-2 border-pocoyo-blue/30 bg-background text-foreground font-body text-center text-lg focus:outline-none focus:border-pocoyo-blue transition-colors"
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
            />
            <motion.button
              className="bg-pocoyo-blue text-primary-foreground font-display font-bold text-xl px-10 py-4 rounded-full shadow-xl disabled:opacity-50"
              whileHover={{ scale: 1.08, boxShadow: "0 20px 40px -10px rgba(14, 165, 233, 0.4)" }}
              whileTap={{ scale: 0.92 }}
              onClick={handleConfirm}
              disabled={!name.trim() || loading}
            >
              {loading ? "Enviando..." : "¡Sí, voy! 🎉"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="space-y-4"
          >
            <motion.span
              className="text-7xl block"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              🥳
            </motion.span>
            <h2 className="text-3xl font-display font-extrabold text-pocoyo-blue">
              ¡Genial, {name}!
            </h2>
            <p className="text-lg font-body text-foreground">
              ¡Te esperamos el <strong>29 de Abril</strong> a las <strong>6:30 PM</strong>!
            </p>
            <p className="text-muted-foreground font-body text-sm">
              Emilio está muy feliz de que vengas 💙
            </p>
          </motion.div>
        )}

        {/* Guest list */}
        {guests.length > 0 && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-3">
              🎈 ¡Ya confirmaron {guests.length}!
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {guests.map((g, i) => (
                <motion.span
                  key={i}
                  className="bg-pocoyo-blue/10 text-pocoyo-blue font-body font-semibold text-sm px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {g}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
