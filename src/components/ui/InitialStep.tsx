import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

import { EXAMPLE_QUERY } from '@/utils/constants';
import React from 'react';


interface InitialStepProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const InitialStep = ({ query, setQuery, onSubmit, loading }: InitialStepProps) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-2xl mx-auto">
    <h1 className="text-4xl font-bold mb-2">API Auto-Pilot</h1>
    <p className="text-[#757677] text-lg mb-12 text-center">
      Automatically Build and deploy AI-powered APIs in an instance.
    </p>
    <div className="w-full">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query && !loading) {
              onSubmit();
            }
          }}
          placeholder={EXAMPLE_QUERY}
          className="w-full px-4 py-3 bg-white border  rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
        <button
          onClick={onSubmit}
          disabled={!query || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            ) : (
            <BiSearch className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  </div>
);