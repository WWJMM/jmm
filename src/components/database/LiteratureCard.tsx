import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, BookOpen } from 'lucide-react';
import { LiteratureItem } from '../../data/literatureData';
import { useAppContext } from '../../contexts/AppContext';

interface LiteratureCardProps {
  item: LiteratureItem;
  index: number;
}

const LiteratureCard: React.FC<LiteratureCardProps> = ({ item, index }) => {
  const { isLabMode } = useAppContext();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div
      className="card h-full flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <motion.img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          variants={imageVariants}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space to-transparent"></div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <span className="text-xs font-medium px-2 py-1 rounded bg-deep-space/80 text-white">
            {item.structure.replace(/_/g, ' ')}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded bg-deep-space/80 text-white">
            {item.year}
          </span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-orbitron mt-3 mb-2 line-clamp-2">{item.title}</h3>
        
        <p className="text-sm text-white/70 mb-3 line-clamp-1">
          {item.authors.join(', ')}
        </p>
        
        <p className="text-sm text-white/60 mb-3 line-clamp-2">
          {item.abstract}
        </p>
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {Object.entries(item.properties).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-white/50">{key}: </span>
                <span className={`font-medium ${isLabMode ? 'text-lab-green' : 'text-quantum-blue'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <span className="text-xs text-white/50">{item.journal}</span>
            <span className="text-xs text-white/50">DOI: {item.doi}</span>
          </div>
          
          <div className="flex justify-between mt-3">
            <motion.button
              className={`p-2 rounded ${isLabMode ? 'text-lab-green hover:bg-lab-green/10' : 'text-quantum-blue hover:bg-quantum-blue/10'} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BookOpen size={18} />
            </motion.button>
            
            <motion.button
              className={`p-2 rounded ${isLabMode ? 'text-lab-green hover:bg-lab-green/10' : 'text-lattice-purple hover:bg-lattice-purple/10'} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download size={18} />
            </motion.button>
            
            <motion.button
              className={`p-2 rounded ${isLabMode ? 'text-lab-green hover:bg-lab-green/10' : 'text-plasma-pink hover:bg-plasma-pink/10'} transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiteratureCard;