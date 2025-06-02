import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isDarkMode: boolean;
  isLabMode: boolean;
  toggleDarkMode: () => void;
  toggleLabMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLabMode, setIsLabMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isLabMode) setIsLabMode(false);
  };

  const toggleLabMode = () => {
    setIsLabMode(!isLabMode);
    if (!isDarkMode) setIsDarkMode(true);
  };

  const value = {
    isDarkMode,
    isLabMode,
    toggleDarkMode,
    toggleLabMode,
    searchQuery,
    setSearchQuery
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};