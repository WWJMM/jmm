import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 60 }) => {
  const atomVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const electronVariants = {
    animate: (i: number) => ({
      rotate: 360,
      transition: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "linear"
      }
    })
  };

  return (
    <motion.div
      style={{ width: size, height: size }}
      className="relative"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Outer circle */}
      <motion.div
        variants={atomVariants}
        animate="animate"
        className="absolute inset-0 border-2 border-quantum-blue/80 rounded-full"
      />
      
      {/* Middle circle */}
      <motion.div
        variants={atomVariants}
        animate="animate"
        className="absolute inset-2 border border-lattice-purple/60 rounded-full"
      />
      
      {/* Inner circle */}
      <motion.div
        variants={atomVariants}
        animate="animate"
        className="absolute inset-4 border border-plasma-pink/40 rounded-full"
      />
      
      {/* Electrons */}
      <motion.div
        className="absolute"
        style={{ 
          top: '25%', 
          left: '25%', 
          width: size * 0.12, 
          height: size * 0.12, 
          borderRadius: '50%',
          backgroundColor: '#00E5FF'
        }}
        custom={1}
        variants={electronVariants}
        animate="animate"
      />
      
      <motion.div
        className="absolute"
        style={{ 
          top: '25%', 
          right: '25%', 
          width: size * 0.12, 
          height: size * 0.12, 
          borderRadius: '50%',
          backgroundColor: '#7B61FF'
        }}
        custom={2}
        variants={electronVariants}
        animate="animate"
      />
      
      <motion.div
        className="absolute"
        style={{ 
          bottom: '25%', 
          left: '50%', 
          marginLeft: -(size * 0.06),
          width: size * 0.12, 
          height: size * 0.12, 
          borderRadius: '50%',
          backgroundColor: '#FF2A6D'
        }}
        custom={3}
        variants={electronVariants}
        animate="animate"
      />
      
      {/* Center nucleus */}
      <div 
        className="absolute bg-deep-space rounded-full shadow-neon-blue"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: size * 0.3, 
          height: size * 0.3, 
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: size * 0.18,
          fontFamily: 'Orbitron, sans-serif',
          color: '#00E5FF'
        }}
      >
        JM
      </div>
    </motion.div>
  );
};

export default Logo;