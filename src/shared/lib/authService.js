import { setTokens, clearTokens, getValidAccessToken } from "./tokenUtils";

/**
 * Unified Authentication Service
 * Backend handles all role-based access via guards
 */
export const authService = {
  /**
   * Login user or admin
   */
  async login(credentials, apiClient) {
    const response = await apiClient.post("/api/auth/signin", credentials, {
      isProtected: false,
    });

    setTokens(response.data.session);
    return response.data;
  },

  /**
   * Logout and clear tokens
   */
  logout() {
    clearTokens();
  },

  /**
   * Get current token
   */
  async getToken() {
    return await getValidAccessToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem("access_token");
  },

  /**
   * Get user role from stored token
   */
  getUserRole() {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  },
};
