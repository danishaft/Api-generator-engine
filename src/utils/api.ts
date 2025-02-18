
export const getApiUrl = (path: string) => {
    const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || 'http://localhost:3000';
    return `${apiRoute}${path}`;
  };
  
  export const isValidJson = (json: string) => {
    try {
      JSON.parse(json);
      return true;
    } catch (e: any) {
      return false;
    }
  };

  export const apiService = {
    async request(endpoint: string, options: RequestInit): Promise<any> {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
          ...options,
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'An error occurred');
        }
  
        return data;
      } catch (error) {
        if (error) {
          throw error;
        }
      }
    },
    
    //generate schema route
    generateSchema: (query: string) => 
      apiService.request('/api/generate-schema', {
        method: 'POST',
        body: JSON.stringify({ query }),
      }),
  
    // deployAPI: (deployData: any) => 
    //   apiService.request<ApiResponse<any>>('/api/deploy', {
    //     method: 'POST',
    //     body: JSON.stringify(deployData),
    //   }),
  
    // checkRoutes: () => 
    //   apiService.request<ApiResponse<string[]>>('/api/routes', {
    //     method: 'GET',
    //   }),
  };
  
  