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
      className="relative z-10 flex max-w-xl flex-col gap-6 text-center lg:text-left"
    >
      <motion.span
        variants={item}
        className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 lg:mx-0"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Smart Vending &bull; Next Generation
      </motion.span>

      <motion.h1
        variants={item}
        className="font-display text-[2.75rem] font-bold leading-[1.05] text-white sm:text-6xl lg:text-[4rem]"
      >
        Smart{" "}
        <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
          Snacking.
        </span>
        <br />
        Anytime.
        <br />
        Anywhere.
      </motion.h1>

      <motion.p variants={item} className="mx-auto max-w-md text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0">
        Discover a smarter way to snack. Our intelligent vending machines bring
        your favorite snacks and drinks closer to you &mdash; fast, convenient,
        and always ready.
      </motion.p>

      <motion.div variants={item} className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
        <CTAButton variant="primary" icon="arrow">
          Explore Vending
        </CTAButton>
        <CTAButton variant="secondary" icon="pin">
          Find a Machine
        </CTAButton>
      </motion.div>

      <motion.div variants={item} className="mx-auto lg:mx-0">
        <HeroStats delay={0} />
      </motion.div>
    </motion.div>
  );
}
