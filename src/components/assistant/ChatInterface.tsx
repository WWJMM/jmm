import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, FileQuestion, Paperclip } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const { isLabMode } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your materials science research assistant. I can help answer questions about materials, properties, and research papers. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate assistant typing
    setIsTyping(true);
    
    // Simulate response after delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Simple response generator for demo purposes
  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('perovskite') || lowerQuestion.includes('solar')) {
      return 'Perovskite solar cells have emerged as promising photovoltaic technology due to their high power conversion efficiency and low-cost fabrication. Recent research has focused on improving their stability through interface engineering. For example, Zhang et al. (2023) demonstrated that hydrophobic interlayers can significantly reduce moisture-induced degradation.\n\nThe typical band gap of perovskite materials used in solar cells ranges from 1.5 to 2.3 eV, which can be tuned by adjusting the composition.';
    } else if (lowerQuestion.includes('battery') || lowerQuestion.includes('lithium')) {
      return 'Lithium-sulfur batteries are promising next-generation energy storage systems due to their high theoretical energy density (2600 Wh/kg). However, they face challenges related to polysulfide shuttling and volume expansion.\n\nRecent work by Johnson et al. (2022) demonstrated that functionalized carbon nanotube interlayers can effectively trap polysulfides and enhance cycle life, achieving stable performance over 500 cycles.';
    } else if (lowerQuestion.includes('catalyst') || lowerQuestion.includes('co2')) {
      return 'Single-atom catalysts (SACs) represent the ultimate atom-efficiency for catalysis and offer unique selectivity for CO₂ reduction reactions. Martinez et al. (2023) developed Fe-N-C single-atom catalysts with remarkable activity, achieving 95% selectivity and 92% Faradaic efficiency.\n\nThe atomically dispersed active sites in SACs provide well-defined coordination environments that can be precisely tuned for specific reactions.';
    } else {
      return 'That\'s an interesting question about materials science. To provide a more specific answer, I would need to consult the latest research in our database. Could you provide more details or specify a particular aspect of the material or property you\'re interested in?';
    }
  };
  
  const formatMessage = (content: string) => {
    // Simple formatting for demonstration
    const parts = content.split('\n\n');
    return parts.map((part, i) => <p key={i} className="mb-3">{part}</p>);
  };

  const buttonClass = isLabMode 
    ? 'bg-lab-green/20 hover:bg-lab-green/30 text-lab-green' 
    : 'bg-quantum-blue/20 hover:bg-quantum-blue/30 text-quantum-blue';

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-180px)]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <motion.div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className={`max-w-3xl rounded-lg p-4 ${
                message.role === 'user' 
                  ? isLabMode 
                    ? 'bg-lab-green/20 text-white' 
                    : 'bg-lattice-purple/20 text-white'
                  : 'glass-panel'
              }`}
            >
              {formatMessage(message.content)}
              <div className="text-right mt-1">
                <span className="text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass-panel p-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="h-2 w-2 bg-quantum-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="h-2 w-2 bg-quantum-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="h-2 w-2 bg-quantum-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-sm text-white/70">AI is researching...</span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              className="search-input pr-12"
              placeholder="Ask a materials science question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button
              type="button"
              className="absolute right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
              disabled={isTyping}
            >
              <Paperclip size={18} />
            </button>
          </div>
          
          <motion.button
            type="submit"
            className={`p-3 rounded-lg ${buttonClass} flex items-center justify-center`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTyping || input.trim() === ''}
          >
            <Send size={20} />
          </motion.button>
        </form>
        
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <button 
              className="text-sm text-white/60 hover:text-white flex items-center space-x-1 p-1"
              disabled={isTyping}
            >
              <Sparkles size={14} />
              <span>Material properties</span>
            </button>
            <button 
              className="text-sm text-white/60 hover:text-white flex items-center space-x-1 p-1"
              disabled={isTyping}
            >
              <FileQuestion size={14} />
              <span>Research trends</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;