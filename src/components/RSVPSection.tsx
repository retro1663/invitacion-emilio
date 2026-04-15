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
            </h2>

            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 rounded-full border text-center"
            />

            <button
              onClick={handleConfirm}
              disabled={!name.trim() || loading}
            >
              {loading ? "Enviando..." : "¡Sí, voy! 🎉"}
            </button>
          </motion.div>
        ) : (
          <div>
            <h2>¡Gracias {name}!</h2>
          </div>
        )}

        {guests.length > 0 && (
          <div className="mt-6">
            <h3>🎈 {guests.length} confirmados</h3>
            {guests.map((g, i) => (
              <span key={i}>{g} </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;