const API_BASE_URL = 'http://localhost:8000';

class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('marketmind_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if (!response.ok) {
      throw new ApiError(
        data?.error || data?.message || 'An error occurred',
        response.status,
        data
      );
    }
    
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      'Unable to connect to server. Please ensure the backend is running.',
      0,
      error
    );
  }
}

export const api = {
  // Health check
  async checkHealth() {
    return fetchApi<{ status: string; message: string }>('/health');
  },
  
  // Auth endpoints
  async register(email: string, password: string, name?: string) {
    return fetchApi<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },
  
  async login(email: string, password: string) {
    return fetchApi<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  // Onboarding
  async saveOnboarding(data: {
    businessName: string;
    businessType?: string;
    industry: string;
    goals: string[];
    platforms: string[];
    experience: string;
    teamSize: string;
    businessDescription?: string;
    businessMessage?: string;
  }) {
    return fetchApi<{ success: boolean; message: string; data: any }>('/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Dashboard
  async getDashboard() {
    return fetchApi<{
      metrics: any;
      weeklyData: any[];
      platforms: any[];
      insights: any[];
    }>('/dashboard');
  },
  
  // Ideas
  async generateIdeas(data: {
    businessType?: string;
    industry: string;
    goals: string[];
    platforms: string[];
  }) {
    return fetchApi<{ ideas: any[]; generatedAt: string }>('/ideas/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Analyze
  async analyzeContent(data: {
    platform: string;
    contentType: string;
    contentUrl?: string;
  }) {
    return fetchApi<{
      score: number;
      good: string[];
      issues: string[];
      tips: string[];
      platform: string;
      contentType: string;
      analyzedAt: string;
    }>('/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Schedule
  async schedulePost(data: {
    postId?: string;
    scheduledTime: string;
    platform: string;
    content: any;
  }) {
    return fetchApi<{
      success: boolean;
      scheduledPost: any;
    }>('/schedule', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Create
  async createContent(data: {
    contentType: string;
    brandProfile: any;
    prompt?: string;
  }) {
    return fetchApi<{
      success: boolean;
      content: any;
    }>('/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export { ApiError };
