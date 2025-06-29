import { useFetchWithAuth } from "../hooks/fetchWithAuth";

export function useMaintainsTypesAPI() {
  const fetchWithAuth = useFetchWithAuth();

  const createMaintainType = async (maintainTypeData) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/maintain`,
        {
          method: "POST",
          body: JSON.stringify(maintainTypeData),
        },
        {
          protected: true,
        }
      );

      if (status !== 201 || error)
        throw new Error(error || "Failed to create maintain");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAllMaintainsTypes = async (query) => {
    try {
      let url = `/maintain`;
      if (query) {
        url += `?query=${query}`;
      }
      const { data, error, status } = await fetchWithAuth(
        url,
        {
          method: "GET",
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to fetch maintains");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getMaintainTypeById = async (maintainTypeId) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/maintain/${maintainTypeId}`,
        {
          method: "GET",
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to fetch maintain");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateMaintainType = async (maintainTypeId, maintainTypeData) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/maintain/${maintainTypeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(maintainData),
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to update maintain");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteMaintainType = async (maintainTypeId) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/maintain/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ maintainTypeId }),
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to delete maintain");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getAllMaintainsTypes,
    getMaintainTypeById,
    createMaintainType,
    updateMaintainType,
    deleteMaintainType,
  };
}
