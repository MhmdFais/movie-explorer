import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Demo only, no backend
const DEMO_USER = "admin";
const DEMO_PASS = "movie123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => localStorage.getItem("me_user"));

  const login = (username, password) => {
    if (username === DEMO_USER && password === DEMO_PASS) {
      localStorage.setItem("me_user", username);
      setUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("me_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
