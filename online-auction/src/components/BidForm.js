// src/components/BidForm.js
import React, { useState } from "react";
import "../styles/BidForm.css"; // Ensure you have a CSS file for styling

const BidForm = ({ currentBid, onPlaceBid }) => {
  const [bidAmount, setBidAmount] = useState("");

  const handleBidChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) > 0) {
      setBidAmount(value);
    }
  };

  const handleSubmit = () => {
    if (bidAmount && Number(bidAmount) > currentBid) {
      onPlaceBid(Number(bidAmount));
      setBidAmount(""); // Clear input after bid is placed
    } else {
      alert("Bid must be higher than the current bid!");
    }
  };

  return (
    <div className="bid-form">
      <input
        type="number"
        value={bidAmount}
        onChange={handleBidChange}
        placeholder={`Minimum bid: $${currentBid + 1}`}
        min={currentBid + 1}
      />
      <button onClick={handleSubmit} disabled={!bidAmount || Number(bidAmount) <= currentBid}>
        Place Bid
      </button>
    </div>
  );
};

export default BidForm;
