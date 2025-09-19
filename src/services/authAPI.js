// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

console.log("🔗 API_BASE_URL:", API_BASE_URL);
console.log("🔗 process.env.REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem("authToken");
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }

  // Get authentication token
  getToken() {
    return this.token || localStorage.getItem("authToken");
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem("authToken");
  }

  // Default headers for requests
  getHeaders(includeAuth = false) {
    const headers = {
      "Content-Type": "application/json",
    };

    if (includeAuth && this.getToken()) {
      headers["Authorization"] = `Bearer ${this.getToken()}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.includeAuth),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
        status: response.status,
      };
    } catch (error) {
      console.error("API Request Error:", error);

      // Handle network errors
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Network error. Please check your internet connection and make sure the API server is running."
        );
      }

      // Handle authentication errors
      if (
        error.message.includes("401") ||
        error.message.includes("Access denied")
      ) {
        this.removeToken();
        throw new Error("Session expired. Please sign in again.");
      }

      throw error;
    }
  }

  // GET request
  async get(endpoint, includeAuth = false) {
    return this.request(endpoint, {
      method: "GET",
      includeAuth,
    });
  }

  // POST request
  async post(endpoint, data, includeAuth = false) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      includeAuth,
    });
  }

  // PUT request
  async put(endpoint, data, includeAuth = false) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      includeAuth,
    });
  }

  // DELETE request
  async delete(endpoint, includeAuth = false) {
    return this.request(endpoint, {
      method: "DELETE",
      includeAuth,
    });
  }
}

// Authentication API methods
class AuthAPI extends ApiService {
  // User signup
  async signup(userData) {
    try {
      const response = await this.post("/api/auth/signup", userData);
      return response;
    } catch (error) {
      throw new Error(error.message || "Signup failed. Please try again.");
    }
  }

  // User signin
  async signin(credentials) {
    try {
      const response = await this.post("/api/auth/signin", credentials);

      // Store token if signin successful
      if (response.success && response.data.token) {
        this.setToken(response.data.token);
      }

      return response;
    } catch (error) {
      throw new Error(
        error.message || "Signin failed. Please check your credentials."
      );
    }
  }

  // Verify OTP
  async verifyOTP(otpData) {
    try {
      const response = await this.post("/api/auth/verify-otp", otpData);

      // Store token if verification successful
      if (response.success && response.data.token) {
        this.setToken(response.data.token);
      }

      return response;
    } catch (error) {
      throw new Error(
        error.message || "OTP verification failed. Please try again."
      );
    }
  }

  // Resend OTP
  async resendOTP(email) {
    try {
      const response = await this.post("/api/auth/resend-otp", { email });
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Failed to resend OTP. Please try again."
      );
    }
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await this.get("/api/auth/me", true);
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch user profile.");
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await this.put("/api/auth/profile", profileData, true);
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to update profile.");
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await this.post("/api/auth/forgot-password", { email });
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to send password reset email.");
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await this.post("/api/auth/reset-password", resetData);
      return response;
    } catch (error) {
      throw new Error(error.message || "Failed to reset password.");
    }
  }

  // Signout
  signout() {
    this.removeToken();
    return Promise.resolve({
      success: true,
      message: "Signed out successfully",
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
}

// Create instances
const apiService = new ApiService();
const authAPI = new AuthAPI();

// Export both the service classes and instances
export { ApiService, AuthAPI, apiService, authAPI };

// Default export for convenience
export default authAPI;
