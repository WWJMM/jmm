import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SearchIcon, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const HeroSection: React.FC = () => {
  const { isLabMode } = useAppContext();
  
  // Text animation variants
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { 
        duration: 0.2
      }
    }
  };
  
  // Particle text effect
  const particleTextStyle = {
    background: isLabMode 
      ? 'linear-gradient(90deg, rgba(0,255,156,0) 0%, rgba(0,255,156,0.7) 50%, rgba(0,255,156,0) 100%)' 
      : 'linear-gradient(90deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0.7) 50%, rgba(0,229,255,0) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 100%',
    animation: 'shimmer 3s infinite',
  };
  
  // Add keyframes for shimmer animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -100% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space/30 via-deep-space to-deep-space z-10"></div>
      </div>
      
      <motion.div
        className="relative z-20 text-center max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          variants={titleVariants}
        >
          <span className={`font-orbitron ${isLabMode ? 'text-lab-green' : 'text-quantum-blue'}`}>
            Materials Intelligence
          </span>{' '}
          <span className="text-white">Revolution</span>
        </motion.h1>
        
        <motion.div 
          className="text-xl md:text-2xl mb-8 font-exo"
          variants={subtitleVariants}
          style={particleTextStyle as React.CSSProperties}
        >
          100,000+ Open Source Publications | AI Research Assistant
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          variants={buttonVariants}
        >
          <Link 
            to="/database"
            className={`neon-button ${isLabMode ? 'border-lab-green text-lab-green hover:bg-lab-green/10' : 'neon-button-blue'} flex items-center justify-center gap-2`}
            whileHover="hover"
          >
            <SearchIcon size={20} />
            <span>Explore Database</span>
          </Link>
          
          <Link 
            to="/assistant"
            className={`neon-button ${isLabMode ? 'border-lab-green text-lab-green hover:bg-lab-green/10' : 'neon-button-purple'} flex items-center justify-center gap-2`}
            whileHover="hover"
          >
            <MessageSquare size={20} />
            <span>Ask Assistant</span>
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-white/70 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <p>Powered by advanced AI and comprehensive materials data</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;