import { motion } from "framer-motion";

const shapes = [
  { color: "bg-pocoyo-blue", size: "w-8 h-8", top: "5%", left: "8%", delay: 0, shape: "rounded-full" },
  { color: "bg-pocoyo-red", size: "w-6 h-6", top: "12%", left: "85%", delay: 0.5, shape: "rounded-lg rotate-45" },
  { color: "bg-pocoyo-yellow", size: "w-10 h-10", top: "25%", left: "3%", delay: 1, shape: "rounded-full" },
  { color: "bg-pocoyo-green", size: "w-5 h-5", top: "40%", left: "92%", delay: 1.5, shape: "rounded-full" },
  { color: "bg-pocoyo-pink", size: "w-7 h-7", top: "60%", left: "5%", delay: 0.3, shape: "rounded-lg rotate-12" },
  { color: "bg-pocoyo-orange", size: "w-6 h-6", top: "75%", left: "90%", delay: 0.8, shape: "rounded-full" },
  { color: "bg-pocoyo-blue/40", size: "w-16 h-16", top: "85%", left: "10%", delay: 1.2, shape: "rounded-full" },
  { color: "bg-pocoyo-yellow/40", size: "w-12 h-12", top: "50%", left: "88%", delay: 0.7, shape: "rounded-full" },
  { color: "bg-pocoyo-red/30", size: "w-4 h-4", top: "30%", left: "15%", delay: 1.8, shape: "rounded-full" },
  { color: "bg-pocoyo-green/30", size: "w-5 h-5", top: "70%", left: "80%", delay: 2, shape: "rounded-lg rotate-45" },
];

const FloatingShapes = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {shapes.map((s, i) => (
      <motion.div
        key={i}
        className={`absolute ${s.color} ${s.size} ${s.shape} opacity-60`}
        style={{ top: s.top, left: s.left }}
        animate={{
          y: [0, -20, 0, 10, 0],
          rotate: [0, 10, -10, 5, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 6 + i * 0.5,
          repeat: Infinity,
          delay: s.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default FloatingShapes;
