import { useState } from "react";
import { motion } from "framer-motion";
import heroAssets from "./assets";
import FloatingSnack from "./FloatingSnack";
import ParallaxObject from "./ParallaxObject";

/**
 * VendingMachineScene
 * The right-hand 3D-style composition: a central vending machine with
 * individually animated floating snack/product layers around it, driven by
 * shared mouse-parallax motion values.
 */
export default function VendingMachineScene({
  parallaxX,
  parallaxY,
  scrollYProgress,
  reduceMotion = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [isStocked, setIsStocked] = useState(true);

  return (
    <div className="relative mx-auto aspect-square w-[360px] sm:w-[540px] md:w-[680px] lg:w-[780px]">

      {/* Bright Spotlight Radial Glow behind Vending Machine */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(251,146,60,0.45)_0%,_rgba(234,88,12,0.28)_30%,_rgba(147,51,234,0.2)_55%,_transparent_75%)] blur-3xl pointer-events-none"
      />

      {/* Rotating ambient light ring halo */}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/30 bg-[conic-gradient(from_0deg,_transparent_0deg,_rgba(245,158,11,0.3)_90deg,_transparent_180deg,_rgba(147,51,234,0.3)_270deg,_transparent_360deg)] blur-xl"
      />


      {/* Central Highlighted Vending Machine */}
      <ParallaxObject
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        translateStrength={10}
        rotateStrength={6}
        reduceMotion={reduceMotion}
        className="absolute left-1/2 top-1/2 z-10 w-[68%] sm:w-[72%] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          tabIndex={0}
          role="button"
          aria-label="Interactive illuminated smart vending machine."
          className="relative cursor-pointer outline-none group"
        >
          <motion.div
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, -10, 0],
                    scale: hovered ? 1.04 : 1,
                    rotateY: hovered ? 8 : 0,
                    rotateX: hovered ? -4 : 0,
                  }
            }
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.35, ease: "easeOut" },
              rotateY: { duration: 0.35, ease: "easeOut" },
              rotateX: { duration: 0.35, ease: "easeOut" },
            }}
            className="drop-shadow-[0_45px_85px_rgba(251,146,60,0.35)] filter transition-all"
          >
            <img
              src={heroAssets.vendingMachine}
              alt="Illuminated smart vending machine"
              draggable={false}
              className="w-full h-auto transition-opacity duration-300 filter contrast-105 brightness-105"
            />
          </motion.div>

          {/* Intense Glow Aura on Vending Machine */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-[-10%] rounded-[40px] bg-[radial-gradient(circle,_rgba(251,146,60,0.5)_0%,_transparent_70%)] blur-2xl"
          />

          <motion.span
            aria-hidden="true"
            animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.25 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-500/40 bg-black/80 px-4 py-1 text-xs font-bold tracking-wide text-amber-300 shadow-[0_0_15px_rgba(251,146,60,0.5)] backdrop-blur-md"
          >
            ⚡ VA-GO Smart Vending
          </motion.span>
        </motion.div>

        {/* Dynamic ground shadow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-6 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full bg-black/80 blur-2xl"
        />
      </ParallaxObject>


      {/* Floating snack layers in clean non-overlapping spatial orbits */}
      {/* Top Left: Cheetos */}
      <FloatingSnack
        image={heroAssets.cheetos}
        alt="Bag of Cheetos"
        depth={1.4}
        delay={0.4}
        duration={5}
        floatDistance={8}
        parallaxStrength={14}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-200}
        scrollY={-150}
        scrollRotate={-30}
        scrollScale={1.2}
        reduceMotion={reduceMotion}
        className="left-[-2%] top-[0%] w-[20%] sm:w-[22%]"
      />

      {/* Top Right: Snickers */}
      <FloatingSnack
        image={heroAssets.snickers}
        alt="Snickers chocolate bar"
        depth={1.5}
        delay={0.5}
        duration={5.5}
        floatDistance={10}
        rotation={4}
        parallaxStrength={16}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={180}
        scrollY={-180}
        scrollRotate={25}
        scrollScale={1.2}
        reduceMotion={reduceMotion}
        className="right-[2%] top-[-4%] w-[24%] sm:w-[26%]"
      />

      {/* Mid Right: Coca-Cola */}
      <FloatingSnack
        image={heroAssets.cocaCola}
        alt="Chilled cola can"
        depth={1.4}
        delay={0.6}
        duration={6}
        floatDistance={8}
        rotation={6}
        parallaxStrength={15}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={220}
        scrollY={-40}
        scrollRotate={35}
        scrollScale={1.25}
        reduceMotion={reduceMotion}
        className="right-[-8%] top-[24%] w-[16%] sm:w-[18%]"
      />

      {/* Mid Left: Doritos */}
      <FloatingSnack
        image={heroAssets.doritos}
        alt="Bag of Doritos"
        depth={1.3}
        delay={0.7}
        duration={5.2}
        floatDistance={8}
        parallaxStrength={13}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-240}
        scrollY={20}
        scrollRotate={-40}
        scrollScale={1.25}
        reduceMotion={reduceMotion}
        className="left-[-8%] top-[24%] w-[20%] sm:w-[22%]"
      />

      {/* Lower Right: Oreo */}
      <FloatingSnack
        image={heroAssets.oreo}
        alt="Pack of Oreo cookies"
        depth={1.3}
        delay={0.8}
        duration={6.5}
        floatDistance={7}
        rotation={-4}
        parallaxStrength={13}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={220}
        scrollY={120}
        scrollRotate={30}
        scrollScale={1.2}
        reduceMotion={reduceMotion}
        className="right-[-4%] bottom-[16%] w-[20%] sm:w-[22%]"
      />

      {/* Lower Left: Lays */}
      <FloatingSnack
        image={heroAssets.lays}
        alt="Bag of Lays chips"
        depth={1.6}
        delay={0.9}
        duration={5.8}
        floatDistance={8}
        parallaxStrength={18}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-200}
        scrollY={140}
        scrollRotate={-25}
        scrollScale={1.2}
        reduceMotion={reduceMotion}
        className="left-[-4%] bottom-[16%] w-[20%] sm:w-[22%]"
      />

      {/* Bottom Right: Payment Phone */}
      <FloatingSnack
        image={heroAssets.paymentPhone}
        alt="Contactless payment on smartphone"
        depth={1.7}
        delay={1.0}
        duration={4.5}
        floatDistance={12}
        parallaxStrength={20}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={180}
        scrollY={180}
        scrollRotate={25}
        scrollScale={1.2}
        reduceMotion={reduceMotion}
        className="right-[10%] bottom-[-4%] w-[16%] sm:w-[18%]"
      />

      {/* Neon SNACKS sign */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 bottom-[-8%] w-[44%] sm:w-[48%] -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.img
          src={heroAssets.snacksNeon}
          alt="Neon SNACKS sign"
          draggable={false}
          animate={reduceMotion ? {} : { opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full drop-shadow-[0_0_35px_rgba(251,146,60,0.75)]"
        />
      </motion.div>


    </div>
  );
}

