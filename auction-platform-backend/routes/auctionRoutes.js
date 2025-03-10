const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const Auction = require("../models/auction");
const User = require("../models/user");

// ✅ GET /api/auction/static-items - Fetch items from item.json
router.get("/static-items", (req, res) => {
  try {
    const dataPath = path.join(__dirname, "../data/item.json");

    if (!fs.existsSync(dataPath)) {
      return res.json([]);
    }

    const rawData = fs.readFileSync(dataPath, "utf-8");
    const items = JSON.parse(rawData);

    res.json(items);
  } catch (error) {
    console.error("Error fetching static items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ GET /api/auction/featured - Fetch all featured auctions
router.get("/featured", async (req, res) => {
  try {
    const featuredAuctions = await Auction.find({ featured: true });

    res.json(featuredAuctions || []);
  } catch (error) {
    console.error("Error fetching featured auctions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ GET /api/auction - Fetch all auctions
router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions || []);
  } catch (error) {
    console.error("Error fetching all auctions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ GET /api/auction/:id - Fetch a single auction by its ID
router.get("/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.json(auction);
  } catch (error) {
    console.error("Error fetching auction by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ POST /api/auction - Create a new auction
router.post("/", async (req, res) => {
  try {
    const { title, description, startingPrice, endTime, createdBy, featured } = req.body;

    if (!title || !description || !startingPrice || !endTime || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAuction = new Auction({
      title,
      description,
      startingPrice,
      endTime,
      createdBy,
      featured: featured || false,
      bidHistory: [], // Ensure bidHistory is initialized
      currentBid: startingPrice,
    });

    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ PUT /api/auction/:id - Update an existing auction
router.put("/:id", async (req, res) => {
  try {
    const { title, description, startingPrice, endTime, featured } = req.body;

    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      { title, description, startingPrice, endTime, featured },
      { new: true }
    );

    if (!updatedAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json(updatedAuction);
  } catch (error) {
    console.error("Error updating auction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ DELETE /api/auction/:id - Delete an auction by its ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAuction = await Auction.findByIdAndDelete(req.params.id);

    if (!deletedAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json({ message: "Auction deleted successfully" });
  } catch (error) {
    console.error("Error deleting auction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ POST /api/auction/:id/bid - Place a bid on an auction
router.post("/:id/bid", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "User ID and bid amount are required" });
    }

    // ✅ Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Find the auction
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // ✅ Check if the auction is still active
    if (new Date() > new Date(auction.endTime)) {
      return res.status(400).json({ message: "Bidding has ended for this auction" });
    }

    // ✅ Determine the highest bid
    const highestBid = auction.currentBid;

    if (amount <= highestBid) {
      return res.status(400).json({ message: "Bid must be higher than the current highest bid" });
    }

    // ✅ Push the new bid into bid history
    auction.bidHistory.push({ user: userId, amount, timestamp: new Date() });
    auction.currentBid = amount; // Update current highest bid

    // ✅ Save the updated auction
    await auction.save();

    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
