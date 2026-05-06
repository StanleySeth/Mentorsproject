import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminLogin from "./Components/AdminLogin";
import AdminPrompt from "./Components/AdminPrompt";
import { useAuth } from "./context/AuthContext";

import mentoringLogo from './css/mentoring-2738524_1920.jpg';

import './App.css';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Addproducts from './Components/Addproducts';
import GetProducts from './Components/Getproducts';
import NotFound from './Components/Notfound';
import Makepayment from './Components/Makepayment';
import About from './Components/About';
import Contact from './Components/Contact';
import Terms from './Components/Terms';

function AppContent() {
  const { user, logoutUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const AddproductsGuard = () => {
    const { isAdmin } = useAuth();
    if (isAdmin) return <Addproducts />;
    return <AdminPrompt />;
  };

  return (
    <div className="App">

      {/* ── Navbar ── */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={mentoringLogo}
              alt="Mentoring Logo"
              style={{ height: "40px", marginRight: "10px", width: "100px", borderRadius: "5px", backgroundColor: "transparent" }}
            />
          </Link>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">

              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>

              {/* ── ADMIN logged in → admin badge dropdown ── */}
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <Link to="/addproducts" className="nav-link">Add Mentors</Link>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                      href="#"
                      id="adminDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "#E63946", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px", flexShrink: 0,
                      }}>
                        🛡️
                      </div>
                      <span className="d-none d-lg-inline" style={{ fontSize: "14px" }}>
                        Admin
                      </span>
                    </a>

                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="adminDropdown"
                      style={{ minWidth: "200px" }}
                    >
                      <li className="px-3 py-2">
                        <p className="mb-0 fw-bold" style={{ fontSize: "14px" }}>🛡️ Administrator</p>
                        <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>Full access enabled</p>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item" onClick={() => navigate("/addproducts")}>
                          ➕ Add Mentors
                        </button>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => { logout(); navigate("/"); }}
                        >
                          🚪 Logout as Admin
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {/* ── Not logged in → Signup & Signin ── */}
              {!user && !isAdmin && (
                <>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link">Signin</Link>
                  </li>
                </>
              )}

              {/* ── Regular user logged in → profile dropdown ── */}
              {user && (
                <li className="nav-item dropdown">
                  <button
                    type="button"
                    className="nav-link dropdown-toggle d-flex align-items-center gap-2 btn btn-link"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "#3B5BDB", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700", fontSize: "15px", textTransform: "uppercase",
                      flexShrink: 0,
                    }}>
                      {user.username?.charAt(0) || user.email?.charAt(0)}
                    </div>
                    <span className="d-none d-lg-inline" style={{ fontSize: "14px" }}>
                      {user.username || "Profile"}
                    </span>
                  </button>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profileDropdown"
                    style={{ minWidth: "200px" }}
                  >
                    <li className="px-3 py-2">
                      <p className="mb-0 fw-bold" style={{ fontSize: "14px" }}>{user.username}</p>
                      <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>{user.email}</p>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => { logoutUser(); navigate("/signin"); }}
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="App-header">
        <h2 className="text-warning">Mentors — Discover mentors who will ignite your potential</h2>
      </header>

      {/* ── Routes ── */}
      <Routes>
        <Route path="/"            element={<GetProducts />} />
        <Route path="/signup"      element={<Signup />} />
        <Route path="/signin"      element={<Signin />} />
        <Route path="/makepayment" element={<Makepayment />} />
        <Route path="/about"       element={<About />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/terms"       element={<Terms />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/addproducts" element={<AddproductsGuard />} />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <Addproducts />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;