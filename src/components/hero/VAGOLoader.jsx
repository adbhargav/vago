/**
 * VAGOLoader
 * Branded preloader shown while hero PNG assets download.
 * - Tracks loading state via HTMLImageElement.complete
 * - Fades out with a smooth opacity transition once all images are ready
 * - Driven by a requestAnimationFrame poll (avoids React re-render spam)
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroAssets from "./assets";
import { Zap } from "lucide-react";

// All above-fold hero images that must load before we show the scene
const CRITICAL_SRCS = [
  heroAssets.vendingMachine,
  heroAssets.cheetos,
  heroAssets.snickers,
  heroAssets.cocaCola,
  heroAssets.doritos,
  heroAssets.oreo,
  heroAssets.lays,
  heroAssets.paymentPhone,
];

function useAssetsLoaded(srcs) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let done = 0;
    const total = srcs.length;

    const imgs = srcs.map((src) => {
      const img = new Image();
      img.src = src;
      const onDone = () => {
        done += 1;
        setProgress(Math.round((done / total) * 100));
        if (done === total) setLoaded(true);
      };
      img.onload  = onDone;
      img.onerror = onDone; // don't block on broken images
      // Already cached
      if (img.complete) onDone();
      return img;
    });

    return () => {
      imgs.forEach((img) => {
        img.onload  = null;
        img.onerror = null;
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { loaded, progress };
}

export default function VAGOLoader({ children }) {
  const { loaded, progress } = useAssetsLoaded(CRITICAL_SRCS);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="vago-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#061B55]"
            aria-label="Loading VA-GO experience"
            role="status"
          >
            {/* Outer glow pulse */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(255,179,0,0.18) 0%, transparent 70%)" }}
            />

            {/* Logo mark */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="vago-loader-logo relative">
                {/* Ring spinner */}
                <svg
                  className="vago-loader-ring absolute inset-[-16px]"
                  viewBox="0 0 96 96"
                  width={96}
                  height={96}
                  fill="none"
                >
                  <circle
                    cx="48" cy="48" r="44"
                    stroke="rgba(255,179,0,0.15)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="48" cy="48" r="44"
                    stroke="#FFB300"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="276"
                    strokeDashoffset={276 - (276 * progress) / 100}
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                  />
                </svg>

                {/* Icon center */}
                <div className="h-14 w-14 rounded-2xl bg-[#FFB300] flex items-center justify-center shadow-[0_0_32px_rgba(255,179,0,0.55)]">
                  <Zap className="h-7 w-7 fill-[#061B55] stroke-[#061B55]" />
                </div>
              </div>

              {/* Brand name */}
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-display text-2xl font-extrabold tracking-wider text-white">
                  VA-GO
                </span>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#FFB300]">
                  Innovative
                </span>
              </div>

              {/* Progress percentage */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-display text-[13px] font-bold text-[#FFB300]">
                  {progress}%
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-white/35">
                  Loading experience…
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render children immediately (hidden behind loader) so images start preloading */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
