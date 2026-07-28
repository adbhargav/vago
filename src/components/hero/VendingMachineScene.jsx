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
    <div className="relative mx-auto aspect-square w-[340px] sm:w-[500px] md:w-[620px] lg:w-[720px]">

      {/* Ambient radial glow behind the machine */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.35)_0%,_rgba(147,51,234,0.3)_35%,_rgba(59,130,246,0.18)_60%,_transparent_75%)] blur-3xl pointer-events-none"
      />

      {/* Rotating ambient light ring halo */}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/20 bg-[conic-gradient(from_0deg,_transparent_0deg,_rgba(245,158,11,0.25)_90deg,_transparent_180deg,_rgba(147,51,234,0.25)_270deg,_transparent_360deg)] blur-xl"
      />


      {/* Central vending machine */}
      <ParallaxObject
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        translateStrength={10}
        rotateStrength={6}
        reduceMotion={reduceMotion}
        className="absolute left-1/2 top-1/2 z-10 w-[64%] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={() => setIsStocked(!isStocked)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          tabIndex={0}
          role="button"
          aria-label="Interactive illuminated smart vending machine. Click to toggle shelves."
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
            className="drop-shadow-[0_40px_70px_rgba(0,0,0,0.8)] filter transition-all"
          >
            <img
              src={isStocked ? heroAssets.vendingMachine : heroAssets.vendingMachineEmpty}
              alt="Illuminated smart vending machine"
              draggable={false}
              className="w-full h-auto transition-opacity duration-300"
            />
          </motion.div>

          {/* Soft glow ring on hover */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: hovered ? 0.9 : 0.2 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-[-8%] rounded-[36px] bg-[radial-gradient(circle,_rgba(251,146,60,0.4)_0%,_transparent_70%)] blur-2xl"
          />

          <motion.span
            aria-hidden="true"
            animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.25 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-500/30 bg-black/75 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-300 shadow-lg backdrop-blur-md"
          >
            {isStocked ? "⚡ Click to Restock" : "✨ Restocked!"}
          </motion.span>
        </motion.div>

        {/* Dynamic ground shadow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-6 left-1/2 h-7 w-[75%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl"
        />
      </ParallaxObject>

      {/* Floating snack layers (Explode outwards on scroll!) */}
      {/* Top Left: Cheetos */}
      <FloatingSnack
        image={heroAssets.cheetos}
        alt="Bag of Cheetos"
        depth={1.4}
        delay={0.5}
        duration={5}
        floatDistance={10}
        parallaxStrength={14}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-260}
        scrollY={-180}
        scrollRotate={-35}
        scrollScale={1.3}
        reduceMotion={reduceMotion}
        className="left-[0%] top-[4%] w-[26%]"
      />

      {/* Top Center: Snickers */}
      <FloatingSnack
        image={heroAssets.snickers}
        alt="Snickers chocolate bar"
        depth={1.5}
        delay={0.6}
        duration={5.5}
        floatDistance={12}
        rotation={4}
        parallaxStrength={16}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-60}
        scrollY={-250}
        scrollRotate={25}
        scrollScale={1.25}
        reduceMotion={reduceMotion}
        className="left-[32%] top-[-2%] w-[32%] hidden sm:block"
      />

      {/* Top Right: Coca-Cola */}
      <FloatingSnack
        image={heroAssets.cocaCola}
        alt="Chilled cola can"
        depth={1.4}
        delay={0.7}
        duration={6}
        floatDistance={9}
        rotation={6}
        parallaxStrength={15}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={280}
        scrollY={-200}
        scrollRotate={45}
        scrollScale={1.3}
        reduceMotion={reduceMotion}
        className="right-[0%] top-[2%] w-[20%]"
      />

      {/* Mid Left: Doritos */}
      <FloatingSnack
        image={heroAssets.doritos}
        alt="Bag of Doritos"
        depth={1.3}
        delay={0.8}
        duration={5.2}
        floatDistance={8}
        parallaxStrength={13}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-320}
        scrollY={20}
        scrollRotate={-45}
        scrollScale={1.35}
        reduceMotion={reduceMotion}
        className="left-[-4%] top-[44%] w-[24%] hidden sm:block"
      />

      {/* Mid Right: Oreo */}
      <FloatingSnack
        image={heroAssets.oreo}
        alt="Pack of Oreo cookies"
        depth={1.3}
        delay={0.9}
        duration={6.5}
        floatDistance={7}
        rotation={-5}
        parallaxStrength={13}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={310}
        scrollY={40}
        scrollRotate={40}
        scrollScale={1.3}
        reduceMotion={reduceMotion}
        className="right-[-4%] top-[44%] w-[26%]"
      />

      {/* Bottom Left: Lays */}
      <FloatingSnack
        image={heroAssets.lays}
        alt="Bag of Lays chips"
        depth={1.6}
        delay={1.0}
        duration={5.8}
        floatDistance={8}
        parallaxStrength={20}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-250}
        scrollY={200}
        scrollRotate={-30}
        scrollScale={1.25}
        reduceMotion={reduceMotion}
        className="left-[6%] bottom-[0%] w-[24%] hidden sm:block"
      />

      {/* Bottom Left Backdrop: Snack Cluster */}
      <FloatingSnack
        image={heroAssets.snackCluster}
        alt="Collection of snacks"
        depth={1.2}
        delay={1.05}
        duration={6.2}
        floatDistance={6}
        parallaxStrength={12}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={-290}
        scrollY={240}
        scrollRotate={-20}
        scrollScale={1.2}
        reduceMotion={reduceMotion}
        className="left-[-4%] bottom-[-6%] w-[38%] opacity-90 hidden md:block"
      />

      {/* Bottom Right: Payment Phone */}
      <FloatingSnack
        image={heroAssets.paymentPhone}
        alt="Contactless payment on smartphone"
        depth={1.7}
        delay={1.1}
        duration={4.5}
        floatDistance={14}
        parallaxStrength={22}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollYProgress={scrollYProgress}
        scrollX={260}
        scrollY={220}
        scrollRotate={35}
        scrollScale={1.3}
        reduceMotion={reduceMotion}
        className="right-[0%] bottom-[2%] w-[20%]"
      />

      {/* Neon SNACKS sign */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 bottom-[-8%] w-[58%] -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.img
          src={heroAssets.snacksNeon}
          alt="Neon SNACKS sign"
          draggable={false}
          animate={reduceMotion ? {} : { opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full drop-shadow-[0_0_25px_rgba(251,146,60,0.65)]"
        />
      </motion.div>
    </div>
  );
}

