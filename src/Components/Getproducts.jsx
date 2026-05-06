import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Mycarousel from './Mycarousel';
import Chatbot from './Chatbot';
import { useAuth } from '../context/AuthContext';

const GetProducts = () => {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter]         = useState("all");
  const [chatOpen, setChatOpen]     = useState(false);

  // ✅ Prompt state — stores the product the user tried to open
  const [showPrompt, setShowPrompt] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  const navigate  = useNavigate();
  const { user }  = useAuth();
  const img_url   = "https://sethstanley.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://sethstanley.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ✅ Called when user clicks "Apply for the session"
  const handleApply = (product) => {
    if (user) {
      // Already logged in → go straight to payment
      navigate('/makepayment', { state: { product } });
    } else {
      // Not logged in → show prompt
      setPendingProduct(product);
      setShowPrompt(true);
    }
  };

  // ✅ User chose to sign in → save destination and redirect
  const handleSignInRedirect = () => {
    // Save the product in sessionStorage so we can restore it after login if needed
    sessionStorage.setItem("pendingProduct", JSON.stringify(pendingProduct));
    setShowPrompt(false);
    navigate("/signin");
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (product.product_name && product.product_name.toLowerCase() === filter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className='row'>
        <h3 className="text-primary">Available Mentors 🌞🌟</h3>
        {loading && <Loader />}
        <h4 className="text-danger">{error}</h4>
        <Mycarousel products={products} img_url={img_url} />

        {/* Search + Filter */}
        <div className="d-flex flex-column flex-md-row gap-3 mb-3">
          <input
            type="text"
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ maxWidth: "300px" }}
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="form-select"
            style={{ maxWidth: "200px" }}
          >
            <option value="all">All Categories</option>
            <option value="tech Mentor">Tech</option>
            <option value="Mental Mentor">Mental</option>
            <option value="Peer Mentor">Peer</option>
            <option value="Emotions">Emotions</option>
            <option value="Startup Mentor">Startup</option>
            <option value="Financial Mentor">Financial</option>
            <option value="Career Mentor">Career</option>
            <option value="Creative Mentor">Creative</option>
            <option value="Fitness Mentor">Fitness</option>
            <option value="Parenting Mentor">Parenting</option>
            <option value="Legal Mentor">Legal</option>
            <option value="Communication Mentor">Communication</option>
          </select>
        </div>

        {/* Mentor cards */}
        {filteredProducts.map((product, index) => (
          <div className="col-md-3 d-flex mb-3" key={product.product_name}>
            <motion.div
              className="card shadow w-100 product-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              whileHover={{
                scale: 1.05, y: -10, rotate: 2,
                backgroundColor: "#e6e6e6cc",
                boxShadow: "0px 8px 20px rgba(13, 6, 216, 0.25)",
                transition: { duration: 0.25, ease: "linear" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="product_img mt-3"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="text-primary">{product.product_name}</h5>
                <p className="text-dark flex-grow-1">
                  {product.product_description.slice(0, 70)}...
                </p>
                <h4 className="text-warning">KES {product.product_cost}/Hour</h4>
                {/* ✅ Now calls handleApply instead of navigate directly */}
                <button
                  className="btn btn-outline-info"
                  onClick={() => handleApply(product)}
                >
                  Apply for the session
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ✅ Sign-in Prompt Modal */}
      <AnimatePresence>
        {showPrompt && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrompt(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.55)",
                zIndex: 1055,
                backdropFilter: "blur(3px)",
              }}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1,   y: 0  }}
              exit={{   opacity: 0, scale: 0.85, y: 40  }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1060,
                background: "#fff",
                borderRadius: "16px",
                padding: "32px 28px",
                maxWidth: "400px",
                width: "90%",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              }}
            >
              {/* Icon */}
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "#EEF2FF", margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px",
              }}>
                🔐
              </div>

              <h5 style={{ fontWeight: "700", marginBottom: "8px" }}>
                Sign in to continue
              </h5>

              {pendingProduct && (
                <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "20px" }}>
                  You need to be logged in to apply for a session with{" "}
                  <strong>{pendingProduct.product_name}</strong>.
                </p>
              )}

              {/* Buttons */}
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={handleSignInRedirect}
              >
                🔑 Sign In
              </button>

              <button
                className="btn btn-outline-secondary w-100 mb-2"
                onClick={() => { setShowPrompt(false); navigate("/signup"); }}
              >
                ✍️ Create an Account
              </button>

              <button
                className="btn btn-link text-muted w-100"
                style={{ fontSize: "13px" }}
                onClick={() => setShowPrompt(false)}
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
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

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        style={{
          position: "fixed", bottom: "20px", left: "20px",
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