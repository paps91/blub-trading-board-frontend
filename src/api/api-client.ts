// api-client.ts
export const apiClient = {
    get: async (endpoint: string) => {
      // Assurer que l'endpoint commence par un slash
      const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      
      const response = await fetch(path, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    post: async (endpoint: string, data: any) => {
      // Assurer que l'endpoint commence par un slash
      const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      
      const response = await fetch(path, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Error: ${response.status} ${response.statusText}` +
          (errorData?.detail ? ` - ${errorData.detail}` : '')
        );
      }
      
      return response.json();
    }
  };