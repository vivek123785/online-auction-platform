// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';   
import Auction from './pages/Auction'; 
import Contact from './pages/Contact'; 
import About from './pages/About'; 

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>  {/* Replaced Switch with Routes for React Router v6 */}
          <Route path="/" element={<Home />} />   {/* Updated for React Router v6 */}
          <Route path="/auction" element={<Auction />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
