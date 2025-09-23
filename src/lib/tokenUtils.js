import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Check if token is expired
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

// Get valid access token - simple version
export async function getValidAccessToken() {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  // If no token or expired, try to refresh
  if (!accessToken || isTokenExpired(accessToken)) {
    if (refreshToken) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`, { refreshToken });

        accessToken = response.data.access_token;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", response.data.refresh_token);
      } catch {
        // If refresh fails, clear tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }

  return accessToken;
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
