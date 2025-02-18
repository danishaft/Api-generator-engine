 export type StepType = 'initial'| 'schema' | 'sources' | 'extract' | 'deploy';

 export interface Step {
  number: number;
  title: string;
  description: string;
}
export interface StepConfig {
  step: StepType;
  setStep: (step: StepType) => void;
}
export interface Route {
    route: string;
    created: string;
  }
  
  export interface RouteConfig {
    urls: string[];
    schema: string;
    prompt: string;
    searchQuery?: string;
    updatedAt: string;
  }
  
  export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
    favicon?: string;
    selected: boolean;
  }
  
  export interface JsonSchemaProperty {
    type: string;
    description?: string;
  }
  
  export interface JsonSchema {
    type: string;
    properties: Record<string, JsonSchemaProperty>;
    required?: string[];
  }
  
  export interface ScrapeResult {
    success: boolean;
    data?: unknown;
    error?: unknown;
  }
  
  // export interface ApiResponse<T> {
  //   success: boolean;
  //   data?: T;
  //   error?: string;
  // }

  // export interface SchemaGenerationResponse {
  //   schema: JsonSchema;
  //   error?: string;
  // }