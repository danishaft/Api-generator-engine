import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Loading spinner component
export const Loader = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center space-y-4 p-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/10 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-emerald-500 border-r-emerald-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="text-white/60 text-sm">{message}</p>
    </div>
  );

  export const FullScreenLoader = ({ message }: { message: string }) => (
       
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-white/0 backdrop-blur-lg flex items-center justify-center"
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h3 className="text-xl font-medium mb-2">{message}</h3>
          <p className="text-[#757677]">Please wait while we process your request...</p>
        </div>
      </motion.div>
  )