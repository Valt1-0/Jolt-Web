import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "member",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "member",
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "member",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };
    // Si le mot de passe n'est pas vide, on le met dans le payload
    if (formData.password.trim()) {
      payload.password = formData.password.trim();
    }
    onSave(payload);
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
            className="bg-white rounded p-6 shadow max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">
              {initialData ? "Modifier l'utilisateur" : "Créer un utilisateur"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nom</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={
                    initialData ? "(Laisser vide pour ne pas changer)" : ""
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Rôle</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="member">Membre</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
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
