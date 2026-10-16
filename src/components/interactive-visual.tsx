"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { type PointerEvent, type ReactNode } from "react";

export function InteractiveVisual({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 130, damping: 22 });
  const rotateY = useSpring(y, { stiffness: 130, damping: 22 });
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }
  return (
    <div
      className="visual-perspective"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div
        className="visual-tilt"
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
