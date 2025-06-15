import { useAuth } from "../context/authContext";

export function useFetchWithAuth() {
  const { user, logout, login } = useAuth();

  const fetchWithAuth = async (url, options = {}, opts = {}) => {
    try {
      // Vérifie l'utilisateur pour les routes protégées
      if (opts.protected && !user) {
        return { data: null, error: "Utilisateur non connecté", status: 401 };
      }

      // Prépare les options fetch
      const fetchOptions = {
        ...options,
        credentials: "include", // Important pour envoyer les cookies
        headers: {
          ...(options.headers || {}),
          "x-client-type": "web",
        },
      };

      // Ajoute Content-Type si besoin
      if (
        fetchOptions.body &&
        !(fetchOptions.body instanceof FormData) &&
        !fetchOptions.headers["Content-Type"]
      ) {
        fetchOptions.headers["Content-Type"] = "application/json";
      }

      // Première requête
      let response = await fetch(url, fetchOptions);

      // Si token invalide et route protégée, tente refresh
      if (
        opts.protected &&
        (response.status === 401 || response.status === 403)
      ) {
        // Tente de rafraîchir le token via le backend (cookie)
        const refreshRes = await fetch("/auth/refreshToken", {
          method: "POST",
          credentials: "include",
          headers: { "x-client-type": "web" },
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          login(refreshData.user); // Met à jour le contexte utilisateur si besoin
          // Relance la requête initiale
          response = await fetch(url, fetchOptions);
        } else {
          logout();
          return {
            data: null,
            error: "Session expirée, veuillez vous reconnecter.",
            status: 401,
          };
        }
      }

      // Tente de parser la réponse
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        return {
          data,
          error: data?.message || "Erreur lors de la requête",
          status: response.status,
        };
      }

      return { data, error: null, status: response.status };
    } catch (err) {
      return {
        data: null,
        error: err.message || "Erreur inconnue",
        status: 0,
      };
    }
  };

  return fetchWithAuth;
}
