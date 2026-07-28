import { motion, useTransform } from "framer-motion";
import { useMotionValue } from "framer-motion";

/**
 * FloatingSnack — Premium version
 * - Staggered slide-in entrance (scale + fade + Y rise)
 * - Organic sinusoidal float loop (Y + subtle rotation)
 * - Smooth mouse parallax depth shift (GPU only)
 * - Zero scroll explosion — feels like real product sites
 * - All transforms on compositor thread only
 */
export default function FloatingSnack({
  image,
  alt = "",
  className = "",
  depth = 1,
  delay = 0,
  floatY = 12,
  floatDuration = 4.5,
  rotateAmount = 0,
  parallaxStrength = 10,
  parallaxX,
  parallaxY,
  reduceMotion = false,
  initialRotate = 0,
}) {
  const fallback = useMotionValue(0);

  const px = useTransform(
    parallaxX || fallback,
    (v) => (reduceMotion ? 0 : v * parallaxStrength)
  );
  const py = useTransform(
    parallaxY || fallback,
    (v) => (reduceMotion ? 0 : v * parallaxStrength * 0.6)
  );

  return (
    <motion.div
      className={`absolute select-none pointer-events-none ${className}`}
      style={{
        x: px,
        y: py,
        zIndex: Math.round(depth * 10),
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0.72, y: 32, rotate: initialRotate - 8 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: initialRotate }}
      transition={{
        delay,
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Organic float loop — runs independently of scroll/mouse */}
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -floatY, 0],
                rotate: rotateAmount
                  ? [initialRotate, initialRotate + rotateAmount, initialRotate]
                  : initialRotate,
              }
        }
        transition={{
          duration: floatDuration,
          delay: delay + 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
        style={{ willChange: "transform" }}
      >
        <img
          src={image}
          alt={alt}
          draggable={false}
          className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
        />
      </motion.div>
    </motion.div>
  );
}
