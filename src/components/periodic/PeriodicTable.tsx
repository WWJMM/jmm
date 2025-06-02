import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { periodicElements, elementPositions, Element } from '../../data/periodicTableData';
import { useAppContext } from '../../contexts/AppContext';

interface ElementTileProps {
  element: Element;
  onSelect: (element: Element) => void;
}

const ElementTile: React.FC<ElementTileProps> = ({ element, onSelect }) => {
  const { isLabMode } = useAppContext();
  const position = elementPositions[element.symbol as keyof typeof elementPositions] || { row: 0, col: 0 };
  
  let backgroundColor;
  let hoverColor;
  
  if (isLabMode) {
    backgroundColor = 'bg-lab-green/20';
    hoverColor = 'hover:bg-lab-green/40';
  } else {
    switch(element.category) {
      case 'nonmetal':
        backgroundColor = 'bg-quantum-blue/20';
        hoverColor = 'hover:bg-quantum-blue/40';
        break;
      case 'noble-gas':
        backgroundColor = 'bg-lattice-purple/20';
        hoverColor = 'hover:bg-lattice-purple/40';
        break;
      case 'alkali-metal':
        backgroundColor = 'bg-plasma-pink/20';
        hoverColor = 'hover:bg-plasma-pink/40';
        break;
      case 'alkaline-earth':
        backgroundColor = 'bg-success/20';
        hoverColor = 'hover:bg-success/40';
        break;
      case 'transition-metal':
        backgroundColor = 'bg-element-gold/20';
        hoverColor = 'hover:bg-element-gold/40';
        break;
      case 'metalloid':
        backgroundColor = 'bg-warning/20';
        hoverColor = 'hover:bg-warning/40';
        break;
      default:
        backgroundColor = 'bg-white/10';
        hoverColor = 'hover:bg-white/20';
    }
  }
  
  return (
    <motion.div
      className={`w-16 h-16 ${backgroundColor} ${hoverColor} border border-white/10 rounded-md flex flex-col justify-center items-center cursor-pointer transition-colors duration-300`}
      style={{
        gridRow: position.row,
        gridColumn: position.col
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(element)}
    >
      <div className="text-xs text-white/60">{element.atomicNumber}</div>
      <div className="text-xl font-orbitron">{element.symbol}</div>
      <div className="text-xs truncate max-w-full px-1">{element.name}</div>
    </motion.div>
  );
};

interface PeriodicTableProps {
  onElementSelect: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementSelect }) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  
  const handleElementSelect = (element: Element) => {
    setSelectedElement(element);
    onElementSelect(element);
  };
  
  return (
    <div className="relative">
      <div className="grid grid-cols-18 gap-1 overflow-x-auto pb-4">
        {periodicElements.map(element => (
          <ElementTile 
            key={element.symbol} 
            element={element} 
            onSelect={handleElementSelect}
          />
        ))}
      </div>
      
      {selectedElement && (
        <motion.div
          className="glass-panel p-4 mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-md flex items-center justify-center font-orbitron text-3xl"
              style={{ backgroundColor: selectedElement.color + '40' }}
            >
              {selectedElement.symbol}
            </div>
            <div>
              <h3 className="text-xl font-orbitron">{selectedElement.name}</h3>
              <p className="text-white/70">Atomic Number: {selectedElement.atomicNumber}</p>
              <p className="mt-2">{selectedElement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PeriodicTable;