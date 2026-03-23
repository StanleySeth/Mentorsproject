import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
    
  // declare the navigate hook
    const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! 🚀");
    console.log(formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <>
    <div className="container mt-5">
      <h2 className="text-primary text-center mb-4">Contact Us</h2>
        <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="<- Back"
            onClick={() => navigate("/") } />
        </div>

      <form onSubmit={handleSubmit} className="col-md-6 mx-auto shadow p-4">
        
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="text" 
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea 
            name="message"
            className="form-control"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>
      
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

export default Contact;