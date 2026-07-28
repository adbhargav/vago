import { motion } from "framer-motion";
import { Zap, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Products",    href: "#services"  },
  { label: "Technology",  href: "#technology" },
  { label: "About Us",    href: "#about"      },
  { label: "Support",     href: "#support"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-full border border-white/10 bg-[#061B55]/70 px-6 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(6,27,85,0.6)]">
        <div className="flex items-center justify-between">

          {/* ── Logo ── */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="VAGO Innovative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFB300] text-[#061B55] font-black shadow-[0_0_18px_rgba(255,179,0,0.5)] group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 fill-[#061B55] stroke-[#061B55]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-wider text-white">
                VA-GO
              </span>
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-[#FFB300]">
                Innovative
              </span>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-white/75">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative hover:text-[#FFB300] transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-[#FFB300] after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA + Mobile toggle ── */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#FFB300] px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-[#061B55] shadow-[0_4px_20px_rgba(255,179,0,0.4)] hover:brightness-110 hover:shadow-[0_6px_28px_rgba(255,179,0,0.55)] transition-all"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1 text-white/80 hover:text-[#FFB300] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#061B55]/95 p-6 backdrop-blur-2xl md:hidden"
        >
          <nav className="flex flex-col gap-4 font-sans text-base font-medium text-white/80">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="hover:text-[#FFB300] transition-colors py-1"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#FFB300] py-3 font-display text-sm font-bold text-[#061B55]"
            >
              Get Started
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
