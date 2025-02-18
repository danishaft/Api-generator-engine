/* eslint-disable @typescript-eslint/no-explicit-any */
import {motion} from "framer-motion"
import { StepConfig } from "@/types";

interface ExtractPanelProps{
    query: string;
    loading: boolean;
    setRouteInput: (query: string) => void;
    extractedData: any;
    setStep: StepConfig['setStep'];
    goBack: () => void;
}

export const ExtractStep = ({query, setRouteInput, loading, extractedData, setStep, goBack }: ExtractPanelProps) => 
   (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto p-6"
    >
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="space-y-4">
                <h3 className="text-lg font-bold">Extracted Data</h3>
                <div className="space-y-4">
                    {extractedData && (
                    <pre className="w-full h-96 bg-white shadow-lg p-4 rounded-lg font-mono text-sm  overflow-auto">
                        {JSON.stringify(extractedData, null, 2)}
                    </pre>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <button
                    onClick={goBack}
                    className="px-4 py-2 border border-foreground rounded-lg text-sm font-medium "
                    >
                    Back
                    </button>
                    <button
                    onClick={() => {
                        setStep('deploy');
                        setRouteInput(query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
                    }}
                    disabled={!extractedData || loading}
                    className="px-4 py-2 bg-primary rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                    Deploy API
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
    
  )

