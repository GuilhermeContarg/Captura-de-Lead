
import React from 'react';
import { PipelineStatus } from '../types';

interface Props {
  status: PipelineStatus;
}

const steps = [
  { id: PipelineStatus.DISCOVERY, label: 'Discovery', icon: '🔍' },
  { id: PipelineStatus.ENRICHING, label: 'Enrichment', icon: '💎' },
  { id: PipelineStatus.AI_VALIDATION, label: 'AI Validation', icon: '🤖' },
  { id: PipelineStatus.COMPLETED, label: 'Finalizing', icon: '✅' },
];

export const PipelineStatusStepper: React.FC<Props> = ({ status }) => {
  if (status === PipelineStatus.IDLE || status === PipelineStatus.ERROR) return null;

  const currentStepIndex = steps.findIndex(s => s.id === status);

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex || status === PipelineStatus.COMPLETED;
          const isActive = index === currentStepIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  isCompleted ? 'bg-indigo-600 border-indigo-200 text-white' : 
                  isActive ? 'bg-white border-indigo-600 text-indigo-600 animate-pulse' : 
                  'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-xl">{isCompleted ? '✓' : step.icon}</span>
              </div>
              <span className={`mt-2 text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
