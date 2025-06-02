import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Atom, UploadCloud, Check } from 'lucide-react';
import SceneContainer from '../components/3d/SceneContainer';
import { useAppContext } from '../contexts/AppContext';

const ContributePage: React.FC = () => {
  const { isLabMode } = useAppContext();
  const [activeStep, setActiveStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(4);
    setSubmitted(true);
  };
  
  const buttonClass = isLabMode 
    ? 'bg-lab-green/20 hover:bg-lab-green/30 text-lab-green border border-lab-green/30' 
    : 'bg-quantum-blue/20 hover:bg-quantum-blue/30 text-quantum-blue border border-quantum-blue/30';
  
  const activeStepClass = isLabMode
    ? 'border-lab-green text-lab-green'
    : 'border-quantum-blue text-quantum-blue';
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* 3D Background */}
      <SceneContainer sceneType="lattice" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron mb-4">Contribute Data</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Share your research findings with the materials science community
          </p>
        </div>
        
        {/* Stepper */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className="flex flex-col items-center"
              >
                <div 
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${
                    step === activeStep 
                      ? activeStepClass
                      : step < activeStep
                        ? 'border-success text-success'
                        : 'border-white/30 text-white/50'
                  }`}
                >
                  {step < activeStep ? (
                    <Check size={16} />
                  ) : (
                    step
                  )}
                </div>
                <div className={`text-sm ${step === activeStep ? 'text-white' : 'text-white/60'}`}>
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Upload Files'}
                  {step === 3 && 'Properties'}
                  {step === 4 && 'Submit'}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-3">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20 z-0"></div>
            <motion.div 
              className={`absolute top-0 left-0 h-0.5 z-10 ${isLabMode ? 'bg-lab-green' : 'bg-quantum-blue'}`}
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep - 1) * 33.33}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-panel p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
                    isLabMode ? 'bg-lab-green/20 text-lab-green' : 'bg-success/20 text-success'
                  }`}
                >
                  <Check size={40} />
                </motion.div>
                <h2 className="text-2xl font-orbitron mb-4">Submission Successful!</h2>
                <p className="text-white/80 mb-6">
                  Thank you for contributing to the materials science community. Your data is being processed and will be added to our database soon.
                </p>
                <div className="flex justify-center">
                  <button 
                    className={`px-6 py-2 rounded-md ${buttonClass}`}
                    onClick={() => {
                      setActiveStep(1);
                      setSubmitted(false);
                    }}
                  >
                    Submit Another Entry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Info */}
                {activeStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-orbitron mb-6">Basic Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-white/80 mb-2">Publication Title</label>
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Enter publication title"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/80 mb-2">DOI</label>
                        <input
                          type="text"
                          className="search-input"
                          placeholder="e.g. 10.1039/d3ta01234k"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-white/80 mb-2">Authors</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g. Smith, J.; Johnson, M."
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-white/80 mb-2">Journal/Conference</label>
                        <input
                          type="text"
                          className="search-input"
                          placeholder="e.g. Advanced Materials"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/80 mb-2">Publication Year</label>
                        <input
                          type="number"
                          className="search-input"
                          placeholder="e.g. 2023"
                          min="1900"
                          max="2100"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-white/80 mb-2">Abstract</label>
                      <textarea
                        className="search-input min-h-32"
                        placeholder="Enter publication abstract"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        type="button" 
                        className={`px-6 py-2 rounded-md ${buttonClass}`}
                        onClick={() => setActiveStep(2)}
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Upload Files */}
                {activeStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-orbitron mb-6">Upload Research Files</h2>
                    
                    <div className="mb-8">
                      <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        isLabMode ? 'border-lab-green/30' : 'border-quantum-blue/30'
                      }`}>
                        <UploadCloud size={48} className={`mx-auto mb-4 ${
                          isLabMode ? 'text-lab-green' : 'text-quantum-blue'
                        }`} />
                        <h3 className="text-xl mb-2">Drag & Drop Files</h3>
                        <p className="text-white/60 mb-4">
                          Supported formats: PDF, CIF, XYZ, JSON, CSV
                        </p>
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-md ${buttonClass}`}
                        >
                          Browse Files
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Uploaded Files</h3>
                      
                      <div className="space-y-3">
                        <div className="glass-panel p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText size={20} className="mr-3 text-white/70" />
                            <span>sample-data.csv</span>
                          </div>
                          <button className="text-error hover:text-error/80">Remove</button>
                        </div>
                        
                        <div className="glass-panel p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Atom size={20} className="mr-3 text-white/70" />
                            <span>structure.cif</span>
                          </div>
                          <button className="text-error hover:text-error/80">Remove</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        className="px-6 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
                        onClick={() => setActiveStep(1)}
                      >
                        Previous Step
                      </button>
                      
                      <button 
                        type="button" 
                        className={`px-6 py-2 rounded-md ${buttonClass}`}
                        onClick={() => setActiveStep(3)}
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Properties */}
                {activeStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-orbitron mb-6">Material Properties</h2>
                    
                    <div className="mb-6">
                      <label className="block text-white/80 mb-2">Material Structure Type</label>
                      <select className="search-input">
                        <option value="">Select structure type</option>
                        <option value="Perovskite_Cubic">Perovskite (Cubic)</option>
                        <option value="Carbon_Nanotube">Carbon Nanotube</option>
                        <option value="Single_Atom_Catalyst">Single Atom Catalyst</option>
                        <option value="MXene_Layer">MXene Layer</option>
                        <option value="Quantum_Dot">Quantum Dot</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-white/80 mb-2">Keywords</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g. perovskite, solar cell, interface"
                      />
                      <div className="text-white/60 text-sm mt-1">
                        Separate keywords with commas
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <label className="block text-white/80 mb-2">Properties</label>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Property name"
                            defaultValue="bandgap"
                          />
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Value"
                            defaultValue="1.65"
                          />
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Unit"
                            defaultValue="eV"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Property name"
                            defaultValue="efficiency"
                          />
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Value"
                            defaultValue="25.3"
                          />
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Unit"
                            defaultValue="%"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Property name"
                          />
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Value"
                          />
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Unit"
                          />
                        </div>
                      </div>
                      
                      <button 
                        type="button" 
                        className="mt-3 text-white/70 hover:text-white flex items-center"
                      >
                        <Upload size={16} className="mr-1" />
                        <span>Add another property</span>
                      </button>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        className="px-6 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
                        onClick={() => setActiveStep(2)}
                      >
                        Previous Step
                      </button>
                      
                      <button 
                        type="submit" 
                        className={`px-6 py-2 rounded-md ${buttonClass}`}
                      >
                        Submit Data
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContributePage;