import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthAPI } from "../api/auth";
import Loading from "../components/Loading";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuthAPI();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      setMessage("Token non trouvé dans l'URL.");
      setIsVerified(false);
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const data = await verifyEmail(token);
        setMessage(data.message || "Email vérifié avec succès !");
        setIsVerified(true);
      } catch (error) {
        setMessage(
          error?.message || "Erreur lors de la vérification de l'email."
        );
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [location.search]);

  // Redirection automatique après 3 secondes si vérifié
  useEffect(() => {
    if (isVerified) {
      const timeout = setTimeout(() => {
        navigate("/auth");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isVerified, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3fdf6] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Vérification de l'email
        </h2>

        {loading ? (
          <Loading />
        ) : (
          <div
            className={`p-4 rounded-md text-sm font-medium ${
              isVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {!loading && isVerified && (
          <p className="text-sm text-gray-500">
            Redirection dans quelques secondes vers la connexion...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
