"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Sparkles } from "@react-three/drei";
import { useTranslations } from "next-intl";
import * as THREE from "three";
import { useTheme } from "../theme-provider";

const nodes = [
  { id: "hub", position: [0, 0, 0.18] as [number, number, number], scale: 0.18 },
  { id: "north", position: [-1.25, 0.82, -0.18] as [number, number, number], scale: 0.1 },
  { id: "coast", position: [1.18, 0.88, 0.14] as [number, number, number], scale: 0.115 },
  { id: "grid", position: [-1.62, -1.05, -0.26] as [number, number, number], scale: 0.09 },
  { id: "hotel", position: [0.78, -1.28, 0.24] as [number, number, number], scale: 0.13 },
  { id: "transit", position: [-0.18, -1.92, -0.08] as [number, number, number], scale: 0.085 },
] as const;

const links = [
  ["hub", "north"],
  ["hub", "coast"],
  ["hub", "grid"],
  ["hub", "hotel"],
  ["hub", "transit"],
  ["north", "coast"],
  ["grid", "transit"],
  ["transit", "hotel"],
] as const;

function getNode(id: string) {
  return nodes.find((node) => node.id === id)!;
}

function NetworkNode({
  position,
  scale,
  emphasized = false,
}: {
  position: [number, number, number];
  scale: number;
  emphasized?: boolean;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[scale * 2.9, 24, 24]} />
        <meshBasicMaterial
          color={new THREE.Color("#a5a283")}
          transparent
          opacity={emphasized ? 0.16 : 0.11}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[scale, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color("#dcd6af")}
          emissive={new THREE.Color("#a5a283")}
          emissiveIntensity={emphasized ? 0.95 : 0.52}
          roughness={0.16}
          metalness={0.1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[scale * 0.34, 20, 20]} />
        <meshBasicMaterial color={new THREE.Color("#fffef4")} />
      </mesh>
    </group>
  );
}

function DarkNetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const linePoints = useMemo(
    () =>
      links.map(([from, to]) => [
        new THREE.Vector3(...getNode(from).position),
        new THREE.Vector3(...getNode(to).position),
      ]),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.18) * 0.04 - 0.04;
    groupRef.current.position.y = 0.18 + Math.sin(t * 0.52) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.52} />
      <pointLight position={[0, 0, 3.4]} intensity={9.5} color="#f3eed2" />
      <pointLight position={[-2.8, 1.5, 2.7]} intensity={3.2} color="#a5a283" />
      <pointLight position={[2.5, -1.6, 2.4]} intensity={2.8} color="#d7d1a5" />
      <pointLight position={[0, 2.6, 2.2]} intensity={1.8} color="#fff8dc" />
      <Sparkles
        count={34}
        scale={[6, 4.5, 4.2]}
        size={2.2}
        speed={0.28}
        opacity={0.55}
        noise={1.15}
        color="#d9d3a8"
      />

      <group ref={groupRef} scale={0.72}>
        {linePoints.map((points, index) => (
          <Line
            key={index}
            points={points}
            color="#b8b28a"
            lineWidth={1.2}
            transparent
            opacity={0.72}
          />
        ))}

        {nodes.map((node) => (
          <NetworkNode
            key={node.id}
            position={node.position}
            scale={node.scale}
            emphasized={node.id === "hub"}
          />
        ))}
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI - 0.35}
        rotateSpeed={0.8}
        enableDamping
        dampingFactor={0.09}
      />
    </>
  );
}

function DarkNetworkIllustration({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(var(--accent-soft-rgb)/0.18),transparent_20%),radial-gradient(circle_at_78%_26%,rgb(var(--accent-rgb)/0.14),transparent_22%),radial-gradient(circle_at_50%_74%,rgb(var(--accent-soft-rgb)/0.08),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[rgb(var(--muted-rgb))]">
            {primaryLabel}
          </div>
          <div className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[rgb(var(--secondary-rgb))]">
            {secondaryLabel}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[450px] flex-1 items-center justify-center">
          <div className="h-[84%] w-[92%] sm:h-[86%] sm:w-[90%]">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0.05, 5.8], fov: 30 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <DarkNetworkScene />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
}

function SunnyOrganicScene() {
  const groupRef = useRef<THREE.Group>(null);
  const linePoints = useMemo(
    () =>
      links.map(([from, to]) => [
        new THREE.Vector3(...getNode(from).position),
        new THREE.Vector3(...getNode(to).position),
      ]),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.18) * 0.04 - 0.04;
    groupRef.current.position.y = 0.18 + Math.sin(t * 0.52) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.82} />
      <pointLight position={[0, 0, 3.4]} intensity={8.2} color="#fff8ea" />
      <pointLight position={[-2.8, 1.5, 2.7]} intensity={2.8} color="#58562d" />
      <pointLight position={[2.5, -1.6, 2.4]} intensity={2.2} color="#452821" />
      <pointLight position={[0, 2.6, 2.2]} intensity={1.4} color="#f4edde" />
      <Sparkles
        count={34}
        scale={[6, 4.5, 4.2]}
        size={1.8}
        speed={0.2}
        opacity={0.28}
        noise={1}
        color="#000000"
      />

      <group ref={groupRef} scale={0.72}>
        {linePoints.map((points, index) => (
          <Line
            key={index}
            points={points}
            color="#58562d"
            lineWidth={1.2}
            transparent
            opacity={0.72}
          />
        ))}

        {nodes.map((node) => (
          <group key={node.id} position={node.position}>
            <mesh>
              <sphereGeometry args={[node.scale * 2.9, 24, 24]} />
              <meshBasicMaterial
                color={new THREE.Color("#58562d")}
                transparent
                opacity={node.id === "hub" ? 0.12 : 0.08}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[node.scale, 32, 32]} />
              <meshStandardMaterial
                color={new THREE.Color(node.id === "hub" ? "#452821" : "#58562d")}
                emissive={new THREE.Color("#58562d")}
                emissiveIntensity={node.id === "hub" ? 0.38 : 0.18}
                roughness={0.22}
                metalness={0.06}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[node.scale * 0.34, 20, 20]} />
              <meshBasicMaterial color={new THREE.Color("#f4efdf")} />
            </mesh>
          </group>
        ))}
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI - 0.35}
        rotateSpeed={0.8}
        enableDamping
        dampingFactor={0.09}
      />
    </>
  );
}

function SunnyOrganicIllustration({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <>
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/0.38)] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[rgb(var(--secondary-rgb))]">
            {primaryLabel}
          </div>
          <div className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/0.38)] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[rgb(var(--secondary-rgb))]">
            {secondaryLabel}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[470px] flex-1 items-center justify-center">
          <div className="h-[80%] w-[90%]">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0.02, 5.6], fov: 28 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <SunnyOrganicScene />
            </Canvas>
          </div>
        </div>

      </div>
    </>
  );
}

export function HeroScene() {
  const tHero = useTranslations("hero");
  const { resolvedTheme } = useTheme();
  const isSunny = resolvedTheme === "sunny";

  return (
    <div
      className={[
        "premium-card section-glow relative mx-auto block h-[300px] w-full max-w-[620px] overflow-hidden rounded-[32px] p-6 sm:h-[320px] sm:p-7 md:h-[350px] lg:h-[390px] lg:max-w-[700px] lg:p-8",
        isSunny ? "bg-[rgb(var(--bg-rgb))]" : "",
      ].join(" ")}
    >
      {isSunny ? (
        <SunnyOrganicIllustration
          primaryLabel={tHero("sunnyPrimary")}
          secondaryLabel={tHero("sunnySecondary")}
        />
      ) : (
        <DarkNetworkIllustration
          primaryLabel={tHero("syncPrimary")}
          secondaryLabel={tHero("syncSecondary")}
        />
      )}
    </div>
  );
}
