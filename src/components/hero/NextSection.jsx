import { motion } from "framer-motion";
import { Utensils, Flame, Wrench, Tv, Bot, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "1. Snacks Vending Machine",
    badge: "Corporate & Public Spaces",
    body: "End-to-end solutions designed for corporate offices and public spaces, ensuring staff have access to fresh snacks with efficient payment tracking.",
  },
  {
    icon: Flame,
    title: "2. Cigarettes Vending Machine",
    badge: "India's First Specialized Tech",
    body: "Specialized solution tailored for airports and corporate smoke zones, integrating age verification and built-in lighters for secure, compliant access.",
  },
  {
    icon: Wrench,
    title: "3. Spare Parts & Services",
    badge: "Worldwide Supply Chain",
    body: "Robust supply chain supporting vending machine operators worldwide, delivering essential components to keep your infrastructure running smoothly.",
  },
  {
    icon: Tv,
    title: "4. Advertisement & Promotions",
    badge: "High-Traffic Monetization",
    body: "High-value visual display spaces on our machines, connecting brands directly with engaged consumers in premium high-traffic environments.",
  },
];

export default function NextSection() {
  return (
    <section id="services" className="relative bg-[#08080c] px-6 py-28 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400"
          >
            End-To-End Vending Ecosystem
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-3xl font-extrabold text-white sm:text-5xl"
          >
            Revolutionizing Retail Automation Across India.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg"
          >
            VA-GO INNOVATIVE offers custom snack &amp; cigarette vending machines, nation-wide spare parts support, high-impact branding displays, and expanding AI communication technology.
          </motion.p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, badge, body }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 transition-all duration-300 hover:border-amber-500/40 hover:bg-white/[0.08] hover:shadow-[0_15px_35px_rgba(251,146,60,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-black font-bold shadow-[0_0_20px_rgba(251,146,60,0.4)] group-hover:scale-110 transition-transform">
                    <Icon size={22} strokeWidth={2.5} />
                  </span>
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    {badge}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support & Technical Reliability Banner */}
        <motion.div
          id="support"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-black shadow-[0_0_25px_rgba(251,146,60,0.5)]">
                <Bot className="h-7 w-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
                  <ShieldCheck className="h-4 w-4" /> 24/7 Technical Reliability &amp; Support
                </span>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Integrated AI Chatbots &amp; Instant Refunds
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                  VA-GO Innovative ensures 24/7 reliability with high-quality service for everyone. Our systems feature integrated AI chatbots for instant issue resolution, keeping downtime to a minimum, and we guarantee quick refunds whenever necessary.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="shrink-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider text-black transition-all hover:scale-105 shadow-[0_5px_25px_rgba(251,146,60,0.5)]"
            >
              Connect With Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

