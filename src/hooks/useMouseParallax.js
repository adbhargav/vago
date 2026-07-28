import { useRef, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * useMouseParallax
 * Tracks pointer position relative to a container element and exposes
 * smoothed, normalized (-0.5 to 0.5) x/y motion values via Framer Motion.
 *
 * Usage:
 *   const { ref, x, y } = useMouseParallax();
 *   <div ref={ref}> ... <motion.img style={{ x, y }} /> </div>
 */
export function useMouseParallax({ disabled = false, springConfig } = {}) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, springConfig ?? { stiffness: 60, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, springConfig ?? { stiffness: 60, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (disabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let frame = null;

    const handlePointerMove = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        rawX.set(nx);
        rawY.set(ny);
      });
    };

    const handlePointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    node.addEventListener("pointermove", handlePointerMove, { passive: true });
    node.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disabled, rawX, rawY]);

  return { ref, x, y };
}

export default useMouseParallax;
