"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Points as ThreePoints, Mesh } from "three";

function seeded(index: number, offset: number) {
  const value = Math.sin((index + 1) * (12.9898 + offset * 31.73)) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleField() {
  const ref = useRef<ThreePoints>(null);
  const points = useMemo(() => {
    const data = new Float32Array(900 * 3);
    for (let i = 0; i < data.length; i += 3) {
      const r = 3 + seeded(i, 1) * 8;
      const a = seeded(i, 2) * Math.PI * 2;
      data[i] = Math.cos(a) * r;
      data[i + 1] = (seeded(i, 3) - 0.5) * 9;
      data[i + 2] = Math.sin(a) * r;
    }
    return data;
  }, []);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.025; });
  return <Points ref={ref} positions={points} stride={3}><PointMaterial transparent color="#8b5cf6" size={0.022} sizeAttenuation depthWrite={false} /></Points>;
}

function Core() {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.12;
    ref.current.position.x = state.pointer.x * 0.35 + 2.4;
    ref.current.position.y = state.pointer.y * 0.22;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={ref} position={[2.4, 0, -1]}>
        <icosahedronGeometry args={[2.15, 2]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.19} />
      </mesh>
      <mesh position={[2.4, 0, -1]} scale={0.65}>
        <icosahedronGeometry args={[2.15, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: false, alpha: true }}>
        <ParticleField /><Core />
      </Canvas>
    </div>
  );
}
