import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  // User input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Form state
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Animations
  const [shake, setShake] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState("");

  // Validation errors
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [notRobot, setNotRobot] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const evaluatePasswordStrength = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 8) return "Too Short";

    let strength = 0;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;

    if (strength <= 1) return "Weak";
    if (strength <= 3) return "Medium";
    return "Strong";
  };

  useEffect(() => {
    setPasswordStrength(evaluatePasswordStrength(password));
  }, [password]);

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "Too Short":
      case "Weak":
        return "text-danger";
      case "Medium":
        return "text-warning";
      case "Strong":
        return "text-success";
      default:
        return "";
    }
  };

  // Email validation
  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(email && !regex.test(email) ? "Invalid email address." : "");
  }, [email]);

  // Phone validation
  useEffect(() => {
    const regex = /^\+?\d{10,15}$/;
    setPhoneError(phone && !regex.test(phone) ? "Invalid phone number." : "");
  }, [phone]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setPasswordError("Password must meet all requirements.");
      triggerShake();
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      triggerShake();
      return;
    }

    if (!notRobot) {
      setError("Please confirm you are not a robot.");
      triggerShake();
      return;
    }

    if (emailError || phoneError) {
      setError("Fix form errors before submitting.");
      triggerShake();
      return;
    }

    setPasswordError("");
    setError("");
    setLoading(true);
    setLoadingMessage("Registering...");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      const res = await axios.post(
        "https://sethstanley.alwaysdata.net/api/signup",
        formdata
      );

      setSuccess(res.data.message);
      setLoading(false);

      // reset
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setAgreed(false);
      setNotRobot(false);

      setTimeout(() => navigate("/signin"), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Network error");
      triggerShake();
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="text-primary text-center mb-4">Sign Up</h1>

        {loading && <h5 className="text-warning">{loadingMessage}</h5>}

        {success && (
          <h3 className="text-success fade-out">{success}</h3>
        )}

        {error && <h4 className="text-danger">{error}</h4>}
        {passwordError && <h5 className="text-danger">{passwordError}</h5>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className={`form-control mb-3 ${shake ? "input-error" : ""}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className={`form-control mb-1 ${
              emailError ? "is-invalid input-error" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="text-danger">{emailError}</div>}

          {/* Password */}
          <div className="position-relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${
                passwordError ? "is-invalid input-error" : ""
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              } password-toggle`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className={`form-text ${getPasswordStrengthColor()}`}>
            {passwordStrength}
          </div>

          <div className="password-strength-bar">
            <div
              className={`strength-fill ${passwordStrength
                .replace(" ", "-")
                .toLowerCase()}`}
            ></div>
          </div>

          {/* Confirm Password */}
          <div className="position-relative mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control ${
                confirmPassword &&
                password !== confirmPassword &&
                "is-invalid input-error"
              }`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i
              className={`bi ${
                showConfirmPassword ? "bi-eye-slash" : "bi-eye"
              } password-toggle`}
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            ></i>
          </div>

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone"
            className={`form-control mb-1 ${
              phoneError ? "is-invalid input-error" : ""
            }`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <div className="text-danger">{phoneError}</div>}

          {/* Terms */}
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="form-check-label">
              I agree to <Link to="/terms">Terms</Link>
            </label>
          </div>

          {/* Not Robot */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={notRobot}
              onChange={(e) => setNotRobot(e.target.checked)}
            />
            <label className="form-check-label">
              I am not a robot
            </label>
          </div>

          <button
                  className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                  disabled={loading || !agreed || !notRobot}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Registering...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>

          <p className="text-center mt-3">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;