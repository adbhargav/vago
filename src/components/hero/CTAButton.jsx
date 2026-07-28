import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

/**
 * CTAButton — VAGO Brand Guide
 * Primary: #FFB300 yellow fill, #061B55 navy text — the money CTA
 * Secondary: Outlined in white/15, soft navy fill — companion action
 */
export default function CTAButton({
  children,
  variant = "primary",
  onClick,
  className = "",
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-display text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB300]";

  const styles =
    variant === "primary"
      ? "bg-[#FFB300] text-[#061B55] shadow-[0_8px_28px_-6px_rgba(255,179,0,0.55)] hover:brightness-110 hover:shadow-[0_12px_36px_-4px_rgba(255,179,0,0.65)] hover:-translate-y-0.5"
      : "border border-white/20 text-white bg-white/[0.05] hover:bg-white/[0.10] hover:border-white/35 hover:-translate-y-0.5";

  const Icon = variant === "primary" ? ArrowRight : Users;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <Icon
        size={16}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </motion.button>
  );
}
