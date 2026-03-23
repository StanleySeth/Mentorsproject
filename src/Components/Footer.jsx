// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <p className="mb-1">© {new Date().getFullYear()} MentorHub</p>
      <small className="text-secondary">
        Built with ❤️ to connect mentors and learners
      </small>
    </footer>
  );
};

export default Footer;
