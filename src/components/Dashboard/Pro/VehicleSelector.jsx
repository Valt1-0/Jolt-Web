export default function VehicleSelector({
  vehicles,
  selectedVehicle,
  setSelectedVehicle,
  username,
}) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Véhicules de {username}</h2>
      {vehicles.length === 0 ? (
        <p className="text-gray-500">Aucun véhicule</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {vehicles.map((v) => (
            <button
              key={v._id}
              onClick={() => setSelectedVehicle(v)}
              className={`p-3 text-left rounded border ${
                selectedVehicle?._id === v._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">{v.brand}</div>
              <div className="text-sm text-gray-600">{v.model}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
