import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

export default function Infos({ myTrips }) {
  const totalDistance = myTrips.reduce((acc, trip) => acc + (trip.totalDistance || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Infos</h2>
      <div className="alert alert-info mb-4">
        <FaInfoCircle className="text-blue-600 w-6 h-6 mr-2" />
        <span>
          Ici, vous pouvez retrouver vos trajets, découvrir ceux de la communauté et obtenir des statistiques sur vos voyages !
        </span>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal shadow my-4">
        <div className="stat">
          <div className="stat-title">Total de vos trajets</div>
          <div className="stat-value">{myTrips.length}</div>
          <div className="stat-desc">Trajets créés par vous</div>
        </div>
        <div className="stat">
          <div className="stat-title">Distance totale</div>
          <div className="stat-value">{(totalDistance / 1000).toFixed(2)} km</div>
          <div className="stat-desc">Distance parcourue</div>
        </div>
      </div>
    </motion.div>
  );
}
