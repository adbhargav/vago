import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Building2, CheckCircle2, Play } from "lucide-react";
import purchaseImg from "../../assets/hero/vending-purchase.png";

export default function PurchaseShowcase() {
  return (
    <section className="relative bg-[#08080c] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-12 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                Live Purchase Experience
              </span>

              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Seamless <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">Contactless</span> Purchasing in Action.
              </h2>

              <p className="text-base leading-relaxed text-white/70">
                Experience how employees, travelers, and visitors interact with VA-GO Innovative smart vending machines in high-traffic airports and corporate smoke zones.
              </p>

              {/* Feature Points */}
              <div className="flex flex-col gap-4 text-sm font-semibold text-white/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <span>Instant Smartphone NFC & Wallet Payments</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span>Age Verification & Integrated Lighter Dispensing</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span>Tailored for Airports, Tech Parks & Corporate Smoke Zones</span>
                </div>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group"
              >
                <img
                  src={purchaseImg}
                  alt="Person purchasing from VA-GO smart vending machine in airport lounge"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />

                {/* Glassmorphic Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between rounded-xl border border-white/20 bg-black/70 p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-black font-bold">
                      <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Airport Lounge Deployment</h4>
                      <p className="text-xs text-white/60">Contactless NFC Payment Verified</p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                    <Play className="h-3 w-3 fill-amber-300" /> Active Machine
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
