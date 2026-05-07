import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// 🔐 Hardcoded admin credentials
const ADMIN = {
  email: "admin@mentorconnect.com",
  password: "admin123",
};

export const AuthProvider = ({ children }) => {
  // ── Admin state ──────────────────────────────────────────
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("isAdmin") === "true"
  );

  const login = (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  // ── Regular user state ───────────────────────────────────
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Login user (after successful signin)
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  // Logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  // ── New: Update User Profile ─────────────────────────────
  const updateUser = (updatedData) => {
    if (!user) return false;

    const newUserData = { ...user, ...updatedData };

    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));

    // TODO: Later you can call your backend API here
    // Example:
    // await axios.put('/api/user/profile', updatedData);

    return true;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAdmin, 
        login, 
        logout, 
        user, 
        loginUser, 
        logoutUser,
        updateUser   // ← Added
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);