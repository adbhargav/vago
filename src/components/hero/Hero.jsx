import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroContent from "./HeroContent";
import VendingMachineScene from "./VendingMachineScene";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

// ─── Thin noise particles that drift upward ───
function AmbientParticle({ index }) {
  const size = (index % 3) * 2 + 2;
  const left = `${(index * 19 + 7) % 98}%`;
  const delay = (index * 0.41) % 7;
  const duration = 9 + (index % 5) * 2.2;
  const isGold = index % 3 !== 1;
  return (
    <motion.span
      className={`absolute rounded-full pointer-events-none ${
        isGold
          ? "bg-amber-400/70 shadow-[0_0_8px_rgba(251,146,60,0.7)]"
          : "bg-purple-400/60 shadow-[0_0_8px_rgba(147,51,234,0.7)]"
      }`}
      style={{ width: size, height: size, left, top: "105%", willChange: "transform, opacity" }}
      animate={{
        y: [0, "-115vh"],
        opacity: [0, 0.9, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse position (normalized –0.5 → 0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed — very soft, high mass = premium feel
  const parallaxX = useSpring(rawX, { stiffness: 40, damping: 20, mass: 0.8 });
  const parallaxY = useSpring(rawY, { stiffness: 40, damping: 20, mass: 0.8 });

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    setIsTouch(touch);
    if (touch || reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        rawX.set((e.clientX - rect.left) / rect.width - 0.5);
        rawY.set((e.clientY - rect.top) / rect.height - 0.5);
      });
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#061B55]"
    >

      {/* ── Deep background lighting ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        {/* Central amber warmth */}
        <motion.div
          animate={reduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/3 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(255,179,0,0.28) 0%, rgba(255,179,0,0.12) 42%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
        {/* Left cool accent */}
        <motion.div
          animate={reduceMotion ? {} : { scale: [1.08, 0.9, 1.08], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -left-20 bottom-0 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(6,27,85,0.9) 0%, rgba(59,130,246,0.18) 60%, transparent 100%)",
            willChange: "transform, opacity",
          }}
        />
        {/* Right pink-purple accent */}
        <motion.div
          animate={reduceMotion ? {} : { scale: [0.9, 1.2, 0.9], opacity: [0.22, 0.42, 0.22] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute right-0 top-16 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      </motion.div>

      {/* ── Ambient rising particles ── */}
      {!reduceMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <AmbientParticle key={i} index={i} />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════
          MAIN LAYOUT
          Mobile: stack vertically, content top
          Desktop (md+): side by side — content left, scene right
      ══════════════════════════════════════════ */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6 pt-24 pb-12 md:flex-row md:gap-0 md:pt-0">

        {/* LEFT — Hero copy */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left md:pr-8"
        >
          <HeroContent />
        </motion.div>

        {/* RIGHT — Vending Machine Scene */}
        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full flex justify-center md:w-1/2"
        >
          <VendingMachineScene
            parallaxX={isTouch || reduceMotion ? undefined : parallaxX}
            parallaxY={isTouch || reduceMotion ? undefined : parallaxY}
            reduceMotion={reduceMotion}
          />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: "easeOut" }}
      >
        <span className="font-sans text-[10px] font-medium uppercase tracking-widest text-white/30">Scroll</span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-[1px] rounded-full bg-gradient-to-b from-[#FFB300] to-transparent"
          style={{ willChange: "transform, opacity" }}
        />
      </motion.div>
    </section>
  );
}
