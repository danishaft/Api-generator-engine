'use client';
import { AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/useSearch';
import { useTransitioning } from '@/hooks/useTransition';
import { useStepManagement } from '@/hooks/useStepManagement';
import { useSchemaGeneration } from '@/hooks/useSchemaGeneration';
import { useExtraction } from '@/hooks/useExtraction';
import { useDeploy } from '@/hooks/useDeploy';
import { ErrorToast, FullScreenLoader, StepIndicator } from '@/components/common';
import { DeployStep, ExtractStep, InitialStep, SchemaStep, SourcesStep } from '@/components/steps';

export default function Home() {
  //hooks
  const {currentStep, goBack, setStep, step, steps} = useStepManagement();
  const { isTransitioning, transitionMessage, startTransition, endTransition } = useTransitioning();
  // Schema Generation
  const {
    query,
    setQuery,
    schemaStr,
    setSchemaStr,
    isGenerating,
    error,
    setError,
    generateSchema,
  } = useSchemaGeneration(setStep, startTransition, endTransition);

  const {
    handleSearch, 
    toggleResult, 
    searchResults, 
  } = useSearch(startTransition, endTransition, setStep, schemaStr);

  const { extractedData, handleExtraction, isExtracting, routeInput, setRouteInput} = useExtraction({startTransition, endTransition, setStep})

  const { apiKey, isDeploying, handleDeployAPI, deployedRoute, isDeployed, deployWarning} = useDeploy({startTransition, endTransition, step} )
  
  // 
  return (
    <div className="min-h-screen text-foreground">
      {/* Step indicator */}
      {step !== 'initial' && (
        <StepIndicator steps={steps} currentStep={currentStep} />
      )}

      {/* Main content */}
      <div className="relative">
        {/* Full-screen loading transition */}
        <AnimatePresence>
          {isTransitioning && (
            <FullScreenLoader message={transitionMessage} />
          )}
        </AnimatePresence>

        {/* Error Toast */}
        <ErrorToast error={error} onClose={() => setError(null)} />

        {/* All steps */}
        <AnimatePresence mode="wait">
          {step === 'initial' && (
            <InitialStep query={query} setQuery={setQuery} loading={isGenerating} onSubmit={generateSchema}/>
          )}
        
          {step === 'schema' && (
            <SchemaStep schemaStr={schemaStr} setSchemaStr={setSchemaStr} onSubmit={() => handleSearch(query)} goBack={goBack} />
          )}
          {step === 'sources' && (
              <SourcesStep  isTransitioning={isTransitioning} searchResults={searchResults} toggleResult={toggleResult} goBack={goBack} onSubmit={()=>handleExtraction(searchResults, query, schemaStr)}/>
          )}
          {step === 'extract' && (
            <ExtractStep query={query} setRouteInput={setRouteInput} extractedData={extractedData} setStep={setStep} loading={isExtracting} goBack={goBack}/>
          )}
          {step === 'deploy' && (
            <DeployStep
              loading={isDeploying}
              goBack={goBack}
              routeInput={routeInput}
              setRouteInput={setRouteInput}
              warning={deployWarning}
              handleDeploy={() => handleDeployAPI(extractedData, routeInput, query, schemaStr, searchResults )}
              isDeployed={isDeployed}
              apiKey={apiKey}
              deployedRoute={deployedRoute}
            />
          )} 
        </AnimatePresence>
      </div>
    </div>
  );
}
