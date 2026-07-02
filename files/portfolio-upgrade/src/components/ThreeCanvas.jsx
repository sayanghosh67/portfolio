import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { scrollState, mouseState } from '../lib/scrollState';

function MorphingShape() {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth-follow the pointer (parallax) — this is the "depth" cue that
    // sells the 4D feeling: the object appears to live behind the UI plane.
    mouseState.x += (mouseState.targetX - mouseState.x) * 0.05;
    mouseState.y += (mouseState.targetY - mouseState.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.position.x = mouseState.x * 0.8;
      groupRef.current.position.y = -mouseState.y * 0.5;
      // scroll pushes the shape back in Z and spins it faster the deeper you go
      groupRef.current.position.z = -scrollState.progress * 6;
      groupRef.current.rotation.z = scrollState.progress * Math.PI;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15 + scrollState.progress * 2;
      meshRef.current.rotation.y = t * 0.22;
      meshRef.current.material.distort =
        0.25 + Math.sin(t * 0.5) * 0.1 + scrollState.progress * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 4]} />
          <MeshDistortMaterial
            color="#111111"
            emissive="#ff0000"
            emissiveIntensity={0.25}
            roughness={0.15}
            metalness={0.85}
            wireframe
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField({ count = 400 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x = scrollState.progress * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ff2222"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ff0000" />
        <Environment preset="city" />
        <MorphingShape />
        <ParticleField />
        <fog attach="fog" args={['#000000', 8, 18]} />
      </Canvas>
    </div>
  );
}
