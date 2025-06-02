import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import SceneContainer from '../components/3d/SceneContainer';
import PeriodicTable from '../components/periodic/PeriodicTable';
import { Element } from '../data/periodicTableData';
import { useAppContext } from '../contexts/AppContext';

const HomePage: React.FC = () => {
  const { isLabMode } = useAppContext();
  
  const handleElementSelect = (element: Element) => {
    console.log(`Selected element: ${element.name}`);
    // In a real app, this would search the database for this element
  };
  
  return (
    <div className="relative">
      {/* 3D Background */}
      <SceneContainer sceneType="atomic" />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Periodic Table Navigation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-orbitron mb-4">Materials Universe</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Navigate through elements to discover related materials research and properties
            </p>
          </div>
          
          <div className="glass-panel p-6">
            <PeriodicTable onElementSelect={handleElementSelect} />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-orbitron mb-6">
            Ready to Accelerate Your Research?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join the materials science intelligence revolution today
          </p>
          <a 
            href="/database" 
            className={`neon-button ${isLabMode ? 'border-lab-green text-lab-green hover:bg-lab-green/10' : 'neon-button-pink'} text-lg inline-block`}
          >
            Explore the Database
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;