/**
 * Token Refresh Service
 * Handles automatic token refresh when access token expires
 * Prevents circular dependencies between HTTP client and auth repositories
 */

// Store callbacks to avoid circular dependencies
let refreshTokenCallback: ((refreshToken: string) => Promise<{
  accessToken: string;
  expiresIn: number;
}>) | null = null;

let updateAccessTokenCallback: ((accessToken: string, expiresIn: number) => void) | null = null;

let getRefreshTokenCallback: (() => string | null) | null = null;

let clearAuthCallback: (() => void) | null = null;

/**
 * Initialize the token refresh service with necessary callbacks
 * This is called once during app initialization
 */
export function initTokenRefreshService(callbacks: {
  refreshToken: (refreshToken: string) => Promise<{
    accessToken: string;
    expiresIn: number;
  }>;
  updateAccessToken: (accessToken: string, expiresIn: number) => void;
  getRefreshToken: () => string | null;
  clearAuth: () => void;
}) {
  refreshTokenCallback = callbacks.refreshToken;
  updateAccessTokenCallback = callbacks.updateAccessToken;
  getRefreshTokenCallback = callbacks.getRefreshToken;
  clearAuthCallback = callbacks.clearAuth;

  console.log("[TokenRefreshService] Service initialized");
}

/**
 * Attempt to refresh the access token
 * @returns New access token if successful, null if refresh failed
 */
export async function attemptTokenRefresh(): Promise<string | null> {
  if (!refreshTokenCallback || !getRefreshTokenCallback || !updateAccessTokenCallback || !clearAuthCallback) {
    console.error("[TokenRefreshService] Service not initialized");
    return null;
  }

  const refreshToken = getRefreshTokenCallback();

  if (!refreshToken) {
    console.warn("[TokenRefreshService] No refresh token available");
    return null;
  }

  try {
    console.log("[TokenRefreshService] Attempting to refresh access token");

    const refreshResponse = await refreshTokenCallback(refreshToken);

    // Update the access token in the store
    updateAccessTokenCallback(refreshResponse.accessToken, refreshResponse.expiresIn);

    console.log("[TokenRefreshService] Token refreshed successfully");

    return refreshResponse.accessToken;
  } catch (error) {
    console.error("[TokenRefreshService] Failed to refresh token:", error);

    // Clear auth state (user needs to login again)
    clearAuthCallback();

    return null;
  }
}
