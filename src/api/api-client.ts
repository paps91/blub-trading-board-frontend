// api-client.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://blub-trading-board.onrender.com';

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      // Retirez credentials pour le mode temporaire
      // credentials: 'include',
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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      // Retirez credentials pour le mode temporaire
      // credentials: 'include',
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