import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Ensure correct casing for file path

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600); // Example countdown timer (1 hour) 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auction/featured");
        if (!response.ok) throw new Error(`Failed to fetch featured items (${response.status})`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid response format");
        setFeaturedItems(data);
      } catch (err) {
        console.error("Error fetching featured items:", err);
        setError("There was an error loading featured items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();

    // Countdown Timer Logic
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to the Ultimate Online Auction Platform</h1>
        <p>Bid on exclusive items, collectibles, and more!</p>
        <Link to="/auction" className="cta-button">Start Bidding</Link>
      </section>

      {/* Featured Auctions */}
      <section className="featured-auctions">
        <h2>Featured Auctions</h2>
        {loading ? (
          <p>Loading featured auctions...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="items-grid">
            {featuredItems.length > 0 ? (
              featuredItems.map((item) => (
                <div key={item._id} className="auction-item">
                  <img
                    src={item.image || "/assets/default-item.jpg"} // Use assets folder for default image
                    alt={item.name}
                    onError={(e) => e.target.src = "/assets/default-item.jpg"} // Handle broken images
                  />
                  <h3>{item.name}</h3>
                  <p><strong>Starting Bid:</strong> ${item.price}</p>
                  <Link to={`/auction/${item._id}`} className="view-auction-link">View Auction</Link>
                </div>
              ))
            ) : (
              <p>No featured auctions available.</p>
            )}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ul>
          <li>🔹 Register for free and create an account.</li>
          <li>🔹 Browse our exclusive auction listings.</li>
          <li>🔹 Place bids and compete with others.</li>
          <li>🔹 Win your auction and complete the payment.</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-item">
          <p>"This platform is amazing! I won a rare collectible at an unbelievable price."</p>
          <span>- John Doe</span>
        </div>
        <div className="testimonial-item">
          <p>"Super smooth experience and great deals. Highly recommended!"</p>
          <span>- Jane Smith</span>
        </div>
      </section>

      {/* Live Auction Countdown */}
      <section className="countdown">
        <h2>Upcoming Auction Ends In:</h2>
        <div className="timer">⏳ {formatTime(timeLeft)}</div>
      </section>
    </div>
  );
};

export default Home;
