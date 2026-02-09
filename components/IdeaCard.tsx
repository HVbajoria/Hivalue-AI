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
    <div className="relative h-full rounded-2xl p-0.5" onClick={() => onClick(item.id)}>
       <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
       <div className="group relative flex flex-col h-full bg-slate-800 rounded-[14px] p-6 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer overflow-hidden z-10 border border-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
              <Folder className="w-3 h-3 mr-1" />
              {item.category}
            </div>
            <Zap className="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors" />
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
            {item.idea}
          </h3>
          
          <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
            {item.description}
          </p>
          
          <div className="flex items-center text-indigo-400 text-sm font-medium group-hover:text-indigo-300 mt-auto">
            View Blueprint <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
       </div>
    </div>
  );
};

export default IdeaCard;