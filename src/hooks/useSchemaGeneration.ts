import { StepConfig } from "@/types";
import { apiService } from "@/utils/api";
import { useState } from "react";

export const useSchemaGeneration = (setStep: StepConfig['setStep'], startTransition: (message: string) => void, endTransition: () => void) => {
    const [query, setQuery] = useState('');
    const [schemaStr, setSchemaStr] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const generateSchema = async () => {
      if (!query || isGenerating) return;
      setStep('schema');
      startTransition('Generating schema...');
      setIsGenerating(true);
      setError(null);
  
      try {
        const response = await apiService.generateSchema(query);
        setSchemaStr(JSON.stringify(response.schema, null, 2));
        return response.schema;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to generate schema');
        return null;
      } finally {
        setIsGenerating(false);
        endTransition()
      }
    };
  
    return {
      query,
      setQuery,
      schemaStr,
      setSchemaStr,
      isGenerating,
      error,
      setError,
      generateSchema,
    };
  };