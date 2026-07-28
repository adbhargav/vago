import { motion } from "framer-motion";
import { Zap, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 text-black font-black shadow-[0_0_20px_rgba(251,146,60,0.6)] group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 fill-black stroke-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-extrabold tracking-wider text-white leading-none">
                VA-GO <span className="text-amber-400 font-normal text-xs uppercase tracking-widest block">INNOVATIVE</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-white/70">
            <a href="#services" className="hover:text-amber-400 transition-colors">
              Snack Machines
            </a>
            <a href="#services" className="hover:text-amber-400 transition-colors">
              Cigarette Vending
            </a>
            <a href="#services" className="hover:text-amber-400 transition-colors">
              Spare Parts
            </a>
            <a href="#services" className="hover:text-amber-400 transition-colors">
              Ads & Branding
            </a>
            <a href="#support" className="hover:text-amber-400 transition-colors">
              24/7 Support
            </a>
          </nav>


          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 px-5 py-2 text-xs font-bold text-black uppercase tracking-wider transition-all hover:scale-105 shadow-[0_4px_20px_rgba(251,146,60,0.4)]"
            >
              Get a Machine
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/90 p-6 backdrop-blur-2xl md:hidden"
        >
          <nav className="flex flex-col gap-4 text-base font-medium text-white/80">
            <a
              href="#machines"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 py-1"
            >
              Smart Machines
            </a>
            <a
              href="#snacks"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 py-1"
            >
              Snacks & Menu
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 py-1"
            >
              Locations
            </a>
            <a
              href="#business"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 py-1"
            >
              For Business
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-sm font-bold text-black"
            >
              Get a Machine
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
