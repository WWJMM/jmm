import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { journalList, structureTypes } from '../../data/literatureData';

interface SearchBarProps {
  onSearch: (query: string, filters: FilterState) => void;
}

interface FilterState {
  journals: string[];
  structures: string[];
  yearRange: [number, number];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { isLabMode, searchQuery, setSearchQuery } = useAppContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    journals: [],
    structures: [],
    yearRange: [2000, 2025]
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleJournalToggle = (journal: string) => {
    setFilters(prev => {
      const newJournals = prev.journals.includes(journal)
        ? prev.journals.filter(j => j !== journal)
        : [...prev.journals, journal];
      
      return { ...prev, journals: newJournals };
    });
  };

  const handleStructureToggle = (structure: string) => {
    setFilters(prev => {
      const newStructures = prev.structures.includes(structure)
        ? prev.structures.filter(s => s !== structure)
        : [...prev.structures, structure];
      
      return { ...prev, structures: newStructures };
    });
  };

  const handleYearChange = (index: number, value: number) => {
    setFilters(prev => {
      const newRange = [...prev.yearRange] as [number, number];
      newRange[index] = value;
      return { ...prev, yearRange: newRange };
    });
  };

  const clearFilters = () => {
    setFilters({
      journals: [],
      structures: [],
      yearRange: [2000, 2025]
    });
  };

  const buttonClass = isLabMode 
    ? 'bg-lab-green/20 hover:bg-lab-green/30 text-lab-green' 
    : 'bg-quantum-blue/20 hover:bg-quantum-blue/30 text-quantum-blue';

  const activeFilterClass = isLabMode
    ? 'bg-lab-green/20 border-lab-green text-lab-green'
    : 'bg-quantum-blue/20 border-quantum-blue text-quantum-blue';

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="flex items-center">
          <input
            type="text"
            className="search-input"
            placeholder="Search by material, property, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <motion.button
            type="button"
            className={`ml-2 p-3 rounded-lg ${buttonClass} transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFilter}
          >
            <Filter size={20} />
          </motion.button>
          
          <motion.button
            type="submit"
            className={`ml-2 p-3 rounded-lg ${buttonClass} transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={20} />
          </motion.button>
        </div>
        
        {/* Advanced filters panel */}
        {isFilterOpen && (
          <motion.div
            className="glass-panel mt-2 p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-orbitron text-lg">Advanced Filters</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
                <button
                  type="button"
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={toggleFilter}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Journals */}
              <div>
                <h4 className="font-semibold mb-2">Journals</h4>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {journalList.slice(0, 8).map(journal => (
                    <button
                      key={journal}
                      type="button"
                      className={`px-3 py-1 text-sm rounded-full border ${
                        filters.journals.includes(journal)
                          ? activeFilterClass
                          : 'border-white/20 text-white/70 hover:text-white hover:border-white/40'
                      } transition-colors`}
                      onClick={() => handleJournalToggle(journal)}
                    >
                      {journal.length > 20 ? `${journal.substring(0, 20)}...` : journal}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Structure Types */}
              <div>
                <h4 className="font-semibold mb-2">Structure Types</h4>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {structureTypes.slice(0, 8).map(structure => (
                    <button
                      key={structure}
                      type="button"
                      className={`px-3 py-1 text-sm rounded-full border ${
                        filters.structures.includes(structure)
                          ? activeFilterClass
                          : 'border-white/20 text-white/70 hover:text-white hover:border-white/40'
                      } transition-colors`}
                      onClick={() => handleStructureToggle(structure)}
                    >
                      {structure.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Year Range */}
              <div>
                <h4 className="font-semibold mb-2">Publication Year</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>{filters.yearRange[0]}</span>
                    <span>{filters.yearRange[1]}</span>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="2000"
                      max="2025"
                      value={filters.yearRange[0]}
                      onChange={(e) => handleYearChange(0, parseInt(e.target.value))}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="2000"
                      max="2025"
                      value={filters.yearRange[1]}
                      onChange={(e) => handleYearChange(1, parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <motion.button
                type="submit"
                className={`px-4 py-2 rounded-lg ${buttonClass}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onSearch(searchQuery, filters);
                  setIsFilterOpen(false);
                }}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;