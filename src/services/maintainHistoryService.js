import { useFetchWithAuth } from "../hooks/fetchWithAuth";

export function useMaintainsHistoryAPI() {
  const fetchWithAuth = useFetchWithAuth();

  const createMaintainHistory = async (maintainData) => {
    const { data, error, status } = await fetchWithAuth(
      `/maintainHistory`,
      {
        method: "POST",
        body: maintainData,
      },
      {
        protected: true,
      }
    );

    if (error || status !== 201) {
      throw new Error(
        "Erreur lors de la création de l'historique de maintenance"
      );
    }

    return data;
  };

  const getMaintainHistories = async (query) => {
    let url = `/maintainHistory`;
    if (query) {
      url += `?vehicleId=${query}`;
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

    if (error || status !== 200) {
      throw new Error(
        "Erreur lors de la récupération des historiques de maintenance"
      );
    }

    return data;
  };

  return { createMaintainHistory, getMaintainHistories };
}
