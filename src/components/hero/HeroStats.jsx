import { motion } from "framer-motion";
import { Clock, Wifi, Leaf } from "lucide-react";

const items = [
  { icon: Clock, label: "24/7 Available"        },
  { icon: Wifi,  label: "Contactless Payment"   },
  { icon: Leaf,  label: "Fresh Products"        },
];

export default function HeroStats() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
      {items.map(({ icon: Icon, label }, i) => (
        <motion.li
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 font-sans text-sm font-medium text-white/65"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#FFB300]/25 bg-[#FFB300]/10">
            <Icon size={14} strokeWidth={2} className="text-[#FFB300]" />
          </span>
          {label}
        </motion.li>
      ))}
    </ul>
  );
}
