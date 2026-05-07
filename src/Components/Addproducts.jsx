import React, { useRef, useState, } from 'react'
import Loader from './Loader';
import axios from 'axios';

function Addproducts() {

  //Introduce the hooks that will capture the user input for the product details  
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  // Temporarily commented out new state variables
  // const [categories, setCategories] = useState([]);
  // const [session_type, setSessionType] = useState("both");
  // const [available_from, setAvailableFrom] = useState("09:00");
  // const [available_to, setAvailableTo] = useState("17:00");
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

      // === NEW FIELDS ===
      formData.append("is_available", "1");                    // "1" = true
      formData.append("availability_mode", "both");            // options: physical, online, video, both (temporarily hardcoded)
      formData.append("timezone", "Africa/Nairobi");
      // Temporarily commented out new fields to debug 400 error
      // formData.append("categories", JSON.stringify(categories));
      // formData.append("available_from", available_from);
      // formData.append("available_to", available_to);

      // Send availability_schedule as a JSON string (very important) throughout the week
      const schedule = {
        monday:    [{start: "09:00", end: "17:00", mode: "both"}],
        tuesday:   [{start: "09:00", end: "17:00", mode: "both"}],
        wednesday: [{start: "09:00", end: "17:00", mode: "both"}],
        thursday:  [{start: "09:00", end: "17:00", mode: "both"}],
        friday:    [{start: "09:00", end: "17:00", mode: "both"}],
        saturday:  [{start: "10:00", end: "14:00", mode: "online"}],
        sunday:    []
      };

      formData.append("availability_schedule", JSON.stringify(schedule));

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
      // Temporarily commented out clearing new fields
      // setCategories([]);
      // setSessionType("both");
      // setAvailableFrom("09:00");
      // setAvailableTo("17:00");

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
            <label className="form-label">Mentor</label>
            <input
              type="text"
              placeholder="Enter the type of mentor here..."
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

          {/* Temporarily commented out new fields to debug 400 error */}
          {/*
          <div className="mb-3">
            <label className="form-label">Categories (Select multiple - Hold Ctrl/Cmd)</label>
            <select
              multiple
              className="form-control"
              value={categories}
              onChange={(e) => setCategories([...e.target.selectedOptions].map(o => o.value))}
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Session Type</label>
            <select
              className="form-control"
              value={session_type}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option value="physical">Physical</option>
              <option value="online">Online</option>
              <option value="video">Video Call</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Available From</label>
              <input
                type="time"
                className="form-control"
                value={available_from}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Available To</label>
              <input
                type="time"
                className="form-control"
                value={available_to}
                onChange={(e) => setAvailableTo(e.target.value)}
              />
            </div>
          </div>
          */}

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
