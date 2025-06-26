import { motion } from "framer-motion";
import { FaEye, FaTrash } from "react-icons/fa";

export default function MyTrips({
  trips,
  onDelete,
  onToggleVisibility,
  onView,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Mes trajets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map((trip) => (
          <motion.div
            key={trip._id}
            whileHover={{ scale: 1.02 }}
            className="card bg-base-100 shadow-md"
          >
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h3 className="card-title">{trip.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    trip.isPublic
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-200 text-gray-700 border border-gray-300"
                  }`}
                >
                  {trip.isPublic ? "Public" : "Privé"}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(trip.startTime).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                {trip.totalDistance
                  ? `${(trip.totalDistance / 1000).toFixed(2)} km`
                  : "Distance inconnue"}
              </p>
              <div className="card-actions justify-end gap-2">
                <button
                  className="btn btn-sm bg-[#70E575] text-white hover:bg-[#5bcc65]"
                  onClick={() => onToggleVisibility(trip._id, trip.isPublic)}
                >
                  {trip.isPublic ? "Rendre Privé" : "Rendre Public"}
                </button>
                <button
                  onClick={() => onView(trip._id)}
                  className="p-2 rounded-md border border-gray-300 hover:border-black hover:bg-gray-100 transition-colors duration-200"
                  title="Voir le trajet"
                >
                  <FaEye className="text-gray-600 hover:text-black transition-colors duration-200" />
                </button>

                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => onDelete(trip)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
