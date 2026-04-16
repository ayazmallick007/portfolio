import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface HomeParticlesProps {
  deviceType: DeviceType;
}

const ParticleField: React.FC<{ count?: number; deviceType: DeviceType }> = ({ count = 500, deviceType }) => {
  const points = useRef<THREE.Points>(null);

  const { particleCount, particleSize, particleOpacity } = useMemo(() => {
    if (deviceType === 'mobile') {
      return { particleCount: Math.min(count * 0.2, 150), particleSize: 0.015, particleOpacity: 0.4 };
    }
    if (deviceType === 'tablet') {
      return { particleCount: Math.min(count * 0.4, 250), particleSize: 0.025, particleOpacity: 0.5 };
    }
    return { particleCount: Math.min(count, 500), particleSize: 0.035, particleOpacity: 0.6 };
  }, [deviceType, count]);

  const sphere = useMemo(
    () => random.inSphere(new Float32Array(particleCount * 3), { radius: 15 }),
    [particleCount]
  );

  useFrame((_, delta) => {
    if (!points.current) return;
    const speed = deviceType === 'mobile' ? 0.05 : deviceType === 'tablet' ? 0.08 : 0.12;
    points.current.rotation.x += delta * speed;
    points.current.rotation.y += delta * (speed * 1.5);
  });

  return (
    <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#64ffda"
        size={particleSize}
        sizeAttenuation
        depthWrite={false}
        opacity={particleOpacity}
      />
    </Points>
  );
};

const HomeParticles: React.FC<HomeParticlesProps> = ({ deviceType }) => (
  <Canvas camera={{ position: [0, 0, 1], fov: 75 }} performance={{ min: 0.5 }}>
    <ParticleField deviceType={deviceType} />
  </Canvas>
);

export default React.memo(HomeParticles);
