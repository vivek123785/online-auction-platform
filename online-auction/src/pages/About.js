import React from 'react';
import './About.css'; // We'll add a custom CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">Welcome to the About Page!</h1>
        <p className="about-description">
          This is a demo online auction platform. Our goal is to provide a seamless 
          and easy-to-use platform where users can buy and sell items in an auction format.
        </p>
        <p className="about-description">
          With our platform, you can participate in live auctions, place bids, and explore 
          a wide variety of items. Whether you're buying or selling, we've got you covered!
        </p>
        <div className="about-image">
          <img src="https://via.placeholder.com/600x300" alt="Auction" />
        </div>
      </div>
    </div>
  );
};

export default About;
