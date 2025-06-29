import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import UserSelector from "./Pro/UserSelector";
import VehicleSelector from "./Pro/VehicleSelector";
import MaintainForm from "./Pro/MaintainForm";
import MaintainHistoryList from "./Pro/MaintainHistory";


import { useUsersAPI } from "../../services/userService";
import { useVehiclesAPI } from "../../services/vehicleService";
import { useMaintainsTypesAPI } from "../../services/maintainTypeService";
import { useMaintainsHistoryAPI } from "../../services/maintainHistoryService";

export default function DashboardPro({ currentUser }) {
  const { getAllUsers } = useUsersAPI();
  const { getAllVehicles } = useVehiclesAPI();
  const { getAllMaintainsTypes, createMaintainType } = useMaintainsTypesAPI();
  const { createMaintainHistory, getMaintainHistories } = useMaintainsHistoryAPI();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [maintainTypes, setMaintainTypes] = useState([]);
  const [maintainHistories, setMaintainHistories] = useState([]);

  // Recharge utilisateurs au mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Recharger véhicules quand user change
  useEffect(() => {
    if (!selectedUser) return;
    fetchVehicles(selectedUser._id);
  }, [selectedUser]);

  // Recharger types quand user ou véhicule change
  useEffect(() => {
    fetchMaintainTypes();
  }, [selectedUser]);

  // Recharger historiques quand véhicule change
  useEffect(() => {
    if (!selectedVehicle) {
      setMaintainHistories([]);
      return;
    }
    fetchVehicleMaintains(selectedVehicle._id);
  }, [selectedVehicle]);

  async function fetchUsers() {
    try {
      const res = await getAllUsers();
      const nonAdmins = (res.data || []).filter((u) => u.role !== "admin");
      setUsers(nonAdmins);
    } catch (err) {
      toast.error("Erreur lors du chargement des utilisateurs.");
      console.error(err);
    }
  }

  async function fetchVehicles(userId) {
    try {
      setVehicles([]);
      setSelectedVehicle(null);
      const res = await getAllVehicles(userId);
      setVehicles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Erreur lors du chargement des véhicules.");
      console.error(err);
    }
  }

  async function fetchMaintainTypes() {
    try {
      const res = await getAllMaintainsTypes();
      setMaintainTypes(res.data || []);
    } catch (err) {
      toast.error("Erreur lors du chargement des types de maintenance.");
      console.error(err);
    }
  }

  async function fetchVehicleMaintains(vehicleId) {
    try {
      const res = await getMaintainHistories(`?vehicleId=${vehicleId}`);
      setMaintainHistories(res.data || []);
    } catch (err) {
      toast.error("Erreur lors du chargement des maintenances.");
      console.error(err);
    }
  }

  async function onAddMaintain(formData) {
    try {
      await createMaintainHistory(formData);
      toast.success("Maintenance ajoutée");
      // Recharger historique
      if (selectedVehicle) await fetchVehicleMaintains(selectedVehicle._id);
    } catch (err) {
      toast.error("Erreur lors de l'ajout de la maintenance");
      console.error(err);
    }
  }

  async function onCreateNewType(data) {
    try {
      const res = await createMaintainType(data);
      toast.success(`Type "${res.data.name}" créé`);
      await fetchMaintainTypes();
      return res.data._id;
    } catch (err) {
      toast.error("Erreur lors de la création du type");
      console.error(err);
      return null;
    }
  }

  return (
    <motion.div className="flex flex-col gap-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        Gestion des véhicules et factures
      </h1>

      <UserSelector
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      {selectedUser && (
        <VehicleSelector
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          username={selectedUser.username}
        />
      )}

      {selectedVehicle && (
        <MaintainForm
          maintainTypes={maintainTypes}
          onAddMaintain={onAddMaintain}
          onCreateNewType={onCreateNewType}
          currentUser={currentUser}
          selectedVehicle={selectedVehicle}
        />
      )}

      {selectedVehicle && (
        <MaintainHistoryList maintainHistories={maintainHistories} />
      )}
    </motion.div>
  );
}
