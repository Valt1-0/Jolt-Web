const OPENROUTESERVICE_API_KEY = import.meta.env.VITE_ORS_KEY;

export async function snapToRoad({ lat, lng }) {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/snap-to-road?api_key=${OPENROUTESERVICE_API_KEY}&point.lon=${lng}&point.lat=${lat}`
    );
    const data = await response.json();
    if (!data?.features?.length) throw new Error("No snapped point");
    const [snappedLng, snappedLat] = data.features[0].geometry.coordinates;
    return { lat: snappedLat, lng: snappedLng };
  } catch (error) {
    console.warn("Snap échoué, on garde la position d'origine", error);
    return { lat, lng };
  }
}

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
