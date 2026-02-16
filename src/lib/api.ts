const API_BASE_URL = 'http://localhost:8000';

interface User {
  id: string;
  email: string;
  name: string;
}

interface OnboardingData {
  businessName: string;
  businessType?: string;
  industry: string;
  goals: string[];
  platforms: string[];
  experience: string;
  teamSize: string;
  businessDescription?: string;
  businessMessage?: string;
}

interface DashboardMetrics {
  metrics: Record<string, unknown>;
  weeklyData: unknown[];
  platforms: unknown[];
  insights: unknown[];
}

interface ContentIdea {
  id: number;
  type: string;
  title: string;
  hook: string;
  structure: string;
  cta: string;
  trending: boolean;
}

interface AnalysisResult {
  score: number;
  good: string[];
  issues: string[];
  tips: string[];
  platform: string;
  contentType: string;
  analyzedAt: string;
}

class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: unknown) {
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
    return fetchApi<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },
  
  async login(email: string, password: string) {
    return fetchApi<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  // Onboarding
  async saveOnboarding(data: OnboardingData) {
    return fetchApi<{ success: boolean; message: string; data: OnboardingData }>('/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Dashboard
  async getDashboard() {
    return fetchApi<DashboardMetrics>('/dashboard');
  },
  
  // Ideas
  async generateIdeas(data: {
    businessType?: string;
    industry: string;
    goals: string[];
    platforms: string[];
  }) {
    return fetchApi<{ ideas: ContentIdea[]; generatedAt: string }>('/ideas/generate', {
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
    return fetchApi<AnalysisResult>('/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Schedule
  async schedulePost(data: {
    postId?: string;
    scheduledTime: string;
    platform: string;
    content: unknown;
  }) {
    return fetchApi<{
      success: boolean;
      scheduledPost: unknown;
    }>('/schedule', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Create
  async createContent(data: {
    contentType: string;
    brandProfile: unknown;
    prompt?: string;
  }) {
    return fetchApi<{
      success: boolean;
      content: unknown;
    }>('/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export { ApiError };
