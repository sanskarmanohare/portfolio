"use client";

import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useSpring(useMotionValue(-200), { stiffness: 500, damping: 45 });
  const y = useSpring(useMotionValue(-200), { stiffness: 500, damping: 45 });
  useEffect(() => {
    const move = (event: MouseEvent) => { x.set(event.clientX); y.set(event.clientY); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.documentElement.removeEventListener("mouseleave", leave); };
  }, [x, y]);
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y, opacity: visible ? 1 : 0 }} />
      <motion.div className="cursor-glow" style={{ x, y, opacity: visible ? 1 : 0 }} />
    </>
  );
}

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="aurora aurora--one" /><div className="aurora aurora--two" />
      <div className="grid-plane" /><div className="noise" />
    </div>
  );
}
