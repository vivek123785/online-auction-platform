import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Auction.css";
import AuctionItem from "../components/AuctionItem";

const Auction = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuctionItems();
  }, []);

  const fetchAuctionItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/auction");
      setItems(response.data);
    } catch (err) {
      setError("Failed to load auction items.");
    }
    setLoading(false);
  };

  const placeBid = async (itemId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auction/bid`, {
        itemId,
        bidAmount: 10, // Set bid amount dynamically later
      });
      console.log(response.data.message);
      fetchAuctionItems(); // Refresh auction items after bid
    } catch (err) {
      console.error("Error placing bid:", err);
      alert("Failed to place bid. Try again!");
    }
  };

  return (
    <div className="auction-container">
      <h1>Live Auction Items</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="auction-items">
        {items.map((item) => (
          <AuctionItem key={item._id} item={item} onBid={placeBid} />
        ))}
      </div>
    </div>
  );
};

export default Auction;
