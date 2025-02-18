import { useState, useEffect, useCallback, useMemo } from 'react';
import { StepType, Step } from '@/types';

export const useStepManagement = () => {
  const [step, setStep] = useState<StepType>('initial');
  const [currentStep, setCurrentStep] = useState(1);
  const [stepHistory, setStepHistory] = useState<StepType[]>(['initial']);

  const steps: Step[] = useMemo(() => [
    { number: 1, title: 'Generate Schema', description: 'Create the data structure' },
    { number: 2, title: 'Configure Sources', description: 'Select data sources' },
    { number: 3, title: 'Extract Data', description: 'Get your data' },
    { number: 4, title: 'Deploy API', description: 'Get your API endpoint' }
  ], []);

  const goToStep = useCallback((newStep: StepType) => {
    setStep(newStep);
    setStepHistory(prev => [...prev, newStep]);
  }, []);

  const goBack = useCallback(() => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop();
      const previousStep = newHistory[newHistory.length - 1];
      setStep(previousStep);
      setStepHistory(newHistory);
    }
  }, [stepHistory]);

  const getStepFromState = (state: 'initial' | 'schema' | 'sources' | 'extract' | 'deploy') => {
    switch (state) {
      case 'initial': return 1;
      case 'schema': return 2;
      case 'sources': return 3;
      case 'extract': return 4;
      case 'deploy': return 5;
      default: return 1;
    }
  };

  useEffect(() => {
    // const stepNumber = steps.findIndex(s => s.number === currentStep) + 1;
    setCurrentStep(getStepFromState(step));
  }, [step]);

  return {
    step,
    setStep: goToStep,
    currentStep,
    steps,
    goBack,
  };
};