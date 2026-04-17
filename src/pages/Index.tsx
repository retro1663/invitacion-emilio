import { motion } from "framer-motion"; // 👈 AGREGA ESTO
import FloatingShapes from "@/components/FloatingShapes";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import InteractiveCharacters from "@/components/InteractiveCharacters";
import EventDetails from "@/components/EventDetails";
import RSVPSection from "@/components/RSVPSection";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingShapes />
      <HeroSection />

      {/* 👇 IMAGEN DEL NIÑO CON ANIMACIÓN */}
      <div className="flex justify-center my-18">
        <motion.img
          src="/emilio.png"
          alt="Emilio"
          className="w-56 sm:w-64 md:w-72 drop-shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <CountdownTimer />
      <InteractiveCharacters />
      <EventDetails />
      <RSVPSection />
      <MusicPlayer />
    </div>
  );
};

export default Index;