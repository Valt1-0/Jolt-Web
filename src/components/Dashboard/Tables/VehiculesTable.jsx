import * as FAIcons from "react-icons/fa";

function VehiclesTable({ vehicles, onEdit, onDelete }) {
  // Utilise la prop vehicles si disponible, sinon demoVehicles
  const data = vehicles && vehicles.length ? vehicles : [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liste des véhicules</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Image</th>
            <th className="py-2 text-left">Marque</th>
            <th className="py-2 text-left">Modèle</th>
            <th className="py-2 text-left">Kilométrage</th>
            <th className="py-2 text-left">Première acquisition</th>
            <th className="py-2 text-left">Favori</th>
            <th className="py-2 text-left">Ajouté le</th>
            <th className="py-2 text-left">Propriétaire</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-2 text-center text-gray-400">
                Aucun véhicule
              </td>
            </tr>
          ) : (
            data.map((v) => (
              <tr key={v._id} className="hover:bg-gray-50">
                <td className="py-2">
                  {v.image ? (
                    <img
                      src={v.image}
                      alt={v.model}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-2">{v.brand || "-"}</td>
                <td className="py-2">{v.model || "-"}</td>
                <td className="py-2">
                  {v.mileage != null ? v.mileage + " km" : "-"}
                </td>
                <td className="py-2">
                  {v.firstPurchaseDate
                    ? new Date(v.firstPurchaseDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-2 text-center">
                  {v.isFavorite ? (
                    <FAIcons.FaStar className="text-yellow-400" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-2">
                  {v.createdAt
                    ? new Date(v.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-2">{v.owner ? v.owner : "-"}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(v)}
                      className="flex items-center px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                      title="Modifier"
                    >
                      <FAIcons.FaEdit className="mr-1" />
                      <span className="hidden md:inline">Modifier</span>
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(v)}
                      className="flex items-center px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-600 transition"
                      title="Supprimer"
                    >
                      <FAIcons.FaTrash className="mr-1" />
                      <span className="hidden md:inline">Supprimer</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VehiclesTable;
