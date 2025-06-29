import { useAuth } from "../context/authContext";
import DashboardAdmin from "../components/Dashboard/DashboardAdmin";
import DashboardPro from "../components/Dashboard/DashboardPro";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <div>Chargement...</div>;

  // On suppose que user.role = "admin" ou "pro"
  if (user.role === "admin") {
    return <DashboardAdmin />;
  } else {
    return <DashboardPro currentUser={user} />;
  }
}
