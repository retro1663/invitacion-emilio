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
      <CountdownTimer />
      <InteractiveCharacters />
      <EventDetails />
      <RSVPSection />
      <MusicPlayer />
    </div>
  );
};

export default Index;