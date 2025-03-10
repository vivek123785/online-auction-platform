// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"; // Ensure the CSS file exists

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Online Auction. All rights reserved.</p>
      <nav className="footer-links">
        <Link to="/contact" aria-label="Contact Us">Contact Us</Link>
        <Link to="/terms" aria-label="Terms & Conditions">Terms & Conditions</Link>
        <Link to="/privacy" aria-label="Privacy Policy">Privacy Policy</Link>
      </nav>
    </footer>
  );
};

export default Footer;
