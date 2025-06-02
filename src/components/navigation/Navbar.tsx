import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AtomIcon, Database, MessageSquare, Upload, FlaskRound as Flask, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../contexts/AppContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const { isDarkMode, isLabMode } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-deep-space/80 backdrop-blur-md shadow-lg py-2'
      : 'bg-transparent py-4'
  } ${isLabMode ? 'border-b border-lab-green/30' : ''}`;

  const linkColor = isLabMode ? 'hover:text-lab-green' : 'hover:text-quantum-blue';
  const activeLinkColor = isLabMode ? 'text-lab-green' : 'text-quantum-blue';

  const createRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('electron-ripple');
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={createRipple}
          >
            <Logo size={40} />
            <span className="font-orbitron text-xl font-bold">JMM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link flex items-center space-x-1 ${isActive ? activeLinkColor : ''}`
              }
              onClick={createRipple}
            >
              <AtomIcon size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/database" 
              className={({ isActive }) => 
                `nav-link flex items-center space-x-1 ${isActive ? activeLinkColor : ''}`
              }
              onClick={createRipple}
            >
              <Database size={18} />
              <span>Database</span>
            </NavLink>
            <NavLink 
              to="/assistant" 
              className={({ isActive }) => 
                `nav-link flex items-center space-x-1 ${isActive ? activeLinkColor : ''}`
              }
              onClick={createRipple}
            >
              <MessageSquare size={18} />
              <span>Assistant</span>
            </NavLink>
            <NavLink 
              to="/contribute" 
              className={({ isActive }) => 
                `nav-link flex items-center space-x-1 ${isActive ? activeLinkColor : ''}`
              }
              onClick={createRipple}
            >
              <Upload size={18} />
              <span>Contribute</span>
            </NavLink>
            <NavLink 
              to="/lab" 
              className={({ isActive }) => 
                `nav-link flex items-center space-x-1 ${isActive ? activeLinkColor : ''}`
              }
              onClick={createRipple}
            >
              <Flask size={18} />
              <span>Lab</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          className="md:hidden fixed top-16 right-0 bottom-0 w-64 bg-dark-matter border-l border-quantum-blue/20 p-4 z-50"
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center space-x-2 p-2 rounded ${isActive ? activeLinkColor : linkColor}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AtomIcon size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/database" 
              className={({ isActive }) => 
                `flex items-center space-x-2 p-2 rounded ${isActive ? activeLinkColor : linkColor}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Database size={18} />
              <span>Database</span>
            </NavLink>
            <NavLink 
              to="/assistant" 
              className={({ isActive }) => 
                `flex items-center space-x-2 p-2 rounded ${isActive ? activeLinkColor : linkColor}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquare size={18} />
              <span>Assistant</span>
            </NavLink>
            <NavLink 
              to="/contribute" 
              className={({ isActive }) => 
                `flex items-center space-x-2 p-2 rounded ${isActive ? activeLinkColor : linkColor}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Upload size={18} />
              <span>Contribute</span>
            </NavLink>
            <NavLink 
              to="/lab" 
              className={({ isActive }) => 
                `flex items-center space-x-2 p-2 rounded ${isActive ? activeLinkColor : linkColor}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Flask size={18} />
              <span>Lab</span>
            </NavLink>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;