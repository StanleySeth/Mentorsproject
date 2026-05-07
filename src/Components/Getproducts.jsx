import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Mycarousel from './Mycarousel';
import Chatbot from './Chatbot';
import { useAuth } from '../context/AuthContext';
import RandomMentorPicker from './Randommentorpicker';

// ── Session type display config ──────────────────────────────
const SESSION = {
  physical: { icon: "🏢", label: "Physical",   bg: "#F3E8FF", color: "#7C3AED" },
  online:   { icon: "📞", label: "Phone Call", bg: "#E0F2FE", color: "#0369A1" },
  video:    { icon: "📹", label: "Video Call", bg: "#CCFBF1", color: "#0F766E" },
  both:     { icon: "🌐", label: "Online",     bg: "#E0F2FE", color: "#0369A1" },
  all:      { icon: "✨", label: "All Modes",  bg: "#FEF3C7", color: "#B45309" },
};

const GetProducts = () => {
  const [products,        setProducts]        = useState([]);
  const [categories,      setCategories]      = useState([]);   // from DB
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState("");
  const [searchTerm,      setSearchTerm]      = useState("");
  const [filter,          setFilter]          = useState("all");
  const [availFilter,     setAvailFilter]     = useState("all");
  const [chatOpen,        setChatOpen]        = useState(false);
  const [showPrompt,      setShowPrompt]      = useState(false);
  const [pendingProduct,  setPendingProduct]  = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const img_url  = "https://sethstanley.alwaysdata.net/static/images/";

  // ── Fetch mentors (backend now returns categories[] per mentor) ──
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://sethstanley.alwaysdata.net/api/get_products");
      setProducts(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch categories for the dropdown ─────────────────────────
  // Uses /api/get_categories from our updated app.py
  // If you haven't updated app.py yet, change this to /api/categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://sethstanley.alwaysdata.net/api/get_categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Could not load categories:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ── Apply button ───────────────────────────────────────────────
  const handleApply = (product) => {
    if (product.is_available === 0 || product.is_available === false) return;
    if (user) {
      navigate('/makepayment', { state: { product } });
    } else {
      setPendingProduct(product);
      setShowPrompt(true);
    }
  };

  const handleSignInRedirect = () => {
    sessionStorage.setItem("pendingProduct", JSON.stringify(pendingProduct));
    setShowPrompt(false);
    navigate("/signin");
  };

  // ── Filtering ──────────────────────────────────────────────────
  const filteredProducts = products.filter(product => {
    // Search by name
    const matchesSearch =
      product.product_name?.toLowerCase().includes(searchTerm.toLowerCase());

    // Category: product.categories is an array returned by the backend JOIN
    const matchesCategory =
      filter === "all" ||
      (Array.isArray(product.categories) && product.categories.includes(filter));

    // Availability
    const matchesAvail =
      availFilter === "all" ||
      (availFilter === "available"   && (product.is_available === 1 || product.is_available === true)) ||
      (availFilter === "unavailable" && (product.is_available === 0 || product.is_available === false));

    return matchesSearch && matchesCategory && matchesAvail;
  });

  return (
    <>
      <div className="row">
        <h3 className="text-primary">Available Mentors 🌞🌟</h3>
        {loading && <Loader />}
        {error && <h4 className="text-danger">{error}</h4>}

        <Mycarousel products={products} img_url={img_url} />

        {/* ── Random Mentor Picker ── */}
        <RandomMentorPicker products={products} img_url={img_url} />

        {/* ── Search + Filters ── */}
        <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search mentors..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ maxWidth: "260px" }}
          />

          {/* Category dropdown — from DB */}
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="form-select"
            style={{ maxWidth: "220px" }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </select>

          {/* Availability tabs */}
          <div className="d-flex gap-1 flex-wrap">
            {[
              { val: "all",         label: "All"             },
              { val: "available",   label: "🟢 Available"    },
              { val: "unavailable", label: "🔴 Unavailable"  },
            ].map(tab => (
              <button
                key={tab.val}
                onClick={() => setAvailFilter(tab.val)}
                style={{
                  padding:     "6px 14px",
                  borderRadius: "20px",
                  border:      "1.5px solid",
                  borderColor: availFilter === tab.val ? "#3B5BDB" : "#dee2e6",
                  background:  availFilter === tab.val ? "#3B5BDB" : "#fff",
                  color:       availFilter === tab.val ? "#fff"    : "#495057",
                  fontSize:    "13px",
                  cursor:      "pointer",
                  fontWeight:  availFilter === tab.val ? "600"     : "400",
                  transition:  "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Empty state ── */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center text-muted py-5">
            <p style={{ fontSize: "40px" }}>🔍</p>
            <p>No mentors found. Try adjusting your filters.</p>
          </div>
        )}

        {/* ── Mentor cards ── */}
        {filteredProducts.map((product, index) => {
          const isAvailable = product.is_available === 1 || product.is_available === true;
          const sessionInfo = SESSION[product.session_type] || SESSION.both;
          const hours       = product.available_from && product.available_to
            ? `${product.available_from} – ${product.available_to}`
            : null;

          return (
            <div
              className="col-md-3 d-flex mb-3"
              key={product.id || product.product_id || product.product_name}
            >
              <motion.div
                className="card shadow w-100 product-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale:     isAvailable ? 1.05 : 1.01,
                  y:         isAvailable ? -10  : 0,
                  rotate:    isAvailable ? 2    : 0,
                  boxShadow: isAvailable
                    ? "0px 8px 20px rgba(13,6,216,0.25)"
                    : "0px 2px 8px rgba(0,0,0,0.1)",
                  transition: { duration: 0.25 },
                }}
                whileTap={{ scale: 0.97 }}
                style={{ opacity: isAvailable ? 1 : 0.72, position: "relative" }}
              >
                {/* ── Availability badge ── */}
                <div style={{
                  position:   "absolute", top: "10px", right: "10px",
                  background: isAvailable ? "#22C55E" : "#EF4444",
                  color:      "#fff", borderRadius: "20px",
                  padding:    "3px 10px", fontSize: "11px",
                  fontWeight: "700", zIndex: 2,
                  boxShadow:  "0 2px 6px rgba(0,0,0,0.15)",
                }}>
                  {isAvailable ? "🟢 Available" : "🔴 Unavailable"}
                </div>

                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="product_img mt-3"
                  style={{ filter: isAvailable ? "none" : "grayscale(60%)" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="text-primary">{product.product_name}</h5>
                  <p className="text-dark flex-grow-1">
                    {product.product_description?.slice(0, 70)}...
                  </p>
                  <h4 className="text-warning">KES {product.product_cost}/Hour</h4>

                  {/* ── Category pills (from DB join) ── */}
                  {Array.isArray(product.categories) && product.categories.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"4px", marginBottom:"8px" }}>
                      {product.categories.map(cat => (
                        <span key={cat} style={{
                          background: "#EEF2FF", color: "#3B5BDB",
                          borderRadius: "20px", padding: "2px 8px",
                          fontSize: "11px", fontWeight: "600",
                        }}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* ── Session type badge ── */}
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{
                      background:   sessionInfo.bg,
                      color:        sessionInfo.color,
                      borderRadius: "20px",
                      padding:      "3px 10px",
                      fontSize:     "12px",
                      fontWeight:   "600",
                    }}>
                      {sessionInfo.icon} {sessionInfo.label}
                    </span>
                  </div>

                  {/* ── Available hours ── */}
                  {isAvailable && hours && (
                    <p style={{ fontSize:"11px", color:"#6B7280", marginBottom:"8px" }}>
                      ⏰ Available: {hours}
                    </p>
                  )}

                  {/* ── Apply / Unavailable button ── */}
                  <button
                    className={`btn ${isAvailable ? "btn-outline-info" : "btn-secondary"}`}
                    onClick={() => handleApply(product)}
                    disabled={!isAvailable}
                    title={!isAvailable ? "This mentor is currently unavailable" : ""}
                    style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
                  >
                    {isAvailable ? "Apply for the session" : "Currently Unavailable"}
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Sign-in Prompt Modal ── */}
      <AnimatePresence>
        {showPrompt && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowPrompt(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.55)",
                zIndex: 1055, backdropFilter: "blur(3px)",
              }}
            />
            <motion.div
              key="modal"
              initial={{ opacity:0, scale:0.85, y:40 }}
              animate={{ opacity:1, scale:1,    y:0  }}
              exit={{   opacity:0, scale:0.85, y:40  }}
              transition={{ type:"spring", stiffness:300, damping:25 }}
              style={{
                position: "fixed", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 1060, background: "#fff",
                borderRadius: "16px", padding: "32px 28px",
                maxWidth: "400px", width: "90%",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{
                width:"64px", height:"64px", borderRadius:"50%",
                background:"#EEF2FF", margin:"0 auto 16px",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"28px",
              }}>🔐</div>

              <h5 style={{ fontWeight:"700", marginBottom:"8px" }}>Sign in to continue</h5>

              {pendingProduct && (
                <p style={{ fontSize:"13px", color:"#6B7280", marginBottom:"20px" }}>
                  You need to be logged in to apply for a session with{" "}
                  <strong>{pendingProduct.product_name}</strong>.
                </p>
              )}

              <button
                className="btn btn-primary w-100 mb-2"
                onClick={handleSignInRedirect}
              >🔑 Sign In</button>

              <button
                className="btn btn-outline-secondary w-100 mb-2"
                onClick={() => { setShowPrompt(false); navigate("/signup"); }}
              >✍️ Create an Account</button>

              <button
                className="btn btn-link text-muted w-100"
                style={{ fontSize:"13px" }}
                onClick={() => setShowPrompt(false)}
              >Cancel</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="bg-dark text-light mt-5 p-4 text-center">
        <div className="container">
          <h5>MentorConnect</h5>
          <p>Empowering your growth through expert mentorship.</p>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <a href="/" className="text-light">Home</a>
            <a href="/about" className="text-light">About Us</a>
            <a href="/contact" className="text-light">Contact Us</a>
          </div>
          <small>© {new Date().getFullYear()} MentorConnect. All rights reserved.</small>
        </div>
      </footer>

      {/* ── Floating Chat Button ── */}
      <button
        onClick={() => setChatOpen(true)}
        style={{
          position:  "fixed", bottom: "20px", left: "20px",
          background: "#3B5BDB", color: "#fff",
          border: "none", borderRadius: "50px",
          padding: "12px 18px", fontSize: "14px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        💬 Chat Assistant
      </button>
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default GetProducts;