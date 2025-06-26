import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

export default function CommunityTrips({ trips, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Trajets de la communauté</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <motion.div
              key={trip._id}
              whileHover={{ scale: 1.02 }}
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body">
                <h3 className="card-title">{trip.name}</h3>
                <p className="text-sm text-gray-500">
                  {trip.startTime ? new Date(trip.startTime).toLocaleDateString() : ""}
                </p>
                <p className="text-sm text-gray-500">
                  {trip.totalDistance ? `${(trip.totalDistance / 1000).toFixed(2)} km` : "Distance inconnue"}
                </p>
                <p className="text-sm text-gray-500">
                  Par : {trip.owner?.username || trip.owner?.name || "Utilisateur inconnu"}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-outline" onClick={() => onView(trip._id)}>
                    <FaEye />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Aucun trajet de la communauté trouvé.</p>
        )}
      </div>
    </motion.div>
  );
}
