import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { useRef } from 'react';

function FloatingShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshPhysicalMaterial
          color="#111111"
          emissive="#ff0000"
          emissiveIntensity={0.4}
          roughness={0}
          metalness={1}
          transmission={1}
          thickness={1}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ff0000" />
        <pointLight position={[0, 0, 5]} intensity={3} distance={20} color="#ff3333" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#ff0000" />
        <Environment preset="city" />
        <FloatingShape />
      </Canvas>
    </div>
  );
}
