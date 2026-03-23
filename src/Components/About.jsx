import React from 'react';
import { motion } from 'framer-motion';

const About = () => {

  // ✅ Dynamic content (easy to update later or fetch from API)
  const features = [
    "1-on-1 mentorship sessions",
    "Career guidance",
    "Skill development support",
    "Flexible learning opportunities"
  ];

  const stats = [
    { label: "Mentors", value: "50+" },
    { label: "Students", value: "200+" },
    { label: "Sessions", value: "1,000+" }
  ];

  return (
    <>
    <div className="container mt-5">

      {/* 🔥 Animated Heading */}
      <motion.h2 
        className="text-primary text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h2>

      {/* 🌟 Intro */}
      <motion.p 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Welcome to <strong>MentorConnect</strong> 🌟 — a platform designed to connect learners with experienced mentors.
      </motion.p>

      {/* 📊 Stats Section */}
      <div className="row text-center mt-5">
        {stats.map((stat, index) => (
          <div className="col-md-4" key={index}>
            <motion.div
              className="p-3 shadow rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              <h3 className="text-warning">{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* 🧠 Main Content */}
      <div className="row mt-5">
        
        {/* Mission */}
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.2)"
            }}
            className="p-3 rounded"
          >
            <h4 className="text-info">Our Mission</h4>
            <p>
              To empower individuals by providing access to expert guidance,
              helping them grow in their careers and personal development.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.2)"
            }}
            className="p-3 rounded"
          >
            <h4 className="text-info">What We Offer</h4>
            <ul>
              {features.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* 🚀 Call to Action */}
      <motion.div 
        className="text-center mt-5 p-4 bg-light rounded shadow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4>Ready to grow with us? 🚀</h4>
        <p>Join MentorConnect today and start your journey.</p>
        <button className="btn btn-primary">Get Started</button>
      </motion.div>
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

export default About;