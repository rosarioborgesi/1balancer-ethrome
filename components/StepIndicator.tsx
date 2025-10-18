import React from 'react';
import { Settings, TrendingUp, RefreshCw } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: 'setup' | 'review' | 'active';
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 'setup', label: 'Setup', icon: Settings },
    { id: 'review', label: 'Review', icon: TrendingUp },
    { id: 'active', label: 'Active', icon: RefreshCw },
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isPast = steps.findIndex(s => s.id === currentStep) > index;
          const isAccessible = isActive || isPast;

          return (
            <React.Fragment key={step.id}>
              <div className={`flex items-center ${isAccessible ? 'text-blue-400' : 'text-white/50'}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-500' : isPast ? 'bg-blue-600' : 'bg-white/20'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span className="ml-2 font-semibold">{step.label}</span>
              </div>
              {index < steps.length - 1 && <div className="w-16 h-0.5 bg-white/20"></div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
