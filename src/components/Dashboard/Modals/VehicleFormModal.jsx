import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VehicleFormModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  owners = [], // tableau des utilisateurs [{ _id, username }]
}) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    firstPurchaseDate: "",
    mileage: 0,
    image: "",
    owner: "",
    isFavorite: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        brand: initialData.brand || "",
        model: initialData.model || "",
        firstPurchaseDate: initialData.firstPurchaseDate
          ? new Date(initialData.firstPurchaseDate).toISOString().substr(0, 10)
          : "",
        mileage: initialData.mileage || 0,
        image: initialData.image || "",
        owner: initialData.owner || "",
        isFavorite: initialData.isFavorite || false,
      });
    } else {
      setFormData({
        brand: "",
        model: "",
        firstPurchaseDate: "",
        mileage: 0,
        image: "",
        owner: "",
        isFavorite: false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">
              {initialData ? "Modifier le véhicule" : "Créer un véhicule"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Marque */}
              <div>
                <label className="block text-sm font-medium mb-1">Marque</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Modèle */}
              <div>
                <label className="block text-sm font-medium mb-1">Modèle</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Date de première mise en circulation */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date de 1ère mise en circulation
                </label>
                <input
                  type="date"
                  name="firstPurchaseDate"
                  value={formData.firstPurchaseDate}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Kilométrage */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kilométrage
                </label>
                <input
                  type="number"
                  name="mileage"
                  min="0"
                  value={formData.mileage}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  URL de l'image
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://..."
                />
              </div>

              {/* Propriétaire */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Propriétaire
                </label>
                <select
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">-- Sélectionner --</option>
                  {owners.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.username || u.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Favori */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFavorite"
                  checked={formData.isFavorite}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Favori</label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#70E575] text-white rounded hover:bg-[#5bcc65]"
                >
                  {initialData ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
