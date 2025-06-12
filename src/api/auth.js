const gatewayPort = import.meta.env.VITE_API_GATEWAY_PORT;
const authPath = import.meta.env.VITE_API_AUTH_PATH;

console.log(`API_USERS_PORT: ${gatewayPort}`);
console.log(`API_AUTH_PATH: ${authPath}`);

// Fallbacks in case env vars are undefined
const API_BASE_URL = `http://localhost:${gatewayPort}${authPath}`;

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Login failed");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const register = async (userData) => {
  console.log(`Registering user with data: ${JSON.stringify(userData)}`);

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Registration failed");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
