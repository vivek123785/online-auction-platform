// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';   
import Auction from './pages/Auction'; 
import Contact from './pages/Contact'; 
import About from './pages/About'; 

function App() {
  // State to hold the auction items, loading, and error state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch auction items from the backend API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/items') // Your backend API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setItems(data); // Store the fetched items in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error); // If an error occurs, store it in state
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array ensures this effect runs only once

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message if fetching fails
  }

  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction" element={<Auction items={items} />} /> {/* Pass items as props */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
