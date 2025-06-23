import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchRouteFromPoints, searchAddress } from "../services/routesService";
import { GarminBuilder } from "gpx-builder";

const { Point } = GarminBuilder.MODELS;

// Fix for default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const center = [46.603354, 1.888334];

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -40],
  shadowSize: [41, 41],
});

const AddMarkerOnClick = ({ addPoint }) => {
  useMapEvents({
    click: (e) => {
      addPoint(e.latlng);
    },
  });
  return null;
};

const Map = () => {
  const [points, setPoints] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const mapRef = useRef();

  const addPoint = useCallback((latlng) => {
    setPoints((pts) => [...pts, latlng]);
  }, []);

  const updatePoint = (index, newLatLng) => {
    setPoints((pts) => {
      const updated = [...pts];
      updated[index] = newLatLng;
      return updated;
    });
  };

  const addPointFromSearch = (feature) => {
    if (!feature?.geometry?.coordinates) return;
    const [lng, lat] = feature.geometry.coordinates;
    setPoints((pts) => [...pts, { lat, lng }]);
    setSearchText("");
    setSearchResults([]);
  };

  const exportToGPX = () => {
    const gpxData = new GarminBuilder();
    const gpxPoints = points.map((point) => new Point(point.lat, point.lng));
    gpxData.setSegmentPoints(gpxPoints);

    const gpxBlob = new Blob([gpxData.toString()], {
      type: "application/gpx+xml",
    });
    const url = URL.createObjectURL(gpxBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "itineraire.gpx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins > 0 ? `${mins} min` : ""}`;
    } else {
      return `${minutes} min`;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length >= 2) {
        searchAddress(searchText).then(setSearchResults);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (points.length < 2) {
      setRouteCoords([]);
      setDistance(0);
      setDuration(0);
      return;
    }

    const fetchRoute = async () => {
      setLoadingRoute(true);
      try {
        const { polyline, distance, duration } = await fetchRouteFromPoints(
          points
        );
        setRouteCoords(polyline);
        setDistance(distance);
        setDuration(duration);
      } catch {
        setRouteCoords([]);
        setDistance(0);
        setDuration(0);
      } finally {
        setLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [points]);

  return (
    <motion.section
      className="flex h-full lg:h-[calc(95vh-64px)] relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative flex-1 h-full min-h-0 m-2.5 rounded-lg overflow-hidden">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[500] w-[90%] max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Rechercher une adresse..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#70E575] focus:border-[#70E575] bg-white text-gray-700"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText.length >= 2 && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <motion.div
                  className="h-4 w-4 animate-spin rounded-full border-2 border-[#70E575] border-t-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              </div>
            )}
          </div>

          {searchResults.length > 0 && (
            <ul className="mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
              {searchResults.map((r, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addPointFromSearch(r)}
                >
                  {r.properties.label || r.properties.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {points.length > 0 && (
          <button
            className="absolute top-4 right-4 z-[500] bg-white p-2 rounded-full shadow hover:scale-105 transition-transform"
            title="Recentrer la carte"
            onClick={() => {
              const group = L.featureGroup(
                points.map((p) => L.marker([p.lat, p.lng]))
              );
              if (mapRef.current) {
                mapRef.current.fitBounds(group.getBounds().pad(0.2));
              }
            }}
          >
            🧭
          </button>
        )}

        <MapContainer
          center={center}
          zoom={6}
          minZoom={3}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <AddMarkerOnClick addPoint={addPoint} />
          {points.map((pos, i) => (
            <Marker
              key={i}
              position={[pos.lat, pos.lng]}
              icon={customIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  updatePoint(i, e.target.getLatLng());
                },
              }}
            >
              <Tooltip permanent direction="top" offset={[0, -30]}>
                #{i + 1}
              </Tooltip>
            </Marker>
          ))}
          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              color="#70E575"
              weight={5}
              opacity={0.7}
            />
          )}
        </MapContainer>
      </div>

      <div className="w-full lg:w-80 bg-white mt-2 p-5 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Itinéraire</h2>

        {points.length === 0 ? (
          <p className="text-gray-500 text-sm mb-4">
            Ajoutez des étapes sur la carte pour générer un itinéraire.
          </p>
        ) : (
          <div className="space-y-4 text-sm mb-4 flex-1 overflow-y-auto">
            {points.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-[#70E575]">
                  Étape {i + 1}
                </span>
                <span className="text-gray-600">
                  {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                </span>
              </div>
            ))}
          </div>
        )}

        {points.length >= 2 && !loadingRoute && (
          <div className="bg-[#f0fdf4] border-l-4 border-[#70E575] p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              <span className="font-medium">{points.length}</span> étapes —{" "}
              <span className="font-medium">{distance.toFixed(2)} km</span> —{" "}
              <span className="font-medium">
                {formatDuration(Math.ceil(duration))}
              </span>
            </p>
          </div>
        )}

        {loadingRoute && (
          <p className="text-blue-500 mb-4">Calcul de l'itinéraire...</p>
        )}

        <div className="mt-auto space-y-3">
          <button
            onClick={() => {
              setPoints([]);
              setRouteCoords([]);
              setDistance(0);
              setDuration(0);
            }}
            className="w-full py-3 px-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors duration-300 shadow-sm border border-red-200"
          >
            Réinitialiser
          </button>

          {points.length > 0 && (
            <button
              onClick={exportToGPX}
              className="w-full py-3 px-4 bg-[#70E575] text-white rounded-lg hover:bg-[#5bcc65] transition-colors duration-300 shadow-md"
            >
              Exporter GPX
            </button>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Map;
