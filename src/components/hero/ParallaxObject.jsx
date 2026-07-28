import { motion, useTransform } from "framer-motion";

/**
 * ParallaxObject
 * A CSS-perspective 3D wrapper for a single hero object (primarily the
 * vending machine). Translates on x/y and subtly rotates on X/Y axes based
 * on shared pointer motion values, giving a "floating in space" feel
 * without any WebGL.
 */
export default function ParallaxObject({
  parallaxX,
  parallaxY,
  translateStrength = 14,
  rotateStrength = 6,
  reduceMotion = false,
  className = "",
  children,
}) {
  const x = useTransform(parallaxX, (v) => (reduceMotion ? 0 : v * translateStrength));
  const y = useTransform(parallaxY, (v) => (reduceMotion ? 0 : v * translateStrength));
  const rotateY = useTransform(parallaxX, (v) => (reduceMotion ? 0 : v * rotateStrength));
  const rotateX = useTransform(parallaxY, (v) => (reduceMotion ? 0 : v * -rotateStrength));

  return (
    <motion.div
      className={className}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
    >
      {children}
    </motion.div>
  );
}
