import { useState, useMemo } from "react";

export default function UserSelector({ users, selectedUser, setSelectedUser }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Filtrer utilisateurs selon la recherche
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    return users.filter((u) =>
      u.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  // Utilisateurs affichés selon page
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredUsers.slice(start, start + limit);
  }, [page, filteredUsers]);

  const totalPages = Math.ceil(filteredUsers.length / limit);

  // Reset page à 1 si recherche change
  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>

      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
        {paginatedUsers.length === 0 ? (
          <div className="text-gray-500 p-2">Aucun utilisateur trouvé.</div>
        ) : (
          paginatedUsers.map((u) => (
            <button
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`p-3 text-left rounded border ${
                selectedUser?._id === u._id
                  ? "border-[#70E575] bg-[#f0fdf4]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">{u.username}</div>
              <div className="text-sm text-gray-600">{u.email}</div>
            </button>
          ))
        )}
      </div>

      {/* Pagination simple */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
