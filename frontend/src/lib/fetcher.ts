// API fetcher utilities
import { ApiResponse, PaginatedResponse } from '@/types';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base fetcher function
async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      errorData
    );
  }

  return response.json();
}

// GET request
export async function get<T>(url: string, options?: RequestInit): Promise<T> {
  return fetcher<T>(url, { ...options, method: 'GET' });
}

// POST request
export async function post<T>(
  url: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

// PUT request
export async function put<T>(
  url: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

// DELETE request
export async function del<T>(url: string, options?: RequestInit): Promise<T> {
  return fetcher<T>(url, { ...options, method: 'DELETE' });
}

// PATCH request
export async function patch<T>(
  url: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

// API client with base URL
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return get<T>(`${this.baseUrl}${endpoint}`, options);
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return post<T>(`${this.baseUrl}${endpoint}`, data, options);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return put<T>(`${this.baseUrl}${endpoint}`, data, options);
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return del<T>(`${this.baseUrl}${endpoint}`, options);
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return patch<T>(`${this.baseUrl}${endpoint}`, data, options);
  }
}

// Default API client instance
export const api = new ApiClient();

// Utility functions for common API patterns
export const apiUtils = {
  // Handle API responses with error checking
  async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    return response.json();
  },

  // Create query string from object
  createQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, String(item)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return searchParams.toString();
  },

  // Build URL with query parameters
  buildUrl(baseUrl: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) {
      return baseUrl;
    }

    const queryString = apiUtils.createQueryString(params);
    return `${baseUrl}?${queryString}`;
  },
};

export { ApiError };
export default fetcher;
