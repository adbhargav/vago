import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const ICONS = {
  arrow: ArrowRight,
  pin: MapPin,
};

/**
 * CTAButton
 * variant "primary" -> warm gradient fill, used for the main conversion action.
 * variant "secondary" -> outlined, low-emphasis companion action.
 */
export default function CTAButton({
  children,
  variant = "primary",
  icon = "arrow",
  onClick,
  className = "",
}) {
  const Icon = ICONS[icon] ?? ArrowRight;

  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-amber-400 to-red-500 text-slate-950 shadow-[0_10px_30px_-8px_rgba(251,146,60,0.55)] hover:shadow-[0_14px_36px_-6px_rgba(251,146,60,0.7)]"
      : "border border-white/15 text-white/90 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
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
