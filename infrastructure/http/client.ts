/**
 * HTTP Client
 * Wrapper around fetch API with error handling, interceptors, and type safety
 */

export interface HttpClient {
  get<T>(url: string, options?: RequestInit): Promise<HttpResponse<T>>;
  post<T>(url: string, body?: unknown, options?: RequestInit): Promise<HttpResponse<T>>;
  put<T>(url: string, body?: unknown, options?: RequestInit): Promise<HttpResponse<T>>;
  delete<T>(url: string, options?: RequestInit): Promise<HttpResponse<T>>;
  patch<T>(url: string, body?: unknown, options?: RequestInit): Promise<HttpResponse<T>>;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public response?: any
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/**
 * Configuration for HTTP Client
 */
export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Create HTTP Client
 * Factory function to create a configured HTTP client instance
 */
export function createHttpClient(config: HttpClientConfig = {}): HttpClient {
  const {
    baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout = 30000,
    headers: defaultHeaders = {},
  } = config;

  /**
   * Build full URL
   */
  const buildURL = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${baseURL}${url.startsWith('/') ? url : `/${url}`}`;
  };

  /**
   * Build request headers
   */
  const buildHeaders = (customHeaders?: HeadersInit): Headers => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...defaultHeaders,
    });

    if (customHeaders) {
      const customHeadersObj = customHeaders instanceof Headers
        ? Object.fromEntries(customHeaders.entries())
        : customHeaders;

      Object.entries(customHeadersObj).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          headers.set(key, String(value));
        }
      });
    }

    return headers;
  };

  /**
   * Handle fetch with timeout
   */
  const fetchWithTimeout = async (
    url: string,
    options: RequestInit
  ): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new HttpError('Request timeout', 408, 'Request Timeout');
      }
      throw error;
    }
  };

  /**
   * Process response
   */
  const processResponse = async <T>(response: Response): Promise<HttpResponse<T>> => {
    const contentType = response.headers.get('content-type');
    const isJSON = contentType?.includes('application/json');

    let data: any;

    if (isJSON) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new HttpError(
        data?.message || response.statusText || 'Request failed',
        response.status,
        response.statusText,
        data
      );
    }

    return {
      data: data as T,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  };

  /**
   * Make request
   */
  const request = async <T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<HttpResponse<T>> => {
    const fullURL = buildURL(url);
    const headers = buildHeaders(options?.headers);

    const requestOptions: RequestInit = {
      method,
      headers,
      ...options,
    };

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetchWithTimeout(fullURL, requestOptions);
      return await processResponse<T>(response);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new HttpError(
          error.message,
          0,
          'Network Error'
        );
      }
      throw new HttpError(
        'Unknown error occurred',
        0,
        'Unknown Error'
      );
    }
  };

  return {
    get: <T>(url: string, options?: RequestInit) =>
      request<T>('GET', url, undefined, options),

    post: <T>(url: string, body?: unknown, options?: RequestInit) =>
      request<T>('POST', url, body, options),

    put: <T>(url: string, body?: unknown, options?: RequestInit) =>
      request<T>('PUT', url, body, options),

    delete: <T>(url: string, options?: RequestInit) =>
      request<T>('DELETE', url, undefined, options),

    patch: <T>(url: string, body?: unknown, options?: RequestInit) =>
      request<T>('PATCH', url, body, options),
  };
}

/**
 * Default HTTP Client Instance
 * Pre-configured with default settings
 */
export const httpClient = createHttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});
