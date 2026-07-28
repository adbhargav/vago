/**
 * ScrollHero — VAGO Innovative
 *
 * Pinned GSAP ScrollTrigger hero with 4-phase storyboard:
 *   Phase 0        →  start of scroll  ORBIT     — snacks float around machine
 *   0 → tl pos 1   (35% scroll)        EXPLOSION — snacks blast radially outward
 *   tl pos 1 → 2   (65% scroll)        FOCUS     — machine zooms, text fades, callouts appear
 *   tl pos 2.4 → 3 (85-100% scroll)   DISPENSE  — Lays drops from tray
 *
 * Key architecture:
 *  - GSAP context on containerRef → clean cleanup
 *  - Snacks: GSAP-only (no Framer Motion animate) to avoid transform conflict
 *  - Float loops killed via overwrite:"all" when scroll starts
 *  - Snacks positioned in a fixed-size scene box, GSAP px offsets are relative
 *  - Mobile: separate static layout, no GSAP pinning
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import heroAssets from "./assets";
import HeroContent from "./HeroContent";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { ShieldCheck, Smartphone, Monitor } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Feature callouts (machine focus phase) ──
const CALLOUTS = [
  { Icon: Monitor,     label: "Smart AI Screen",   sub: "Select & pay instantly",  side: "left",  top: "18%" },
  { Icon: ShieldCheck, label: "Age Verification",  sub: "Biometric ID check",      side: "right", top: "28%" },
  { Icon: Smartphone,  label: "Tap to Pay",        sub: "NFC & UPI ready",         side: "right", top: "56%" },
];

// ── Snack data: positions are % of scene box ──
const SNACKS = [
  { key: "cheetos",  assetKey: "cheetos",      alt: "Cheetos",   top:"3%",  left:"0%",   right:"auto", bottom:"auto", w:"22%", initR:-12 },
  { key: "snickers", assetKey: "snickers",     alt: "Snickers",  top:"0%",  left:"auto", right:"0%",   bottom:"auto", w:"26%", initR: 18 },
  { key: "cola",     assetKey: "cocaCola",     alt: "Coca-Cola", top:"32%", left:"auto", right:"-5%",  bottom:"auto", w:"18%", initR: 10 },
  { key: "doritos",  assetKey: "doritos",      alt: "Doritos",   top:"32%", left:"-5%",  right:"auto", bottom:"auto", w:"22%", initR:-15 },
  { key: "oreo",     assetKey: "oreo",         alt: "Oreo",      top:"auto",left:"auto", right:"0%",   bottom:"10%",  w:"22%", initR:  8 },
  { key: "lays",     assetKey: "lays",         alt: "Lays",      top:"auto",left:"0%",   right:"auto", bottom:"10%",  w:"22%", initR:-10 },
  { key: "phone",    assetKey: "paymentPhone", alt: "Pay",       top:"auto",left:"auto", right:"10%",  bottom:"-2%",  w:"18%", initR:  5 },
];

// ── Explosion vectors (px offset from orbital position) ──
const BLAST = [
  { x:-160, y:-190, r:-46, s:0.72, o:0.75 },
  { x: 190, y:-210, r: 55, s:0.68, o:0.75 },
  { x: 255, y:  45, r: 37, s:0.73, o:0.75 },
  { x:-235, y:  65, r:-52, s:0.72, o:0.75 },
  { x: 200, y: 215, r: 29, s:0.68, o:0.75 },
  { x:-190, y: 225, r:-34, s:0.72, o:0.75 },
  { x: 110, y: 275, r: 20, s:0.65, o:0.60 },
];

// ── Fade-off vectors (continue outward and vanish) ──
const FADE = [
  { x:-400, y:-440, o:0 },
  { x: 450, y:-420, o:0 },
  { x: 580, y:  90, o:0 },
  { x:-510, y: 120, o:0 },
  { x: 450, y: 490, o:0 },
  { x:-440, y: 505, o:0 },
  { x: 240, y: 560, o:0 },
];

// ── Ambient rising particle ──
function Particle({ index }) {
  const size = (index % 3) * 2 + 2;
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute rounded-full pointer-events-none ${
        index % 3 !== 1
          ? "bg-[#FFB300]/55"
          : "bg-indigo-400/35"
      }`}
      style={{
        width: size,
        height: size,
        left: `${(index * 19 + 7) % 98}%`,
        top: "105%",
        willChange: "transform, opacity",
      }}
      animate={{ y: [0, "-115vh"], opacity: [0, 0.8, 0] }}
      transition={{
        duration: 9 + (index % 5) * 2.2,
        delay: (index * 0.41) % 7,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// ════════════════════════════════════════════════
// MOBILE HERO — simple, no GSAP
// ════════════════════════════════════════════════
function MobileHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#061B55] flex flex-col items-center justify-center px-6 pt-24 pb-12 gap-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 45%, rgba(255,179,0,0.22) 0%, transparent 68%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full text-center"
      >
        <HeroContent />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[340px]"
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-[-15%] rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(255,179,0,0.3) 0%, transparent 70%)" }}
          />
          <img
            src={heroAssets.vendingMachine}
            alt="VA-GO Smart Vending Machine"
            draggable={false}
            className="relative z-10 w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
          />
          <img src={heroAssets.cheetos}  alt="" draggable={false} className="absolute -top-6  -left-10  w-[38%] -rotate-12 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" />
          <img src={heroAssets.snickers} alt="" draggable={false} className="absolute -top-4  -right-8  w-[36%] rotate-[18deg] drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" />
          <img src={heroAssets.lays}     alt="" draggable={false} className="absolute -bottom-4 -left-8  w-[36%] -rotate-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" />
          <img src={heroAssets.oreo}     alt="" draggable={false} className="absolute -bottom-2 -right-8 w-[30%] rotate-[8deg] drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-sans text-[9px] uppercase tracking-widest text-white/30">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="block h-6 w-px bg-gradient-to-b from-[#FFB300] to-transparent"
        />
      </motion.div>
    </div>
  );
}

// ════════════════════════════════════════════════
// DESKTOP HERO — GSAP ScrollTrigger pinned
// ════════════════════════════════════════════════
function DesktopHero({ reduceMotion }) {
  const containerRef   = useRef(null);
  const contentWrapRef = useRef(null);
  const machineRef     = useRef(null);
  const calloutRef     = useRef(null);
  const scrollDotRef   = useRef(null);
  const dispenseRef    = useRef(null);

  // Snack element refs — populated via callback refs in JSX
  const snackEls = useRef([]);
  // Store float tween refs so we can kill them cleanly
  const floatTweens = useRef([]);

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {

      // ── 1. Snack entrance: staggered scale + fade up ──
      gsap.fromTo(
        snackEls.current,
        { opacity: 0, scale: 0.68, y: 30 },
        {
          opacity:    1,
          scale:      1,
          y:          0,
          duration:   0.9,
          stagger:    0.09,
          delay:      0.55,
          ease:       "power3.out",
          clearProps: "scale,y",
          onComplete() {
            // ── 2. Start ambient float loops after entrance ──
            SNACKS.forEach((s, i) => {
              const el = snackEls.current[i];
              if (!el) return;
              const tw = gsap.to(el, {
                y:        -(8 + (i % 3) * 5),
                rotate:   s.initR + (i % 2 === 0 ? 4 : -4),
                duration: 4.2 + i * 0.35,
                delay:    i * 0.18,
                repeat:   -1,
                yoyo:     true,
                ease:     "sine.inOut",
              });
              floatTweens.current.push(tw);
            });
          },
        }
      );

      // ── 3. ScrollTrigger timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start:   "top top",
          end:     "bottom bottom",
          scrub:   1.5,
          onEnter() {
            // Kill float loops as soon as user starts scrolling
            floatTweens.current.forEach((tw) => tw.kill());
            floatTweens.current = [];
          },
        },
      });

      // ═══ PHASE 1 (pos 0→1): EXPLOSION ═══
      BLAST.forEach(({ x, y, r, s, o }, i) => {
        tl.to(
          snackEls.current[i],
          { x, y, rotate: r, scale: s, opacity: o, duration: 1, ease: "power2.inOut" },
          0
        );
      });

      // ═══ PHASE 2 (pos 1→2): MACHINE FOCUS + SNACKS FADE OFF ═══
      FADE.forEach(({ x, y, o }, i) => {
        tl.to(
          snackEls.current[i],
          { x, y, opacity: o, duration: 1, ease: "power3.in" },
          1
        );
      });

      tl
        .to(machineRef.current, {
          scale:    1.2,
          y:        -28,
          filter:   "brightness(1.18) contrast(1.1) saturate(1.12)",
          duration: 1.2,
          ease:     "power2.inOut",
        }, 1)
        .to(contentWrapRef.current, {
          opacity:  0,
          x:        -68,
          duration: 0.85,
          ease:     "power2.in",
        }, 1)
        .fromTo(
          calloutRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          1.85
        )
        .to(scrollDotRef.current, { opacity: 0, duration: 0.25 }, 0.35);

      // ═══ PHASE 3 (pos 2.45→3): DISPENSE ═══
      tl
        .fromTo(
          dispenseRef.current,
          { opacity: 0, y: -48, rotate: -8, scale: 0.88 },
          { opacity: 1, y:  210, rotate: 12, scale: 1.12, duration: 0.9, ease: "power3.in" },
          2.45
        )
        .to(machineRef.current, {
          filter:   "brightness(1.4) contrast(1.15)",
          duration: 0.22,
          yoyo:     true,
          repeat:   1,
        }, 2.68);

    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>

      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#061B55]">

        {/* Ambient lighting */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.14, 1], opacity: [0.25, 0.42, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,179,0,0.28) 0%, rgba(255,179,0,0.1) 46%, transparent 72%)" }}
          />
          <motion.div
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }}
          />
        </div>

        {/* Rising particles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => <Particle key={i} index={i} />)}
        </div>

        {/* ══ SPLIT LAYOUT ══ */}
        <div className="relative flex h-full max-w-7xl mx-auto px-6 lg:px-8 items-center">

          {/* LEFT: Hero copy
              - Outer div is GSAP target (fades out on focus phase)
              - Inner motion.div handles entrance only
          */}
          <div
            ref={contentWrapRef}
            className="w-1/2 flex-shrink-0 z-10"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left pr-6 lg:pr-10"
            >
              <HeroContent />
            </motion.div>
          </div>

          {/* RIGHT: Scene ── bounded box so snack % positions are predictable */}
          <div className="w-1/2 flex-shrink-0 flex justify-center items-center relative">

            {/* Scene box — snacks positioned absolutely inside this */}
            <div
              className="relative"
              style={{
                width:  "min(480px, 48vw)",
                height: "min(560px, 56vw)",
              }}
            >
              {/* Radial glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-10%] rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,179,0,0.30) 0%, rgba(6,27,85,0.55) 52%, transparent 80%)",
                  filter: "blur(38px)",
                }}
              />

              {/* Machine — GSAP zoom wrapper */}
              <div
                ref={machineRef}
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{ willChange: "transform, filter" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 28 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.05, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <img
                    src={heroAssets.vendingMachine}
                    alt="VA-GO Dual-Compartment Smart Vending Machine"
                    draggable={false}
                    className="w-[68%] lg:w-[72%] h-auto filter contrast-[1.06] drop-shadow-[0_40px_80px_rgba(0,0,0,0.92)]"
                    style={{ maxWidth: "340px" }}
                  />
                  {/* Ground shadow */}
                  <div className="absolute -bottom-2 left-1/2 h-4 w-[72%] -translate-x-1/2 rounded-full bg-black/80 blur-xl" />
                </motion.div>

                {/* Dispense snack */}
                <div
                  ref={dispenseRef}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 w-20 pointer-events-none"
                  style={{ opacity: 0, willChange: "transform, opacity" }}
                >
                  <img
                    src={heroAssets.lays}
                    alt="Dispensed snack"
                    draggable={false}
                    className="w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
                  />
                </div>

                {/* Feature callouts — appear in Phase 2 */}
                <div
                  ref={calloutRef}
                  className="pointer-events-none absolute inset-0"
                  style={{ opacity: 0, willChange: "opacity, transform" }}
                >
                  {CALLOUTS.map(({ Icon, label, sub, side, top }) => (
                    <div
                      key={label}
                      className={`absolute flex items-center gap-1.5 ${
                        side === "right" ? "left-[102%]" : "right-[102%] flex-row-reverse"
                      }`}
                      style={{ top }}
                    >
                      <div className={`flex items-center gap-1 ${side === "left" ? "flex-row-reverse" : ""}`}>
                        <div className="h-2 w-2 rounded-full bg-[#FFB300] shadow-[0_0_10px_rgba(255,179,0,0.9)]" />
                        <div
                          className="h-px w-8"
                          style={{
                            background: side === "right"
                              ? "linear-gradient(to right, rgba(255,179,0,0.6), transparent)"
                              : "linear-gradient(to left, rgba(255,179,0,0.6), transparent)",
                          }}
                        />
                      </div>
                      <div className="rounded-xl border border-[#FFB300]/20 bg-[#061B55]/88 px-3 py-2 backdrop-blur-xl shadow-[0_4px_18px_rgba(0,0,0,0.6)] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Icon size={11} className="text-[#FFB300] shrink-0" strokeWidth={2.5} />
                          <span className="font-display text-[11px] font-bold text-white leading-none">{label}</span>
                        </div>
                        <p className="mt-0.5 font-sans text-[9px] text-white/45 pl-[19px]">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating snacks — GSAP only, no Framer Motion animate */}
              {SNACKS.map((s, i) => (
                <div
                  key={s.key}
                  ref={(el) => { snackEls.current[i] = el; }}
                  className="absolute pointer-events-none select-none"
                  style={{
                    top:     s.top,
                    left:    s.left,
                    right:   s.right,
                    bottom:  s.bottom,
                    width:   s.w,
                    opacity: 0,                          // GSAP entrance reveals
                    transform: `rotate(${s.initR}deg)`, // initial tilt
                    willChange: "transform, opacity",
                  }}
                >
                  <img
                    src={heroAssets[s.assetKey]}
                    alt={s.alt}
                    draggable={false}
                    className="w-full h-full object-contain drop-shadow-[0_20px_44px_rgba(0,0,0,0.72)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollDotRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ willChange: "opacity" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-sans text-[9px] font-medium uppercase tracking-widest text-white/30">
              Scroll to explore
            </span>
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="block h-8 w-px rounded-full bg-gradient-to-b from-[#FFB300] to-transparent"
              style={{ willChange: "transform, opacity" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// Root: picks mobile vs desktop
// ════════════════════════════════════════════════
export default function ScrollHero() {
  const reduceMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady]       = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    setReady(true);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!ready) return null;
  return isMobile ? <MobileHero /> : <DesktopHero reduceMotion={reduceMotion} />;
}
