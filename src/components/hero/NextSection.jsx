import { motion } from "framer-motion";
import { CreditCard, Clock3, Salad } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Smart Payments",
    body: "Tap, scan, or wave. Every machine accepts card, mobile wallet, and contactless in seconds.",
  },
  {
    icon: Clock3,
    title: "24/7 Availability",
    body: "Machines never close. Grab a snack at midnight or restock your break room before dawn.",
  },
  {
    icon: Salad,
    title: "Fresh & Convenient",
    body: "Inventory is monitored live, so shelves stay stocked with what people actually reach for.",
  },
];

export default function NextSection() {
  return (
    <section className="relative bg-[#0a0a10] px-6 py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-bold text-white sm:text-4xl"
        >
          Everything You Need, One Smart Machine Away.
        </motion.h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, body }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-400/20 to-red-500/20 text-amber-400">
                <Icon size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
