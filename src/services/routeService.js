import { useFetchWithAuth } from "../hooks/fetchWithAuth";

const OPENROUTESERVICE_API_KEY = import.meta.env.VITE_ORS_KEY;

export async function fetchRouteFromPoints(points) {
  try {
    const coords = points.map((p) => [p.lng, p.lat]);
    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/cycling-regular/geojson",
      {
        method: "POST",
        headers: {
          Authorization: OPENROUTESERVICE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinates: coords }),
      }
    );
    const data = await response.json();
    const route = data.features?.[0];
    if (!route) throw new Error("No route found");

    const polyline = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

    return {
      polyline,
      distance: route.properties.summary.distance / 1000,
      duration: route.properties.summary.duration / 60,
    };
  } catch (err) {
    console.error("Erreur itinéraire ORS:", err);
    throw err;
  }
}

export async function searchAddress(query) {
  try {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.features || [];
  } catch (err) {
    console.error("Erreur lors de la recherche d'adresse :", err);
    return [];
  }
}

export function useRoutesAPI() {
  const fetchWithAuth = useFetchWithAuth();

  const addNavigation = async (navigationData) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/navigate/`,
        {
          method: "POST",
          body: JSON.stringify(navigationData),
        },
        {
          protected: true,
        }
      );

      if (status !== 201 || error) {
        throw new Error(error || "Failed to add navigation");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getNavigations = async (options) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/navigate${options}`,
        {
          method: "GET",
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error) {
        throw new Error(error || "Failed to fetch navigations");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getNavigationById = async (id) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/navigate/${id}`,
        {
          method: "GET",
        },
        {
          protected: true,
        }
      );

      console.log("getNavigationById response:", data, error, status);

      if (status !== 200 || error) {
        throw new Error(error || "Failed to delete navigation");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateNavigationVisibility = async (id) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/navigate/${id}/visibility`,
        {
          method: "PATCH",
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error) {
        throw new Error(error || "Failed to update navigation visibility");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteNavigation = async (id) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/navigate/${id}`,
        {
          method: "DELETE",
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error) {
        throw new Error(error || "Failed to delete navigation");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateNavigation = async (id, navigationData) => {
    try {
      const { data, error, status } = await fetchWithAuth(
        `/navigate/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(navigationData),
        },
        {
          protected: true,
        }
      );

      if (status !== 200 || error) {
        throw new Error(error || "Failed to update navigation");
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    addNavigation,
    getNavigations,
    getNavigationById,
    updateNavigationVisibility,
    deleteNavigation,
    updateNavigation,
  };
}
