import React from "react";
import "./About.css"; // Ensure this file exists and is properly styled

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Auction Platform</h1>
      <p>
        Welcome to our <span className="highlight">Online Auction Platform</span>! 
        We provide a seamless and user-friendly experience for buyers and sellers to 
        participate in live auctions.
      </p>
      <p>
        Our platform ensures a fair and competitive bidding environment, allowing you 
        to explore a variety of items, place bids, and win auctions in real-time.
      </p>

      {/* Optional: Team or Features Section */}
      <div className="team-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Secure and Transparent Auctions</li>
          <li>✅ Real-time Bidding System</li>
          <li>✅ Verified Sellers and Buyers</li>
          <li>✅ Easy-to-use Interface</li>
        </ul>
      </div>

      <div className="about-image">
        <img
          src="https://via.placeholder.com/600x300"
          alt="Auction Platform Preview"
        />
      </div>
    </div>
  );
};

export default About;
