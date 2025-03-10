const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const auctionRoutes = require("./routes/auctionRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Log HTTP requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  });

// Routes
app.use("/api/auction", auctionRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Auction API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
