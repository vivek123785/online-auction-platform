// src/components/BidForm.js
import React from 'react';

const BidForm = ({ bidAmount, onBidChange, onPlaceBid }) => {
  return (
    <div className="bid-form">
      <input
        type="number"
        value={bidAmount}
        onChange={onBidChange}
        placeholder="Enter your bid"
        min="1"
      />
      <button onClick={onPlaceBid}>Place Bid</button>
    </div>
  );
};

export default BidForm;
