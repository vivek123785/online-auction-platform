const mongoose = require("mongoose");

const auctionItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/300", // Default placeholder image
    },
    startingBid: {
      type: Number,
      required: [true, "Starting bid is required"],
      min: [0, "Starting bid must be at least 0"],
    },
    status: {
      type: String,
      enum: ["active", "sold", "expired"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, // Prevent modification after creation
    },
  },
  { timestamps: true }
);

const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);

module.exports = AuctionItem;
