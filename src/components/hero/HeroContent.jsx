import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import HeroStats from "./HeroStats";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-center mx-auto"
    >
      <motion.span
        variants={item}
        className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
        VA-GO INNOVATIVE &bull; SMART RETAIL AUTOMATION
      </motion.span>

      <motion.h1
        variants={item}
        className="font-display text-[2.75rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl tracking-tight"
      >
        Smart{" "}
        <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
          Vending.
        </span>{" "}
        Anytime. Anywhere.
      </motion.h1>

      <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
        VA-GO INNOVATIVE is revolutionizing automated retail across India. Custom dual-compartment vending machines with age verification, nation-wide spare parts support, and high-impact ad displays.
      </motion.p>


      <motion.div variants={item} className="flex flex-col items-center gap-3 sm:flex-row justify-center">
        <CTAButton variant="primary" icon="arrow">
          Explore Solutions
        </CTAButton>
        <CTAButton variant="secondary" icon="pin">
          Partner With Us
        </CTAButton>
      </motion.div>

      <motion.div variants={item} className="mt-2">
        <HeroStats delay={0} />
      </motion.div>
    </motion.div>
  );
}


