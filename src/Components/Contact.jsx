import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const navigate = useNavigate();

  // User input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  // Form states
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [shake, setShake] = useState(false);

  // Email validation
  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      email && !regex.test(email)
        ? 'Invalid email address.'
        : ''
    );
  }, [email]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Blank field check
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setError('All fields are required.');
      triggerShake();
      return;
    }

    if (emailError) {
      setError('Please fix the errors before submitting.');
      triggerShake();
      return;
    }

    setError('');
    setSuccess('');
    setSending(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("feedback", feedback);

      const res = await axios.post(
        'https://sethstanley.alwaysdata.net/api/feedback',
        formData
      );

      setSuccess(res.data.message || 'Message sent successfully! 🚀');

      setName('');
      setEmail('');
      setFeedback('');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      triggerShake();
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-primary text-center mb-4">Contact Us</h2>

        <div className="col-md-1">
          <input
            type="button"
            className="btn btn-primary"
            value="<- Back"
            onClick={() => navigate('/')}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="col-md-6 mx-auto shadow p-4"
          noValidate
        >
          {/* Banners */}
          {success && <h5 className="text-success">{success}</h5>}
          {error   && <h5 className="text-danger">{error}</h5>}

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${shake ? 'input-error' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>

          {/* Message */}
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>

          {/* ✅ Button disabled when any field is empty, email is invalid, or sending */}
          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
            disabled={sending || !!emailError || !name.trim() || !email.trim() || !feedback.trim()}
          >
            {sending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
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
};

export default Contact;