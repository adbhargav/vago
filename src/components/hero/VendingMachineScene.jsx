import { useState } from "react";
import { motion } from "framer-motion";
import heroAssets from "./assets";
import FloatingSnack from "./FloatingSnack";

/**
 * VendingMachineScene — Premium Rewrite
 * - Central machine: smooth scale-in reveal
 * - Snacks: staggered radial entrance → organic float
 * - Mouse parallax for depth (desktop only)
 * - No scroll explosions — feels like Apple / Awwwards sites
 */
export default function VendingMachineScene({
  parallaxX,
  parallaxY,
  reduceMotion = false,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative mx-auto w-[340px] sm:w-[520px] md:w-[640px] lg:w-[740px] aspect-square">

      {/* ── Background ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,179,0,0.35)_0%,_rgba(255,179,0,0.15)_32%,_rgba(6,27,85,0.5)_58%,_transparent_72%)] blur-3xl pointer-events-none scale-110"
      />

      {/* ── Slow rotating conic halo ── */}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-[6%] rounded-full opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,179,0,0.22) 80deg, transparent 160deg, rgba(6,27,85,0.35) 240deg, transparent 360deg)",
          filter: "blur(22px)",
          willChange: "transform",
        }}
      />

      {/* ══════════════════════════════
          CENTRAL VENDING MACHINE
      ══════════════════════════════ */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[70%] sm:w-[74%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="relative group"
        >
          {/* Machine subtle breathe loop */}
          <motion.div
            animate={reduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          >
            <img
              src={heroAssets.vendingMachine}
              alt="VA-GO Dual-Compartment Smart Vending Machine"
              draggable={false}
              className="w-full h-auto filter contrast-[1.06] brightness-[1.03] drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
            />
          </motion.div>

          {/* Glow aura — rests at low opacity, flares on hover */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: hovered ? 0.85 : 0.32 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none absolute inset-[-12%] rounded-[48px] bg-[radial-gradient(ellipse_at_center,_rgba(255,179,0,0.5)_0%,_transparent_68%)] blur-2xl"
          />
        </motion.div>

        {/* Ground shadow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-4 left-1/2 h-7 w-[80%] -translate-x-1/2 rounded-full bg-black/80 blur-2xl"
        />
      </div>

      {/* ══════════════════════════════
          FLOATING SNACKS
          Each sits in its own absolute slot around the machine.
          Different floatDuration offsets make the motion feel organic.
      ══════════════════════════════ */}

      {/* Cheetos — top left */}
      <FloatingSnack
        image={heroAssets.cheetos}
        alt="Cheetos"
        depth={1.4}
        delay={0.5}
        floatY={10}
        floatDuration={5.2}
        rotateAmount={5}
        initialRotate={-12}
        parallaxStrength={18}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
        className="left-[3%] top-[5%] w-[22%] sm:w-[24%]"
      />

      {/* Snickers — top right */}
      <FloatingSnack
        image={heroAssets.snickers}
        alt="Snickers"
        depth={1.5}
        delay={0.65}
        floatY={12}
        floatDuration={6.1}
        rotateAmount={-4}
        initialRotate={18}
        parallaxStrength={22}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
        className="right-[4%] top-[2%] w-[26%] sm:w-[28%]"
      />

      {/* Coca-Cola — mid right */}
      <FloatingSnack
        image={heroAssets.cocaCola}
        alt="Coca-Cola"
        depth={1.4}
        delay={0.8}
        floatY={9}
        floatDuration={4.8}
        rotateAmount={6}
        initialRotate={10}
        parallaxStrength={16}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
        className="right-[-1%] top-[30%] w-[18%] sm:w-[20%]"
      />

      {/* Doritos — mid left */}
      <FloatingSnack
        image={heroAssets.doritos}
        alt="Doritos"
        depth={1.3}
        delay={0.7}
        floatY={11}
        floatDuration={5.7}
        rotateAmount={-5}
        initialRotate={-15}
        parallaxStrength={14}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
        className="left-[0%] top-[30%] w-[22%] sm:w-[24%]"
      />

      {/* Oreo — lower right */}
      <FloatingSnack
        image={heroAssets.oreo}
        alt="Oreo"
        depth={1.3}
        delay={0.9}
        floatY={8}
        floatDuration={6.6}
        rotateAmount={4}
        initialRotate={8}
        parallaxStrength={15}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
        className="right-[3%] bottom-[12%] w-[22%] sm:w-[24%]"
      />

      {/* Lays — lower left */}
      <FloatingSnack
        image={heroAssets.lays}
        alt="Lays"
        depth={1.6}
        delay={1.0}
        floatY={10}
        floatDuration={5.4}
        rotateAmount={-6}
        initialRotate={-10}
        parallaxStrength={20}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
        className="left-[3%] bottom-[12%] w-[22%] sm:w-[24%]"
      />

      {/* Payment Phone — bottom center-right */}
      <FloatingSnack
        image={heroAssets.paymentPhone}
        alt="Contactless payment"
        depth={1.7}
        delay={1.1}
        floatY={14}
        floatDuration={4.2}
        rotateAmount={3}
        initialRotate={5}
        parallaxStrength={24}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduceMotion={reduceMotion}
        className="right-[10%] bottom-[-2%] w-[18%] sm:w-[20%]"
      />
    </div>
  );
}
