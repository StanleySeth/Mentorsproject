import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mycarousel from './Mycarousel';

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ New states for search + filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();
  const img_url = "https://sethstanley.alwaysdata.net/static/images/";

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Filtering logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Assuming API returns a "category" field for each product
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

        {/* ✅ Search + Filter UI */}
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
            <option value="Career Mentor">Career </option>
            <option value="Creative Mentor">Creative</option>
            <option value="Fitness Mentor">Fitness</option>
            <option value="Parenting Mentor">Parenting </option>
            <option value="Legal Mentor">Legal</option>            
            <option value="Communication Mentor">Communication</option>
          </select>
        </div>

        {/* ✅ Map filtered products */}
        {filteredProducts.map((product, index) => (
          <div className="col-md-3 d-flex mb-3" key={product.product_name}>
            <motion.div
              className="card shadow w-100 product-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: 2,
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
                <button
                  className="btn btn-outline-info"
                  onClick={() =>
                    navigate('/makepayment', { state: { product } })
                  }
                >
                  Apply for the session
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ✅ Footer */}
      <footer className="bg-dark text-light mt-5 p-4 text-center">
        <div className="container">
          <h5>MentorConnect</h5>
          <p>Empowering your growth through expert mentorship.</p>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <a href="/" className="text-light">Home</a>
            <a href="/about" className="text-light">About Us</a>
            <a href="/contact" className="text-light">Contact</a>
          </div>
          <small>© {new Date().getFullYear()} MentorConnect. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
};

export default GetProducts;