/* =========================================================
   🔐 authFetch.js
   Centralized authenticated fetch with token refresh
========================================================= */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const KEYCLOAK_BASE_URL = import.meta.env.VITE_KEYCLOAK_BASE_URL;
const REALM = import.meta.env.VITE_KEYCLOAK_REALM;
const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

/* =========================================================
   🔁 Refresh Access Token
========================================================= */
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) return null;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", CLIENT_ID);
    params.append("refresh_token", refreshToken);

    const response = await fetch(
      `${KEYCLOAK_BASE_URL}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    return data.access_token;
  } catch (error) {
    console.error("Token refresh failed", error);
    return null;
  }
}

/* =========================================================
   🌐 Authenticated Fetch Wrapper
========================================================= */
export async function authFetch(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");

  const makeRequest = (token) =>
    fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

  let response = await makeRequest(accessToken);

  // 🔴 Access token expired → try refresh
  if (response.status === 401) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      // 🔐 Session invalid → force login
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    response = await makeRequest(newToken);
  }

  return response;
}