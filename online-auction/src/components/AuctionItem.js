// src/components/AuctionItem.js
import React from 'react';
import '../styles/AuctionItem.css'; // Correct import path for CSS

const AuctionItem = ({ title, description, price }) => {
  return (
    <div className="auction-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">${price}</p>
    </div>
  );
};

export default AuctionItem;
