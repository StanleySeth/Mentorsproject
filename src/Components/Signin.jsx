import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signin = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState("");
  const [success, setSuccess]   = useState("");
  const [error, setError]       = useState("");

  const navigate    = useNavigate();
  const { loginUser } = useAuth();         // ← pull loginUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Authentication in progress...");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://sethstanley.alwaysdata.net/api/signin",
        formdata
      );

      setLoading("");

      if (response.data.user) {
        // Save to localStorage (keep your existing logic)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLoggedIn", "true");

        // ✅ Sync with AuthContext so navbar updates immediately
        loginUser(response.data.user);

        navigate("/");
      } else {
        setError("Invalid email or password. Please try again...");
      }

      setTimeout(() => setSuccess(""), 5000);
      setTimeout(() => setError(""),   5000);

    } catch (error) {
      setLoading("");
      setError("Ooops, something went wrong. Please try again...");
    }
  };

  return (
    <>
      <div className="row justify-content-center mt-4">
        <div className="card col-md-6 shadow p-4">
          <h1 className="text-primary">Sign In</h1>
          <h5 className="text-info">{loading}</h5>
          <h5 className="text-success">{success}</h5>
          <h5 className="text-danger">{error}</h5>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter the email address here..."
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> <br />

            <input
              type="password"
              placeholder="Enter the password here..."
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> <br />

            <input type="submit" value="Signin" className="btn btn-primary" />
            <br /><br />

            Don't have an account? <Link to="/signup">Register</Link>
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
      </div>
    </>
  );
};

export default Signin;