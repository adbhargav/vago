import { motion } from "framer-motion";
import { Clock, Wifi, Leaf } from "lucide-react";

const items = [
  { icon: Clock, label: "24/7 Available" },
  { icon: Wifi, label: "Contactless Payment" },
  { icon: Leaf, label: "Fresh Products" },
];

export default function HeroStats({ delay = 0 }) {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
    >
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2 text-sm text-white/60">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
            <Icon size={15} strokeWidth={2} className="text-amber-400" />
          </span>
          {label}
        </li>
      ))}
    </motion.ul>
  );
}
