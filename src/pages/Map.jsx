import { motion } from "framer-motion";

import "leaflet/dist/leaflet.css";

const Map = () => {
  const center = [46.603354, 1.888334]; // Center on France

  return (
    <motion.section
      className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-10 px-6 py-10 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full h-[60vh] bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
        <span className="text-gray-500 text-lg">Map will be displayed here</span>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-4 mt-8 lg:mt-0">
        <h2 className="text-2xl font-bold mb-2">Explore the Map</h2>
        <p className="text-gray-600">
          Discover locations and points of interest across France. Use the interactive map to zoom, pan, and find more information.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>
    </motion.section>
  );
};

export default Map;
