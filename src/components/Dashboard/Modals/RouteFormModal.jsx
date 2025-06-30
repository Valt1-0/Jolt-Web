import { useState, useEffect } from "react";

export default function RouteFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState(3);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setNotes(initialData.notes.rating ?? 3);
      setIsPublic(initialData.isPublic || false);
    } else {
      setName("");
      setNotes(3);
      setIsPublic(false);
    }

    console.log("Initial data set:", {
      name,
      notes,
      isPublic,
    });

  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      name,
      notes,
      isPublic,
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-6 max-w-md w-full"
      >
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Modifier un trajet" : "Créer un trajet"}
        </h2>

        <label className="block mb-2">
          Nom
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded w-full px-2 py-1"
          />
        </label>

        <label className="block mb-4 font-medium">
          Note du trajet
          <select
            value={notes}
            onChange={(e) => setNotes(parseInt(e.target.value, 10))}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2"
          />
          Rendre ce trajet public
        </label>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#70E575] text-white rounded hover:bg-[#5bcc65]"
          >
            {initialData ? "Modifier" : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}
