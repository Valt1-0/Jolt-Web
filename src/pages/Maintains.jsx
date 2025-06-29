import { useEffect, useState } from "react";
import { useMaintainsHistoryAPI } from "../services/maintainHistoryService";
import { useAuth } from "../context/authContext";
import { toast } from "sonner";

export default function Maintains() {
  const { user } = useAuth();
  const { getMaintainHistoriesByUser } = useMaintainsHistoryAPI();

  const [maintains, setMaintains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMaintains();
  }, [user]);

  async function fetchMaintains() {
    try {
      setLoading(true);
      const res = await getMaintainHistoriesByUser(user.id);
      setMaintains(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des maintenances.");
    }
    setLoading(false);
  }

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        Vous devez être connecté pour voir vos maintenances.
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Chargement...</div>;
  }

  if (maintains.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Vous n'avez pas encore de maintenances.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mes maintenances</h1>
      <table className="w-full text-left border-collapse bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3">Date</th>
            <th className="p-3">Type</th>
            <th className="p-3">Véhicule</th>
            <th className="p-3">Notes</th>
            <th className="p-3">Facture</th>
          </tr>
        </thead>
        <tbody>
          {maintains.map((m) => (
            <tr key={m._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{new Date(m.date).toLocaleDateString()}</td>
              <td className="p-3">{m.type?.name || "-"}</td>
              <td className="p-3">{m.vehicle?.plateNumber || "-"}</td>
              <td className="p-3">{m.notes || "-"}</td>
              <td className="p-3">
                {m.invoiceUrl?.[0] ? (
                  <a
                    href={`http://localhost:5000/${m.invoiceUrl[0].replace(
                      /\\/g,
                      "/"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Voir
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
