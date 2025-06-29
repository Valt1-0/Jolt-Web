export default function MaintainHistoryList({ maintainHistories }) {
  if (!maintainHistories || maintainHistories.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow mt-6 text-gray-500">
        Pas d'historique de maintenance.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Historique des maintenances
      </h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-3">Date</th>
            <th className="p-3">Type</th>
            <th className="p-3">Kilométrage</th>
            <th className="p-3">Pro / Garage</th>
            <th className="p-3">Notes</th>
            <th className="p-3">Facture</th>
          </tr>
        </thead>
        <tbody>
          {maintainHistories.map((m) => (
            <tr key={m._id} className="border-b border-gray-200">
              <td className="p-3">{new Date(m.date).toLocaleDateString()}</td>
              <td className="p-3">{m.type?.name || "N/A"}</td>
              <td className="p-3">{m.mileage}</td>
              <td className="p-3">{m.proName || "-"}</td>
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
