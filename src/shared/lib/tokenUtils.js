import axios from "axios";
import { jwtDecode } from "jwt-decode";

/**
 * Check if JWT token is expired
 */
function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

/**
 * Get valid access token with auto-refresh
 */
export async function getValidAccessToken() {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken || isTokenExpired(accessToken)) {
    if (refreshToken) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/refresh-token`,
          { refreshToken }
        );
        accessToken = response.data.data.session.access_token;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", response.data.data.session.refresh_token);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return null;
      }
    }
  }
  return accessToken;
}

/**
 * Store authentication tokens
 */
export function setTokens(session) {
  localStorage.setItem("access_token", session.access_token);
  localStorage.setItem("refresh_token", session.refresh_token);
}

/**
 * Clear authentication tokens
 */
export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!localStorage.getItem("access_token");
}
