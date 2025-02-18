import { motion } from 'framer-motion';
// import { ChevronLeft } from 'lucide-react';

interface StepLayoutProps {
  children: React.ReactNode;
  canGoBack: boolean;
  onBack: () => void;
  className?: string;
}

export const StepLayout = ({ children, canGoBack, onBack, className = '' }: StepLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative max-w-5xl mx-auto p-4 ${className}`}
    >
      {canGoBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-4 p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
        >
          {/* <ChevronLeft className="w-5 h-5" /> */}
          Back
        </button>
      )}
      {children}
    </motion.div>
  );
};