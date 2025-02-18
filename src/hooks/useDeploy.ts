/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepConfig, SearchResult } from "@/types";
import { useEffect, useState } from "react";

interface DeployProps {
  startTransition: (message: string) => void;
  endTransition: () => void;
  step: StepConfig['step'];
}

export const useDeploy = ({startTransition, endTransition, step}:DeployProps) => {
    const [isDeployed, setIsDeployed] = useState(false);
    const [deployedRoute, setDeployedRoute] = useState('');
    const [isDeploying, setIsDeploying] = useState(false)
    const [deployWarning, setDeployWarning] = useState<string | null>(null);
    const [apiKey] = useState('sk_' + Math.random().toString(36).substr(2, 10));

    // Reset deployment state when going back
      useEffect(() => {
        if (step !== 'deploy') {
          setIsDeployed(false);
          setDeployWarning(null);
        }
      }, [step]);

    const handleDeployAPI = async (extractedData: any, routeInput: string, query: string, schemaStr: string, searchResults: SearchResult[]  ) => {
      if (!extractedData) return;
      startTransition('Deploying...');
      setIsDeploying(true)
      try{
        // Format the request body according to the API schema
        const requestBody = {
          key: routeInput,
          data: {
            data: extractedData,
            metadata: {
              query: query,
              schema: JSON.parse(schemaStr),
              sources: [
                ...searchResults.filter(r => r.selected).map(r => r.url),
              ],
              lastUpdated: new Date().toISOString()
            }
          },
          route: routeInput
        };
        const response = await fetch('/api/deploy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (data.success) {
          setIsDeployed(true);
          setDeployedRoute(`/api/results/${routeInput}`);
        }
        if (!data.success) {
          throw new Error(data.error || 'Failed to deploy API');
        }
        return data;
      }catch(error: any){
        console.error('Error:', error);
        // setError(error instanceof Error ? error.message : 'Failed to deploy API');
      }finally{
        setIsDeploying(false)
        endTransition();
      }
    };
  
    return { isDeployed, deployedRoute, handleDeployAPI, apiKey, isDeploying, deployWarning };
  };
  