import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



const GetProducts = () => {
  //Inialize hook to help you manage the state of the products in your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Declare the the navigate hook
  const navigate = useNavigate();

  //Below we specify the image base url
  const img_url="https://sethstanley.alwaysdata.net/static/images/"

  //Create a function that will help you fetch the products from the API
  const fetchProducts = async () => {
    try {
      //Update the loading hook to true so that the loader is displayed while the products are being fetched
      setLoading(true);
      //Interact with your endpoint for fetching the products(Using axios)
      const response = await axios.get("https://sethstanley.alwaysdata.net/api/get_products");
      //Update the products hook with the (fetched products) response given from the API.
      setProducts(response.data);
      //Set the loading hook back to default(to deactivate the loader)
      setLoading(false);

    }
    catch (error) {
      //If there's an error during the request, set the loading hook back to default(to deactivate the loader) and update the error hook with the error message
      setLoading(false);
      //Update the error hook with the error message
      setError(error.message);

    }
  }

    //We shall use the useEffect hook to call the fetchProducts function when the component mounts so that the products are fetched and displayed immediately when the user visits the page
    //This hook enables us to automatically re-render new features incase of any changes in the products data.
    useEffect(() => {
      fetchProducts();
    }, []);

    // console.log("The products are:", products);

  return (
    <>
    <div className='row'>
      <h3 className="text-primary">Available Mentors 🌞🌟</h3>
      {loading && <Loader />}
      <h4 className="text-danger">{error}</h4>

      {/* map the products fetched from the API to the user interface */}
      {products.map((product, index) => (
        <div className="col-md-3 d-flex mb-3">
          <motion.div
          key={product.id}
          className="card shadow w-100 product-card"
           initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
            whileHover={{
              scale: 1.05,                          // zoom in slightly
              y: -10,                               // lift upward
              rotate: 2,                            // small tilt
              backgroundColor: "#e6e6e6cc",           // subtle background change
              boxShadow: "0px 8px 20px rgba(13, 6, 216, 0.25)", // glow/shadow
              transition: { duration: 0.25, ease: "linear" }
            }}
            whileTap={{ scale: 0.95 }}              // shrink slightly when clicked
>
    
    <img 
      src={img_url + product.product_photo} 
      alt="productname" 
      className="product_img mt-3 "
    />

    <div className="card-body d-flex flex-column">
      <h5 className="text-primary">{product.product_name}</h5>

      <p className="text-dark flex-grow-1">
        {product.product_description.slice(0, 70)}...
      </p>

      <h4 className="text-warning">KES {product.product_cost}/Hour</h4>

      <button className="btn btn-outline-info" onClick={() => navigate('/makepayment', { state: { product } })}>
        Apply for the session
      </button>
    </div>

  </motion.div>
</div>
      ))}
    </div>
    {/* ✅ FOOTER ADDED HERE */}
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
  )
}

export default GetProducts;
