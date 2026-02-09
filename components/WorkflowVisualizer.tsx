import React from 'react';
import { Check, Play, Trophy } from 'lucide-react';
import { BlueprintStep } from '../types';

interface WorkflowVisualizerProps {
  steps: BlueprintStep[];
  completedSubSteps: Set<string>;
}

const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ steps, completedSubSteps }) => {
  const getStepStatus = (step: BlueprintStep) => {
    const total = step.subSteps.length;
    const completed = step.subSteps.filter(s => completedSubSteps.has(s.id)).length;
    
    if (total > 0 && completed === total) return 'completed';
    if (completed > 0) return 'in-progress';
    return 'pending';
  };

  const allCompleted = steps.every(s => getStepStatus(s) === 'completed');

  return (
    <div className="py-8 px-2 md:px-6">
      <div className="space-y-0">
        {steps.map((step, index) => {
          const status = getStepStatus(step);
          const isLast = index === steps.length - 1;
          
          // Determine colors based on status
          let borderColor = "border-slate-700";
          let bgColor = "bg-slate-800/50";
          let iconBg = "bg-slate-800";
          let iconBorder = "border-slate-600";
          let iconColor = "text-slate-500";

          if (status === 'completed') {
            borderColor = "border-emerald-500/50";
            bgColor = "bg-emerald-900/10";
            iconBg = "bg-emerald-600";
            iconBorder = "border-emerald-400";
            iconColor = "text-white";
          } else if (status === 'in-progress') {
            borderColor = "border-indigo-500";
            bgColor = "bg-indigo-900/20";
            iconBg = "bg-slate-900";
            iconBorder = "border-indigo-500";
            iconColor = "text-indigo-400";
          }

          return (
            <div key={step.id} className="relative flex group">
              {/* Vertical Connector Line */}
              {!isLast && (
                <div className={`absolute left-6 top-12 bottom-0 w-0.5 -ml-px ${status === 'completed' ? 'bg-emerald-500' : 'bg-slate-800'} transition-colors duration-500 ease-in-out`} />
              )}
              
              {/* Icon Node */}
              <div className="flex-shrink-0 mr-6 relative z-10">
                <div 
                  key={`icon-${status}`}
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 
                    ${iconBg} ${iconBorder} ${iconColor}
                    transition-all duration-500 shadow-lg
                    ${status === 'in-progress' ? 'ring-4 ring-indigo-500/20 shadow-indigo-500/40' : ''}
                    ${status === 'completed' ? 'shadow-emerald-500/20 animate-scale-up-brief ring-4 ring-emerald-500/20' : ''}
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="w-6 h-6 animate-scale-in" />
                  ) : status === 'in-progress' ? (
                    <Play className="w-5 h-5 fill-current animate-pulse" />
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Content Card */}
              <div className={`flex-grow pb-12 transition-all duration-500 ${status === 'pending' ? 'opacity-60 grayscale-[0.5]' : 'opacity-100'}`}>
                <div 
                  key={`card-${status}`}
                  className={`
                    p-5 rounded-xl border ${borderColor} ${bgColor} 
                    shadow-lg transition-all duration-500
                    ${status === 'in-progress' ? 'translate-x-1 shadow-indigo-900/20' : ''}
                    ${status === 'completed' ? 'animate-scale-up-brief shadow-emerald-500/10' : ''}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-lg font-bold ${status === 'completed' ? 'text-emerald-400' : status === 'in-progress' ? 'text-indigo-400' : 'text-slate-300'}`}>
                      {step.title}
                    </h4>
                    {status === 'completed' && <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-fade-in">Done</span>}
                    {status === 'in-progress' && <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 animate-fade-in">Active</span>}
                  </div>
                  <p className={`text-sm ${status === 'completed' ? 'text-emerald-200/70' : 'text-slate-400'}`}>
                    {step.description}
                  </p>
                  
                  {/* Mini Progress Bar within card */}
                  {status === 'in-progress' && (
                    <div className="mt-4 h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-indigo-500 transition-all duration-500"
                         style={{ width: `${(step.subSteps.filter(s => completedSubSteps.has(s.id)).length / step.subSteps.length) * 100}%` }}
                       />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Success Node */}
        <div className="relative flex group">
           <div className="flex-shrink-0 mr-6 relative z-10">
              <div className={`
                 flex items-center justify-center w-12 h-12 rounded-full border-2 
                 transition-all duration-700
                 ${allCompleted 
                    ? 'bg-yellow-500 border-yellow-300 text-yellow-900 shadow-[0_0_20px_rgba(234,179,8,0.5)] scale-110' 
                    : 'bg-slate-900 border-slate-700 text-slate-600'}
              `}>
                  <Trophy className={`w-6 h-6 ${allCompleted ? 'animate-bounce' : ''}`} />
              </div>
           </div>
           <div className="flex-grow pt-2">
              <h4 className={`text-xl font-bold transition-colors duration-500 ${allCompleted ? 'text-yellow-400' : 'text-slate-600'}`}>
                 Success & Profit
              </h4>
              <p className={`text-sm transition-colors duration-500 ${allCompleted ? 'text-yellow-200/70' : 'text-slate-600'}`}>
                 {allCompleted ? "Congratulations! You've completed the blueprint." : "Complete all steps to finish."}
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default WorkflowVisualizer;