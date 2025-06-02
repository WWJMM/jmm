import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/database/SearchBar';
import LiteratureCard from '../components/database/LiteratureCard';
import SceneContainer from '../components/3d/SceneContainer';
import { literatureData, LiteratureItem } from '../data/literatureData';

interface FilterState {
  journals: string[];
  structures: string[];
  yearRange: [number, number];
}

const DatabasePage: React.FC = () => {
  const [results, setResults] = useState<LiteratureItem[]>(literatureData);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (query: string, filters: FilterState) => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      let filteredResults = [...literatureData];
      
      // Apply text search
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        filteredResults = filteredResults.filter(item => 
          item.title.toLowerCase().includes(lowercaseQuery) ||
          item.authors.some(author => author.toLowerCase().includes(lowercaseQuery)) ||
          item.abstract.toLowerCase().includes(lowercaseQuery) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
          Object.values(item.properties).some(value => 
            value.toLowerCase().includes(lowercaseQuery)
          )
        );
      }
      
      // Apply journal filter
      if (filters.journals.length > 0) {
        filteredResults = filteredResults.filter(item => 
          filters.journals.includes(item.journal)
        );
      }
      
      // Apply structure filter
      if (filters.structures.length > 0) {
        filteredResults = filteredResults.filter(item => 
          filters.structures.includes(item.structure)
        );
      }
      
      // Apply year range
      filteredResults = filteredResults.filter(item => 
        item.year >= filters.yearRange[0] && item.year <= filters.yearRange[1]
      );
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* 3D Background */}
      <SceneContainer sceneType="lattice" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron mb-4">Materials Database</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Search through over 100,000 materials science publications with comprehensive property data
          </p>
        </div>
        
        {/* Search Section */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Results Section */}
        <div className="relative">
          {isSearching ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="inline-block">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-t-quantum-blue border-r-lattice-purple border-b-plasma-pink border-l-quantum-blue rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-t-lattice-purple border-r-plasma-pink border-b-quantum-blue border-l-lattice-purple rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-4 border-4 border-t-plasma-pink border-r-quantum-blue border-b-lattice-purple border-l-plasma-pink rounded-full animate-spin"></div>
                  </div>
                </div>
                <p className="mt-4 text-white/80">Searching materials database...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {results.length} {results.length === 1 ? 'Result' : 'Results'}
                </h2>
                <div className="text-white/60 text-sm">
                  Showing {Math.min(results.length, 10)} of {results.length}
                </div>
              </div>
              
              {results.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {results.map((item, index) => (
                    <LiteratureCard key={item.id} item={item} index={index} />
                  ))}
                </motion.div>
              ) : (
                <div className="glass-panel p-8 text-center">
                  <h3 className="text-xl mb-2">No results found</h3>
                  <p className="text-white/70">
                    Try adjusting your search terms or filters to find more materials.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;