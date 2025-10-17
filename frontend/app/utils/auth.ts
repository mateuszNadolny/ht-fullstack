// Authentication utility functions

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:5003/auth/check", {
      method: "GET",
      credentials: "include", // Important: sends cookies
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.authenticated;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};

// Note: Cookies are now set by the backend via Set-Cookie header
// These functions are kept for compatibility but cookies should be managed by backend
export const setAuthToken = (token: string): void => {
  // Cookies are set by backend via httpOnly flag
  // This is a no-op now but kept for compatibility
  console.warn("setAuthToken: Cookies are managed by the backend");
};

export const removeAuthToken = (): void => {
  // Cookies should be removed by backend
  // This is a no-op now but kept for compatibility
  console.warn(
    "removeAuthToken: Cookies should be cleared by backend logout endpoint"
  );
};
