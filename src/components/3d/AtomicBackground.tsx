import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line, useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface AtomProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
}

const Atom: React.FC<AtomProps> = ({ 
  position = [0, 0, 0], 
  color = '#00E5FF', 
  size = 0.5 
}) => {
  const atomRef = useRef<THREE.Group>(null);
  const orbitRef1 = useRef<THREE.Group>(null);
  const orbitRef2 = useRef<THREE.Group>(null);
  const orbitRef3 = useRef<THREE.Group>(null);
  
  // Create orbit points
  const orbit1Points = useMemo(() => {
    return new THREE.EllipseCurve(
      0, 0,
      1.5, 1.5,
      0, 2 * Math.PI,
      false, 0
    ).getPoints(50);
  }, []);
  
  const orbit2Points = useMemo(() => {
    return new THREE.EllipseCurve(
      0, 0,
      2, 2,
      0, 2 * Math.PI,
      false, 0
    ).getPoints(50);
  }, []);
  
  const orbit3Points = useMemo(() => {
    return new THREE.EllipseCurve(
      0, 0,
      2.5, 2.5,
      0, 2 * Math.PI,
      false, 0
    ).getPoints(50);
  }, []);
  
  // Convert 2D points to 3D
  const orbit1Points3D = useMemo(() => {
    return orbit1Points.map(p => new THREE.Vector3(p.x, p.y, 0));
  }, [orbit1Points]);
  
  const orbit2Points3D = useMemo(() => {
    return orbit2Points.map(p => new THREE.Vector3(p.x, 0, p.y));
  }, [orbit2Points]);
  
  const orbit3Points3D = useMemo(() => {
    return orbit3Points.map(p => new THREE.Vector3(0, p.x, p.y));
  }, [orbit3Points]);

  useFrame(({ clock }) => {
    if (atomRef.current) {
      atomRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (orbitRef1.current) {
      orbitRef1.current.rotation.z = clock.getElapsedTime() * 0.5;
    }
    if (orbitRef2.current) {
      orbitRef2.current.rotation.x = clock.getElapsedTime() * 0.3;
    }
    if (orbitRef3.current) {
      orbitRef3.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group position={new THREE.Vector3(...position)} ref={atomRef}>
      {/* Nucleus */}
      <Sphere args={[size, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Orbit 1 */}
      <group ref={orbitRef1}>
        <Line
          points={orbit1Points3D}
          color="#00E5FF"
          lineWidth={1}
          opacity={0.4}
          transparent
        />
        <Sphere args={[size * 0.3, 8, 8]} position={[1.5, 0, 0]}>
          <meshBasicMaterial color="#00E5FF" />
        </Sphere>
      </group>
      
      {/* Orbit 2 */}
      <group ref={orbitRef2}>
        <Line
          points={orbit2Points3D}
          color="#7B61FF"
          lineWidth={1}
          opacity={0.4}
          transparent
        />
        <Sphere args={[size * 0.3, 8, 8]} position={[0, 0, 2]}>
          <meshBasicMaterial color="#7B61FF" />
        </Sphere>
      </group>
      
      {/* Orbit 3 */}
      <group ref={orbitRef3}>
        <Line
          points={orbit3Points3D}
          color="#FF2A6D"
          lineWidth={1}
          opacity={0.4}
          transparent
        />
        <Sphere args={[size * 0.3, 8, 8]} position={[0, 2.5, 0]}>
          <meshBasicMaterial color="#FF2A6D" />
        </Sphere>
      </group>
    </group>
  );
};

interface AtomicBackgroundProps {
  count?: number;
}

const AtomicBackground: React.FC<AtomicBackgroundProps> = ({ count = 12 }) => {
  const scroll = useScroll();
  const atomsRef = useRef<THREE.Group>(null);
  
  const atoms = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ];
      
      const color = i % 3 === 0 
        ? '#00E5FF' 
        : i % 3 === 1 
          ? '#7B61FF' 
          : '#FF2A6D';
          
      const size = Math.random() * 0.3 + 0.2;
      
      temp.push({ id: i, position, color, size });
    }
    return temp;
  }, [count]);
  
  useFrame(() => {
    if (atomsRef.current) {
      // Move atoms based on scroll
      atomsRef.current.position.y = scroll.offset * -10;
      
      // Slight parallax effect
      atomsRef.current.rotation.y = scroll.offset * 0.5;
      atomsRef.current.rotation.x = scroll.offset * 0.5;
    }
  });
  
  return (
    <group ref={atomsRef}>
      {atoms.map(atom => (
        <Atom 
          key={atom.id}
          position={atom.position}
          color={atom.color}
          size={atom.size}
        />
      ))}
    </group>
  );
};

export default AtomicBackground;