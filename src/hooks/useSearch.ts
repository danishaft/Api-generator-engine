/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResult, StepConfig } from "@/types";
import { useState } from "react";

export const useSearch = (startTransition: (message: string) => void, endTransition: () => void, setStep: StepConfig['setStep'], schemaStr: string) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
  
    const handleSearch = async (query: string) => {
      if(!schemaStr) return
      setIsSearching(true);
      setSearchResults([]);
      startTransition('Searching for relevant sources...');
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }), 
        });
        const data = await response.json();
        setStep('sources');
        setSearchResults(data.organic.map((r: any, index: number) => ({
          title: r.title,
          url: r.link,
          snippet: r.snippet,
          favicon: `https://www.google.com/s2/favicons?domain=${new URL(r.link).hostname}`,
          selected: index === 0
        })));
      } finally {
        setIsSearching(false);
        endTransition();
      }
    };

    const toggleResult = (index: number) => {
      setSearchResults(prev =>
        prev.map((result, i) =>
          i === index ? { ...result, selected: !result.selected } : result
        )
      );
    };


  
    return { searchResults, isSearching, handleSearch, toggleResult };
  };
  