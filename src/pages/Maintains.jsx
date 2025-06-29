import { useEffect, useState } from "react";
import { useMaintainsHistoryAPI } from "../services/maintainHistoryService";
import { useVehiclesAPI } from "../services/vehicleService";
import { useAuth } from "../context/authContext";
import { toast } from "sonner";
import {
  FaCalendarAlt,
  FaTachometerAlt,
  FaUserCog,
  FaBuilding,
  FaFileInvoice,
  FaTimesCircle,
  FaCar,
  FaWrench,
} from "react-icons/fa";

export default function Maintains() {
  const { user } = useAuth();
  const { getMaintainHistories } = useMaintainsHistoryAPI();
  const { getAllVehicles } = useVehiclesAPI();

  const [maintains, setMaintains] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMaintains();
  }, [user]);

  async function fetchMaintains() {
    try {
      setLoading(true);

      const resVehicles = await getAllVehicles();
      const vehiclesData = resVehicles.data || [];
      setVehicles(vehiclesData);

      if (vehiclesData.length === 0) {
        setMaintains([]);
        setLoading(false);
        return;
      }

      const allMaintains = [];

      for (const v of vehiclesData) {
        const resMaintains = await getMaintainHistories(`?vehicleId=${v._id}`);
        if (Array.isArray(resMaintains.data)) {
          allMaintains.push(...resMaintains.data);
        }
      }

      setMaintains(allMaintains);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des données.");
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Chargement...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[#70E575]">
        Mes maintenances
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Maintenances */}
        <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#70E575] flex items-center gap-2">
            <FaWrench /> Historique des maintenances
          </h2>

          {maintains.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              Vous n'avez pas encore de maintenances.
            </div>
          ) : (
            <ul className="space-y-5">
              {maintains.map((m) => (
                <li
                  key={m._id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5 hover:shadow-md transition"
                >
                  {/* En-tête */}
                  <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <FaCalendarAlt className="text-gray-400" />
                      {new Date(m.date).toLocaleDateString()}
                    </div>
                    <span className="text-xs px-3 py-1 bg-[#70E575]/20 text-[#70E575] rounded-full">
                      {m.type?.name || "Type inconnu"}
                    </span>
                  </div>

                  {/* Détails */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                    <div className="flex items-center gap-2">
                      <FaTachometerAlt className="text-gray-500" />
                      <span>
                        <span className="font-semibold">Kilométrage :</span>{" "}
                        {m.mileage ?? "N/A"} km
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserCog className="text-gray-500" />
                      <span>
                        {m.performedBy === "pro"
                          ? "Professionnel"
                          : m.performedBy ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <FaBuilding className="text-gray-500" />
                      <span>
                        <span className="font-semibold">Atelier :</span>{" "}
                        {m.proName ?? "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    {m.notes ? (
                      <p className="text-gray-700 text-sm">{m.notes}</p>
                    ) : (
                      <p className="italic text-gray-400 text-sm">
                        Aucune note
                      </p>
                    )}
                  </div>

                  {/* Facture */}
                  <div>
                    {m.invoiceUrl?.[0] ? (
                      <a
                        href={`http://localhost:5000/${m.invoiceUrl[0].replace(
                          /\\/g,
                          "/"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#70E575] hover:underline"
                      >
                        <FaFileInvoice /> Voir la facture
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm flex items-center gap-2">
                        <FaTimesCircle /> Pas de facture
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vehicles */}
        <div className="w-full md:w-80 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#70E575] flex items-center gap-2">
            <FaCar /> Mes véhicules
          </h2>
          {vehicles.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              Vous n'avez pas encore de véhicules.
            </div>
          ) : (
            <ul className="space-y-3">
              {vehicles.map((v) => (
                <li
                  key={v._id}
                  className="flex flex-col gap-0.5 border border-gray-200 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition"
                >
                  {v.image && (
                    <img
                      src={v.image}
                      alt={`${v.brand} ${v.model}`}
                      className="w-full h-32 object-contain mb-2 rounded"
                    />
                  )}
                  <span className="font-semibold text-gray-800">{v.brand}</span>
                  <span className="text-gray-600 text-sm">{v.model}</span>
                  <span className="text-gray-600 text-sm">{v.mileage} km</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
