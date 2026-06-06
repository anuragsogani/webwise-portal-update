import { getApiBaseUrl } from "../lib/apiBaseUrl";

function apiUrl(path: string): string {
  return `${getApiBaseUrl()}${path}`;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(apiUrl("/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      let detail = "Login failed";
      try {
        const payload = await response.json();
        if (Array.isArray(payload?.detail)) {
          detail = payload.detail.map((err: any) => err.msg).join(", ");
        } else {
          detail = payload?.detail || detail;
        }
      } catch {
        // use default
      }
      throw new Error(detail);
    }

    const data = await response.json();
    localStorage.setItem("airat_token", data.access_token);
    return data;
  },

  logout: () => {
    localStorage.removeItem("airat_token");
  },

  getToken: () => {
    return localStorage.getItem("airat_token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("airat_token");
  },
};
