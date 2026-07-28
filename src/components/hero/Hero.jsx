import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroContent from "./HeroContent";
import VendingMachineScene from "./VendingMachineScene";
import useMouseParallax from "../../hooks/useMouseParallax";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  const { ref: parallaxRef, x: parallaxX, y: parallaxY } = useMouseParallax({
    disabled: reduceMotion,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const setRefs = (node) => {
    sectionRef.current = node;
    parallaxRef.current = node;
  };

  return (
    <section
      ref={setRefs}
      className="relative min-h-screen w-full overflow-hidden bg-[#08080c]"
      style={{ perspective: 1200 }}
    >
      {/* Ultra-premium dynamic background lighting */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Pulsing radial glow spots */}
        <motion.div
          animate={reduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] sm:h-[800px] sm:w-[800px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.22)_0%,_rgba(147,51,234,0.18)_40%,_transparent_70%)] blur-3xl"
        />

        <motion.div
          animate={reduceMotion ? {} : { scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-1/4 bottom-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.2)_0%,_transparent_70%)] blur-3xl"
        />

        <motion.div
          animate={reduceMotion ? {} : { scale: [0.9, 1.25, 0.9], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute right-1/4 top-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.18)_0%,_transparent_70%)] blur-3xl"
        />
      </motion.div>

      {/* Dynamic Animated Floating Bokeh Particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 22 }).map((_, index) => {
          const size = (index % 4) * 6 + 4;
          const duration = (index % 5) * 3 + 7;
          const delay = (index % 7) * 0.8;
          const startX = (index * 17) % 100;
          const startY = (index * 23) % 100;
          const isGolden = index % 2 === 0;

          return (
            <motion.span
              key={index}
              initial={{ opacity: 0.2, y: 0 }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: [0.2, 0.85, 0.2],
                      y: [-25, 35, -25],
                      x: [-15, 15, -15],
                      scale: [1, 1.4, 1],
                    }
              }
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute rounded-full filter blur-[1px] ${
                isGolden
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(251,146,60,0.8)]"
                  : "bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_12px_rgba(147,51,234,0.8)]"
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${startX}%`,
                top: `${startY}%`,
              }}
            />
          );
        })}
      </div>


      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-10 px-6 pt-32 pb-16 text-center">
        {/* Centered Top: Hero Content */}
        <motion.div
          style={{ opacity: reduceMotion ? 1 : contentOpacity, y: reduceMotion ? 0 : contentY }}
          className="w-full flex justify-center"
        >
          <HeroContent />
        </motion.div>

        {/* Centered Stage: Highlighted 3D Vending Machine Scene */}
        <motion.div
          style={{
            scale: reduceMotion ? 1 : sceneScale,
            y: reduceMotion ? 0 : sceneY,
          }}
          className="relative z-10 w-full flex justify-center"
        >
          <VendingMachineScene
            parallaxX={parallaxX}
            parallaxY={parallaxY}
            scrollYProgress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        </motion.div>
      </div>



    </section>
  );
}
