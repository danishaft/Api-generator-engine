
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { JsonSchema, SearchResult, StepConfig } from '@/types';

interface ExtractProps {
  startTransition: (message: string) => void;
  endTransition: () => void;
  setStep: StepConfig['setStep'];
}

export const useExtraction = ({ startTransition, endTransition, setStep }: ExtractProps) => {
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [routeInput, setRouteInput] = useState('');

  const handleExtraction = async (
    searchResults: SearchResult[],
    query: string,
    schema: string
  ) => {
    const selectedUrls = [
        ...searchResults.filter(r => r.selected).map(r => r.url),
    ];
    if (selectedUrls.length === 0){
        setExtractError('Please select at least one source or enter a custom URL');
        return;
    }

    setIsExtracting(true);
    setExtractError(null);
    startTransition('Extracting data from sources...');

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: selectedUrls,
          query,
          schema: JSON.parse(schema) as JsonSchema,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to extract data');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Extraction failed');
      }

      setExtractedData(data.data);
      setStep('extract');
    } catch (error) {
      console.error('Extraction error:', error);
      setExtractError(
        error instanceof Error 
          ? `Extraction failed: ${error.message}` 
          : 'Failed to extract data from sources'
      );
    } finally {
      setIsExtracting(false);
      endTransition();
    }
  };

  return {
    extractedData,
    isExtracting,
    extractError,
    setExtractError,
    handleExtraction,
    setRouteInput,
    routeInput
  };
};