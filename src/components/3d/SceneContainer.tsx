import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import AtomicBackground from './AtomicBackground';
import LatticeStructure from './LatticeStructure';
import { useAppContext } from '../../contexts/AppContext';

interface SceneContainerProps {
  children?: React.ReactNode;
  interactive?: boolean;
  sceneType?: 'atomic' | 'lattice' | 'empty';
  showControls?: boolean;
}

const SceneContainer: React.FC<SceneContainerProps> = ({
  children,
  interactive = false,
  sceneType = 'atomic',
  showControls = false,
}) => {
  const { isLabMode } = useAppContext();
  
  return (
    <>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <Suspense fallback={null}>
            <fog attach="fog" args={['#0F172A', 10, 30]} />
            
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              color={isLabMode ? '#00FF9C' : '#FFFFFF'}
            />
            <directionalLight
              position={[-10, -10, -5]}
              intensity={0.2}
              color={isLabMode ? '#00FF9C' : '#7B61FF'}
            />
            
            {sceneType === 'atomic' && <AtomicBackground count={interactive ? 20 : 12} />}
            {sceneType === 'lattice' && (
              <LatticeStructure 
                structureType="cubic" 
                nodeColor={isLabMode ? '#00FF9C' : '#00E5FF'} 
                lineColor={isLabMode ? '#00FF9C80' : '#00E5FF80'} 
                animate={true} 
              />
            )}
            
            {children}
            
            <Environment preset="city" />
            {(showControls || interactive) && (
              <OrbitControls 
                enableZoom={interactive}
                enablePan={interactive}
                enableRotate={interactive || showControls}
                rotateSpeed={0.5}
                zoomSpeed={0.5}
                minDistance={3}
                maxDistance={20}
              />
            )}
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </>
  );
};

export default SceneContainer;