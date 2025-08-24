import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

// Safe loading indicator
function LoadingFallback() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000814',
      color: '#FFD700',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '20px',
    }}>
      Loading ZANGA 3D...
    </div>
  );
}

export function Zanga3DText() {
  const textRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={textRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
        <Text3D
          // Use hosted font — no local dependency
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.12}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={5}
          letterSpacing={-0.08}
          // Add centering
          position={[0, -0.2, 0]}
        >
          ZANGA-LABEL WEARS
          {/* Use standard material — no matcap needed */}
          <meshStandardMaterial
            color="#FFD700"     // Gold
            metalness={0.9}
            roughness={0.3}
            emissive="#B8860B"
            emissiveIntensity={0.3}
          />
        </Text3D>
      </Float>
    </group>
  );
}

// Safe canvas wrapper
export function Zanga3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 25 }}
      style={{ background: '#000814' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#00BFFF" />
      <Suspense fallback={<LoadingFallback />}>
        <Zanga3DText />
      </Suspense>
    </Canvas>
  );
}