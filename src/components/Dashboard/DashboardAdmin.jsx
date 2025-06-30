import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import UserFormModal from "../../components/Dashboard/Modals/UserFormModal";
import RouteFormModal from "../../components/Dashboard/Modals/RouteFormModal";
import VehicleFormModal from "../../components/Dashboard/Modals/VehicleFormModal";

import { useUsersAPI } from "../../services/userService";
import { useRoutesAPI } from "../../services/routeService";
import { useVehiclesAPI } from "../../services/vehicleService";

import UsersTable from "./Tables/UsersTable";
import RoutesTable from "./Tables/RoutesTable";
import VehiclesTable from "./Tables/VehiculesTable";

import * as FAIcons from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";

export default function DashboardAdmin() {
  const { getAllUsers, createUser, updateUser, deleteUser } = useUsersAPI();
  const {
    getNavigations,
    createNavigation,
    updateNavigation,
    deleteNavigation,
  } = useRoutesAPI();
  const { getAllVehicles, createVehicle, updateVehicle, deleteVehicle } =
    useVehiclesAPI();

  const [activeTab, setActiveTab] = useState("users");
  const [stats, setStats] = useState({
    users: 0,
    trajets: 0,
    vehicles: 0,
  });
  const [users, setUsers] = useState([]);
  const [trajets, setTrajets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Modals & states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [editRoute, setEditRoute] = useState(null);

  const [editVehicle, setEditVehicle] = useState(null);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Users
      const allUsers = await getAllUsers();
      setUsers(allUsers.data || []);
      setStats((prev) => ({ ...prev, users: allUsers.data.length }));

      // Trajets
      const navsResponse = await getNavigations(`?limit=10`);
      const navs = navsResponse?.data?.navigations || [];
      setTrajets(navs);

      // Véhicules
      const vehiclesResponse = await getAllVehicles();
      const allVehicles = vehiclesResponse?.data || [];
      setVehicles(allVehicles);
      setStats((prev) => ({
        ...prev,
        trajets: navs.length,
        vehicles: allVehicles.length,
      }));
    } catch (err) {
      console.error("Erreur fetch dashboard:", err);
    }
  }

  // === USER CRUD ===
  async function handleSaveUser(data) {
    try {
      if (editUser) {
        await updateUser(editUser._id, data);
      } else {
        await createUser(data);
      }
      await fetchData();
      setIsUserModalOpen(false);
      setEditUser(null);
    } catch (err) {
      console.error("Erreur sauvegarde user:", err);
    }
  }

  async function handleDeleteUser(userId) {
    try {
      await deleteUser(userId);
      await fetchData();
      setConfirmDelete(null);
    } catch (err) {
      console.error("Erreur suppression user:", err);
    }
  }

  // === ROUTE CRUD ===
  async function handleSaveRoute(data) {
    try {
      if (editRoute) {
        await updateNavigation(editRoute._id, data);
      } else {
        await createNavigation(data);
      }
      await fetchData();
      setIsRouteModalOpen(false);
      setEditRoute(null);
    } catch (err) {
      console.error("Erreur sauvegarde trajet:", err);
    }
  }

  async function handleDeleteRoute(id) {
    try {
      await deleteNavigation(id);
      await fetchData();
      setConfirmDelete(null);
    } catch (err) {
      console.error("Erreur suppression trajet:", err);
    }
  }

  // === VEHICLE CRUD ===
  async function handleSaveVehicle(data) {
    try {
      if (editVehicle) {
        await updateVehicle(editVehicle._id, data);
      } else {
        await createVehicle(data);
      }
      await fetchData();
      setIsVehicleModalOpen(false);
      setEditVehicle(null);
    } catch (err) {
      console.error("Erreur sauvegarde véhicule:", err);
    }
  }

  async function handleDeleteVehicle(id) {
    try {
      await deleteVehicle(id);
      await fetchData();
      setConfirmDelete(null);
    } catch (err) {
      console.error("Erreur suppression véhicule:", err);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 p-6 bg-gray-100 min-h-screen"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>

        {activeTab === "users" && (
          <button
            onClick={() => {
              setEditUser(null);
              setIsUserModalOpen(true);
            }}
            className="px-4 py-2 bg-[#70E575] text-white rounded hover:bg-[#5bcc65]"
          >
            + Créer un utilisateur
          </button>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard title="Utilisateurs" value={stats.users} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard title="Trajets créés" value={stats.trajets} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard title="Véhicules" value={stats.vehicles} />
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2">
        {[
          { key: "users", label: "Utilisateurs" },
          { key: "trajets", label: "Trajets" },
          { key: "vehicles", label: "Véhicules" },
        ].map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`py-2 px-4 font-medium ${
              activeTab === tab.key
                ? "border-b-2 border-[#70E575] text-[#70E575]"
                : "text-gray-600 hover:text-[#70E575]"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white shadow rounded p-4"
        >
          {activeTab === "users" && (
            <UsersTable
              users={users}
              onEdit={(user) => {
                setEditUser(user);
                setIsUserModalOpen(true);
              }}
              onDelete={(user) => setConfirmDelete(user)}
            />
          )}

          {activeTab === "trajets" && (
            <RoutesTable
              trajets={trajets}
              onEdit={(route) => {
                setEditRoute(route);
                setIsRouteModalOpen(true);
              }}
              onDelete={(route) => setConfirmDelete(route)}
            />
          )}

          {activeTab === "vehicles" && (
            <VehiclesTable
              vehicles={vehicles}
              onEdit={(v) => {
                setEditVehicle(v);
                setIsVehicleModalOpen(true);
              }}
              onDelete={(v) => setConfirmDelete(v)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <UserFormModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setEditUser(null);
        }}
        onSave={handleSaveUser}
        initialData={editUser}
      />

      <RouteFormModal
        isOpen={isRouteModalOpen}
        onClose={() => {
          setIsRouteModalOpen(false);
          setEditRoute(null);
        }}
        onSave={handleSaveRoute}
        initialData={editRoute}
      />

      <VehicleFormModal
        isOpen={isVehicleModalOpen}
        onClose={() => {
          setIsVehicleModalOpen(false);
          setEditVehicle(null);
        }}
        onSave={handleSaveVehicle}
        initialData={editVehicle}
        owners={users}
      />

      <AnimatePresence>
        {confirmDelete && (
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
              className="bg-white rounded p-6 shadow max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold mb-4">
                Supprimer {confirmDelete.username || confirmDelete.name} ?
              </h3>
              <p className="mb-4 text-gray-700">
                Cette action est irréversible.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    if (confirmDelete._id) {
                      if (activeTab === "users") {
                        handleDeleteUser(confirmDelete._id);
                      } else if (activeTab === "trajets") {
                        handleDeleteRoute(confirmDelete._id);
                      } else if (activeTab === "vehicles") {
                        handleDeleteVehicle(confirmDelete._id);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StatCard({ title, value, icon }) {
  let iconBg, iconColor, iconElem;
  if (title === "Utilisateurs") {
    iconBg = "bg-blue-100";
    iconColor = "text-blue-500";
    iconElem = <FAIcons.FaUsers className={`text-3xl ${iconColor}`} />;
  } else if (title === "Trajets créés") {
    iconBg = "bg-yellow-100";
    iconColor = "text-yellow-500";
    iconElem = <FAIcons.FaRoute className={`text-3xl ${iconColor}`} />;
  } else if (title === "Véhicules") {
    iconBg = "bg-green-100";
    iconColor = "text-green-500";
    iconElem = <MdElectricScooter className={`text-3xl ${iconColor}`} />;
  } else {
    iconBg = "bg-gray-100";
    iconColor = "text-gray-400";
    iconElem = icon;
  }

  return (
    <div className="flex items-center gap-4 bg-white shadow rounded p-4">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBg}`}
      >
        {iconElem}
      </div>
      <div>
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}
