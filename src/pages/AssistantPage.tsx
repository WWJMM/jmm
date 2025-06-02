import React from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/assistant/ChatInterface';
import SceneContainer from '../components/3d/SceneContainer';

const AssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-0">
      {/* 3D Background */}
      <SceneContainer sceneType="atomic" />
      
      <div className="container mx-auto px-4 py-8 relative z-10 h-[calc(100vh-80px)] flex flex-col">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-orbitron mb-2">Research Assistant</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Ask questions about materials science, properties, and research papers
          </p>
        </motion.div>
        
        <motion.div 
          className="flex-1 glass-panel overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ChatInterface />
        </motion.div>
      </div>
    </div>
  );
};

export default AssistantPage;