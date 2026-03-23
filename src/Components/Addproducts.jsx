import React, { useRef, useState, } from 'react'
import Loader from './Loader';
import axios from 'axios';

function Addproducts() {

  //Introduce the hooks that will capture the user input for the product details  
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  const fileInputRef = useRef(null); // Ref for the file input element


  //Declare the additional hooks to manage the state of the application during the product addition process
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //Create a function that will handle the submit action
  const handleSubmit = async (e) => {
    //Prevent the site from reloading
    e.preventDefault();
    //Set the loading hook to true so that the loader is displayed
    setLoading(true);


    try {
      //Create a form data object to hold the product details
      const formData = new FormData();

      //Append the details to the form data object created that allows you to send the details in one request.
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      //Interact with axios to help you get a response from the API
      const response = await axios.post("https://sethstanley.alwaysdata.net/api/add_product", formData);
      //Set the loading hook back to default (deactivate it)
      setLoading(false);

      // Check whether the product was added successfully as part of your response from the API
      setSuccess(response.data.message);

      //Clearing the hooks after submission
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      //Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);

      //Clear the error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    //If the request fails,loading stops and the error message is displayed
    catch (error) {
      //Set the loading hook back to default (deactivate it)
      setLoading(false);

      //Update the setError
      setError(error.message);
    }

    // Reset file input after successful submission
    setProductPhoto("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  };
  


  return loading ? <Loader /> :  (
    <>
    <div className='row justify-content-center mt-4'>
      <div className='col-md-6 card p-4 shadow' style={{ backgroundColor: 'lightgray' }}>
        <h3 className="text-info font-bold ">
              Connect with a Mentor 🤝 
            </h3>
        {/* {Bind the loading hook} */}
        {loading && <Loader />}
        <h5 className='text-success'>{success}</h5>
        <h5 className='text-danger'>{error}</h5>

        <form onSubmit={handleSubmit} className="p-3 shadow rounded custom-card" >
          {/* Product Name */}
          <div className="mb-3">
            <label className="form-label">Concern</label>
            <input
              type="text"
              placeholder="Enter your concern here..."
              className="form-control"
              required
              value={product_name}
              onChange={(e) => setProductName(e.target.value)} />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Reflection</label>
            <textarea
              placeholder="Describe the reflection here..."
              className="form-control"
              required
              rows="3"
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)} />
          </div>

          {/* Cost */}
          <div className="mb-3">
            <label className="form-label">Session Cost</label>
            <input
              type="number"
              placeholder="Enter the cost..."
              className="form-control"
              required
              min="0"
              step="0.01"
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)} />
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Mentor's Photo</label>
            <input
              type="file"
              className="form-control"
              required
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setProductPhoto(e.target.files[0])} />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Add Mentor
          </button>

        </form>
      </div>
    </div>
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
}

export default Addproducts;
