import React from 'react';
import { ArrowRight, Zap, Folder } from 'lucide-react';
import { IdeaItem } from '../types';
import { GlowingEffect } from './ui/glowing-effect';

interface IdeaCardProps {
  item: IdeaItem;
  onClick: (id: string) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ item, onClick }) => {
  return (
    <div className="relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700 hover:from-indigo-500/50 hover:via-purple-500/50 hover:to-indigo-500/50 transition-all duration-500" onClick={() => onClick(item.id)}>
       <div className="group relative flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[15px] p-6 hover:from-slate-800 hover:via-slate-800/90 hover:to-slate-800 transition-all duration-500 cursor-pointer overflow-hidden z-10">
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-indigo-500/20 to-transparent blur-2xl" />
          </div>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">
              <Folder className="w-3 h-3 mr-1.5" />
              {item.category}
            </div>
            <div className="p-1.5 rounded-full bg-slate-700/50 group-hover:bg-yellow-500/20 transition-all duration-300">
              <Zap className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 transition-colors duration-300" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300 relative z-10">
            {item.idea}
          </h3>
          
          <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed relative z-10">
            {item.description}
          </p>
          
          <div className="flex items-center text-indigo-400 text-sm font-semibold group-hover:text-indigo-300 mt-auto relative z-10">
            <span className="mr-2">View Blueprint</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
          
          {/* Corner Accent */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
       </div>
    </div>
  );
};

export default IdeaCard;