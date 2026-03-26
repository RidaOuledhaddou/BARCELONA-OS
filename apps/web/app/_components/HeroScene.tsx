"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, Sphere, Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useRef } from "react";

function Globe({ sunny }: { sunny: boolean }) {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.00035) * 0.1;
    }
  });

  return (
    <Float rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.35, 64, 64]}>
        <meshStandardMaterial
          color={sunny ? "#f4ede0" : "#0f1720"}
          emissive={sunny ? "#e2a95f" : "#5c4512"}
          emissiveIntensity={sunny ? 0.6 : 0.45}
          metalness={0.7}
          roughness={0.28}
        />
      </Sphere>
      <Sphere args={[1.47, 48, 48]}>
        <meshStandardMaterial
          color={sunny ? "#f7d47d" : "#d4af37"}
          transparent
          opacity={0.08}
          wireframe
        />
      </Sphere>
      <Sparkles
        count={sunny ? 32 : 20}
        scale={4}
        size={sunny ? 6 : 4}
        speed={0.25}
        color={sunny ? "#e2725b" : "#d4af37"}
      />
    </Float>
  );
}

export function HeroScene() {
  const { resolvedTheme } = useTheme();
  const sunny = resolvedTheme === "sunny";

  return (
    <div className="glass-panel gold-ring relative hidden h-[420px] overflow-hidden rounded-[34px] border border-[rgb(var(--accent-rgb)/0.18)] md:block lg:h-[560px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.16),transparent_35%)]" />
      <Canvas camera={{ position: [0, 0, 4.6], fov: 42 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={sunny ? 1.8 : 0.8} />
        <directionalLight position={[3, 4, 2]} intensity={sunny ? 4 : 2.4} color="#f5d98b" />
        <pointLight position={[-4, -2, 2]} intensity={sunny ? 10 : 5} color="#e2725b" />
        <Globe sunny={sunny} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.35}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-10 bottom-10 flex items-center justify-between rounded-full border border-[rgb(var(--accent-rgb)/0.18)] bg-[rgb(var(--surface-rgb)/0.52)] px-5 py-3 text-xs uppercase tracking-[0.24em] text-[rgb(var(--fg-rgb)/0.72)] backdrop-blur-xl">
        <span>Earth Layer</span>
        <span>Barcelona Grid</span>
        <span>Premium Spatial Mode</span>
      </div>
    </div>
  );
}
