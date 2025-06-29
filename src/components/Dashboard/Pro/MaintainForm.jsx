import { useState } from "react";

export default function MaintainForm({
  maintainTypes,
  onAddMaintain,
  onCreateNewType,
  currentUser,
  selectedVehicle,
}) {
  const [addingNewType, setAddingNewType] = useState(false);

  // Nouveaux type
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeDescription, setNewTypeDescription] = useState("");
  const [newTypeDays, setNewTypeDays] = useState("");
  const [newTypeKm, setNewTypeKm] = useState("");

  // Maintenance form
  const [maintDate, setMaintDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [maintMileage, setMaintMileage] = useState("");
  const [maintProName, setMaintProName] = useState("");
  const [maintInvoiceFile, setMaintInvoiceFile] = useState(null);
  const [maintInvoiceUrl, setMaintInvoiceUrl] = useState("");
  const [useInvoiceUrl, setUseInvoiceUrl] = useState(true);
  const [maintNotes, setMaintNotes] = useState("");
  const [selectedMaintainType, setSelectedMaintainType] = useState("");

  function resetForm() {
    setAddingNewType(false);
    setNewTypeName("");
    setNewTypeDescription("");
    setNewTypeDays("");
    setNewTypeKm("");
    setMaintDate(new Date().toISOString().slice(0, 10));
    setMaintMileage("");
    setMaintProName("");
    setMaintInvoiceFile(null);
    setMaintInvoiceUrl("");
    setUseInvoiceUrl(true);
    setMaintNotes("");
    setSelectedMaintainType("");
  }

  async function handleCreateNewType(e) {
    e.preventDefault();
    if (!newTypeName.trim()) {
      alert("Le nom du nouveau type est obligatoire");
      return;
    }
    const data = {
      name: newTypeName.trim(),
      description: newTypeDescription.trim(),
      periodicity: {
        days: newTypeDays ? Number(newTypeDays) : null,
        km: newTypeKm ? Number(newTypeKm) : null,
      },
      isDefault: false,
      owner: currentUser?._id || null,
    };
    const newId = await onCreateNewType(data);
    if (newId) {
      setSelectedMaintainType(newId);
      setAddingNewType(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedMaintainType) {
      alert("Veuillez sélectionner un type de maintenance");
      return;
    }
    if (!maintMileage) {
      alert("Veuillez indiquer le kilométrage");
      return;
    }

    // Préparation FormData
    const formData = new FormData();
    formData.append("vehicle", selectedVehicle._id);
    formData.append("type", selectedMaintainType);
    formData.append("date", maintDate);
    formData.append("mileage", maintMileage);
    formData.append(
      "performedBy",
      currentUser?.role === "pro" ? "pro" : "user"
    );
    formData.append("proName", maintProName);
    formData.append("notes", maintNotes);

    if (useInvoiceUrl && maintInvoiceUrl.trim()) {
      formData.append("invoiceUrl", maintInvoiceUrl.trim());
    } else if (!useInvoiceUrl && maintInvoiceFile) {
      formData.append("files", maintInvoiceFile);
    }

    await onAddMaintain(formData);
    resetForm();
  }

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow space-y-10">
      <h2 className="text-2xl font-bold text-gray-800">
        Ajouter une maintenance
      </h2>

      <form
        onSubmit={addingNewType ? handleCreateNewType : handleSubmit}
        className="space-y-6"
      >
        {/* Select type maintenance */}
        <div>
          <label
            htmlFor="maintenanceType"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Type de maintenance
          </label>
          <select
            id="maintenanceType"
            value={selectedMaintainType}
            onChange={(e) => {
              if (e.target.value === "new") {
                setAddingNewType(true);
                setSelectedMaintainType("");
              } else {
                setAddingNewType(false);
                setSelectedMaintainType(e.target.value);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required={!addingNewType}
          >
            <option value="">Sélectionner un type</option>
            {maintainTypes.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
            <option value="new">Créer un nouveau type</option>
          </select>
        </div>

        {addingNewType ? (
          <>
            <div>
              <label
                htmlFor="typeName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nom du type
              </label>
              <input
                id="typeName"
                type="text"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="typeDescription"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="typeDescription"
                value={newTypeDescription}
                onChange={(e) => setNewTypeDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="typeDays"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Périodicité (jours)
                </label>
                <input
                  id="typeDays"
                  type="number"
                  min="0"
                  value={newTypeDays}
                  onChange={(e) => setNewTypeDays(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="typeKm"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Périodicité (km)
                </label>
                <input
                  id="typeKm"
                  type="number"
                  min="0"
                  value={newTypeKm}
                  onChange={(e) => setNewTypeKm(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Créer le type de maintenance
            </button>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="maintDate"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Date
                </label>
                <input
                  id="maintDate"
                  type="date"
                  value={maintDate}
                  onChange={(e) => setMaintDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="maintMileage"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Kilométrage
                </label>
                <input
                  id="maintMileage"
                  type="number"
                  min="0"
                  value={maintMileage}
                  onChange={(e) => setMaintMileage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="maintProName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Professionnel / Garage
              </label>
              <input
                id="maintProName"
                type="text"
                value={maintProName}
                onChange={(e) => setMaintProName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Choix upload facture */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facture PDF ou lien
              </label>
              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useInvoiceUrl}
                    onChange={() => {
                      setUseInvoiceUrl(true);
                      setMaintInvoiceFile(null);
                    }}
                  />
                  <span>Lien URL</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useInvoiceUrl}
                    onChange={() => {
                      setUseInvoiceUrl(false);
                      setMaintInvoiceUrl("");
                    }}
                  />
                  <span>Upload fichier</span>
                </label>
              </div>
              {useInvoiceUrl ? (
                <input
                  type="url"
                  placeholder="https://..."
                  value={maintInvoiceUrl}
                  onChange={(e) => setMaintInvoiceUrl(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setMaintInvoiceFile(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
              )}

              {/* Aperçu fichier ou iframe url */}
              {useInvoiceUrl && maintInvoiceUrl ? (
                <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden h-64">
                  <iframe
                    src={maintInvoiceUrl}
                    title="Aperçu de la facture"
                    className="w-full h-full"
                  />
                </div>
              ) : null}
              {!useInvoiceUrl && maintInvoiceFile ? (
                <div className="mt-2 text-sm text-gray-600">
                  {maintInvoiceFile.name}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="maintNotes"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Notes
              </label>
              <textarea
                id="maintNotes"
                value={maintNotes}
                onChange={(e) => setMaintNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Ajouter la maintenance
            </button>
          </>
        )}
      </form>
    </div>
  );
}
