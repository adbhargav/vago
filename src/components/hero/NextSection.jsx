import { motion } from "framer-motion";
import { Utensils, Flame, Wrench, Tv, Bot, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Snacks Vending Machine",
    badge: "Corporate & Public",
    body: "End-to-end solutions for corporate offices and public spaces — fresh snacks with efficient contactless payment tracking.",
  },
  {
    icon: Flame,
    title: "Cigarettes Vending Machine",
    badge: "India's First",
    body: "Specialized machines for airports and corporate smoke zones with age verification and built-in lighters for secure, compliant access.",
  },
  {
    icon: Wrench,
    title: "Spare Parts & Services",
    badge: "Worldwide Supply",
    body: "Robust worldwide supply chain delivering essential components to keep your vending infrastructure running 24/7.",
  },
  {
    icon: Tv,
    title: "Advertisement & Promotions",
    badge: "High-Traffic ROI",
    body: "High-value visual display spaces on our machines — connecting brands directly with engaged consumers in premium locations.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function NextSection() {
  return (
    <section id="services" className="relative bg-[#061B55] px-6 py-28 lg:px-12">
      {/* Top fade transition */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#061B55] to-transparent" />

      {/* Subtle grid texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,179,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,179,0,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#FFB300]/25 bg-[#FFB300]/10 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFB300]"
          >
            End-To-End Vending Ecosystem
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-3xl font-extrabold text-white sm:text-5xl leading-tight"
          >
            Revolutionizing Retail{" "}
            <span className="text-[#FFB300]">Automation</span> Across India.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-sans text-base font-light leading-relaxed text-white/60 sm:text-lg"
          >
            VA-GO INNOVATIVE offers custom snack & cigarette vending machines, nation-wide spare parts support, high-impact branding displays, and AI communication technology.
          </motion.p>
        </div>

        {/* ── 4 Service Cards ── */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, badge, body }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative flex flex-col gap-5 rounded-3xl border border-white/8 bg-white/[0.04] p-7 transition-all duration-300 hover:border-[#FFB300]/35 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_rgba(255,179,0,0.1)]"
            >
              {/* Icon + badge row */}
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFB300] text-[#061B55] shadow-[0_0_20px_rgba(255,179,0,0.4)] group-hover:scale-110 transition-transform">
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <span className="rounded-full border border-[#FFB300]/20 bg-[#FFB300]/10 px-2.5 py-0.5 font-display text-[9px] font-bold uppercase tracking-wider text-[#FFB300]">
                  {badge}
                </span>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-white group-hover:text-[#FFB300] transition-colors">
                  {title}
                </h3>
                <p className="mt-2.5 font-sans text-sm font-light leading-relaxed text-white/55 group-hover:text-white/75 transition-colors">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 24/7 AI Support Banner ── */}
        <motion.div
          id="support"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 rounded-3xl border border-[#FFB300]/25 bg-gradient-to-r from-[#FFB300]/10 via-white/[0.03] to-[#061B55]/40 p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-3xl bg-[#FFB300]/10"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#FFB300] text-[#061B55] shadow-[0_0_25px_rgba(255,179,0,0.45)]">
                <Bot className="h-7 w-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-widest text-[#FFB300]">
                  <ShieldCheck className="h-4 w-4" />
                  24/7 Technical Reliability & Support
                </span>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Integrated AI Chatbots & Instant Refunds
                </h3>
                <p className="mt-3 max-w-2xl font-sans text-sm font-light leading-relaxed text-white/65 sm:text-base">
                  VA-GO Innovative ensures 24/7 reliability with high-quality service. Integrated AI chatbots for instant issue resolution keep downtime to zero, and we guarantee quick refunds whenever necessary.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="shrink-0 rounded-full bg-[#FFB300] px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-[#061B55] shadow-[0_5px_25px_rgba(255,179,0,0.45)] hover:brightness-110 hover:shadow-[0_8px_32px_rgba(255,179,0,0.6)] transition-all hover:-translate-y-0.5"
            >
              Connect With Support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
