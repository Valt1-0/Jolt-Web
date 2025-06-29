import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useUsersAPI } from "../services/userService";
import { toast } from "sonner";

export default function Profile() {
  const { user, logout } = useAuth();
  const { updateUser, deleteUser } = useUsersAPI();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]); // Ensure user is a dependency

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setLoading(true);
    try {
      await updateUser(user.id, formData);
      toast.success("Profil mis à jour !");
      setEditing(false);
    } catch (e) {
      toast.error("Erreur lors de la mise à jour");
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?"))
      return;
    setLoading(true);
    try {
      await deleteUser();
      toast.success("Compte supprimé");
      logout(); // déconnexion après suppression
    } catch (e) {
      toast.error("Erreur lors de la suppression");
    }
    setLoading(false);
  }

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-600">
        Chargement ou utilisateur non connecté...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mon profil</h1>

      <div className="card bg-base-200 shadow-lg p-6">
        {!editing ? (
          <>
            <p className="mb-2">
              <span className="font-semibold">Nom : </span>
              {user.username || "-"}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Email : </span>
              {user.email || "-"}
            </p>

            <div className="flex gap-4">
              <button
                className="btn btn-primary btn-sm flex-1"
                onClick={() => setEditing(true)}
              >
                Modifier
              </button>
              <button
                className="btn btn-error btn-sm flex-1"
                onClick={handleDelete}
                disabled={loading}
              >
                Supprimer mon compte
              </button>
            </div>
          </>
        ) : (
          <>
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full mb-4"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />

            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full mb-6"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />

            <div className="flex gap-4">
              <button
                className="btn btn-success flex-1"
                onClick={handleSave}
                disabled={loading}
              >
                Enregistrer
              </button>
              <button
                className="btn btn-outline flex-1"
                onClick={() => setEditing(false)}
                disabled={loading}
              >
                Annuler
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
