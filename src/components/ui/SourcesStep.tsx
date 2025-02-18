/* eslint-disable @typescript-eslint/no-explicit-any */

import { Check, Plus, ExternalLink } from "lucide-react"; 
import { motion } from "framer-motion";

  interface SourcesStepProps {
    goBack: () => void;
    toggleResult: (index: number) => void;
    onSubmit: () => void;
    isTransitioning: boolean;
    searchResults: any[];
  }

  

  export const SourcesStep = ({isTransitioning, searchResults, goBack, toggleResult, onSubmit}: SourcesStepProps) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto space-y-6"
      >
      <div className="px-6 pb-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          {searchResults.length === 0 ? (
            <div className=" text-center py-8">
              <p className="text-sm">No search results found. Please try a different query.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className={`bg-background hover:shadow-lg border-2 border-[#757677] rounded-lg p-4 cursor-pointer transition-all ${
                    result.selected ? "ring-2 ring-primary border-none" : ""
                  }`}
                  onClick={() => toggleResult(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                      <h4 className="font-medium ">{result.title}</h4>
                      <p className="mt-1 text-sm text-[#757677]">{result.snippet}</p>
                      <p className="mt-2 text-xs text-[#757677]">{result.url}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1.5 rounded-md ${
                          result.selected
                            ? "bg-primary text-white"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        {result.selected ? (
                        <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Buttons at the bottom */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={goBack}
              className="px-4 py-2 border-foreground border rounded-lg text-sm font-medium "
            >
              Back
            </button>
            <button
              onClick={onSubmit}
              disabled={!searchResults.some((r) => r.selected) || isTransitioning}
              className="px-4 py-2 bg-primary rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
  