import React from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, BarChart3, Users } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  const { isLabMode } = useAppContext();
  
  return (
    <motion.div
      className={`card ${isLabMode ? 'hover:shadow-[0_0_15px_rgba(0,255,156,0.3)]' : 'hover:shadow-neon-blue'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={`text-3xl mb-4 ${isLabMode ? 'text-lab-green' : 'text-quantum-blue'}`}>
        {icon}
      </div>
      <h3 className="text-xl font-orbitron mb-3">{title}</h3>
      <p className="text-white/80">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron mb-4">Platform Capabilities</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Accelerate your materials research with our comprehensive suite of advanced tools
            and intelligent features.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Literature Database"
            description="Access over 100,000 scientific publications on materials science with powerful search and filtering capabilities."
            icon={<Database className="animate-pulse-slow" />}
            delay={0.1}
          />
          
          <FeatureCard
            title="AI Research Assistant"
            description="Ask complex research questions and receive scientifically-grounded answers with citations from relevant literature."
            icon={<Brain className="animate-pulse-slow" />}
            delay={0.2}
          />
          
          <FeatureCard
            title="Data Visualization"
            description="Explore material properties through interactive 3D visualizations of crystal structures and property relationships."
            icon={<BarChart3 className="animate-pulse-slow" />}
            delay={0.3}
          />
          
          <FeatureCard
            title="Collaborative Platform"
            description="Contribute your own research data and collaborate with the global materials science community."
            icon={<Users className="animate-pulse-slow" />}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;