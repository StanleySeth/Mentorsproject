import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const { login, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/addproducts");
    } else {
      setError("❌ Invalid admin credentials");
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ── Already logged in as admin → show logout screen ──
  if (isAdmin) {
    return (
      <div className="container mt-5" style={{ maxWidth: "420px" }}>
        <div className="card shadow p-4 text-center">

          {/* Admin avatar */}
          <div
            style={{
              width: "70px", height: "70px", borderRadius: "50%",
              background: "#3B5BDB", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px", margin: "0 auto 16px",
            }}
          >
            🛡️
          </div>

          <h4 className="fw-bold mb-1">Admin Panel</h4>
          <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
            You are currently logged in as administrator.
          </p>

          {/* Quick actions */}
          <button
            className="btn btn-primary w-100 mb-3"
            onClick={() => navigate("/addproducts")}
          >
            ➕ Go to Add Mentors
          </button>

          <hr />

          <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
            Logging out will prevent access to admin-only pages until you sign in again.
          </p>

          <button
            className="btn btn-danger w-100"
            onClick={handleLogout}
          >
            🚪 Logout as Admin
          </button>
        </div>
      </div>
    );
  }

  // ── Not logged in → show login form ──
  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <div className="card shadow p-4">

        {/* Header */}
        <div className="text-center mb-4">
          <div
            style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "#3B5BDB", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px", margin: "0 auto 12px",
            }}
          >
            🛡️
          </div>
          <h4 className="fw-bold mb-1">Admin Login</h4>
          <p className="text-muted" style={{ fontSize: "13px" }}>
            This area is restricted to administrators only.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2" style={{ fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: "13px" }}>
              Admin Email
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="admin@mentorconnect.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: "13px" }}>
              Password
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            🔐 Login as Admin
          </button>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "12px" }}>
          Not an admin? <span
            style={{ color: "#3B5BDB", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Go back home
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;