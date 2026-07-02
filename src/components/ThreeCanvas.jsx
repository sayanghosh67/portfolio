import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Sparkles, PerformanceMonitor } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────
   GLOBAL SCROLL + MOUSE STATE
   A single lightweight store every 3D object reads from, so we
   don't spam React state and can stay at 60fps.
   ────────────────────────────────────────────────────────────── */
export const scrollState = { progress: 0, velocity: 0 };
export const mouseState = { x: 0, y: 0, tx: 0, ty: 0 };
export const animProps = {
  camZ: 11,
  camY: 0,
  crystalOpacity: 1,
  particleMorph: 0
};

function useGlobalListeners() {
  useEffect(() => {
    // Mouse tracking
    const onMove = (e) => {
      mouseState.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // GSAP Master Timeline linked to Scroll Track
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          scrollState.velocity = self.getVelocity() / 1000;
        }
      }
    });

    const step = 1 / 8;

    // 0.0 -> 0.12 (Hero -> About)
    // Zoom aggressively into the crystal
    tl.to(animProps, { camZ: 3, camY: -0.5, crystalOpacity: 0.1, duration: step, ease: 'power2.inOut' }, 0);

    // 0.12 -> 0.24 (About -> Experience)
    // Pull back and shift down
    tl.to(animProps, { camZ: 8, camY: -3, crystalOpacity: 0, duration: step, ease: 'power3.inOut' }, step);

    // 0.24 -> 0.36 (Experience -> Skills)
    // Move up to look at the orbit rings
    tl.to(animProps, { camZ: 14, camY: 2, duration: step, ease: 'power2.inOut' }, step * 2);

    // 0.36 -> 0.48 (Skills -> Projects)
    // Fly THROUGH the orbit rings
    tl.to(animProps, { camZ: -2, camY: 0, duration: step, ease: 'power4.inOut' }, step * 3);

    // 0.48 -> 0.60 (Projects -> Showcase)
    // Drift to the glass shards field
    tl.to(animProps, { camZ: 6, camY: -2, duration: step, ease: 'power2.inOut' }, step * 4);

    // 0.60 -> 0.72 (Showcase -> Testimonials)
    // Pan up
    tl.to(animProps, { camZ: 9, camY: 4, duration: step, ease: 'power2.inOut' }, step * 5);

    // 0.72 -> 1.0 (Testimonials -> Contact)
    // Pull way back for a grand finale overview
    tl.to(animProps, { camZ: 25, camY: 0, particleMorph: 1, duration: step * 2, ease: 'power3.out' }, step * 6);

    return () => {
      window.removeEventListener('mousemove', onMove);
      tl.kill();
    };
  }, []);
}

/* ──────────────────────────────────────────────────────────────
   CAMERA RIG — gentle cinematic drift driven by scroll + mouse
   ────────────────────────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    mouseState.x += (mouseState.tx - mouseState.x) * 0.04;
    mouseState.y += (mouseState.ty - mouseState.y) * 0.04;

    const p = scrollState.progress;
    // Combine mouse parallax with GSAP timeline values
    const targetX = mouseState.x * 1.1;
    const targetY = mouseState.y * 0.7 + animProps.camY;
    const targetZ = animProps.camZ;

    camera.position.x += (targetX - camera.position.x) * 0.035;
    camera.position.y += (targetY - camera.position.y) * 0.035;
    camera.position.z += (targetZ - camera.position.z) * 0.035;
    camera.rotation.z += (mouseState.x * 0.04 - camera.rotation.z) * 0.03;
    camera.lookAt(0, animProps.camY + p * 1.2, 0);
  });
  return null;
}

/* ──────────────────────────────────────────────────────────────
   HERO CENTERPIECE — crystalline glass icosahedron core
   ────────────────────────────────────────────────────────────── */
function CrystalCore() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12 + mouseState.y * 0.15;
      meshRef.current.rotation.y = t * 0.18 + mouseState.x * 0.15;
      const s = 1 - scrollState.progress * 0.35;
      meshRef.current.scale.setScalar(Math.max(s, 0.55));
      // Read opacity directly from the GSAP animated property
      if (meshRef.current.material) {
        meshRef.current.material.opacity = animProps.crystalOpacity;
      }
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.2;
      innerRef.current.rotation.y = t * 0.25;
      if (innerRef.current.material) {
        innerRef.current.material.opacity = animProps.crystalOpacity * 0.18;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.4}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.6, 1]} />
          <meshPhysicalMaterial
            color="#0a0a0a"
            emissive="#ff0000"
            emissiveIntensity={0.35}
            roughness={0.05}
            metalness={0.9}
            transmission={0.92}
            thickness={1.4}
            clearcoat={1}
            clearcoatRoughness={0.05}
            ior={1.5}
            envMapIntensity={1.6}
            transparent
            opacity={1}
          />
        </mesh>
        {/* Inner wireframe shell for tech-y depth */}
        <mesh ref={innerRef} scale={1.35}>
          <icosahedronGeometry args={[2.6, 0]} />
          <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────
   ORBITING TECH RINGS
   ────────────────────────────────────────────────────────────── */
function OrbitRing({ radius, tilt, speed, color, thickness = 0.015, opacity = 0.5 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.z = t * speed;
      ref.current.rotation.x = tilt + mouseState.y * 0.1;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function OrbitRings() {
  return (
    <group>
      <OrbitRing radius={4.4} tilt={Math.PI / 2.3} speed={0.12} color="#ff0000" opacity={0.55} />
      <OrbitRing radius={5.3} tilt={Math.PI / 1.6} speed={-0.09} color="#ffffff" thickness={0.008} opacity={0.25} />
      <OrbitRing radius={6.3} tilt={Math.PI / 3.1} speed={0.07} color="#00ffff" thickness={0.01} opacity={0.3} />
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────
   FLOATING NODES ON THE ORBIT RINGS
   ────────────────────────────────────────────────────────────── */
function OrbitNode({ radius, speed, yOff, size, color }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        yOff + Math.sin(t * 1.3) * 0.4,
        Math.sin(t) * radius
      );
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </mesh>
  );
}

function OrbitNodes() {
  const nodes = useMemo(
    () => [
      { radius: 4.4, speed: 0.35, yOff: 0.5, size: 0.09, color: '#ff0000' },
      { radius: 4.4, speed: -0.28, yOff: -0.8, size: 0.07, color: '#ffffff' },
      { radius: 5.3, speed: 0.22, yOff: 1.2, size: 0.06, color: '#00ffff' },
      { radius: 5.3, speed: -0.4, yOff: -0.3, size: 0.08, color: '#ff0000' },
      { radius: 6.3, speed: 0.18, yOff: 0.2, size: 0.05, color: '#ffffff' },
      { radius: 6.3, speed: -0.15, yOff: -1.1, size: 0.07, color: '#ff0000' },
    ],
    []
  );
  return (
    <>
      {nodes.map((n, i) => (
        <OrbitNode key={i} {...n} />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   FLOATING GLASS SHARDS
   ────────────────────────────────────────────────────────────── */
function GlassShard({ position, rotationSpeed, scale, geometry }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * rotationSpeed[0];
      ref.current.rotation.y = t * rotationSpeed[1];
      ref.current.position.y =
        position[1] + Math.sin(t * 0.4 + position[0]) * 0.5 - scrollState.progress * 2.4;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshPhysicalMaterial
          color="#050505"
          roughness={0.1}
          metalness={0.3}
          transmission={0.85}
          thickness={0.6}
          clearcoat={1}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

function GlassShards() {
  const shards = useMemo(
    () => [
      { position: [-6.5, 2.5, -3], rotationSpeed: [0.1, 0.15], scale: 0.9, geometry: <octahedronGeometry args={[1, 0]} /> },
      { position: [6.8, -1.5, -2], rotationSpeed: [0.08, -0.12], scale: 1.1, geometry: <boxGeometry args={[1.1, 1.1, 1.1]} /> },
      { position: [-5.5, -3, -4], rotationSpeed: [-0.1, 0.1], scale: 0.7, geometry: <tetrahedronGeometry args={[1, 0]} /> },
      { position: [5.5, 3.5, -5], rotationSpeed: [0.06, 0.09], scale: 0.8, geometry: <dodecahedronGeometry args={[0.9, 0]} /> },
      { position: [0, -5, -6], rotationSpeed: [0.05, -0.07], scale: 1.3, geometry: <icosahedronGeometry args={[0.9, 0]} /> },
      { position: [-8, 0.5, -7], rotationSpeed: [0.07, 0.11], scale: 0.6, geometry: <octahedronGeometry args={[0.8, 0]} /> },
    ],
    []
  );
  return (
    <>
      {shards.map((s, i) => (
        <GlassShard key={i} {...s} />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   WIREFRAME POLYHEDRONS
   ────────────────────────────────────────────────────────────── */
function WireframeObject({ position, scale, speed, color, geometry }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * speed;
      ref.current.rotation.y = t * speed * 0.7;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function WireframeField() {
  const items = useMemo(
    () => [
      { position: [8, 2, -8], scale: 1.4, speed: 0.05, color: '#ff0000', geometry: <icosahedronGeometry args={[1, 0]} /> },
      { position: [-9, -2, -9], scale: 1.8, speed: -0.04, color: '#ffffff', geometry: <dodecahedronGeometry args={[1, 0]} /> },
      { position: [3, -6, -10], scale: 1.2, speed: 0.06, color: '#00ffff', geometry: <octahedronGeometry args={[1, 0]} /> },
      { position: [-4, 6, -10], scale: 1.5, speed: -0.05, color: '#ff0000', geometry: <icosahedronGeometry args={[1, 1]} /> },
    ],
    []
  );
  return (
    <>
      {items.map((it, i) => (
        <WireframeObject key={i} {...it} />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   PARTICLE UNIVERSE — instanced starfield / data-points
   ────────────────────────────────────────────────────────────── */
function ParticleField({ count = 700 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = t * 0.012 + scrollState.progress * 0.6;
      pointsRef.current.rotation.x = mouseState.y * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────
   ENERGY STREAM LINES — hand-rolled trail (ring buffer of
   points -> fading line) using only core three.js primitives.
   ────────────────────────────────────────────────────────────── */
function EnergyStream({ radius, speed, color, yTilt, trailLength = 28 }) {
  const headRef = useRef();
  const lineRef = useRef();
  const positionsRef = useRef(new Float32Array(trailLength * 3));
  const geomRef = useRef();

  useMemo(() => {
    const arr = positionsRef.current;
    for (let i = 0; i < trailLength; i++) {
      arr[i * 3] = radius;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = 0;
    }
  }, [radius, trailLength]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t * 1.7) * yTilt;
    const z = Math.sin(t) * radius;

    if (headRef.current) headRef.current.position.set(x, y, z);

    const arr = positionsRef.current;
    arr.copyWithin(3, 0, arr.length - 3);
    arr[0] = x;
    arr[1] = y;
    arr[2] = z;

    if (geomRef.current) {
      geomRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={headRef}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <line ref={lineRef}>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute attach="attributes-position" args={[positionsRef.current, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.45} toneMapped={false} />
      </line>
    </group>
  );
}

function EnergyStreams() {
  return (
    <>
      <EnergyStream radius={3.6} speed={0.5} color="#ff0000" yTilt={2.2} />
      <EnergyStream radius={4.8} speed={-0.38} color="#00ffff" yTilt={1.6} />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   LIGHTING RIG — volumetric-feeling multi-light setup
   ────────────────────────────────────────────────────────────── */
function Lighting() {
  const lightRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.3) * 8;
      lightRef.current.position.z = Math.cos(t * 0.3) * 8;
    }
  });
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight ref={lightRef} position={[0, 0, 6]} intensity={4} distance={25} color="#ff0000" />
      <pointLight position={[-6, -4, -4]} intensity={1.5} color="#ff0000" />
      <pointLight position={[6, 4, -6]} intensity={1} color="#00ffff" />
      <spotLight position={[0, 12, 4]} angle={0.5} penumbra={1} intensity={1.2} color="#ffffff" />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE — assembled, with perf-aware density
   ────────────────────────────────────────────────────────────── */
function Scene({ reduced }) {
  return (
    <>
      <CameraRig />
      <Lighting />
      <Environment preset="city" />
      <CrystalCore />
      <OrbitRings />
      <OrbitNodes />
      {!reduced && <GlassShards />}
      {!reduced && <WireframeField />}
      <ParticleField count={reduced ? 280 : 700} />
      {!reduced && <EnergyStreams />}
      {!reduced && (
        <Sparkles count={60} scale={14} size={2} speed={0.3} color="#ff0000" opacity={0.5} />
      )}
      {!reduced && (
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom
            luminanceThreshold={0.4}
            mipmapBlur
            intensity={0.8}
            radius={0.6}
          />
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.15}
            bokehScale={4}
          />
        </EffectComposer>
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   ROOT EXPORT
   ────────────────────────────────────────────────────────────── */
export default function ThreeCanvas() {
  useGlobalListeners();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const isSmall = window.innerWidth < 768;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isLowMem = navigator.deviceMemory && navigator.deviceMemory <= 4;
    setReduced(Boolean(isSmall || prefersReduced || isLowMem));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        frameloop="always"
        dpr={[1, reduced ? 1.2 : 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 11], fov: 50 }}
      >
        <PerformanceMonitor onDecline={() => setReduced(true)} />
        <fog attach="fog" args={['#000000', 14, 34]} />
        <Scene reduced={reduced} />
      </Canvas>
      {/* Subtle vignette so the 3D scene reads as backdrop, not noise */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}
