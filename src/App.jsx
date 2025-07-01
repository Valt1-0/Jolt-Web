import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/authContext";
import VerifyEmail from "./components/VerifyEmail";
import Roadbook from "./pages/Roadbook";
import { Toaster } from "sonner";
import Subscription from "./pages/Subscription";
import Maintains from "./pages/Maintains";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" /> : children;
};

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="top-right" richColors />
        <div className="pt-18">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route
              path="/roadbook"
              element={
                <ProtectedRoute>
                  <Roadbook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <Map />
                </ProtectedRoute>
              }
            />
            <Route
              path="/maintains"
              element={
                <RoleProtectedRoute allowedRoles={["member"]}>
                  <Maintains />
                </RoleProtectedRoute>
              }
            />
            <Route path="/subscription" element={<Subscription />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth"
              element={
                <AuthRoute>
                  <Auth />
                </AuthRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={["admin", "pro"]}>
                  <Dashboard />
                </RoleProtectedRoute>
              }
            />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
