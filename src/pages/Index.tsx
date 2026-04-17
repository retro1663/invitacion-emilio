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
      <div className="flex justify-center my-8">
        <motion.img
          src="/emilio.png"
          alt="Emilio"
          className="w-32 sm:w-40 md:w-48 drop-shadow-xl"
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