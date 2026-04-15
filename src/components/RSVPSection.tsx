import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const RSVPSection = () => {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGuests = async () => {
    const q = query(collection(db, "rsvps"), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    const list: string[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data().guest_name);
    });
    setGuests(list);
  };

  useEffect(() => {
    fetchGuests();
  }, [step]);

  const handleConfirm = async () => {
    if (!name.trim()) return;
    setLoading(true);

    await addDoc(collection(db, "rsvps"), {
      guest_name: name.trim(),
      createdAt: serverTimestamp(),
    });

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
          <motion.div className="space-y-6">
            <h2 className="text-2xl font-bold">
              🎂 ¿Vienes a la fiesta?
              <p className="text-pocoyo-blue font-medium text-lg mt-2">
                ¡Emilio te espera con muchas ganas!
              </p>
            </h2>

            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-pocoyo-blue bg-pocoyo-blue/20 text-gray-700 font-body text-center text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pocoyo-blue/40 transition"
            />

            <motion.button
              className="bg-pocoyo-blue text-white font-display font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:shadow-cyan-400/50"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 25px 50px -12px rgba(14, 165, 233, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleConfirm}
              disabled={!name.trim() || loading}
            >
              {loading ? "Enviando..." : "¡Sí, voy! 🎉"}
            </motion.button>
          </motion.div>
        ) : (
          <div className="text-center mt-6">

            {/* Emoji */}
            <div className="text-5xl mb-4">🥳</div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-pocoyo-blue mb-2">
              ¡Genial, {name}!
            </h2>

            {/* Fecha */}
            <p className="text-gray-700 mb-2">
              ¡Te esperamos el <span className="font-semibold">29 de Abril</span> a las{" "}
              <span className="font-semibold">5:00 PM</span>!
            </p>

            {/* Mensaje */}
            <p className="text-pocoyo-blue/80 mb-6">
              Emilio está muy feliz de que vengas 💙
            </p>

          </div>
        )}

        {/* Lista de confirmados (NO la toco, solo la mejoro visualmente) */}
        {guests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-gray-800 font-semibold mb-3">
              🎈 ¡Ya confirmaron {guests.length}!
            </h3>

            <div className="flex flex-wrap justify-center gap-2">
              {guests.map((g, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-pocoyo-blue/20 text-pocoyo-blue rounded-full text-sm font-medium"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default RSVPSection;