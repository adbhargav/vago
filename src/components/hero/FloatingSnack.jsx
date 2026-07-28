import { motion, useTransform, useMotionValue } from "framer-motion";
/**
 * FloatingSnack
 * A single floating layer in the vending machine 3D scene:
 * - Entrance reveal animation
 * - Ambient floating/rotation loop
 * - Mouse parallax offsets
 * - Scroll explosion/dispersion transformation matching coffee design
 */
export default function FloatingSnack({
  image,
  alt = "",
  className = "",
  depth = 1,
  delay = 0,
  duration = 5,
  parallaxStrength = 10,
  floatDistance = 10,
  rotation = 0,
  parallaxX,
  parallaxY,
  scrollYProgress,
  scrollX = 0,
  scrollY = 0,
  scrollRotate = 0,
  scrollScale = 1,
  reduceMotion = false,
  children,
}) {
  const fallbackMotion = useMotionValue(0);
  const activeScrollProgress = scrollYProgress || fallbackMotion;

  const px = useTransform(parallaxX || fallbackMotion, (v) => (reduceMotion ? 0 : v * parallaxStrength));
  const py = useTransform(parallaxY || fallbackMotion, (v) => (reduceMotion ? 0 : v * parallaxStrength));

  const sX = useTransform(activeScrollProgress, [0, 1], [0, reduceMotion ? 0 : scrollX]);
  const sY = useTransform(activeScrollProgress, [0, 1], [0, reduceMotion ? 0 : scrollY]);
  const sRotate = useTransform(activeScrollProgress, [0, 1], [0, reduceMotion ? 0 : scrollRotate]);
  const sScale = useTransform(activeScrollProgress, [0, 1], [1, reduceMotion ? 1 : scrollScale]);

  const totalX = useTransform([px, sX], ([mx, sx]) => mx + sx);
  const totalY = useTransform([py, sY], ([my, sy]) => my + sy);

  return (
    <motion.div
      className={`absolute select-none pointer-events-none transform-gpu will-change-transform ${className}`}

      style={{
        x: totalX,
        y: totalY,
        rotate: sRotate,
        scale: sScale,
        zIndex: Math.round(depth * 10),
      }}
      initial={{ opacity: 0, scale: 0.8, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -floatDistance, 0],
                rotate: rotation ? [0, rotation, 0] : 0,
              }
        }
        transition={{
          duration,
          delay: delay + 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="drop-shadow-[0_22px_45px_rgba(0,0,0,0.65)]"
      >
        {image ? (
          <img
            src={image}
            alt={alt}
            draggable={false}
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        ) : (
          children
        )}
      </motion.div>
    </motion.div>
  );
}

