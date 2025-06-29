import * as FAIcons from "react-icons/fa";

function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Nom</th>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Rôle</th>
            <th className="py-2 text-left">Créé le</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-2 text-center text-gray-400">
                Aucun utilisateur
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="py-2">{u.username || "-"}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2 capitalize">{u.role || "-"}</td>
                <td className="py-2">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(u)}
                      className="flex items-center px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                      title="Modifier"
                    >
                      <FAIcons.FaEdit className="mr-1" />
                      <span className="hidden md:inline">Modifier</span>
                    </button>
                    <button
                      onClick={() => onDelete(u)}
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

export default UsersTable;
