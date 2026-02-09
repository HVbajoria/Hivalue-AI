import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Hivalue AI
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering entrepreneurs to harness the power of AI and build sustainable income streams in the digital economy.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Getting Started</a></li>
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">AI Tools Directory</a></li>
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Connect</h3>
              <div className="flex space-x-3">
                <a href="https://www.x.com/hvbajoria" className="p-2 bg-slate-800/50 hover:bg-indigo-600 rounded-lg transition-all hover:scale-110 group">
                  <Twitter className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
                <a href="https://www.github.com/hvbajoria" className="p-2 bg-slate-800/50 hover:bg-indigo-600 rounded-lg transition-all hover:scale-110 group">
                  <Github className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
                <a href="https://www.linkedin.com/in/harshavardhan-bajoria" className="p-2 bg-slate-800/50 hover:bg-indigo-600 rounded-lg transition-all hover:scale-110 group">
                  <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a>
                {/* <a href="mailto:code" className="p-2 bg-slate-800/50 hover:bg-indigo-600 rounded-lg transition-all hover:scale-110 group">
                  <Mail className="h-5 w-5 text-slate-400 group-hover:text-white" />
                </a> */}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Hivalue AI. Created by Harshavardhan Bajoria. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;