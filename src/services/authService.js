import { useFetchWithAuth } from "../hooks/fetchWithAuth";

export function useAuthAPI() {
  const fetchWithAuth = useFetchWithAuth();

  const login = async (userData) => {
    try {
      const { data, error, status } = await fetchWithAuth(`/auth/getToken`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (status !== 200 || error) throw new Error(error || "Login failed");

      return await data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { data, error, status } = await fetchWithAuth(`/auth/register`, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (status !== 201 || error)
        throw new Error(error || "Registration failed");
      return await data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const verifyEmail = async (token) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/users/verifyEmail?token=${token}`,
        {
          method: "GET",
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Verification failed");

      return await data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { login, register, verifyEmail };
}
