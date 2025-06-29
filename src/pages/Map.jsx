import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
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
import {
  useRoutesAPI,
  fetchRouteFromPoints,
  searchAddress,
} from "../services/routeService";
import { GarminBuilder } from "gpx-builder";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";

const center = [46.603354, 1.888334];

const customDivIcon = (index) =>
  L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div class="relative w-6 h-6">
        <div class="w-6 h-6 bg-[#56C15D] text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-sm">
          ${index + 1}
        </div>
        <div class="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#56C15D]"></div>
      </div>
    `,
    iconSize: [24, 28],
    iconAnchor: [12, 28],
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
  const [shouldCenterMap, setShouldCenterMap] = useState(false);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  const [mode, setMode] = useState("create"); // "create" | "edit" | "view"

  const mapRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const { getNavigationById, updateNavigation, addNavigation } = useRoutesAPI();

  // Ajout point depuis la carte
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
    const { Point } = GarminBuilder.MODELS;
    const gpxData = new GarminBuilder();

    const gpxPoints = points.map(
      (point) =>
        new Point(point.lat, point.lng, {
          ele: 0,
          time: new Date(), // optionnel : ajoute un timestamp
        })
    );

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

  // Adresse
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length >= 2) {
        searchAddress(searchText).then(setSearchResults);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (id) {
      const fetchNavigation = async () => {
        try {
          const response = await getNavigationById(id);
          if (response?.data?.gpxPoints) {
            const gpxPoints = response.data.gpxPoints.map((point) => ({
              lat: point.lat,
              lng: point.lon,
            }));
            setPoints(gpxPoints);
            setName(response.data.name || "");
            setIsOwner(response.data.isOwner);
            setIsGroup(response.data.isGroup || false);

            // 👇 Logique corrigée ici
            if (response.data.isOwner) {
              setMode("edit");
            } else {
              setMode("view");
            }

            setShouldCenterMap(true);
          }
        } catch (error) {
          console.error("Erreur fetch trajet :", error);
        }
      };

      fetchNavigation();
    } else {
      setMode("create");
    }
  }, [location.search]);

  // Recentrer la carte
  useEffect(() => {
    if (shouldCenterMap && points.length > 0 && mapRef.current) {
      const group = L.featureGroup(points.map((p) => L.marker([p.lat, p.lng])));
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
      setShouldCenterMap(false);
    }
  }, [points, shouldCenterMap]);

  // Calcul d'itinéraire
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

  const handleUpdateTrip = async () => {
    try {
      await updateNavigation(id, {
        name,
        gpxPoints: points.map((point) => ({
          lat: point.lat,
          lon: point.lng,
          alt: 0,
          time: new Date(),
          speed: 0,
        })),
        totalDistance: distance * 1000,
        duration,
        isGroup,
      });
      setShowUpdateModal(false);
      toast.success("Trajet mis à jour avec succès !");
      setTimeout(() => {
        navigate("/roadbook");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour du trajet.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [hours, minutes] = startTime.split(":");
    const date = new Date();
    date.setHours(hours, minutes);

    try {
      await addNavigation({
        name,
        startTime: date,
        gpxPoints: points.map((point) => ({
          lat: point.lat,
          lon: point.lng,
          alt: 0,
          time: new Date(),
          speed: 0,
        })),
        totalDistance: distance * 1000,
        isGroup,
      });
      document.getElementById("my_modal").close();
      setName("");
      setStartTime("");
      toast.success("Itinéraire ajouté avec succès !");
      setTimeout(() => {
        navigate("/roadbook");
      }, 2000);
    } catch (error) {
      console.error("Failed to add navigation:", error);
      toast.error("Erreur lors de l'ajout de l'itinéraire.");
    }
  };

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
              <FaSearch className="text-gray-500" />
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
            onClick={() => setShouldCenterMap(true)}
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
              icon={customDivIcon(i)}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  updatePoint(i, e.target.getLatLng());
                },
              }}
            ></Marker>
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
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Itinéraire</h2>
        <p className="text-gray-500 text-sm mb-4">
          <span className="font-medium text-gray-700">Cliquez</span> sur la
          carte pour ajouter une étape,&nbsp; puis{" "}
          <span className="font-medium text-gray-700">glissez</span> les
          marqueurs pour les repositionner.
        </p>
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

        <div className="flex items-center justify-between mb-4">
          <label
            htmlFor="isGroup"
            className="text-sm font-medium text-gray-700"
          >
            Trajet de groupe
          </label>
          <input
            id="isGroup"
            type="checkbox"
            className="toggle toggle-success"
            checked={isGroup}
            onChange={() => setIsGroup(!isGroup)}
          />
        </div>

        <div className="mt-auto space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPoints([]);
              setRouteCoords([]);
              setDistance(0);
              setDuration(0);
            }}
            className="w-full py-3 px-6 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow-sm hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-colors duration-200 select-none"
          >
            Réinitialiser
          </motion.button>

          {points.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportToGPX}
              className="w-full py-3 px-6 rounded-lg bg-[#70E575] text-white font-semibold shadow-md hover:bg-[#5bcc65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70E575] transition-colors duration-200 select-none"
            >
              Exporter GPX
            </motion.button>
          )}

          {mode === "edit" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpdateTrip}
              className="w-full py-3 px-6 rounded-lg bg-[#70E575] text-white font-semibold shadow-md hover:bg-[#5bcc65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70E575] transition-colors duration-200 select-none"
            >
              Mettre à jour ce trajet
            </motion.button>
          )}

          {mode === "view" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("my_modal").showModal()}
              className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors duration-200 select-none"
            >
              Copier ce trajet
            </motion.button>
          )}

          {mode === "create" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("my_modal").showModal()}
              className="w-full py-3 px-6 rounded-lg bg-[#70E575] text-white font-semibold shadow-md hover:bg-[#5bcc65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70E575] transition-colors duration-200 select-none"
            >
              Ajouter l'Itinéraire
            </motion.button>
          )}
        </div>

        <dialog id="my_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {mode === "edit"
                ? "Modifier l'itinéraire"
                : mode === "view"
                ? "Copier ce trajet dans mes itinéraires"
                : "Créer un nouvel itinéraire"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Nom de l'itinéraire"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal").close()}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </dialog>
        {/* Modal d'update */}
        {showUpdateModal && (
          <dialog open className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Modifier le nom du trajet</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateTrip();
                }}
                className="mt-4 space-y-4"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirmer
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </motion.section>
  );
};

export default Map;
