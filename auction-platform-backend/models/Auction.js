const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    startingPrice: {
      type: Number,
      required: [true, "Starting price is required"],
      min: [0, "Starting price must be at least 0"],
    },
    currentBid: {
      type: Number,
      default: 0,
      min: [0, "Current bid cannot be negative"],
    },
    bidHistory: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        amount: { type: Number, required: true, min: [0, "Bid amount must be positive"] },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    endTime: {
      type: Date,
      required: [true, "Auction end time is required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "End time must be in the future",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Auction must have a creator"],
    },
    status: {
      type: String,
      enum: ["active", "completed", "canceled"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔹 Pre-save hook to ensure `currentBid` is at least `startingPrice`
auctionSchema.pre("save", function (next) {
  if (this.currentBid < this.startingPrice) {
    this.currentBid = this.startingPrice;
  }
  next();
});

// 🔹 Method to place a bid
auctionSchema.methods.placeBid = async function (userId, bidAmount) {
  if (this.status !== "active") {
    throw new Error("Bidding is not allowed on a completed or canceled auction.");
  }

  if (new Date() > new Date(this.endTime)) {
    this.status = "completed"; // Auto-close auction
    await this.save();
    throw new Error("Bidding has ended for this auction.");
  }

  const highestBid = this.currentBid || this.startingPrice;
  if (bidAmount <= highestBid) {
    throw new Error("Bid must be higher than the current highest bid.");
  }

  // Update bid history
  this.bidHistory.push({ user: userId, amount: bidAmount, timestamp: new Date() });
  this.currentBid = bidAmount;

  await this.save();
  return this;
};

// 🔹 Automatically close auctions when expired
auctionSchema.statics.closeExpiredAuctions = async function () {
  const now = new Date();
  await this.updateMany(
    { endTime: { $lt: now }, status: "active" },
    { $set: { status: "completed" } }
  );
};

// 🔹 Add index for better performance
auctionSchema.index({ endTime: 1 });
auctionSchema.index({ status: 1 });

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
