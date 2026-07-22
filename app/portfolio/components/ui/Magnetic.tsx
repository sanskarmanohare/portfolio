"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onMouseMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - box.left - box.width / 2) * 0.18);
        y.set((event.clientY - box.top - box.height / 2) * 0.18);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
