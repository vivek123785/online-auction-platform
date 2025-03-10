// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css"; // Ensure the CSS file exists

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Detect login/logout changes in localStorage
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); // Clear token
      sessionStorage.clear(); // Clear any other session data
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="nav-list">
          <li><Link to="/" aria-label="Go to Home">Home</Link></li>
          <li><Link to="/auction" aria-label="View Auctions">Auction</Link></li>
          <li><Link to="/contact" aria-label="Contact Us">Contact</Link></li>
          <li><Link to="/about" aria-label="About Us">About</Link></li>

          {/* Conditional Login/Logout Button */}
          {isLoggedIn ? (
            <li>
              <button 
                onClick={handleLogout} 
                className="logout-button" 
                aria-label="Logout">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="login-button" aria-label="Login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
