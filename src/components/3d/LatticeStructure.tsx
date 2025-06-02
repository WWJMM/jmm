import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  position: [number, number, number];
  connections: number[];
}

interface LatticeStructureProps {
  nodes?: Node[];
  structureType?: 'cubic' | 'hexagonal' | 'monoclinic';
  nodeColor?: string;
  lineColor?: string;
  nodeSize?: number;
  animate?: boolean;
}

const LatticeStructure: React.FC<LatticeStructureProps> = ({
  structureType = 'cubic',
  nodeColor = '#00E5FF',
  lineColor = '#00E5FF',
  nodeSize = 0.15,
  animate = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate nodes based on structure type
  const nodes = useRef<Node[]>([]);
  
  useEffect(() => {
    if (structureType === 'cubic') {
      // Simple cubic lattice
      const size = 2;
      const latticePoints: Node[] = [];
      let index = 0;
      
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            latticePoints.push({
              position: [x * size, y * size, z * size],
              connections: []
            });
            
            // Store connection indices
            if (index > 0) {
              // Connect to neighbors (simple cubic connection rules)
              for (let i = 0; i < index; i++) {
                const [px, py, pz] = latticePoints[i].position;
                // Connect if exactly one coordinate differs by size
                const diffX = Math.abs(x * size - px);
                const diffY = Math.abs(y * size - py);
                const diffZ = Math.abs(z * size - pz);
                
                if (
                  (diffX === size && diffY === 0 && diffZ === 0) ||
                  (diffX === 0 && diffY === size && diffZ === 0) ||
                  (diffX === 0 && diffY === 0 && diffZ === size)
                ) {
                  latticePoints[index].connections.push(i);
                  latticePoints[i].connections.push(index);
                }
              }
            }
            
            index++;
          }
        }
      }
      
      nodes.current = latticePoints;
    } else if (structureType === 'hexagonal') {
      // Hexagonal close-packed structure (simplified)
      const latticePoints: Node[] = [];
      const size = 2;
      let index = 0;
      
      // Base layer (hexagonal)
      const angleStep = Math.PI / 3;
      for (let i = 0; i < 6; i++) {
        const angle = i * angleStep;
        latticePoints.push({
          position: [size * Math.cos(angle), 0, size * Math.sin(angle)],
          connections: []
        });
        
        // Connect to previous point (if not first)
        if (i > 0) {
          latticePoints[index].connections.push(index - 1);
          latticePoints[index - 1].connections.push(index);
        }
        
        index++;
      }
      
      // Connect first and last points
      latticePoints[0].connections.push(5);
      latticePoints[5].connections.push(0);
      
      // Center point
      latticePoints.push({
        position: [0, 0, 0],
        connections: []
      });
      
      // Connect center to all points in base layer
      for (let i = 0; i < 6; i++) {
        latticePoints[6].connections.push(i);
        latticePoints[i].connections.push(6);
      }
      
      // Top layer (shifted)
      for (let i = 0; i < 6; i++) {
        const angle = i * angleStep + angleStep / 2;
        latticePoints.push({
          position: [size * Math.cos(angle), size, size * Math.sin(angle)],
          connections: []
        });
        
        // Connect to previous point in top layer (if not first)
        if (i > 0) {
          latticePoints[index].connections.push(index - 1);
          latticePoints[index - 1].connections.push(index);
        }
        
        index++;
      }
      
      // Connect first and last points in top layer
      latticePoints[7].connections.push(12);
      latticePoints[12].connections.push(7);
      
      // Connect top layer to base layer
      for (let i = 0; i < 6; i++) {
        latticePoints[i].connections.push(i + 7);
        latticePoints[i + 7].connections.push(i);
      }
      
      nodes.current = latticePoints;
    } else if (structureType === 'monoclinic') {
      // Monoclinic structure (simplified)
      const a = 2, b = 2, c = 2;
      const beta = Math.PI / 6; // 30 degrees tilt
      const latticePoints: Node[] = [];
      let index = 0;
      
      // Create the 8 vertices of the monoclinic cell
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            // Apply monoclinic transformation
            const x = i * a - k * c * Math.cos(beta);
            const y = j * b;
            const z = k * c * Math.sin(beta);
            
            latticePoints.push({
              position: [x, y, z],
              connections: []
            });
            
            // Add connections to form the cell edges
            if (index > 0) {
              for (let prev = 0; prev < index; prev++) {
                // Check if this is an edge by comparing indices
                // In a unit cell, an edge connects vertices that differ in exactly one coordinate
                const diff = [
                  Math.abs(i - Math.floor(prev / 4)),
                  Math.abs(j - Math.floor(prev / 2) % 2),
                  Math.abs(k - prev % 2)
                ];
                
                const diffCount = diff.filter(d => d === 1).length;
                if (diffCount === 1) {
                  latticePoints[index].connections.push(prev);
                  latticePoints[prev].connections.push(index);
                }
              }
            }
            
            index++;
          }
        }
      }
      
      nodes.current = latticePoints;
    }
  }, [structureType]);
  
  useFrame(({ clock }) => {
    if (animate && groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
      
      // Breathing effect
      const scale = 1 + Math.sin(t * 0.5) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Render nodes */}
      {nodes.current.map((node, index) => (
        <Sphere 
          key={`node-${index}`} 
          args={[nodeSize, 16, 16]} 
          position={node.position}
        >
          <meshStandardMaterial 
            color={nodeColor} 
            emissive={nodeColor} 
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      ))}
      
      {/* Render connections */}
      {nodes.current.map((node, nodeIndex) => 
        node.connections.map((connIndex, index) => {
          // Only render each connection once (avoid duplicates)
          if (nodeIndex < connIndex) {
            const start = new THREE.Vector3(...node.position);
            const end = new THREE.Vector3(...nodes.current[connIndex].position);
            
            return (
              <Line
                key={`conn-${nodeIndex}-${connIndex}`}
                points={[start, end]}
                color={lineColor}
                lineWidth={1.5}
                opacity={0.6}
                transparent
              />
            );
          }
          return null;
        })
      )}
    </group>
  );
};

export default LatticeStructure;