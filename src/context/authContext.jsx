import { createContext, useContext, useState, useEffect } from "react";

const VITE_API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData.data.user);
    localStorage.setItem("user", JSON.stringify(userData.data.user));
  };

  const logOut = async () => {
    try {
      const { data, error, status } = await fetch(
        `http://localhost:5000/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-client-type": "web",
          },
        }
      );

      console.log("Logout response:", data, error, status);

      if (status !== 200 || error) throw new Error(error || "Logout failed");

      return await data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    logOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
