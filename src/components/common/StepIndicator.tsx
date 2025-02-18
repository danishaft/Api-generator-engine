import React from 'react';
// import { CheckIcon } from '@heroicons/react/24/outline';
// import { FaCheck } from "react-icons/fa6";
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const getStepStatus = (stepId: number) => {
    console.log(stepId)
    if (currentStep === stepId) return 'current';
    return currentStep > stepId ? 'complete' : 'upcoming';
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white p-2 rounded-lg shadow-lg">
      <div className="max-w-5xl mx-auto px-6 py-4 rounded-lg bg-gradient-to-br from-[rgba(222,227,248,0.4)] to-[rgba(222,227,248,0.9)] ">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between">
            {steps.map((stepItem) => (
              <li key={stepItem.number} className="relative">
                <div className="flex flex-col items-center">
                  {getStepStatus(stepItem.number) === 'complete' ? (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" aria-hidden="true"/>
                    </div>
                  ) : getStepStatus(stepItem.number) === 'current' ? (
                    <div className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full border-2 border-[#757677] flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#757677]" />
                    </div>
                  )}
                  <div className="mt-3 flex flex-col items-center">
                    <span className="text-sm font-bold ">{stepItem.title}</span>
                    <span className="text-xs text-[#757677] mt-1 text-center">{stepItem.description}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
  