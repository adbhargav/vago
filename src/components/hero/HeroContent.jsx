import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import HeroStats from "./HeroStats";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.0 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 flex max-w-xl flex-col items-center gap-6 text-center md:items-start md:text-left"
    >
      {/* ── Eyebrow badge ── */}
      <motion.span
        variants={item}
        className="inline-flex items-center gap-2 rounded-full border border-[#FFB300]/30 bg-[#FFB300]/10 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFB300]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#FFB300] animate-pulse" />
        Innovative Vending Solutions
      </motion.span>

      {/* ── Headline ── */}
      <motion.h1
        variants={item}
        className="font-display text-[2.75rem] font-extrabold leading-[1.06] text-white sm:text-[3.5rem] lg:text-[4.5rem] tracking-tight"
      >
        Smart Vending,{" "}
        <br className="hidden sm:block" />
        <span className="text-[#FFB300]">Redefined.</span>
      </motion.h1>

      {/* ── Sub-headline ── */}
      <motion.p
        variants={item}
        className="max-w-lg font-sans text-base font-light leading-relaxed text-white/65 sm:text-lg"
      >
        Experience the future of automated snack dispensing. India's most advanced dual-compartment vending network — with age verification, AI-driven support, and real-time payment.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div
        variants={item}
        className="flex flex-col items-center gap-3 sm:flex-row md:justify-start"
      >
        <CTAButton variant="primary">Explore Machine</CTAButton>
        <CTAButton variant="secondary">Partner With Us</CTAButton>
      </motion.div>

      {/* ── Feature pills ── */}
      <motion.div variants={item} className="mt-1 w-full">
        <HeroStats />
      </motion.div>
    </motion.div>
  );
}
