import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import HomePage from './pages/HomePage';
import DatabasePage from './pages/DatabasePage';
import AssistantPage from './pages/AssistantPage';
import ContributePage from './pages/ContributePage';
import { useAppContext } from './contexts/AppContext';

function App() {
  const { isDarkMode, isLabMode } = useAppContext();
  
  // Apply theme classes to body
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.className = isLabMode ? 'lab-mode' : 'default-mode';
  }, [isDarkMode, isLabMode]);

  return (
    <div className="min-h-screen bg-deep-space">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/database" element={<DatabasePage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/lab" element={<AssistantPage />} />
      </Routes>
    </div>
  );
}

export default App;