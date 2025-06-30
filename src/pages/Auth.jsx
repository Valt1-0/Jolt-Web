import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthAPI } from "../services/authService";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login: loginUser } = useAuth();
  const { login, register } = useAuthAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const userData = await login({ email, password });
        loginUser(userData);
      } else {
        if (password !== confirmPassword) {
          setError("Les mots de passe ne correspondent pas.");
          setLoading(false);
          return;
        }
        await register({ username, email, password });
        setError(
          "Inscription réussie ! Vérifie ton adresse e-mail pour activer ton compte."
        );
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");

        // Redirect to login after 3 seconds
        setTimeout(() => {
          setIsLogin(true);
          setError(""); // Clear the information message
        }, 3000);
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3fdf6] px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Illustration */}
        <div className="md:w-1/2 bg-[#70E575] text-white flex flex-col items-center justify-center p-8 relative">
          <img
            src="/src/assets/illustrations/auth.svg"
            alt="Trottinette"
            className="w-48 mb-6 animate-float"
          />
          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? "Bienvenue !" : "Rejoins-nous !"}
          </h2>
          <p className="text-center text-lg opacity-90">
            {isLogin
              ? "Connecte-toi pour accéder aux VLEU."
              : "Inscris-toi pour commencer ton aventure écolo."}
          </p>
        </div>

        {/* Form */}
        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="md:w-1/2 p-8 flex flex-col justify-center"
        >
          <h3 className="text-2xl font-bold text-[#70E575] mb-6 text-center">
            {isLogin ? "Connexion" : "Inscription"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Adresse e-mail"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2/4 -translate-y-2/4 text-[#70E575]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2/4 -translate-y-2/4 text-[#70E575]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            )}

            {error && (
              <p
                className={`text-sm text-center font-semibold ${
                  error.startsWith("Inscription réussie")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#70E575] text-white rounded-md py-2 font-semibold hover:bg-[#5cc964] transition"
            >
              {loading
                ? "Chargement..."
                : isLogin
                ? "Se connecter"
                : "S'inscrire"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-[#70E575] font-semibold hover:underline"
            >
              {isLogin ? "Créer un compte" : "Se connecter"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
