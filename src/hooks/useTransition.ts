import { useState } from 'react';

export const useTransitioning = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');

  const startTransition = (message: string) => {
    setIsTransitioning(true);
    setTransitionMessage(message);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setTransitionMessage('');
  };

  return { isTransitioning, transitionMessage, startTransition, endTransition };
};