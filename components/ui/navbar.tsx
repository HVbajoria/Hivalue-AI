import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <img src="/components/Logo(1).png" alt="Hivalue AI" className="h-10 w-10 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Hivalue AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Home
            </a>
            {/* <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Strategies
            </a> */}
            <a href="#about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              About
            </a>
            <button 
              onClick={() => {
                const element = document.getElementById('strategies');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-4 py-2 bg-[#0084ff] hover:bg-[#0066cc] text-white rounded-md text-sm font-medium transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-slate-800/50">
          <div className="px-6 py-4 space-y-3">
            <a href="#" className="block text-slate-300 hover:text-white transition-colors text-sm font-medium py-2">
              Home
            </a>
            <a href="#" className="block text-slate-300 hover:text-white transition-colors text-sm font-medium py-2">
              Strategies
            </a>
            <a href="#about" className="block text-slate-300 hover:text-white transition-colors text-sm font-medium py-2">
              About
            </a>
            <button 
              onClick={() => {
                const element = document.getElementById('strategies');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="w-full px-4 py-2 bg-[#0084ff] hover:bg-[#0066cc] text-white rounded-md text-sm font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
