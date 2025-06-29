import { useFetchWithAuth } from "../hooks/fetchWithAuth";

export function useVehiclesAPI() {
  const fetchWithAuth = useFetchWithAuth();

  const getAllVehicles = async (userId) => {
    let url = `/vehicle`;
    if (userId) {
      url += `?userId=${userId}`;
    }

    const {data, error, status} = await fetchWithAuth(
      url,
      {
        method: "GET",
      },
      {
        protected: true,
      }
    );

    if (status !== 200 || error || !data) {
      throw new Error(error || (data && data.error) || "Failed to fetch vehicles");
    }

    return data;
  };

  const getVehicleById = async (vehicleId) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/vehicle/${vehicleId}`,
        {
          method: "GET",
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to fetch vehicle");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/vehicle/${vehicleId}`,
        {
          method: "DELETE",
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to delete vehicle");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateVehicle = async (vehicleId, vehicleData) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/vehicle/${vehicleId}`,
        {
          method: "PATCH",
          body: JSON.stringify(vehicleData),
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error)
        throw new Error(error || "Failed to update vehicle");

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    getAllVehicles,
    getVehicleById,
    deleteVehicle,
    updateVehicle,
  };
}
