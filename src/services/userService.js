import { useFetchWithAuth } from "../hooks/fetchWithAuth";

export function useUsersAPI() {
  const fetchWithAuth = useFetchWithAuth();

  const getAllUsers = async () => {
    try {
      const { data, error, status } = await fetchWithAuth(`/users`, {
        method: "GET",
      });

      if (status !== 200 || error)
        throw new Error(error || "Failed to fetch users");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUser = async (id) => {
    try {
      const { data, error, status } = await fetchWithAuth(`/users/get`, {
        method: "GET",
        params: { id },
      });

      if (status !== 200 || error)
        throw new Error(error || "Failed to fetch user");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createUser = async (userData) => {
    try {
      const { data, error, status } = await fetchWithAuth(`/users/create`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (status !== 201 || error)
        throw new Error(error || "Failed to create user");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/users/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ userId }),
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to delete user");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/users/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to update user");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
