"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useTheme } from "../theme-provider";

function EarthScene({ sunny }: { sunny: boolean }) {
  const groupRef = useRef<any>(null);
  const earthRef = useRef<any>(null);
  const colorMap = useTexture("/textures/planets/earth_atmos_2048.jpg");

  const atmosphereColor = sunny ? "#8fddff" : "#5b94ff";

  useMemo(() => {
    colorMap.colorSpace = "srgb";
  }, [colorMap]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = -0.41;
      groupRef.current.rotation.y += delta * 0.04;
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={sunny ? 0.95 : 0.58} />
      <hemisphereLight
        color={sunny ? "#eefaff" : "#9abfff"}
        groundColor={sunny ? "#5d839b" : "#0c1420"}
        intensity={sunny ? 1.1 : 0.85}
      />
      <directionalLight
        position={[5.5, 2.4, 4]}
        intensity={sunny ? 3.6 : 2.9}
        color={sunny ? "#fff8db" : "#d6e7ff"}
      />
      <pointLight
        position={[-4, 1.7, 2.8]}
        intensity={sunny ? 0.8 : 1.15}
        color={sunny ? "#bdeaff" : "#78a7ff"}
      />

      <group ref={groupRef} position={[0.08, -0.01, 0]} scale={0.86}>
        <mesh ref={earthRef}>
          <sphereGeometry args={[1.58, 96, 96]} />
          <meshStandardMaterial
            map={colorMap}
            color={sunny ? "#ffffff" : "#c8daf7"}
            emissive={sunny ? "#06131d" : "#102138"}
            emissiveIntensity={sunny ? 0.02 : 0.08}
            roughness={0.92}
            metalness={0.02}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[1.7, 64, 64]} />
          <meshBasicMaterial color={atmosphereColor} transparent opacity={sunny ? 0.1 : 0.14} />
        </mesh>
      </group>
    </>
  );
}

export function HeroScene() {
  const { resolvedTheme } = useTheme();
  const sunny = resolvedTheme === "sunny";

  return (
    <div className="glass-panel gold-ring relative mx-auto block h-[320px] w-full max-w-[520px] overflow-hidden rounded-[30px] border border-[rgb(var(--accent-rgb)/0.14)] shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:h-[340px] md:h-[370px] lg:h-[430px] lg:max-w-[620px]">
      <div
        className={[
          "absolute inset-0",
          sunny
            ? "bg-[radial-gradient(circle_at_76%_20%,rgba(255,244,190,0.38),transparent_12%),linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,250,255,0.98)_45%,rgba(224,239,248,0.98)_100%)]"
            : "bg-[radial-gradient(circle_at_72%_22%,rgba(107,160,255,0.2),transparent_20%),linear-gradient(180deg,rgba(8,13,24,0.98)_0%,rgba(5,8,15,0.98)_100%)]",
        ].join(" ")}
      />
      {sunny ? (
        <div className="absolute right-8 top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,248,220,0.98)_0%,rgba(255,243,190,0.46)_38%,rgba(255,243,190,0)_72%)] blur-md sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
      ) : null}
      {!sunny ? (
        <>
          <span className="absolute left-[12%] top-[16%] h-1 w-1 rounded-full bg-white/70" />
          <span className="absolute left-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="absolute right-[24%] top-[18%] h-1 w-1 rounded-full bg-white/75" />
          <span className="absolute right-[18%] top-[34%] h-1.5 w-1.5 rounded-full bg-white/65" />
          <span className="absolute left-[28%] bottom-[24%] h-1 w-1 rounded-full bg-white/60" />
        </>
      ) : null}

      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.7], fov: 30 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <EarthScene sunny={sunny} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.35}
              enableDamping
              dampingFactor={0.06}
              rotateSpeed={0.55}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 text-center text-[9px] uppercase tracking-[0.16em] text-[rgb(var(--fg-rgb)/0.68)] sm:inset-x-6 sm:bottom-6 sm:text-[10px] lg:inset-x-8 lg:bottom-8">
        <span className="rounded-full border border-[rgb(var(--accent-rgb)/0.12)] bg-[rgb(var(--surface-rgb)/0.42)] px-2 py-2 backdrop-blur-xl">
          Earth
        </span>
        <span className="rounded-full border border-[rgb(var(--accent-rgb)/0.12)] bg-[rgb(var(--surface-rgb)/0.42)] px-2 py-2 backdrop-blur-xl">
          Grid
        </span>
        <span className="rounded-full border border-[rgb(var(--accent-rgb)/0.12)] bg-[rgb(var(--surface-rgb)/0.42)] px-2 py-2 backdrop-blur-xl">
          Spatial
        </span>
      </div>
    </div>
  );
}
