import React from "react";
import "../styles/AuctionItem.css";

const AuctionItem = ({ item, onBid }) => {
  if (!item) {
    return <div className="auction-item-error">Item data is missing</div>;
  }

  return (
    <div className="auction-item">
      <div className="auction-item-details">
        <h3>{item.title || "Untitled Item"}</h3>
        <p>{item.description || "No description available."}</p>
        <p className="price">
          ${item.currentBid ? item.currentBid.toLocaleString() : item.startingBid?.toLocaleString() || "0"}
        </p>
        <button className="bid-button" onClick={() => onBid(item._id)}>Place Bid</button>
      </div>
    </div>
  );
};

export default AuctionItem;
