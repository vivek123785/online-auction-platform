import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login"; // ✅ Fixed import path 
import SignUp from "./pages/signUp";
import { fetchFeaturedItems } from "./services/api";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchFeaturedItems();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load featured auction items.");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return (
    <Router>
      <Header />
      <main className="content">
        {loading && <div className="loading">Loading auction items...</div>}
        {error && <div className="error-message">{error}</div>}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/auction" element={<Auction items={items} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
