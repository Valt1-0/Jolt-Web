import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useRoutesAPI } from "../services/routesService";
import { FaCheckCircle, FaInfoCircle, FaTrash, FaEye } from "react-icons/fa";
import MyTrips from "../components/Roadbook/MyTrips";
import CommunityTrips from "../components/Roadbook/CommunityTrips";
import Infos from "../components/Roadbook/Infos";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, tripName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-4">Confirmer la suppression</h3>
        <p className="mb-4">
          Êtes-vous sûr de vouloir supprimer le trajet "{tripName}" ?
        </p>
        <div className="flex justify-end gap-2">
          <button className="btn btn-sm" onClick={onClose}>
            Annuler
          </button>
          <button className="btn btn-sm btn-error" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Roadbook() {
  const [tab, setTab] = useState("myTrips");
  const [searchQuery, setSearchQuery] = useState("");
  const [myTrips, setMyTrips] = useState([]);
  const [limit, setLimit] = useState(5);
  const [communityTrips, setCommunityTrips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  const navigate = useNavigate();
  const { getNavigations, updateNavigationVisibility, deleteNavigation } =
    useRoutesAPI();

  useEffect(() => {
    let isMounted = true;

    async function fetchNavigations() {
      try {
        const communityResponse = await getNavigations(
          `?limit=${limit}&excludeSelf=true`
        );
        if (communityResponse?.data?.navigations) {
          console.log(
            "Community Trips Data:",
            communityResponse.data.navigations
          );
          setCommunityTrips(communityResponse.data.navigations);
        }

        const privateResponse = await getNavigations(`?limit=${limit}`);
        if (privateResponse?.data?.navigations) {
          setMyTrips(privateResponse.data.navigations);
        }
      } catch (error) {
        console.error("Failed to fetch navigations:", error);
        if (isMounted) {
          setMyTrips([]);
          setCommunityTrips([]);
        }
      }
    }

    fetchNavigations();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  const filteredMyTrips = Array.isArray(myTrips)
    ? myTrips.filter((trip) =>
        trip?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredCommunityTrips = Array.isArray(communityTrips)
    ? communityTrips.filter((trip) =>
        trip?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleVisibilityChange = async (id, currentVisibility) => {
    try {
      await updateNavigationVisibility(id, !currentVisibility);
      const updatedTrips = myTrips.map((trip) =>
        trip._id === id ? { ...trip, isPublic: !currentVisibility } : trip
      );
      setMyTrips(updatedTrips);
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  const handleDeleteConfirmation = (trip) => {
    setTripToDelete(trip);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (tripToDelete) {
        await deleteNavigation(tripToDelete._id);
        setMyTrips((prev) =>
          prev.filter((trip) => trip._id !== tripToDelete._id)
        );
      }
    } catch (error) {
      console.error("Error deleting navigation:", error);
    } finally {
      setIsModalOpen(false);
      setTripToDelete(null);
    }
  };

  const handleView = (id) => {
    navigate(`/map?id=${id}`);
  };

  const showWelcomeAlert = myTrips.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 md:mb-0"
        >
          🗺️ Roadbook
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-[#70E575] text-white hover:bg-[#5bcc65]"
          onClick={() => navigate("/map")}
        >
          Créer mon Itinéraire
        </motion.button>
      </div>

      {showWelcomeAlert && (
        <div className="alert alert-success mb-4">
          <FaCheckCircle className="text-white w-6 h-6 mr-2" />
          <span className="text-black font-semibold">
            Bienvenue ! Commencez par créer votre premier itinéraire en cliquant
            sur le bouton ci-dessus.
          </span>
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un trajet..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="tabs tabs-boxed">
          <a
            className={`px-4 py-2 border-b-2 transition-all duration-200 text-sm font-medium ${
              tab === "myTrips"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
            onClick={() => setTab("myTrips")}
          >
            Mes trajets
          </a>
          <a
            className={`px-4 py-2 border-b-2 transition-all duration-200 text-sm font-medium ${
              tab === "community"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
            onClick={() => setTab("community")}
          >
            Trajets de la communauté
          </a>
          <a
            className={`px-4 py-2 border-b-2 transition-all duration-200 text-sm font-medium ${
              tab === "infos"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
            onClick={() => setTab("infos")}
          >
            Infos
          </a>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Afficher</span>
          <select
            className="select select-bordered"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="ml-2">trajets</span>
        </div>
      </div>

      {tab === "myTrips" && (
        <MyTrips
          trips={filteredMyTrips}
          onDelete={handleDeleteConfirmation}
          onToggleVisibility={handleVisibilityChange}
          onView={handleView}
        />
      )}

      {tab === "community" && (
        <CommunityTrips trips={filteredCommunityTrips} onView={handleView} />
      )}

      {tab === "infos" && <Infos myTrips={myTrips} />}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        tripName={tripToDelete?.name}
      />
    </motion.div>
  );
}
